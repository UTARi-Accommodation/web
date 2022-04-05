import * as React from 'react';
import styled from 'styled-components';
import AuthCard from '../../components/auth/create/Auth';
import Title from '../../components/common/Title';

const Auth = () => (
    <Container>
        <Title
            title="Sign in | UTARi"
            content="Sign in or sign up to UTARi with Google or Github account"
        />
        <AuthCardContainer>
            <AuthCard />
        </AuthCardContainer>
    </Container>
);

const Container = styled.div`
    display: grid;
    place-items: center;
    height: 70vh;
    width: 100vw;
`;

const AuthCardContainer = styled.div`
    border-radius: 12px;
    border: 1px solid ${({ theme }) => theme.border};
`;

export default Auth;
