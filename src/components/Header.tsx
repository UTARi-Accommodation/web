import * as React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import AuthIcon from './header/AuthIcon';
import NavLinks from './header/NavLinks';
import useWindowResize from '../hook/windowResize';
import SideNav from './sideNav/SideNav';
import BackToTop from './buttons/BackToTop';
import Hamburger from './buttons/Hamburger';

const Header = () => {
    const breakPoint = 635;

    const [state, setState] = React.useState({
        isShow: false,
        isScroll: false,
    });

    React.useEffect(() => {
        const handlePageOffset = () =>
            setState((prevState) => ({
                ...prevState,
                isScroll: window.pageYOffset > 500,
            }));
        window.addEventListener('scroll', handlePageOffset);
        return () => {
            window.removeEventListener('scroll', handlePageOffset);
        };
    }, []);

    const { width } = useWindowResize();

    const { isScroll, isShow } = state;

    const setShow = (isShow: boolean) =>
        setState((prevState) => ({
            ...prevState,
            isShow,
        }));

    return (
        <>
            <TopHeader>
                <TopOuterHeader>
                    <TopInnerHeader>
                        <LeftHeaderLinkContainer>
                            <HeaderLinkContainer>
                                <Logo />
                            </HeaderLinkContainer>
                        </LeftHeaderLinkContainer>
                        <HeaderLinkContainer>
                            {width > breakPoint ? <NavLinks /> : null}
                        </HeaderLinkContainer>
                        <RightHeaderLinkContainer>
                            <HeaderLinkContainer>
                                {width > breakPoint ? (
                                    <AuthIcon />
                                ) : (
                                    <Hamburger onClick={() => setShow(true)} />
                                )}
                            </HeaderLinkContainer>
                        </RightHeaderLinkContainer>
                    </TopInnerHeader>
                </TopOuterHeader>
            </TopHeader>
            {isShow ? (
                <SideNav onClose={() => setShow(false)} isSlideIn={isShow} />
            ) : null}
            <BackToTop isScroll={isScroll} />
        </>
    );
};

const TopHeader = styled.div`
    position: sticky;
    padding: 8px 0;
    top: 0;
    display: grid;
    place-items: center;
    z-index: 4;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.primaryColor};
`;

const TopOuterHeader = styled.div`
    width: 75%;
    display: grid;
    place-items: center;
    @media (max-width: 820px) {
        width: 85%;
    }
`;

const TopInnerHeader = styled.header`
    width: 100%;
    align-items: center;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`;

const HeaderLinkContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const LeftHeaderLinkContainer = styled.div`
    margin: 0 auto 0 0;
`;

const RightHeaderLinkContainer = styled.div`
    margin: 0 0 0 auto;
`;

export default Header;
