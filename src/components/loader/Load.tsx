import * as React from 'react';
import styled from 'styled-components';
import { GlobalContainer } from '../../theme/GlobalTheme';
import HashLoader from 'react-spinners/HashLoader';
import theme from '../../theme/colorTheme';

const LoaderContainer = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <Container>
        <InnerContainer>
            <LoadingMessage>Loading...</LoadingMessage>
            {children}
        </InnerContainer>
    </Container>
);

const HashLoadingIcon = () => (
    <HashLoader loading={true} size={100} color={theme.secondaryColor} />
);

const HashLoading = () => (
    <LoaderContainer>
        <HashLoadingIcon />
    </LoaderContainer>
);

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

export { HashLoading, HashLoadingIcon };
