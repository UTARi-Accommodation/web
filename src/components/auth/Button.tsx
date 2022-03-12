import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    align: items: center;
    flex-direction: column;
    justify: center;
    grid-gap: 15px;
    width: 100%;
`;

const Button = styled.div`
    display: grid;
    grid-template-columns: 1fr 9fr;
    align-items: center;
    border-radius: 8px;
    padding: 8px;
    cursor: pointer;
    &:hover {
        border: 1px solid ${({ theme }) => theme.secondaryColor};
    }
    border: 1px solid ${({ theme }) => theme.border};
    background-color: ${({ theme }) => theme.primaryColor};
`;

const Text = styled.div`
    text-align: center;
    vertical-align: middle;
    color: ${({ theme }) => theme.secondaryColor};
`;

export { Button, ButtonContainer, Text };
