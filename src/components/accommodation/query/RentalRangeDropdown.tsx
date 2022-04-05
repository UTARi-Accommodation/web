import { isPositiveFloat, isPositiveInt } from 'granula-string';
import * as React from 'react';
import styled from 'styled-components';
import BarChart from './rental/BarChart';
import Input from './rental/Input';
import Slider from './rental/Slider';
import {
    Button as RentalButton,
    Container,
    DropdownAndButtonContainer,
} from '../dropdown/Dropdown';
import SearchAndResetButtons from './SearchAndResetButtons';
import { RentalFrequencies, RentalRange } from 'utari-common';
import OutsideClickHandlerContainer from '../../common/OutsideClickHandlerContainer';
import { NullableRentalRange } from './container/General';
import SlideFromBottom from '../../popup/SlideFromBottom';
import useWindowResize from '../../../hook/windowResize';
import { parseAsNumber } from 'parse-dont-validate';

const RentalRangeDropdown = ({
    rentalFrequencies,
    selectedRange,
    onSearch,
    breakPoint,
}: Readonly<{
    rentalFrequencies: RentalFrequencies;
    selectedRange: NullableRentalRange;
    onSearch: (selectedRange: RentalRange) => void;
    breakPoint: number;
}>) => {
    const min = selectedRange.min ?? 0;
    const max = selectedRange.max ?? 0;

    const [state, setState] = React.useState({
        isShowDropdown: false,
        isSliding: false,
        isShowBottomPopup: false,
        query: {
            min,
            max,
        },
    });

    const { isShowDropdown, query, isSliding, isShowBottomPopup } = state;

    const { width } = useWindowResize();

    const buttonRef = React.createRef<HTMLDivElement>();

    React.useEffect(
        () =>
            setState((prev) => ({
                ...prev,
                query: {
                    min,
                    max,
                },
            })),
        [isShowDropdown]
    );

    const defaultRentalRange = {
        min: rentalFrequencies[0]?.[0] ?? 0,
        max: rentalFrequencies[rentalFrequencies.length - 1]?.[0] ?? 0,
    } as const;

    const isNotNaNOrUndefined = (value: number | undefined): value is number =>
        typeof value === 'number' && !Number.isNaN(value);

    const averageStepSize = () => {
        const rentals = rentalFrequencies.map(([rental]) => rental);
        const slideRentals = rentals.slice(1);
        return (
            slideRentals
                .map(
                    (rental, index) =>
                        rental -
                        parseAsNumber(rentals[index]).orElseThrowDefault(
                            `array at index of ${index}`
                        )
                )
                .reduce((prev, curr) => prev + curr, 0) / slideRentals.length
        );
    };

    const RentalSelection = (
        <>
            <BarChart
                rentalRangeFrequencies={rentalFrequencies}
                rentalSelectedRange={query}
                length={max}
            />
            <Slider
                stepSize={averageStepSize()}
                setSliding={(sliding) =>
                    setState((prev) => ({
                        ...prev,
                        isSliding: sliding,
                    }))
                }
                rentalSelectedRange={query}
                rentalOriginalRange={defaultRentalRange}
                onUpdate={([minRent, maxRent]) => {
                    if (
                        isSliding &&
                        isNotNaNOrUndefined(minRent) &&
                        isNotNaNOrUndefined(maxRent)
                    ) {
                        setState((prev) => ({
                            ...prev,
                            query: {
                                ...prev.query,
                                min: minRent,
                                max: maxRent,
                            },
                        }));
                    }
                }}
            />
            <Input
                rentalRange={query}
                onChangeListener={{
                    minPriceChange: ({ target: { value } }) => {
                        setState((prev) => ({
                            ...prev,
                            isSliding: false,
                            query: {
                                ...prev.query,
                                min:
                                    isPositiveFloat(value) ||
                                    isPositiveInt(value)
                                        ? parseFloat(value)
                                        : min,
                            },
                        }));
                    },
                    maxPriceChange: ({ target: { value } }) => {
                        setState((prev) => ({
                            ...prev,
                            isSliding: false,
                            query: {
                                ...prev.query,
                                max:
                                    isPositiveFloat(value) ||
                                    isPositiveInt(value)
                                        ? parseFloat(value)
                                        : max,
                            },
                        }));
                    },
                }}
            />
            <SearchAndResetButtons
                reset={
                    query.min !== defaultRentalRange.min ||
                    query.max !== defaultRentalRange.max
                }
                onReset={() =>
                    setState((prev) => ({
                        ...prev,
                        query: defaultRentalRange,
                    }))
                }
                onSearch={() => {
                    onSearch(query);
                    setState((prev) => ({
                        ...prev,
                        isShowDropdown: false,
                    }));
                }}
            />
        </>
    );

    return (
        <DropdownAndButtonContainer>
            <RentalButton
                isMouseClicked={isShowDropdown}
                ref={buttonRef}
                onClick={() => {
                    if (width <= breakPoint) {
                        setState((prev) => ({
                            ...prev,
                            isShowBottomPopup: !prev.isShowBottomPopup,
                        }));
                    } else {
                        setState((prev) => ({
                            ...prev,
                            isShowDropdown: !prev.isShowDropdown,
                        }));
                    }
                }}
            >
                Rental
            </RentalButton>
            {!isShowDropdown ? null : (
                <OutsideClickHandlerContainer
                    setFalse={(isShowDropdown) =>
                        setState((prev) => ({
                            ...prev,
                            isShowDropdown,
                        }))
                    }
                    buttonRef={buttonRef}
                >
                    <DropdownContainer align="left">
                        {RentalSelection}
                    </DropdownContainer>
                </OutsideClickHandlerContainer>
            )}
            <BorderBottomLessSlideFromBottom
                isShow={width <= breakPoint && isShowBottomPopup}
                onClosePopup={() =>
                    setState((prev) => ({
                        ...prev,
                        isShowBottomPopup: !prev.isShowBottomPopup,
                    }))
                }
                buttonRef={buttonRef}
                title="Rental Range"
            >
                {RentalSelection}
            </BorderBottomLessSlideFromBottom>
        </DropdownAndButtonContainer>
    );
};

const DropdownContainer = styled(Container)`
    width: 350px;
    > canvas {
        padding: 8px 0 0 0;
    }
    padding: 8px;
    max-height: calc(100vh - 200px);
    @media (max-width: 415px) {
        width: 250px;
    }
`;

const BorderBottomLessSlideFromBottom = styled(SlideFromBottom)`
    border-bottom: none;
`;

export default RentalRangeDropdown;
