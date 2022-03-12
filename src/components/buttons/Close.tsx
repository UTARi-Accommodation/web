import * as React from 'react';
import { IoClose } from 'react-icons/io5';
import styled from 'styled-components';

const CloseButtonContainer = ({
    onClick,
    children,
    noBorder,
}: Readonly<{
    onClick: () => void;
    children?: React.ReactNode;
    noBorder: boolean;
}>) => (
    <Container noBorder={noBorder}>
        <InvisibleIcon />
        {children}
        <CloseIcon onClick={onClick} />
    </Container>
);

const Container = styled.div`
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background-color: ${({ theme }) => theme.primaryColor};
    border: ${({ noBorder }: Readonly<{ noBorder: boolean }>) =>
        noBorder
            ? 'none'
            : ({ theme }) => `1px solid ${theme.border} !important`};
    border-bottom: 1px solid ${({ theme }) => theme.border};
`;

const CloseIcon = styled(IoClose)`
    padding: 4px;
    font-size: 1.5em;
    &:hover {
        border-radius: 50%;
        background: ${({ theme }) => theme.authClosePopup};
    }
`;

const InvisibleIcon = styled(IoClose)`
    visibility: hidden !important;
    padding: 4px;
    font-size: 1.5em;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently supported by Chrome, Edge, Opera and Firefox */
`;

export default CloseButtonContainer;
