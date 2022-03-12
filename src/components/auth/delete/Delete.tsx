import * as React from 'react';
import styled from 'styled-components';
import { google, github, NonNullableUtariUser } from '../../../auth/user';
import { AppContext } from '../../../App';
import { Button, Text } from '../Button';
import { ToastError, ToastInfo } from '../../toaser/Toaser';
import MessageContainer from '../MessageContainer';
import { Link } from 'react-router-dom';
import { Container, InnerContainer } from '../Components';

const DeleteCard = () => {
    const { user } = React.useContext(AppContext);

    if (!user) {
        throw new Error(
            'This page can only be accessed after user has signed in or signed up'
        );
    }

    const deleteAccount = async (user: NonNullableUtariUser) => {
        const [providerData] = user.providerData;
        if (!providerData) {
            throw new Error(
                'It is impossible for providerData to be undefined'
            );
        }
        const provider = providerData.providerId.replace('.com', '');
        switch (provider) {
            case 'github': {
                const response = await github.delete(user);
                return response;
            }
            case 'google': {
                const response = await google.delete(user);
                return response;
            }
        }
    };

    return (
        <Container>
            <InnerContainer>
                <MessageContainer title="Are you absolutely sure?">
                    This action <strong>cannot</strong> be undone. This will
                    permanently delete all of your personal information.
                </MessageContainer>
                <DeleteButton
                    onClick={async () => {
                        const response = await deleteAccount(user);
                        if (!response) {
                            throw new Error(
                                'response from delete is undefiend'
                            );
                        }
                        switch (response.type) {
                            case 'failed':
                                return ToastError(response.error);
                            case 'succeed':
                                return ToastInfo(
                                    'Account successfully deleted'
                                );
                        }
                    }}
                >
                    <DeleteText>Delete Account</DeleteText>
                </DeleteButton>
                <HorizontalLine data-content="OR" />
                <UTARiButtonContainer>
                    <Link to="/" rel="nofollow noopener noreferrer">
                        <UTARiButton>
                            <DeleteText>Back to UTARi</DeleteText>
                        </UTARiButton>
                    </Link>
                </UTARiButtonContainer>
            </InnerContainer>
        </Container>
    );
};

const CommonButton = styled(Button)`
    grid-template-columns: none;
    width: 100%;
    box-sizing: border-box;
    transition: all 0.3s ease;
`;

const DeleteButton = styled(CommonButton)`
    border: 1px solid ${({ theme }) => theme.airBnbRed} !important;
    background-color: ${({ theme }) => theme.airBnbRed};
    background: linear-gradient(
            to right,
            ${({ theme }) => theme.airBnbRed} 50%,
            ${({ theme }) => theme.primaryColor} 50%
        )
        left;
    background-size: 250%;
    &:hover {
        color: ${({ theme }) => theme.airBnbRed} !important;
        background-color: ${({ theme }) => theme.airBnbRed};
        background-position: right;
        > div {
            color: ${({ theme }) => theme.airBnbRed} !important;
        }
    }
`;

const UTARiButtonContainer = styled.div`
    width: 100%;
    > a {
        text-decoration: none;
    }
`;

const UTARiButton = styled(CommonButton)`
    border: 1px solid ${({ theme }) => theme.logo} !important;
    background-color: ${({ theme }) => theme.logo};
    background: linear-gradient(
            to left,
            ${({ theme }) => theme.logo} 50%,
            ${({ theme }) => theme.primaryColor} 50%
        )
        right;
    background-size: 250%;
    &:hover {
        color: ${({ theme }) => theme.logo} !important;
        background-color: ${({ theme }) => theme.logo};
        background-position: left;
        > div {
            color: ${({ theme }) => theme.logo} !important;
        }
    }
`;

const DeleteText = styled(Text)`
    color: ${({ theme }) => theme.primaryColor};
`;

const HorizontalLine = styled.hr`
    position: relative;
    outline: 0;
    border: 0;
    color: black;
    text-align: center;
    &:before {
        content: '';
        background: ${({ theme }) => theme.secondaryColor};
        background: linear-gradient(
            to right,
            transparent,
            ${({ theme }) => theme.secondaryColor},
            transparent
        );
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 1px;
    }
    &:after {
        content: attr(data-content);
        position: relative;
        display: inline-block;
        padding: 0 0.5em;
        line-height: 1.5em;
        color: black;
        background-color: ${({ theme }) => theme.primaryColor};
    }
`;

export default DeleteCard;
