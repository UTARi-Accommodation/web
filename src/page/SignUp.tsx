import * as React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import Title from '../components/Title';
import InputType, {
    NameInput,
    ContactInput,
    PasswordInput,
    ConfirmPasswordInput,
    getNameInput,
    getContactInput,
    getPasswordInput,
    getConfirmPasswordInput,
    signUpAllValueValid,
    ContactType,
    getContactType,
} from '../util/account/validation';

import { FcGoogle, FcPhoneAndroid } from 'react-icons/fc';

interface InputProps {
    readonly inputType: InputType;
    readonly onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface InputLabelProps {
    readonly float: boolean;
}

const Input = ({
    inputType: { type, name, value, placeHolder, error },
    onChange,
}: InputProps) => (
    <>
        <ErrorMessageContainer>
            <ErrorMessage>{error}</ErrorMessage>
        </ErrorMessageContainer>
        <InputDiv>
            <InputField
                type={type}
                name={name}
                value={value}
                required
                onChange={(event) => onChange(event)}
            />
            <InputLabel float={!!value}>{placeHolder}</InputLabel>
        </InputDiv>
    </>
);

const SocialMediaSignUp = () => {
    return (
        <SocialsContainer>
            <SocialContainer>
                <GoogleLogo />
                <LogoText>Sign up with Google</LogoText>
            </SocialContainer>
            <SocialContainer>
                <PhoneLogo />
                <LogoText>Sign up with Phone</LogoText>
            </SocialContainer>
        </SocialsContainer>
    );
};

const SignUp = () => {
    const [state, setState] = React.useState<{
        readonly nameInput: NameInput;
        readonly contactInput: ContactInput;
        readonly contactType: ContactType;
        readonly passwordInput: PasswordInput;
        readonly confirmPasswordInput: ConfirmPasswordInput;
        readonly confirmPasswordInitialEmpty: boolean;
    }>({
        nameInput: {
            value: '',
            error: '',
        },
        contactInput: {
            value: '',
            error: '',
        },
        passwordInput: {
            value: '',
            error: '',
        },
        confirmPasswordInput: {
            value: '',
            error: '',
        },
        contactType: 'text',
        confirmPasswordInitialEmpty: true,
    });

    const {
        confirmPasswordInitialEmpty,
        confirmPasswordInput,
        contactType,
        contactInput,
        nameInput,
        passwordInput,
    } = state;

    const signUp = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (
            signUpAllValueValid(
                nameInput,
                contactInput,
                passwordInput,
                confirmPasswordInput,
                contactType
            )
        ) {
            console.log('sign up');
        }
    };

