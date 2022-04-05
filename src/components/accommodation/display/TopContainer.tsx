import * as React from 'react';
import styled from 'styled-components';
import Logo from '../../common/Logo';
import SearchBar from '../query/SearchBar';
import AuthIcon from '../../header/AuthIcon';
import useWindowResize from '../../../hook/windowResize';
import SideBarNav from '../../sideNav/SideNav';
import Hamburger from '../../buttons/Hamburger';
import ToggleTheme from '../../toggle/Theme';

const TopContainer = ({
    prompt,
    search,
    onSearch,
}: Readonly<{
    prompt: 'Units' | 'Rooms';
    search: string | undefined;
    onSearch: (search: string) => void;
}>) => {
    const breakPoint = 541;
    const { width } = useWindowResize();

    const [state, setState] = React.useState({
        isShowSideNav: false,
        isSlideInSideNav: false,
    });

    const { isShowSideNav } = state;

    const setShowSideNav = (isShowSideNav: boolean) =>
        setState((prev) => ({
            ...prev,
            isShowSideNav,
        }));

    return (
        <Container>
            {isShowSideNav ? (
                <SideBarNav
                    onClose={() => setShowSideNav(false)}
                    isSlideIn={isShowSideNav}
                />
            ) : null}
            {breakPoint <= width ? (
                <InnerContainer>
                    <Logo margin="0" />
                </InnerContainer>
            ) : null}
            <InnerContainer>
                <SearchBar
                    prompt={prompt}
                    value={search ?? ''}
                    onSearch={onSearch}
                />
            </InnerContainer>
            <InnerContainer>
                {width > breakPoint ? (
                    <>
                        <ToggleTheme />
                        <AuthIcon />
                    </>
                ) : (
                    <Hamburger onClick={() => setShowSideNav(true)} />
                )}
            </InnerContainer>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const InnerContainer = styled.div`
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default TopContainer;
