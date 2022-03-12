import * as React from 'react';
import styled from 'styled-components';
import { Container, CommonButtonComponents } from './Common';

type ButtonComponentProps = Readonly<{
    type: 'positive' | 'negative';
}>;

const Button = ({
    label,
    type,
    onClick,
}: ButtonComponentProps &
    Readonly<{
        label: string;
        onClick: () => void;
    }>) => (
    <Container>
        <ButtonComponent type={type} onClick={onClick}>
            {label}
        </ButtonComponent>
    </Container>
);

const ButtonComponent = styled(CommonButtonComponents)`
    background-color: ${({ type }: ButtonComponentProps) =>
        ({ theme }) =>
            type === 'negative' ? theme.primaryColor : theme.secondaryColor};
    color: ${({ type }: ButtonComponentProps) =>
        ({ theme }) =>
            type === 'negative' ? theme.secondaryColor : theme.primaryColor};
    border: 1px solid
        ${({ type }: ButtonComponentProps) =>
            ({ theme }) =>
                type === 'negative' ? theme.border : theme.secondaryColor};
`;

export default Button;
