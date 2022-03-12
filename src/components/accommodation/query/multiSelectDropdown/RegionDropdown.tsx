import * as React from 'react';
import { Region } from 'utari-common';
import { convertRegionToName, RegionName } from '../../../../util/converter';
import MultiSelectDropdown from './Dropdown';

const RegionDropdown = ({
    regions,
    onSearch,
    breakPoint,
}: Readonly<{
    regions: ReadonlyArray<Region>;
    onSearch: (regions: ReadonlyArray<RegionName>) => void;
    breakPoint: number;
}>) => (
    <MultiSelectDropdown
        title="Accommodation"
        breakPoint={breakPoint}
        values={['Bandar Tun Hussein Onn', 'Kampar', 'Sungai Long']}
        label={{
            type: 'region',
            text: 'Region',
        }}
        selectedValues={regions.map(convertRegionToName)}
        onSearch={onSearch}
    />
);

export default RegionDropdown;
