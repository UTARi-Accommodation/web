import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface IncludeInFullScreenNavProps {
    readonly includeInFullScreenNav: boolean;
}

interface SignUpLoginProps extends IncludeInFullScreenNavProps {
    readonly close: undefined | (() => void);
}

const SignUpLogin = ({ includeInFullScreenNav, close }: SignUpLoginProps) => {
    const onClick = () => {
        if (close) {
            close();
        }
    };

    return (
        <Container>
            <InnerContainer includeInFullScreenNav={includeInFullScreenNav}>
                <Link onClick={onClick} to="/login">
                    <Login includeInFullScreenNav={includeInFullScreenNav}>
                        Login
                    </Login>
                </Link>
                <Link onClick={onClick} to="/signup">
                    <SignUp includeInFullScreenNav={includeInFullScreenNav}>
                        Sign Up
                    </SignUp>
                </Link>
            </InnerContainer>
        </Container>
    );
};

const Container = styled.div`
    display: grid;
    place-items: center;
    font-family: 'Montserrat', sans-serif !important;
`;

const InnerContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: ${({
        includeInFullScreenNav,
    }: IncludeInFullScreenNavProps) =>
        includeInFullScreenNav ? 'column' : 'row'};
    > a {
        text-decoration: none;
        &:focus {
            outline: none;
        }
    }
    width: ${({ includeInFullScreenNav }: IncludeInFullScreenNavProps) =>
        includeInFullScreenNav ? '80%' : '100%'};
    @media (max-width: 400px) {
        width: 90%;
    }
    @media (max-width: 350px) {
        width: 100%;
    }
`;

const AccountRelated = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: ${({ includeInFullScreenNav }: IncludeInFullScreenNavProps) =>
        includeInFullScreenNav ? '30px' : '0 10px 0 0'};
    font-size: 1em;
    text-transform: uppercase;
    padding: ${({ includeInFullScreenNav }: IncludeInFullScreenNavProps) =>
        includeInFullScreenNav ? '13px' : '6px 16px'};
    border-radius: ${({
        includeInFullScreenNav,
    }: IncludeInFullScreenNavProps) =>
        includeInFullScreenNav ? '25px' : '4px'};
    color: ${({ theme }) => theme.primaryColor};
`;

const SignUp = styled(AccountRelated)`
    background-color: ${({ theme }) => theme.signUpButton};
`;

const Login = styled(AccountRelated)`
    background-color: ${({ theme }) => theme.loginButton};
`;

export default SignUpLogin;
