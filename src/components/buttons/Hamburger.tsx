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
            <HamburgerIcon />
        </HamburgerButton>
    </HamburgerNav>
);

const HamburgerNav = styled.div`
    font-family: Montserrat, sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const HamburgerIcon = styled(GiHamburgerMenu)`
    font-size: 2.5em;
`;

const HamburgerButton = styled.div`
    background-color: transparent;
    border: none;
    padding: 0;
    color: ${({ theme }) => theme.secondaryColor};
`;

export default Hamburger;
