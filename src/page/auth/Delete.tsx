import * as React from 'react';
import styled from 'styled-components';
import DeleteCard from '../../components/auth/delete/Delete';
import Title from '../../components/Title';

const Delete = () => (
    <Container>
        <Title
            title="Delete Account"
            content="Permanently delete your information from UTARi"
        />
        <AuthCardContainer>
            <DeleteCard />
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

export default Delete;
