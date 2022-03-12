import * as React from 'react';
import styled, { css } from 'styled-components';
import { RentalRange } from 'utari-common';

const Field = ({
    placeHolder,
    value,
    onChange,
}: Readonly<{
    placeHolder: `${'Min' | 'Max'} Price`;
    value: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}>) => {
    const [state, setState] = React.useState({
        empty: false,
    });

    const { empty } = state;

    return (
        <InputDiv>
            <InputFieldContainer>
                <Currency>RM</Currency>
                <InputField
                    type="text"
                    value={empty ? '' : value}
                    required
                    onChange={(event) => {
                        setState((prev) => ({
                            ...prev,
                            empty: !event.target.value,
                        }));
                        onChange(event);
                    }}
                />
            </InputFieldContainer>
            <InputLabel>{placeHolder}</InputLabel>
        </InputDiv>
    );
};

const Input = ({
    rentalRange: { min, max },
    onChangeListener: { minPriceChange, maxPriceChange },
}: Readonly<{
    rentalRange: RentalRange;
    onChangeListener: Readonly<{
        minPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
        maxPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    }>;
}>) => (
    <Container>
        <Field value={min} placeHolder="Min Price" onChange={minPriceChange} />
        <Field value={max} placeHolder="Max Price" onChange={maxPriceChange} />
    </Container>
);

const FontSize = css`
    font-size: 1em;
`;

const Container = styled.div`
    font-family: Montserrat, sans-serif;
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 16px 0 0 0;
`;

const InputFieldContainer = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    padding: 16px;
    border: 1px solid ${({ theme }) => theme.border};
    border-radius: 16px;
    width: 70%;
    resize: vertical;
    &:focus-within {
        border: 1px solid ${({ theme }) => theme.secondaryColor};
    }
`;

const Currency = styled.div`
    padding: 0 8px 0 0;
    ${FontSize};
`;

const InputField = styled.input`
    font-family: Montserrat, sans-serif;
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.secondaryColor};
    outline: none;
    ${FontSize};
    width: 100%;
    border: transparent;
    &:focus {
        color: black;
    }
    @media (max-width: 463px) {
        padding: 10px;
    }
`;

const InputLabelFloatEffect = css`
    left: 28px;
    top: -8px;
    font-size: small;
    padding: 0 5px;
    color: ${({ theme }) => theme.highEmphasesTextColor};
    background-color: ${({ theme }) => theme.primaryColor};
`;

const InputLabel = styled.label`
    color: ${({ theme }) => theme.highEmphasesTextColor};
    position: absolute;
    pointer-events: none;
    top: 8px;
    transition: 0.2s;
    ${FontSize};
    border-radius: 5px;
    ${InputLabelFloatEffect}
    @media (max-width: 463px) {
        top: 10px;
    }
`;

const InputDiv = styled.div`
    position: relative;
    display: grid;
    place-items: center;
    @media (max-width: 491px) {
        margin: 20px 5px;
    }
    ${InputField}:focus ~ ${InputLabel},
    ${InputField}:valid ~ ${InputLabel} {
        ${InputLabelFloatEffect}
    }
`;

export default Input;
