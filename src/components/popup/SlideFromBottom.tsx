import * as React from 'react';
import styled from 'styled-components';
import Close from '../buttons/Close';
import OutsideClickHandlerContainer from '../common/OutsideClickHandlerContainer';

const SlideFromBottom = ({
    children,
    onClosePopup,
    buttonRef,
    isShow,
    noBorder,
    title,
}: Readonly<{
    children: React.ReactNode;
    onClosePopup: () => void;
    isShow: boolean;
    buttonRef?: React.RefObject<HTMLDivElement>;
    noBorder?: boolean;
    title: string;
}>) =>
    !isShow ? null : (
        <OutsideClickHandlerContainer
            setFalse={() => onClosePopup()}
            buttonRef={buttonRef}
        >
            <SlideInContainer>
                <Close onClick={onClosePopup} noBorder={noBorder ?? false}>
                    <Title>{title}</Title>
                </Close>
                {children}
            </SlideInContainer>
        </OutsideClickHandlerContainer>
    );

const Title = styled.span`
    font-size: 1em;
    font-weight: bold;
    background-color: ${({ theme }) => theme.primaryColor};
`;

const SlideInContainer = styled.div`
    bottom: 0;
    left: 0;
    width: 100vw;
    position: fixed;
    z-index: 1;
    grid-template-rows: 1fr 9fr;
    background-color: ${({ theme }) => theme.primaryColor};
`;

export default SlideFromBottom;
