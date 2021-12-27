import * as React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

interface NavLinksProps {
    readonly fullScreen: boolean;
    readonly close: () => void;
}

type House = {
    readonly href: '/house';
    readonly title: 'House';
};

type Room = {
    readonly href: '/room';
    readonly title: 'Room';
};

type Apartment = {
    readonly href: '/apartment';
    readonly title: 'Apartment';
};

type Roommate = {
    readonly href: '/roommate';
    readonly title: 'Roommate';
};

type SignUp = {
    readonly href: '/signup';
    readonly title: 'Sign Up';
};

type Login = {
    readonly href: '/login';
    readonly title: 'Login';
};

export type NavLinkType = House | Room | Apartment | Roommate | SignUp | Login;

interface NavLinkProps {
    readonly navLink: NavLinkType;
    readonly close: () => void;
}

const NavLink = ({ navLink: { href, title }, close }: NavLinkProps) => {
    const CustomNavLink =
        useLocation().pathname === href ? NavLinkWrapperActive : NavLinkWrapper;
    return (
        <CustomNavLink>
            <Link onClick={close} to={href}>
                {title}
            </Link>
        </CustomNavLink>
    );
};

const NavLinks = ({ fullScreen, close }: NavLinksProps) => {
    const navLinks: ReadonlyArray<NavLinkType> = [
        { href: '/house', title: 'House' },
        { href: '/room', title: 'Room' },
        { href: '/apartment', title: 'Apartment' },
        { href: '/roommate', title: 'Roommate' },
    ];

    const NavLinksElem = (): JSX.Element => (
        <>
            {navLinks.map((navLink, index) => (
                <NavLink close={close} key={index} navLink={navLink} />
            ))}
        </>
    );

    return fullScreen ? (
        <NavMenu>
            <NavLinksElem />
        </NavMenu>
    ) : (
        <CenterNav>
            <NavLinksElem />
        </CenterNav>
    );
};

const NavLinkWrapperStyled = styled.div`
    font-family: 'Montserrat', sans-serif !important;
    margin: 0 10px 0 0;
    font-size: 1em;
    text-transform: uppercase;
    padding: 5px 10px;
    @media (max-width: 916px) {
        font-size: 1.5em;
    }
    @media (max-width: 400px) {
        font-size: 1em;
    }
    > a {
        text-decoration: none;
        transition: color 0.5s;
        &:focus {
            outline: none;
        }
        &:hover {
            color: ${({ theme }) => theme.secondaryColor} !important;
        }
    }
`;

const NavLinkWrapperActive = styled(NavLinkWrapperStyled)`
    > a {
        color: ${({ theme }) => theme.secondaryColor};
    }
`;

const NavLinkWrapper = styled(NavLinkWrapperStyled)`
    > a {
        color: gray;
    }
`;

const CenterNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const NavMenu = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    > div {
        font-size: 1.75em;
        margin: 10px;
    }
`;

export default NavLinks;
