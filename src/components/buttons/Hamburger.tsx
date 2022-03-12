import * as React from 'react';
import styled from 'styled-components';
import { GiHamburgerMenu } from 'react-icons/gi';

const Hamburger = ({
    onClick,
}: Readonly<{
    onClick: () => void;
}>) => (
    <HamburgerNav onClick={onClick}>
        <HamburgerButton>
            <GiHamburgerMenu />
        </HamburgerButton>
    </HamburgerNav>
);

const HamburgerNav = styled.div`
    font-family: Montserrat, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HamburgerButton = styled.button`
    background-color: transparent;
    font-size: 2em;
    border: none;
    padding: 0;
    color: ${({ theme }) => theme.secondaryColor};
`;

export default Hamburger;
