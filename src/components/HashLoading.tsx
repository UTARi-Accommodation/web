import * as React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../util/theme/GlobalTheme';
import HashLoader from 'react-spinners/HashLoader';
import { primaryTheme } from '../util/theme/colorTheme';

const HashLoading = (): JSX.Element => (
    <Container>
        <InnerContainer>
            <LoadingMessage>Loading...</LoadingMessage>
            <HashLoader
                loading={true}
                size={100}
                color={primaryTheme.secondaryColor}
            />
        </InnerContainer>
    </Container>
);

type ErrorBoundaryState = Readonly<{
    hasError: boolean;
}>;

class ErrorBoundary extends React.Component<
    Readonly<{
        children: React.ReactNode;
    }>,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = {
        hasError: false,
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError = (): ErrorBoundaryState => ({
        hasError: true,
    });

    componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) =>
        console.error('Uncaught error: ', error, errorInfo);

    render = (): JSX.Element | React.ReactNode =>
        !this.state.hasError ? (
            this.props.children
        ) : (
            <Container>
                <InnerContainer>
                    <LoadingMessage>
                        Oops! Seems like there&apos;s a problem loading the
                        content
                    </LoadingMessage>
                    <LoadingMessage>Please try again</LoadingMessage>
                </InnerContainer>
            </Container>
        );
}

const Container = styled(GlobalContainer)`
    position: fixed;
    width: 100%;
    height: 100%;
    display: grid;
    place-items: center;
`;

const LoadingMessage = styled.p`
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 35px;
    margin: 0 0 50px 0 !important;
`;

const InnerContainer = styled.div`
    display: grid;
    place-items: center;
`;

export { ErrorBoundary, HashLoading };
