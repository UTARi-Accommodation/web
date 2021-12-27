import * as React from 'react';
import styled, { css } from 'styled-components';
import Title from '../components/Title';
import InputType, {
    ContactInput,
    getContactInput,
    ContactType,
    getContactType,
    recoveryAllValueValid,
} from '../util/account/validation';

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

type RecoveryState = {
    readonly contactInput: ContactInput;
    readonly contactType: ContactType;
};

const Recovery = () => {
    const [state, setState] = React.useState<RecoveryState>({
        contactInput: {
            value: '',
            error: '',
        },
        contactType: 'text',
    });

    const { contactInput, contactType } = state;

    const recovery = (event: React.FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (recoveryAllValueValid(contactInput, contactType)) {
            console.log('recovery');
        }
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

    return (
        <Container>
            <Title
                title="Account Recovery"
                content="This page allows user to recover their account in case they forgot their password or email/mobile number"
            />
            <FirstMessageParagraph>Account Recovery</FirstMessageParagraph>
            <FormDiv onSubmit={recovery}>
                <SecondMessageContainer>
                    <SecondLoginMessageParagraph>
                        Please enter an email or mobile number and a recovery
                        password will be sent to you
                    </SecondLoginMessageParagraph>
                </SecondMessageContainer>
                <Form>
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
                    <SubmitButtonContainer>
                        <SubmitButton />
                    </SubmitButtonContainer>
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
    @media (max-width: 586px) {
        font-size: 1.35em;
    }
`;

const SecondLoginMessageParagraph = styled(Message)`
    font-size: 1.1em;
    font-weight: bolder;
    @media (max-width: 586px) {
        font-size: 1em;
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
    color: ${({ theme }) => theme.secondaryColor};
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
    value: 'Recover',
})`
    font-family: 'Montserrat', serif;
    background-color: ${({ theme }) => theme.recoveryButton};
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
        background-color: ${({ theme }) => theme.recoverHover};
        cursor: pointer;
    }
    @media (max-width: 500px) {
        padding: 12px;
    }
    @media (max-width: 439px) {
        font-size: 0.9em !important;
    }
`;

export default Recovery;
