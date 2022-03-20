import { GranulaString } from 'granula-string';
import * as React from 'react';
import styled from 'styled-components';
import {
    allValueValid,
    Data,
    Email,
    getEmail,
    getMessage,
    getName,
    Message,
    Name,
} from 'utari-common';
import HorizontalLine from '../components/accommodation/display/HorizontalLine';
import contactAPI from '../url/mutation/contact';
import { ToastError, ToastPromise } from '../components/toaser/Toaser';
import Title from '../components/Title';
import utariAxios from '../config/axios';
import Input from '../components/input/Input';
import parseAsData from '../parser/contact';

const Contact = () => {
    const [state, setState] = React.useState({
        name: {
            value: GranulaString.createFromString(''),
            error: '',
        } as Name,
        email: {
            value: GranulaString.createFromString(''),
            error: '',
        } as Email,
        message: {
            value: GranulaString.createFromString(''),
            error: '',
        } as Message,
    });

    const { email, message, name } = state;

    const notifyError = () =>
        ToastError(
            `I am sorry to inform you that there's an error in sending email.
          \nPlease write an email to poolofdeath201@outlook.com through your email service provider. Thank you`
        );

    const showMessage = (data: Data) => {
        const { type } = data;
        switch (type) {
            case 'input':
            case 'succeed':
                setState((prev) => ({
                    ...prev,
                    ...data,
                }));
                break;
            case 'failed':
                notifyError();
                break;
        }
    };

    return (
        <Container>
            <Title
                title="Contact"
                content="Contact page of UTARi for inquiry or just contact"
            />
            <TitleContainer>Contact Us</TitleContainer>
            <ContactContentContainer>
                Bonjour! Got something on your mind?
            </ContactContentContainer>
            <ContactContentContainer>
                Feel free to reach out or do it in the old fashion way
            </ContactContentContainer>
            <ContentContainer>
                <InnerContentsContainer>
                    <InnerContentContainer>
                        <ContactMethodContainer>
                            <ContactMethodTitle>Snail Mail</ContactMethodTitle>
                            <ContactMethodContent>
                                P.O. Box 64, A309,
                            </ContactMethodContent>
                            <ContactMethodContent>
                                Block F, Jalan Datuk Haji Yassin
                            </ContactMethodContent>
                            <ContactMethodContent>
                                89907, Tenom, Sabah, Malaysia
                            </ContactMethodContent>
                        </ContactMethodContainer>
                        <HorizontalLine />
                        <ContactMethodContainer>
                            <ContactMethodTitle>
                                Electronic Email
                            </ContactMethodTitle>
                            <ContactMethodContent>
                                poolofdeath201@outlook.com
                            </ContactMethodContent>
                        </ContactMethodContainer>
                        <HorizontalLine />
                        <ContactMethodContainer>
                            <ContactMethodTitle>
                                Phone Support
                            </ContactMethodTitle>
                            <ContactMethodContent>
                                Hours: 10am - 5pm / (Mon - Fri)
                            </ContactMethodContent>
                            <ContactMethodContent>
                                011-5548 4654
                            </ContactMethodContent>
                        </ContactMethodContainer>
                        <HorizontalLine />
                    </InnerContentContainer>
                </InnerContentsContainer>
                <InnerContentsContainer>
                    <InnerContentContainer
                        onSubmit={(event) => {
                            event.preventDefault();
                            if (allValueValid(name, email, message)) {
                                const promise = new Promise<string>((res) =>
                                    utariAxios
                                        .post(contactAPI, {
                                            data: {
                                                name: name.value,
                                                email: email.value,
                                                message: message.value,
                                            },
                                        })
                                        .then(({ data }) => {
                                            showMessage(parseAsData(data));
                                            res(
                                                'Your Message Has Been Successfully Sent!\nThank you!'
                                            );
                                        })
                                        .catch((error) => {
                                            console.error(error);
                                            notifyError();
                                        })
                                );
                                ToastPromise({
                                    promise,
                                    pending: 'Sending your message...',
                                    success: {
                                        render: ({ data }) => data,
                                    },
                                    error: {
                                        render: () => notifyError(),
                                    },
                                });
                            }
                        }}
                    >
                        <ContactForm>
                            <Input
                                value={name.value.valueOf()}
                                error={name.error}
                                onChange={(value) =>
                                    setState((prev) => ({
                                        ...prev,
                                        name: getName(value),
                                    }))
                                }
                                label="Hello, my name is"
                                placeHolder="Bruce Wayne"
                                name="name"
                                type="text"
                                prop={{ type: 'textField' }}
                            />
                            <Input
                                value={email.value.valueOf()}
                                error={email.error}
                                onChange={(value) =>
                                    setState((prev) => ({
                                        ...prev,
                                        email: getEmail(value),
                                    }))
                                }
                                label="You can reach me at"
                                placeHolder="batman@gmail.com"
                                name="email"
                                type="text"
                                prop={{ type: 'textField' }}
                            />
                            <Input
                                value={message.value.valueOf()}
                                error={message.error}
                                onChange={(value) =>
                                    setState((prev) => ({
                                        ...prev,
                                        message: getMessage(value),
                                    }))
                                }
                                label="I would like to"
                                placeHolder="buy you a bank/ask you something"
                                name="email"
                                type="text"
                                prop={{ type: 'textArea', rows: 8 }}
                            />
                            <SendButtonContainer>
                                <SendButton />
                            </SendButtonContainer>
                        </ContactForm>
                    </InnerContentContainer>
                </InnerContentsContainer>
            </ContentContainer>
        </Container>
    );
};

