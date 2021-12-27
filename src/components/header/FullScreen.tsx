import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { HashLoading, ErrorBoundary } from '../HashLoading';
import NavLinks from './NavLinks';
import SignUpLogin from './SignUpLogin';
const CloseFullScreen = React.lazy(() => import('./CloseFullScreen'));
const FullScreenContainer = React.lazy(() =>
    import('../../util/theme/GlobalTheme').then((module) => ({
        default: module.FullScreenContainer,
    }))
);

interface FullScreenAnimation {
    readonly slideIn: boolean;
}

interface FullScreenProps {
    readonly show: boolean;
    readonly close: () => void;
    readonly displaySignUpLogin: boolean;
}

const FullScreen = ({
    show,
    close,
    displaySignUpLogin,
}: FullScreenProps): JSX.Element | null => {
    const [state, setState] = React.useState({
        animate: show,
        load: show,
    });

    const SignUpLoginNav = () =>
        displaySignUpLogin ? (
            <SignUpLogin includeInFullScreenNav={true} close={close} />
        ) : null;

    React.useEffect(() => {
        setState(() => ({
            animate: show,
            load: show,
        }));
    }, [show]);

    const { animate, load } = state;

    if (load) {
        return (
            <ErrorBoundary>
                <React.Suspense fallback={<HashLoading />}>
                    <FullScreenNav slideIn={animate}>
                        <CloseFullScreen
                            close={() => {
                                setState((prevState) => ({
                                    ...prevState,
                                    animate: false,
                                }));
                                setTimeout(() => {
                                    close();
                                    setState((prevState) => ({
                                        ...prevState,
                                        load: false,
                                    }));
                                }, 450);
                            }}
                        />
                        <NavLinks fullScreen={true} close={close} />
                        <SignUpLoginNav />
                    </FullScreenNav>
                </React.Suspense>
            </ErrorBoundary>
        );
    }
    return null;
};

const FullScreenSlideIn = keyframes`
    0% {top: -100%;}
    100% {top: 0%;}
`;

const FullScreenSlideOut = keyframes`
    0% {top: 0%;}
    100% {top: -100%;}
`;

const FullScreenNav = styled(FullScreenContainer)`
    background-color: ${({ theme }) => theme.primaryColor};
    z-index: 3;
    animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -moz-animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -webkit-animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -o-animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -ms-animation: ${({ slideIn }: FullScreenAnimation) =>
            slideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    font-family: 'Montserrat', sans-serif !important;
    padding: 15px 0 15px 0;
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    @media (max-width: 518px) {
        grid-template-rows: 1fr 1fr;
    }
`;

export default FullScreen;
