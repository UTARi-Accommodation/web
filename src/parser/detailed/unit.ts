import { QueriedUnitDetails } from 'utari-common';
import { parseAsProperties } from '../common/unit';
import { parseAsCommonProperties, parseAsQuery } from './common';

const parseAsQueryUnit = (params: URLSearchParams) => ({
    ...parseAsQuery(params),
});

const parseAsQueriedUnit = (unit: any): QueriedUnitDetails => ({
    ...parseAsCommonProperties(unit),
    properties: parseAsProperties(unit.properties),
});

export { parseAsQueryUnit, parseAsQueriedUnit };