    const setNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            nameInput: getNameInput(event.target.value),
        }));
    };

    const setContactInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const type = getContactType(event.target.value);
        setState((prevState) => ({
            ...prevState,
            contactInput: getContactInput({
                contact: event.target.value,
                type,
            }),
            contactType: type,
        }));
    };

    const setPasswordInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({
            ...prevState,
            passwordInput: getPasswordInput(event.target.value),
        }));
        if (!confirmPasswordInitialEmpty) {
            setState((prevState) => {
                const {
                    passwordInput: { value: password },
                    confirmPasswordInput: { value: confirmPassword },
                } = prevState;
                return {
                    ...prevState,
                    confirmPasswordInput: getConfirmPasswordInput({
                        password,
                        confirmPassword,
                    }),
                };
            });
        }
    };

    const setConfirmPasswordInput = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setState((prevState) => {
            const {
                passwordInput: { value },
            } = prevState;
            return {
                ...prevState,
                confirmPasswordInput: getConfirmPasswordInput({
                    password: value,
                    confirmPassword: event.target.value,
                }),
            };
        });
        if (confirmPasswordInitialEmpty) {
            setState((prevState) => ({
                ...prevState,
                confirmPasswordInitialEmpty: false,
            }));
        }
    };

    return (
        <Container>
            <Title
                title="Sign Up"
                content="This page allows user to create an account for themselves, whether to search or list properties"
            />
            <FirstMessageParagraph>
                Glad you came to UTARi!
            </FirstMessageParagraph>
            <FormDiv onSubmit={signUp}>
                <SecondMessageContainer>
                    <SecondSignUpMessageParagraph>
                        Create a new account
                    </SecondSignUpMessageParagraph>
                </SecondMessageContainer>
                <Form>
                    <Input
                        onChange={setNameInput}
                        inputType={{
                            type: 'text',
                            name: 'name',
                            value: nameInput.value,
                            error: nameInput.error,
                            placeHolder: 'Username',
                        }}
                    />
                    <Input
                        onChange={setContactInput}
                        inputType={{
                            type: contactType,
                            name: 'emailOrMobileNumber',
                            value: contactInput.value,
                            error: contactInput.error,
                            placeHolder: 'Email or Mobile number',
                        }}
                    />
                    <Input
                        onChange={setPasswordInput}
                        inputType={{
                            type: 'password',
                            name: 'password',
                            value: passwordInput.value,
                            error: passwordInput.error,
                            placeHolder: 'Password',
                        }}
                    />
                    <Input
                        onChange={setConfirmPasswordInput}
                        inputType={{
                            type: 'password',
                            name: 'confirmPassword',
                            value: confirmPasswordInput.value,
                            error: confirmPasswordInput.error,
                            placeHolder: 'Confirm Password',
                        }}
                    />
                    <NextStepContainer>
                        <AlternativeStepContainer>
                            <Link to="/login">Already have an account?</Link>
                        </AlternativeStepContainer>
                    </NextStepContainer>
                    <SubmitButtonContainer>
                        <SubmitButton />
                    </SubmitButtonContainer>
                    <HorizontalLine data-content="OR" />
                    <SocialMediaSignUp />
                </Form>
            </FormDiv>
        </Container>
    );
};

const Container = styled.main`
    font-family: 'Montserrat', serif;
    display: grid;
    place-items: center;
`;

const SecondMessageContainer = styled.div`
    padding: 1px;
    margin: 0 auto;
    background: ${({ theme }) => theme.primaryColor};
`;

const Message = styled.p`
    text-align: center;
    color: ${({ theme }) => theme.secondaryColor};
`;

const FirstMessageParagraph = styled(Message)`
    font-size: 2em;
    @media (max-width: 973px) {
        font-size: 1.75em;
    }
    @media (max-width: 847px) {
        font-size: 1.5em;
    }
`;

const SecondSignUpMessageParagraph = styled(Message)`
    font-size: 1.5em;
    font-weight: bolder;
    @media (max-width: 973px) {
        font-size: 1.25em;
    }
`;

const InputField = styled.input`
    font-family: 'Montserrat', serif;
    border-radius: 25px;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    padding: 15px;
    border: 1px solid ${({ theme }) => theme.signUpInputBorder};
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.secondaryColor};
    outline: none;
    font-size: 1em;
    margin: 0 0 20px 0;
    &:hover {
        outline: none;
    }
    &:focus {
        outline: 1px solid ${({ theme }) => theme.secondaryColor};
        color: ${({ theme }) => theme.secondaryColor};
        ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: ${({ theme }) => theme.secondaryColor};
            opacity: 1; /* Firefox */
        }
        ::-ms-input-placeholder {
            /* Microsoft Edge */
            color: ${({ theme }) => theme.secondaryColor};
        }
    }
    @media (max-width: 463px) {
        padding: 10px;
    }
`;

const InputLabelFloatEffect = css`
    top: -15px;
    left: 15px;
    font-size: small;
    color: ${({ theme }) => theme.floatingLabel};
    background-color: ${({ theme }) => theme.primaryColor};
    padding: 0 5px 0 5px;
`;

const InputLabel = styled.label`
    color: ${({ theme }) => theme.placeHolder};
    position: absolute;
    pointer-events: none;
    left: 15px;
    top: 15px;
    transition: 0.2s;
    font-size: 1em;
    border-radius: 5px;
    ${({ float }: InputLabelProps) => (float ? InputLabelFloatEffect : '')}
    @media (max-width: 463px) {
        top: 10px;
    }
`;

