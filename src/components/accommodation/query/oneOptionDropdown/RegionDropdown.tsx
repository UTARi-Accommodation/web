import * as React from 'react';
import { Region } from 'utari-common';
import { RegionName } from '../../../../util/converter';
import OneOptionDropdown from './Dropdown';

const RegionDropdown = ({
    region,
    onSearch,
    breakPoint,
}: Readonly<{
    region: Region;
    onSearch: (regionName: RegionName) => void;
    breakPoint: number;
}>) => (
    <OneOptionDropdown
        title="Region"
        breakPoint={breakPoint}
        value={region}
        values={[
            {
                label: 'Bandar Tun Hussein Onn (BTHO)',
                value: 'Bandar Tun Hussein Onn',
            },
            {
                label: 'Kampar (KP)',
                value: 'Kampar',
            },
            {
                label: 'Sungai Long (SL)',
                value: 'Sungai Long',
            },
        ]}
        label={{
            type: 'Search',
            onSearch,
        }}
    />
);

export default RegionDropdown;