const Container = styled.div`
    margin: 32px 0;
    width: 100%;
    display: grid;
    place-items: center;
    font-family: Montserrat, sans-serif;
`;

const TitleContainer = styled.div`
    margin: 0 0 32px 0;
    display: grid;
    place-items: center;
    font-weight: 400;
    font-size: 3em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.secondaryColor};
    @media (max-width: 635px) {
        font-size: 2.5em;
    }
    @media (max-width: 541px) {
        font-size: 2em;
    }
    @media (max-width: 437px) {
        font-size: 1.5em;
    }
`;

const ContactContentContainer = styled.div`
    margin: 0 0 8px 0;
    max-width: 85%;
    text-align: center;
    font-weight: 400;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

const ContentContainer = styled.div`
    margin: 32px 0;
    display: flex;
    justify-content: center;
    grid-gap: 32px;
    > div {
        flex: 0.5;
    }
    width: 75%;
    @media (max-width: 1159px) {
        flex-direction: column;
    }
    @media (max-width: 820px) {
        width: 85%;
    }
`;

// contact method
const InnerContentsContainer = styled.div`
    width: 100%;
`;

const InnerContentContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 32px;
    border-radius: 12px;
    box-sizing: border-box;
    border: 1px solid ${({ theme }) => theme.border};
`;

const ContactMethodContainer = styled.div``;

const ContactMethodTitle = styled.div`
    margin: 0 0 16px 0;
    font-weight: 600;
    font-size: 1em;
    word-break: break-word;
`;

const ContactMethodContent = styled.div`
    font-weight: 400;
    margin: 0 0 8px 0;
    word-break: break-word;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

// Input
const ContactForm = styled.form.attrs({
    method: 'POST',
})`
    @media (max-width: 463px) {
        margin: -7px;
    }
`;

const SendButtonContainer = styled.div`
    text-align: center;
    width: 100%;
`;

const SendButton = styled.input.attrs({
    type: 'submit',
    value: 'Send',
})`
    font-family: Montserrat, sans-serif;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 1.125em;
    width: 100%;
    cursor: pointer;
    transition: all 0.3s ease;
    color: ${({ theme }) => theme.primaryColor};
    background-color: ${({ theme }) => theme.logo};
    background: linear-gradient(
            to left,
            ${({ theme }) => theme.logo} 50%,
            ${({ theme }) => theme.primaryColor} 50%
        )
        right;
    background-size: 250%;
    border: 1px solid ${({ theme }) => theme.logo};
    &:hover {
        background-color: ${({ theme }) => theme.logo};
        background-position: left;
        color: ${({ theme }) => theme.logo};
    }
`;

export default Contact;
