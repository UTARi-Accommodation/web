import * as React from 'react';
import styled from 'styled-components';
import HorizontalLine from '../display/HorizontalLine';

const TitleWithBorder = ({
    title,
}: Readonly<{
    title: string;
}>) => (
    <>
        <Title>{title}</Title>
        <HorizontalLine />
    </>
);

const Title = styled.div`
    font-size: 1.1em;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

export default TitleWithBorder;
