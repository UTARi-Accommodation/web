import { parseAsString } from 'parse-dont-validate';
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

const parseAsStringEnv = ({
    env,
    name,
}: Readonly<{
    env: unknown;
    name: string;
}>) => parseAsString(env).elseThrow(`process.env.${name} is not string`);

export { parseAsStringEnv, convertRegionToName, convertNameToRegion };
export type { RegionName };
