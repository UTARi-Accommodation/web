import * as React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

type House = Readonly<{
    href: '/house';
    title: 'House';
}>;

type Room = Readonly<{
    href: '/room';
    title: 'Room';
}>;

type Apartment = Readonly<{
    href: '/apartment';
    title: 'Apartment';
}>;

type Roommate = Readonly<{
    href: '/roommate';
    title: 'Roommate';
}>;

export type NavLinkType = House | Room | Apartment | Roommate;

const NavLink = ({
    navLink: { href, title },
    close,
}: Readonly<{
    navLink: NavLinkType;
    close: () => void;
}>) => {
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

const NavLinks = ({
    fullScreen,
    close,
}: Readonly<{
    fullScreen: boolean;
    close: () => void;
}>) => {
    const Container = fullScreen ? NavMenu : CenterNav;

    return (
        <Container>
            {(
                [
                    { href: '/house', title: 'House' },
                    { href: '/room', title: 'Room' },
                    { href: '/apartment', title: 'Apartment' },
                    { href: '/roommate', title: 'Roommate' },
                ] as ReadonlyArray<NavLinkType>
            ).map((navLink, index) => (
                <NavLink close={close} key={index} navLink={navLink} />
            ))}
        </Container>
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
