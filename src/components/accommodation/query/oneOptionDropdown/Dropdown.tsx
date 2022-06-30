import * as React from 'react';
import styled from 'styled-components';
import {
    Button,
    Container,
    DropdownAndButtonContainer,
    InnerContainer,
} from '../../dropdown/Dropdown';
import OutsideClickHandlerContainer from '../../../common/OutsideClickHandlerContainer';
import { OptionLabel, OptionLinkLabel } from './Option';
import useWindowResize from '../../../../hook/windowResize';
import SlideFromBottom from '../../../popup/SlideFromBottom';

const OneOptionDropdown = <T extends string>({
    values,
    value,
    breakPoint,
    title,
    label,
}: Readonly<{
    values: ReadonlyArray<
        Readonly<{
            value: T;
            label: string;
        }>
    >;
    value: string;
    title: string;
    breakPoint: number;
    label: Readonly<
        | {
              type: 'Link';
              toLink: (value: T) => string;
              onClick?: () => void;
          }
        | {
              type: 'Search';
              onSearch: (value: T) => void;
          }
    >;
}>) => {
    const [state, setState] = React.useState({
        isShowDropdown: false,
        isShowBottomPopup: false,
    });

    const { isShowDropdown, isShowBottomPopup } = state;

    const { width } = useWindowResize();

    const buttonRef = React.createRef<HTMLDivElement>();

    const isCloseDropdown = () =>
        setState((prev) => ({
            ...prev,
            isShowDropdown: false,
        }));

    const DropdownContent = (
        <DropdownInnerContainer>
            {values.map(({ label: text, value }) => {
                switch (label.type) {
                    case 'Search':
                        return (
                            <OptionLabel
                                key={value}
                                isPad={true}
                                text={text}
                                onClick={() => {
                                    label.onSearch(value);
                                    isCloseDropdown();
                                }}
                            />
                        );

                    case 'Link':
                        return (
                            <OptionLinkLabel
                                key={value}
                                onClick={() => {
                                    const { onClick } = label;
                                    if (onClick) {
                                        onClick();
                                    }
                                    isCloseDropdown();
                                }}
                                text={text}
                                to={label.toLink(value)}
                            />
                        );
                }
            })}
        </DropdownInnerContainer>
    );

    return (
        <DropdownAndButtonContainer>
            <Button
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
                {value}
            </Button>
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
    width: 210px;
`;

const DropdownInnerContainer = styled(InnerContainer)`
    padding: 8px 16px;
    text-align: left;
`;

export default OneOptionDropdown;
