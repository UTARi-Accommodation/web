import { parseAsReadonlyArray, parseAsString } from 'parse-dont-validate';
import {
    parseAsReadonlyIntArray,
    parseAsReadonlyUnitTypeArray,
    SortedBookmarkedUnitDownload,
} from 'utari-common';
import { QueryBookmarkedUnit } from '../../url/query/bookmarked/unit';
import { parseAsProperties } from '../common/unit';
import { parseAsQuery, parseAsDownloadProperties } from './common';

const parseAsQueryUnits = (params: URLSearchParams) =>
    ({
        ...parseAsQuery(params),
        unitTypes: parseAsReadonlyUnitTypeArray(params.get('unitTypes')),
        bedRooms: parseAsReadonlyIntArray(params.get('bedRooms')),
        bathRooms: parseAsReadonlyIntArray(params.get('bathRooms')),
    } as QueryBookmarkedUnit);

const parseAsDownloadQueriedUnits = (
    units: unknown
): SortedBookmarkedUnitDownload =>
    parseAsReadonlyArray(units, (unit) => ({
        ...parseAsDownloadProperties(unit),
        properties: parseAsProperties(unit.properties),
        timeCreated: new Date(
            parseAsString(unit.timeCreated).orElseThrowDefault('timeCreated')
        ),
    })).orElseThrowDefault('units');

export { parseAsQueryUnits, parseAsDownloadQueriedUnits };
