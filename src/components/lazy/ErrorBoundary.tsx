import * as React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../../theme/GlobalTheme';

type ErrorBoundaryState = Readonly<{
    hasError: boolean;
    error: Error | undefined;
}>;

class ErrorBoundary extends React.Component<
    Readonly<{
        children: React.ReactNode;
    }>,
    ErrorBoundaryState
> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: undefined,
    };

    static getDerivedStateFromError = (): ErrorBoundaryState => ({
        hasError: true,
        error: undefined,
    });

    componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
        this.setState(() => ({
            error,
        }));
        console.error('Uncaught error: ', error, errorInfo);
    };

    render = () =>
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
                    <LoadingMessage>{this.state.error}</LoadingMessage>
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

export default ErrorBoundary;
