import * as React from 'react';
import styled from 'styled-components';

const CloseFullScreen = ({ close }: { readonly close: () => void }) => (
    <CloseButton onClick={() => close()}>&times;</CloseButton>
);

const CloseButton = styled.span`
    color: ${({ theme }) => theme.highEmphasesTextColor};
    margin: 10px 20px 10px 20px;
    font-size: 2em;
    font-weight: bold;
    position: absolute;
    top: 0;
    right: 0;
    transition: all ease 0.2s;
    &:hover {
        cursor: pointer;
        transition: 0.1s ease all;
    }
    &:active {
        transform: scale(1.35);
    }
    &:focus {
        outline: none;
    }
`;

export default CloseFullScreen;
