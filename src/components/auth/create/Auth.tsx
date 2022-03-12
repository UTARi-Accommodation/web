import * as React from 'react';
import styled, { css } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { BsGithub } from 'react-icons/bs';
import { google, github } from '../../../auth/user';
import MessageContainer from '../MessageContainer';
import { Button, ButtonContainer, Text } from '../Button';
import { Link } from 'react-router-dom';
import { ToastError, ToastInfo } from '../../toaser/Toaser';
import { Container, InnerContainer } from '../Components';

const AuthCard = () => (
    <Container>
        <InnerContainer>
            <MessageContainer title="Welcome">
                <>
                    By signing in you agree to our{' '}
                    <Link
                        to="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Privacy Policy
                    </Link>{' '}
                    and{' '}
                    <Link
                        to="/terms-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Terms of Service.
                    </Link>
                </>
            </MessageContainer>
            <ButtonContainer>
                <Button
                    onClick={async () => {
                        const response = await google.signIn();
                        switch (response.type) {
                            case 'failed':
                                return ToastError(response.error);
                            case 'succeed':
                                return ToastInfo(
                                    `Welcome ${
                                        response.isFirstTime ? '' : 'back'
                                    } ${response.name}`
                                );
                        }
                    }}
                >
                    <GoogleLogo />
                    <Text>Continue with Google</Text>
                </Button>
                <Button
                    onClick={async () => {
                        const response = await github.signIn();
                        switch (response.type) {
                            case 'failed':
                                return ToastError(response.error);
                            case 'succeed':
                                return ToastInfo(
                                    `Welcome ${
                                        response.isFirstTime ? '' : 'back'
                                    } ${response.name}`
                                );
                        }
                    }}
                >
                    <GithubLogo />
                    <Text>Continue with Github</Text>
                </Button>
            </ButtonContainer>
        </InnerContainer>
    </Container>
);

const LogoStyled = css`
    font-size: 2em !important;
    border-radius: 10px;
    margin: 1px;
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const GoogleLogo = styled(FcGoogle)`
    ${LogoStyled}
`;

const GithubLogo = styled(BsGithub)`
    > path {
        color: ${({ theme }) => theme.githubIcon} !important;
    }
    ${LogoStyled}
`;

export default AuthCard;
