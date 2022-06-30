import { Region } from 'utari-common';

type RegionName = 'Sungai Long' | 'Kampar' | 'Bandar Tun Hussein Onn';

const convertNameToRegion = (regionName: RegionName): Region =>
    regionName === 'Kampar'
        ? 'KP'
        : regionName === 'Sungai Long'
        ? 'SL'
        : 'BTHO';

const convertRegionToName = (region: Region): RegionName =>
    region === 'KP'
        ? 'Kampar'
        : region === 'SL'
        ? 'Sungai Long'
        : 'Bandar Tun Hussein Onn';

export { convertRegionToName, convertNameToRegion };
export type { RegionName };
