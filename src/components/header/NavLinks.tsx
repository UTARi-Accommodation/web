import * as React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import useWindowResize from '../../hook/windowResize';

type BookmarkedUnit = Readonly<{
    href: '/bookmarked-units';
    title: 'Bookmarked Units';
}>;

type BookmarkedRoom = Readonly<{
    href: '/bookmarked-rooms';
    title: 'Bookmarked Rooms';
}>;

type DetailedRoom = Readonly<{
    href: '/detailed-room';
    title: 'Detailed Room';
}>;

type DetailedUnit = Readonly<{
    href: '/detailed-unit';
    title: 'Detailed Unit';
}>;

type Houses = Readonly<{
    href: '/houses';
    title: 'House';
}>;

type Rooms = Readonly<{
    href: '/rooms';
    title: 'Room';
}>;

type Condominiums = Readonly<{
    href: '/condominiums';
    title: 'Condominium';
}>;

type Roommates = Readonly<{
    href: '/roommates';
    title: 'Find Roommate';
}>;

type About = Readonly<{
    href: '/about';
    title: 'About';
}>;

type Contact = Readonly<{
    href: '/contact';
    title: 'Contact';
}>;

type Home = Readonly<{
    href: '/';
    title: 'Home';
}>;

type Auth = Readonly<{
    href: '/auth';
    title: 'Sign In';
}>;

type NavLinkType =
    | Houses
    | Rooms
    | Condominiums
    | Roommates
    | BookmarkedRoom
    | BookmarkedUnit
    | DetailedUnit
    | DetailedRoom
    | About
    | Contact
    | Home
    | Auth;

const NavLink = ({
    navLink: { href, title },
}: Readonly<{
    navLink: NavLinkType;
}>) => {
    const CustomNavLink =
        useLocation().pathname === href
            ? NavLinkContainerActive
            : NavLinkContainer;
    return (
        <CustomNavLink>
            <Link to={href}>{title}</Link>
        </CustomNavLink>
    );
};

const NavLinks = () => {
    const { width } = useWindowResize();

    const breakPoint = 635;

    const links = [
        { href: '/', title: 'Home' },
        { href: '/about', title: 'About' },
        { href: '/contact', title: 'Contact' },
        width <= breakPoint ? { href: '/auth', title: 'Sign In' } : undefined,
    ].filter(Boolean) as ReadonlyArray<NavLinkType>;

    return (
        <CenterNav>
            {links.map((navLink) => (
                <NavLink key={navLink.href} navLink={navLink} />
            ))}
        </CenterNav>
    );
};

const NavLinkContainerStyled = styled.div`
    font-family: Montserrat, sans-serif !important;
    font-size: 1em;
    padding: 8px 16px;
    @media (max-width: 635px) {
        font-size: 1em;
    }
    > a {
        text-decoration: none;
        transition: color 0.5s;
        font-weight: 400;
        &:focus {
            outline: none;
        }
        &:hover {
            color: ${({ theme }) => theme.secondaryColor} !important;
        }
    }
`;

const NavLinkContainerActive = styled(NavLinkContainerStyled)`
    > a {
        font-weight: 500;
        color: ${({ theme }) => theme.secondaryColor};
    }
`;

const NavLinkContainer = styled(NavLinkContainerStyled)`
    > a {
        color: gray;
    }
`;

const CenterNav = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default NavLinks;
export type { NavLinkType };