const FormDiv = styled.div`
    padding: 20px;
    max-width: 600px;
    width: 55vw;
    background-color: ${({ theme }) => theme.primaryColor};
    box-shadow: 0 -1px 8px ${({ theme }) => theme.accountFormBoxShadow},
        0 8px 16px ${({ theme }) => theme.accountFormBoxShadow};
    border-radius: 10px;
    display: grid;
    place-items: center;
    @media (max-width: 800px) {
        width: 80%;
    }
    @media (max-width: 753px) {
        width: 85%;
    }
    @media (max-width: 477px) {
        box-shadow: none;
        border-radius: 0;
        width: 90%;
    }
`;

const Form = styled.form.attrs({
    method: 'POST',
})`
    width: 100%;
    @media (max-width: 463px) {
        margin: -7px;
    }
`;

const ErrorMessageContainer = styled.div`
    position: relative;
    margin: 0 0 20px 0;
`;

const ErrorMessage = styled.span`
    color: ${({ theme }) => theme.friendlyErrorColor};
    font-size: 14px;
`;

const InputDiv = styled.div`
    position: relative;
    @media (max-width: 491px) {
        margin: 20px 5px 20px 5px;
    }
    ${InputField}:focus ~ ${InputLabel},
    ${InputField}:valid ~ ${InputLabel} {
        ${InputLabelFloatEffect}
    }
`;

const SubmitButtonContainer = styled.div`
    text-align: center;
    margin: 20px 0 20px 0;
`;

const SubmitButton = styled.input.attrs({
    type: 'submit',
    value: 'Sign Up',
})`
    font-family: 'Montserrat', serif;
    background-color: ${({ theme }) => theme.signUpButton};
    color: ${({ theme }) => theme.primaryColor};
    border-color: transparent;
    font-size: 1em;
    font-weight: bolder;
    text-transform: uppercase;
    border-radius: 4px;
    transition: all 0.25s ease;
    border-radius: 25px;
    padding: 15px;
    outline: none;
    width: 100%;
    &:hover {
        background-color: ${({ theme }) => theme.signUpHover};
        cursor: pointer;
    }
    @media (max-width: 500px) {
        padding: 12px;
    }
    @media (max-width: 439px) {
        font-size: 0.9em !important;
    }
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

const SocialsContainer = styled.div`
    display: grid;
    place-items: center;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
    margin: 20px 0 20px 0;
    @media (max-width: 1047px) {
        grid-template-columns: 1fr;
    }
`;

const SocialContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 9fr;
    align-items: center;
    width: 100%;
    max-width: 273px;
    background-color: ${({ theme }) => theme.primaryColor};
    box-shadow: 0 -1px 8px ${({ theme }) => theme.accountFormBoxShadow},
        0 8px 16px ${({ theme }) => theme.accountFormBoxShadow};
    border-radius: 25px;
    padding: 4px 7px 4px 7px;
    &:hover {
        cursor: pointer;
    }
    &:active {
        transform: scale(1.02);
        transition: 0.1s ease all;
    }
`;

const LogoStyled = css`
    font-size: 2.5em !important;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.primaryColor};
    @media (max-width: 366px) {
        font-size: 2.2em !important;
    }
    margin: 2px;
`;

const GoogleLogo = styled(FcGoogle)`
    ${LogoStyled}
`;

const PhoneLogo = styled(FcPhoneAndroid)`
    ${LogoStyled}
`;

const LogoText = styled.div`
    text-align: center;
    vertical-align: middle;
    color: ${({ theme }) => theme.secondaryColor};
    @media (max-width: 420px) {
        font-size: 0.9em;
    }
`;

const NextStepContainer = styled.div`
    margin: 0 10px 0 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    @media (max-width: 439px) {
        font-size: 0.9em !important;
    }
`;

const AlternativeStepContainer = styled.div`
    display: grid;
    place-items: center;
    > a {
        text-decoration: none;
        color: ${({ theme }) => theme.secondaryColor};
        @media (max-width: 586px) {
            font-size: 1em;
        }
        font-weight: bolder;
    }
`;

export default SignUp;
