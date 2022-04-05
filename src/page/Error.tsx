import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../components/common/Title';
import { GlobalContainer } from '../theme/GlobalTheme';

const delay = 0.5;
const timeToCharge = 10 + delay;

const Error = () => {
    const navigate = useNavigate();

    const [state, setState] = React.useState({
        countDown: timeToCharge - delay,
    });

    const { countDown } = state;

    React.useEffect(() => {
        if (countDown === 0) {
            navigate('/');
        }
        setTimeout(
            () =>
                setState((prev) => ({
                    countDown: prev.countDown - 1,
                })),
            1000
        );
    }, [countDown]);

    return (
        <Container>
            <Title
                title="Page Not Found"
                content="You took the wrong turn and came here"
            />
            <ErrorContentContainer>
                <ErrorLeft>
                    <ErrorMessageTitle>Oops! You seems lost.</ErrorMessageTitle>
                    <ErrorMessageDescription>
                        Yeah, I am as confused as you are.
                    </ErrorMessageDescription>
                    <ErrorMessageDescription>
                        From what I&apos;ve seen, it appears that the page you
                        are looking for is now beyond my reach.
                    </ErrorMessageDescription>
                    <ErrorMessageDescription>
                        Luckily, unlike some other mistakes, this can be fixed.
                    </ErrorMessageDescription>
                    <ErrorMessageDescription>
                        So let&apos;s get you..
                    </ErrorMessageDescription>

                    <BackToHomeTimer>
                        Back to Home in: 00:00:
                        {countDown < 10 ? `0${countDown}` : countDown}
                    </BackToHomeTimer>
                    <BackToHomeAlternative>OR</BackToHomeAlternative>
                    <BackToHomeButton>
                        Go <Link to="/">Home</Link> Immediately
                    </BackToHomeButton>
                </ErrorLeft>
                <ErrorRight>
                    <ErrorMessageFourZeroFour>404</ErrorMessageFourZeroFour>
                </ErrorRight>
            </ErrorContentContainer>
        </Container>
    );
};

const Container = styled(GlobalContainer)`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ErrorContentContainer = styled.div`
    width: 85%;
    display: flex;
    justify-content: space-between;
    @media (max-width: 877px) {
        text-align: center;
        flex-direction: column-reverse;
        > div {
            margin: 10px 0 10px 0;
        }
    }
`;

const ErrorLeft = styled.div`
    flex: 0.5;
`;

const ErrorRight = styled.div`
    flex: 0.5;
    text-align: center;
`;

const ErrorMessageFourZeroFour = styled.h1`
    color: ${({ theme }) => theme.highEmphasesTextColor};
    font-size: 135px;
    @media (max-width: 877px) {
        font-size: 100px;
        margin: 0 !important;
    }
`;

const ErrorMessageTitle = styled.h2`
    color: ${({ theme }) => theme.highEmphasesTextColor};
    font-size: 40px;
    @media (max-width: 877px) {
        font-size: 30px;
    }
`;

const ErrorMessageDescription = styled.p`
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

const BackToHomeTimer = styled.div`
    padding: 15px 0 0 0;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const BackToHomeAlternative = styled.p`
    color: ${({ theme }) => theme.highEmphasesTextColor};
    padding: 0 0 0 110px;
    @media (max-width: 877px) {
        padding: 0 0 0 0;
    }
`;

const ChargeHomeButton = keyframes`
    0% {
        background-position: 100% 0%;
    }
    100% {
        background-position: 0% -100%;
    }
`;

const BackToHomeButton = styled.div`
    color: ${({ theme }) => theme.highEmphasesTextColor};
    > a {
        background-color: ${({ theme }) => theme.errorHomeButton} !important;
        background: linear-gradient(
                to left,
                ${({ theme }) => theme.primaryColor} 50%,
                ${({ theme }) => theme.errorHomeButton} 50%
            )
            right;
        background-size: 200%;
        display: inline-block;
        padding: 12px 16px;
        text-transform: uppercase;
        color: ${({ theme }) => theme.secondaryColor};
        text-decoration: none;
        font-weight: 600;
        animation: ${ChargeHomeButton} ease-in-out ${timeToCharge}s;
        -moz-animation: ${ChargeHomeButton} ease-in-out ${timeToCharge}s;
        -webkit-animation: ${ChargeHomeButton} ease-in-out ${timeToCharge}s;
        -o-animation: ${ChargeHomeButton} ease-in-out ${timeToCharge}s;
        -ms-animation: ${ChargeHomeButton} ease-in-out ${timeToCharge}s;

        &:hover {
            background-position: left !important;
            cursor: pointer;
        }
    }
`;

export default Error;
