import * as React from 'react';
import styled from 'styled-components';
import { Container, CommonButtonComponents } from './Common';

type ButtonComponentProps = Readonly<{
    reset: boolean;
}>;

const ResetButton = ({
    onReset,
    reset,
}: ButtonComponentProps &
    Readonly<{
        onReset: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    }>) => (
    <Container>
        <ButtonComponent reset={reset} onClick={onReset}>
            Reset
        </ButtonComponent>
    </Container>
);

const ButtonComponent = styled(CommonButtonComponents)`
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ reset }: ButtonComponentProps) =>
        ({ theme }) =>
            reset ? theme.secondaryColor : 'gray'};
    border: 1px solid ${({ theme }) => theme.border};
    cursor: ${({ reset }: ButtonComponentProps) =>
        reset ? 'default' : 'not-allowed'};
`;

export default ResetButton;
