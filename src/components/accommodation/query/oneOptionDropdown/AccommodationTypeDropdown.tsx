import * as React from 'react';
import OneOptionDropdown from './Dropdown';

const AccommodationTypeDropdown = <T extends string>({
    onClick,
    value,
    breakPoint,
}: Readonly<{
    onClick?: () => void;
    value: T;
    breakPoint: number;
}>) => (
    <OneOptionDropdown
        title="Accommodation"
        breakPoint={breakPoint}
        value={value}
        values={[
            {
                label: 'Condominium',
                value: 'Condominium',
            },
            {
                label: 'House',
                value: 'House',
            },
            {
                label: 'Room',
                value: 'Room',
            },
            {
                label: 'Find Roommate',
                value: 'Roommate',
            },
        ]}
        label={{
            type: 'Link',
            toLink: (value) => `/${value.toLowerCase()}s`,
            onClick,
        }}
    />
);

export default AccommodationTypeDropdown;
