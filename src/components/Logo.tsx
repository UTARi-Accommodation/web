import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type LogoProps = Readonly<{
    margin?: string;
}>;

const Logo = ({ margin }: LogoProps) => (
    <TitleHeader margin={margin}>
        <Link to="/">UTARi</Link>
    </TitleHeader>
);

const NavLogo = () => <NavTitleHeader margin="0">UTARi</NavTitleHeader>;

const TitleHeader = styled.div`
    text-align: center;
    padding: 8px 16px;
    border-radius: 12px;
    font-weight: 300;
    font-size: 2em;
    font-family: Montserrat, sans-serif !important;
    background-color: ${({ theme }) => theme.logo};
    margin: ${({ margin }: LogoProps) => margin ?? '0'};
    > a {
        color: ${({ theme }) => theme.primaryColor};
        text-decoration: none;
    }
    @media (max-width: 764px) {
        padding: 6px 12px;
    }
    @media (max-width: 551px) {
        padding: 4px 8px;
    }
`;

const NavTitleHeader = styled(TitleHeader)`
    font-size: 1.25em;
    color: ${({ theme }) => theme.primaryColor};
`;

export { NavLogo };

export default Logo;
