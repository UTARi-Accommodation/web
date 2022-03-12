import * as React from 'react';
import styled from 'styled-components';
import useWindowResize from '../../../../hook/windowResize';
import OutsideClickHandlerContainer from '../../../OutsideClickHandler';
import SlideFromBottom from '../../../popup/SlideFromBottom';
import {
    Button,
    Container,
    DropdownAndButtonContainer,
    InnerContainer,
} from '../../dropdown/Dropdown';
import SearchAndResetButtons from '../SearchAndResetButtons';
import CheckBoxes from './CheckBoxes';

const MultiSelectDropdown = <T extends number | string>({
    values,
    selectedValues,
    label,
    onSearch,
    breakPoint,
    title,
}: Readonly<{
    values: ReadonlyArray<T>;
    selectedValues: ReadonlyArray<T>;
    label: Readonly<
        | {
              type: 'unit';
              text: `${'Bed' | 'Bath'} Rooms`;
          }
        | {
              type: 'room';
              text: 'Room Capacities';
          }
        | {
              type: 'region';
              text: 'Region';
          }
    >;
    breakPoint: number;
    title: string;
    onSearch: (selectedValues: ReadonlyArray<T>) => void;
}>) => {
    const [state, setState] = React.useState({
        isShowDropdown: false,
        isShowBottomPopup: false,
        query: {
            selectedValues,
        },
    });

    const { isShowDropdown, isShowBottomPopup, query } = state;

    const { width } = useWindowResize();

    const buttonRef = React.createRef<HTMLDivElement>();

    React.useEffect(
        () =>
            setState((prev) => ({
                ...prev,
                query: {
                    ...prev.query,
                    selectedValues,
                },
            })),
        [isShowDropdown]
    );

    const DropdownContent = (
        <>
            <DropdownInnerContainer>
                <CheckBoxes
                    selectedValues={query.selectedValues}
                    values={values}
                    onClick={(selectedValues, value) => {
                        setState((prev) => {
                            const { query } = prev;
                            return {
                                ...prev,
                                query: {
                                    ...query,
                                    selectedValues: selectedValues.includes(
                                        value
                                    )
                                        ? selectedValues.filter(
                                              (selectedValue) =>
                                                  selectedValue !== value
                                          )
                                        : selectedValues.concat(value),
                                },
                            };
                        });
                    }}
                />
            </DropdownInnerContainer>
            <SearchAndResetButtons
                reset={Boolean(query.selectedValues.length)}
                onReset={() =>
                    setState((prev) => ({
                        ...prev,
                        query: {
                            ...prev.query,
                            selectedValues: [],
                        },
                    }))
                }
                onSearch={() => {
                    onSearch(query.selectedValues);
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
            <Button
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
                {label.text}
            </Button>
            {!isShowDropdown ? null : (
                <OutsideClickHandlerContainer
                    buttonRef={buttonRef}
                    setFalse={(isShowDropdown) =>
                        setState((prev) => ({
                            ...prev,
                            isShowDropdown,
                        }))
                    }
                >
                    <DropdownContainer align="left">
                        {DropdownContent}
                    </DropdownContainer>
                </OutsideClickHandlerContainer>
            )}
            <SlideFromBottom
                isShow={width <= breakPoint && isShowBottomPopup}
                onClosePopup={() =>
                    setState((prev) => ({
                        ...prev,
                        isShowBottomPopup: !prev.isShowBottomPopup,
                    }))
                }
                buttonRef={buttonRef}
                title={title}
            >
                {DropdownContent}
            </SlideFromBottom>
        </DropdownAndButtonContainer>
    );
};

const DropdownContainer = styled(Container)`
    width: 235px;
    min-width: fit-content;
    padding: 8px;
`;

const DropdownInnerContainer = styled(InnerContainer)`
    padding: 8px 16px;
    margin: -4px 0 -16px 0;
    text-align: left;
`;

export default MultiSelectDropdown;
