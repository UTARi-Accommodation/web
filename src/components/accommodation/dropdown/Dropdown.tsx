import styled from 'styled-components';

const Button = styled.div`
    display: inline-block;
    white-space: nowrap;
    padding: 8px 16px;
    border-radius: 25px;
    transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
    &:hover {
        cursor: pointer;
        box-shadow: 0px 1px 2px #00000014, 0px 4px 12px #0000000d;
        border: 1px solid ${({ theme }) => theme.secondaryColor};
    }
    color: ${({ theme }) => theme.highEmphasesTextColor};
    border: 1px solid
        ${({
            isMouseClicked,
        }: Readonly<{
            isMouseClicked?: boolean;
        }>) =>
            isMouseClicked
                ? ({ theme }) => theme.secondaryColor
                : ({ theme }) => theme.border};
`;

const Container = styled.div`
    position: absolute;
    display: block;
    z-index: 3;
    border-radius: 8px;
    box-shadow: #00000026 0px 10px 37px;
    margin: 4px;
    ${({
        align,
    }: Readonly<{
        align: 'left' | 'right';
    }>) => `${align}: 0`};
    background: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.border};
`;

const DropdownAndButtonContainer = styled.div`
    font-family: Montserrat, sans-serif;
    position: relative;
    display: inline-block;
    font-size: 1em;
`;

const InnerContainer = styled.div`
    max-height: calc(100vh - 220px);
    overflow: hidden auto;
`;

export { Button, Container, DropdownAndButtonContainer, InnerContainer };
