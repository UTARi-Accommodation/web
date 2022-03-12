import * as React from 'react';
import styled from 'styled-components';

const Address = ({
    address,
}: Readonly<{
    address: string;
}>) => <AccommodationAddress>{address}</AccommodationAddress>;

const AccommodationAddress = styled.span`
    font-weight: 400;
    font-size: 1em;
    flex: 0.75;
    word-break: break-word;
    word-wrap: break-word;
    color: ${({ theme }) => theme.secondaryColor};
`;

export default Address;
