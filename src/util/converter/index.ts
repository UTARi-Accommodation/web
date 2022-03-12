import { Region } from 'utari-common';

type RegionName = 'Sungai Long' | 'Kampar' | 'Bandar Tun Hussein Onn';

const convertNameToRegion = (regionName: RegionName): Region => {
    switch (regionName) {
        case 'Sungai Long':
            return 'SL';
        case 'Kampar':
            return 'KP';
        case 'Bandar Tun Hussein Onn':
            return 'BTHO';
    }
};

const convertRegionToName = (region: Region): RegionName => {
    switch (region) {
        case 'SL':
            return 'Sungai Long';
        case 'KP':
            return 'Kampar';
        case 'BTHO':
            return 'Bandar Tun Hussein Onn';
    }
};

export { convertRegionToName, convertNameToRegion };
export type { RegionName };
