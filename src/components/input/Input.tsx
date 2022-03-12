import * as React from 'react';
import styled, { css } from 'styled-components';

const Input = ({
    type,
    label,
    placeHolder,
    error,
    value,
    onChange,
    name,
    prop,
}: Readonly<{
    type: 'text' | 'email' | 'password';
    placeHolder?: string;
    label: string;
    error: string | undefined;
    value: string | undefined;
    onChange: (value: string) => void;
    name: string;
    prop: Readonly<
        | {
              type: 'textArea';
              rows: number;
          }
        | {
              type: 'textField';
          }
    >;
}>) => (
    <InputDivContainer>
        <InputDiv>
            <LabelAndErrorContainer>
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <div>
                    <ErrorMessage>{error}</ErrorMessage>
                </div>
            </LabelAndErrorContainer>
            {prop.type === 'textArea' ? (
                <TextArea
                    name={name}
                    placeholder={placeHolder}
                    rows={prop.rows}
                    required
                    value={value}
                    spellCheck="false"
                    onChange={({ target: { value } }) => onChange(value)}
                />
            ) : (
                <InputField
                    name={name}
                    placeholder={placeHolder}
                    type={type}
                    value={value}
                    required
                    spellCheck="false"
                    onChange={({ target: { value } }) => onChange(value)}
                />
            )}
        </InputDiv>
    </InputDivContainer>
);

const InputLabel = styled.label`
    pointer-events: none;
    transition: 0.2s;
    font-size: 1em;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const InputStyle = css`
    font-family: Montserrat, sans-serif;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    padding: 8px;
    outline: none;
    font-size: 1em;
    border-radius: 8px;
    margin: 8px 0 0 0;
    text-overflow: ellipsis;
    &:focus {
        border: 1px solid ${({ theme }) => theme.secondaryColor};
        ::placeholder {
            /* Chrome, Firefox, Opera, Safari 10.1+ */
            opacity: 1; /* Firefox */
        }
        ::-ms-input-placeholder {
            /* Microsoft Edge */
        }
    }
    color: ${({ theme }) => theme.highEmphasesTextColor};
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.primaryColor};
`;

const InputField = styled.input`
    ${InputStyle};
`;

const TextArea = styled.textarea`
    ${InputStyle};
    resize: none;
`;

const InputDivContainer = styled.div`
    padding: 0 0 16px 0;
    width: 100%;
`;

const InputDiv = styled.div`
    position: relative;
`;

const LabelAndErrorContainer = styled.div`
    display: flex;
    grid-gap: 8px;
`;

const ErrorMessage = styled.span`
    color: ${({ theme }) => theme.error};
    font-size: 14px;
    font-family: Roboto, Arial, sans-serif;
`;

export default Input;
