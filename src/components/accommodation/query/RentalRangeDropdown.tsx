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

    const roundToTwoDecimalPlaces = (value: number) =>
        Math.round(value * 100) / 100;

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

    const stepSize = () => {
        if (rentalFrequencies.length < 10) {
            return 1;
        }
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

    const onPriceChange = ({
        alternativePrice,
        type,
        value,
    }: Readonly<{
        alternativePrice: number;
        type: 'min' | 'max';
        value: string;
    }>) =>
        setState((prev) => ({
            ...prev,
            isSliding: false,
            query: {
                ...prev.query,
                [type]:
                    isPositiveFloat(value) || isPositiveInt(value)
                        ? parseFloat(value)
                        : alternativePrice,
            },
        }));

    const RentalSelection = (
        <>
            <BarChart
                rentalRangeFrequencies={rentalFrequencies}
                rentalSelectedRange={query}
                length={max}
            />
            <Slider
                stepSize={stepSize()}
                setSliding={(isSliding) =>
                    setState((prev) => ({
                        ...prev,
                        isSliding,
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
                    minPriceChange: ({ target: { value } }) =>
                        onPriceChange({
                            type: 'min',
                            alternativePrice: min,
                            value,
                        }),
                    maxPriceChange: ({ target: { value } }) =>
                        onPriceChange({
                            type: 'max',
                            alternativePrice: max,
                            value,
                        }),
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
                    onSearch({
                        ...query,
                        min: roundToTwoDecimalPlaces(query.min),
                        max: roundToTwoDecimalPlaces(query.max),
                    });
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
                    const name =
                        width > breakPoint
                            ? 'isShowDropdown'
                            : 'isShowBottomPopup';
                    setState((prev) => ({
                        ...prev,
                        [name]: !prev[name],
                    }));
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
