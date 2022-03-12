import * as React from 'react';
import styled from 'styled-components';
import { FullScreenContainer } from '../../theme/GlobalTheme';
import Close from '../buttons/Close';

const Popup = ({
    closePopup,
    children,
    title,
}: Readonly<{
    closePopup: () => void;
    children: React.ReactNode;
    title: string;
}>) => (
    <Container
        onClick={({ currentTarget, target }) => {
            if (currentTarget === target) {
                closePopup();
            }
        }}
    >
        <Content>
            <Close noBorder={true} onClick={closePopup}>
                <Title>{title}</Title>
            </Close>
            {children}
        </Content>
    </Container>
);

const Container = styled(FullScreenContainer)`
    font-family: Montserrat, sans-serif;
    z-index: 5;
    align-items: center;
    justify-content: center;
    display: flex;
    box-shadow: #00000047 0px 8px 28px !important;
    background-color: ${({ theme }) => theme.popUpBackground};
`;

const Content = styled.div`
    margin: auto;
    width: auto;
    max-width: 90%;
    border-radius: 12px;
    background-color: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.border};
`;

const Title = styled.span`
    font-size: 1em;
    font-weight: bold;
    background-color: ${({ theme }) => theme.primaryColor};
`;

export default Popup;
