import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const OptionLabel = ({
    text,
    onClick,
    isPad,
}: Readonly<{
    text: string;
    onClick: () => void;
    isPad?: boolean;
}>) => (
    <Label isPad={isPad ?? false} onClick={onClick}>
        {text}
    </Label>
);

const OptionLinkLabel = ({
    text,
    to,
    onClick,
}: Readonly<{
    text: string;
    onClick?: () => void;
    to: string;
}>) => (
    <LinkContainer>
        <Link onClick={onClick} to={to}>
            <LinkLabel>{text}</LinkLabel>
        </Link>
    </LinkContainer>
);

const Label = styled.div`
    cursor: pointer;
    padding: ${({
        isPad,
    }: Readonly<{
        isPad: boolean;
    }>) => (isPad ? '8px 0' : '0')};
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const LinkContainer = styled.div`
    > a {
        text-decoration: none;
        &:focus {
            outline: none;
        }
        color: ${({ theme }) => theme.highEmphasesTextColor};
        width: 100%;
    }
`;

const LinkLabel = styled.div`
    padding: 8px 0;
    cursor: pointer;
`;

export { OptionLabel, OptionLinkLabel };
