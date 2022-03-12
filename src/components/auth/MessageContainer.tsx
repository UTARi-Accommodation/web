import * as React from 'react';
import styled from 'styled-components';

const MessageContainer = ({
    title,
    children,
}: Readonly<{
    title: 'Welcome' | 'Are you absolutely sure?';
    children: React.ReactNode;
}>) => (
    <Container>
        <Notes>
            <Title>
                <strong>{title}</strong>
            </Title>
        </Notes>
        <Notes>
            <Message>{children}</Message>
        </Notes>
    </Container>
);

const Message = styled.span`
    text-align: left;
    color: ${({ theme }) => theme.secondaryColor};
    > a {
        text-decoration: none;
        color: ${({ theme }) => theme.linkToPrivacyAndTerms};
    }
`;

const Title = styled(Message)`
    font-size: 1.35rem;
`;

const Notes = styled.div`
    padding: 1px;
    flex-wrap: wrap;
    margin: 0 0 8px 0;
`;

const Container = styled.div`
    width: 100%;
    margin: 0 0 24px 0;
`;

export default MessageContainer;
