import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { HashLoading, ErrorBoundary } from './HashLoading';
import { FaArrowUp } from 'react-icons/fa';
import FullScreen from './header/FullScreen';
import SignUpLogin from './header/SignUpLogin';

const NavLinks = React.lazy(() => import('./header/NavLinks'));

interface BackToTopAnimation {
    readonly slideIn: boolean;
}

interface BackToTopProps {
    readonly scroll: boolean;
}

const BackToTop = ({ scroll }: BackToTopProps) => {
    const [state, setState] = React.useState({
        animate: scroll,
        load: scroll,
    });

    React.useEffect(() => {
        setState((prevState) => ({
            ...prevState,
            animate: scroll,
        }));
        setTimeout(
            () =>
                setState((prevState) => ({
                    ...prevState,
                    load: scroll,
                })),
            scroll ? 0 : 350
        );
    }, [scroll]);

    const { animate, load } = state;

    if (load) {
        return (
            <BackToTopContainer>
                <ArrowUpContainer
                    slideIn={animate}
                    onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                    }
                >
                    <ArrowUp />
                </ArrowUpContainer>
            </BackToTopContainer>
        );
    }
    return null;
};

const Header = () => {
    const firstBreakPoint = 916,
        secondBreakPoint = 518;

    const [state, setState] = React.useState({
        show: false,
        scroll: false,
        width: window.innerWidth,
    });

    React.useEffect(() => {
        const handlePageOffset = () =>
            setState((prevState) => ({
                ...prevState,
                scroll: window.pageYOffset > 500,
            }));
        window.addEventListener('scroll', handlePageOffset);
        return () => {
            window.removeEventListener('scroll', handlePageOffset);
        };
    }, []);

    React.useEffect(() => {
        const handleResizeWindow = () =>
            setState((prevState) => ({
                ...prevState,
                width: window.innerWidth,
            }));
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    const { scroll, show, width } = state;

    const setShow = (show: boolean) => {
        setState((prevState) => ({
            ...prevState,
            show,
        }));
    };

    const NavLinksNavigation = () =>
        width > firstBreakPoint ? (
            <NavLinks fullScreen={false} close={() => setShow(false)} />
        ) : null;

    const HamburgerNavigation = () => {
        if (width <= secondBreakPoint) {
            return null;
        } else if (width <= firstBreakPoint) {
            return (
                <HamburgerNav onClick={() => setShow(true)}>
                    <HamburgerButton>☰</HamburgerButton>
                </HamburgerNav>
            );
        }
        return null;
    };

    const RightHamburgerNavigation = () =>
        width > secondBreakPoint ? null : (
            <HamburgerNav onClick={() => setShow(true)}>
                <HamburgerButton>☰</HamburgerButton>
            </HamburgerNav>
        );

    const SignUpLoginNavigation = () =>
        width <= secondBreakPoint ? null : (
            <SignUpLogin includeInFullScreenNav={false} close={undefined} />
        );

    return (
        <>
            <ErrorBoundary>
                <React.Suspense fallback={<HashLoading />}>
                    <TopHeader>
                        <HeaderLinkContainer>
                            <TitleHeader>
                                <Link to="/">UTARi</Link>
                            </TitleHeader>
                            <NavLinksNavigation />
                            <HamburgerNavigation />
                        </HeaderLinkContainer>
                        <HeaderLinkContainer>
                            <RightHamburgerNavigation />
                            <SignUpLoginNavigation />
                        </HeaderLinkContainer>
                    </TopHeader>
                    <FullScreen
                        show={show}
                        close={() => setShow(false)}
                        displaySignUpLogin={width <= secondBreakPoint}
                    />
                </React.Suspense>
            </ErrorBoundary>
            <BackToTop scroll={scroll} />
        </>
    );
};

const TitleHeader = styled.h1`
    text-align: center;
    background-color: ${({ theme }) => theme.title};
    margin: 0 25px 0 0;
    padding: 6px 16px;
    border-radius: 20px;
    font-family: 'Montserrat', sans-serif !important;
    > a {
        color: ${({ theme }) => theme.primaryColor};
        text-decoration: none;
    }
`;

const TopHeader = styled.header`
    padding: 10px 50px 10px 50px;
    border-bottom: 1px solid lightgray;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.primaryColor};
    z-index: 2;
`;

const HeaderLinkContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`;

const BackToTopContainer = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
`;

const HamburgerNav = styled.div`
    font-family: 'Montserrat', sans-serif !important;
    justify-content: center;
    display: flex;
    align-items: center;
`;

const HamburgerButton = styled.button`
    background-color: transparent;
    font-size: 2em;
    color: ${({ theme }) => theme.secondaryColor};
    border: none;
    margin: -6px 0 0 0;
`;

const FadeOut = keyframes`
    0% {
        opacity:1;
        transform: scale(1);
    }
    100% {
        opacity:0;
        transform: scale(0.9);
    }
`;

const FadeIn = keyframes`
    0% {
        opacity:0;
        transform: scale(0.9);
    }
    100% {
        opacity:1;
        transform: scale(1);
    }
`;

const ArrowUpContainer = styled.div`
    border-radius: 50%;
    background-color: ${({ theme }) => theme.secondaryColor};
    padding: 15px;
    margin: 10px;
    animation: ${({ slideIn: show }: BackToTopAnimation) =>
            show ? FadeIn : FadeOut}
        ease 0.5s;
    -moz-animation: ${({ slideIn: show }: BackToTopAnimation) =>
            show ? FadeIn : FadeOut}
        ease 0.5s;
    -webkit-animation: ${({ slideIn: show }: BackToTopAnimation) =>
            show ? FadeIn : FadeOut}
        ease 0.5s;
    -o-animation: ${({ slideIn: show }: BackToTopAnimation) =>
            show ? FadeIn : FadeOut}
        ease 0.5s;
    -ms-animation: ${({ slideIn: show }: BackToTopAnimation) =>
            show ? FadeIn : FadeOut}
        ease 0.5s;
    &:hover {
        cursor: pointer;
        transition: 0.1s ease all;
    }
    &:active {
        transform: scale(1.25);
    }
    &:focus {
        outline: none;
    }
`;

const ArrowUp = styled(FaArrowUp)`
    font-size: 1.5em !important;
    color: ${({ theme }) => theme.primaryColor} !important;
`;

export default Header;
