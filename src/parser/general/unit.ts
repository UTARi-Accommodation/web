import { parseAsCustomType, parseAsReadonlyArray } from 'parse-dont-validate';
import {
    parseAsReadonlyIntArray,
    Region,
    SortedUnit,
    UnitType,
} from 'utari-common';
import { QueryUnit } from '../../url/query/general/unit';
import { parseAsProperties } from '../common/unit';
import { parseAsCommonProperties, parseAsQuery } from './common';

const parseAsUnitType = (unitType: string | null, defaultUnitType: UnitType) =>
    parseAsCustomType<UnitType>(
        unitType,
        (unitType) => unitType === 'House' || unitType === 'Condominium'
    ).orElseLazyGet(() => defaultUnitType);

const parseAsQueryUnits = (
    params: URLSearchParams,
    {
        region,
        unitType,
    }: Readonly<{
        region: Region;
        unitType: UnitType;
    }>
) =>
    ({
        ...parseAsQuery(params, { region }),
        unitType: parseAsUnitType(params.get('unitType'), unitType),
        bedRooms: parseAsReadonlyIntArray(params.get('bedRooms')),
        bathRooms: parseAsReadonlyIntArray(params.get('bathRooms')),
    } as QueryUnit);

const parseAsQueriedUnits = (units: unknown): SortedUnit =>
    parseAsReadonlyArray(units, (unit) => ({
        ...parseAsCommonProperties(unit),
        properties: parseAsProperties(unit.properties),
    })).orElseThrowDefault('units');

export { parseAsQueriedUnits, parseAsQueryUnits };
