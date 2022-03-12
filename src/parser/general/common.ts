import { parseAsSearch, Region } from 'utari-common';
import {
    parseAsBookmarked,
    parseAsNumberFromQuery,
    parseAsRegion,
} from '../parser';
import {
    parseAsFacilities,
    parseAsId,
    parseAsLocation,
    parseAsRatings,
    parseAsRemarksWithoutRemark,
} from '../parser';

const parseAsQuery = (
    params: URLSearchParams,
    {
        region,
    }: Readonly<{
        region: Region;
    }>
) => ({
    region: parseAsRegion(params.get('region'), region),
    page: parseInt(params.get('page') ?? '1'),
    maxRental: parseAsNumberFromQuery(params.get('maxRental')),
    minRental: parseAsNumberFromQuery(params.get('minRental')),
    search: parseAsSearch(params.get('search')),
});

const parseAsCommonProperties = (accommodation: any) => ({
    id: parseAsId(accommodation.id),
    location: parseAsLocation(accommodation.location),
    facilities: parseAsFacilities(accommodation.facilities),
    remarks: parseAsRemarksWithoutRemark(accommodation.remarks),
    ratings: parseAsRatings(accommodation.ratings),
    bookmarked: parseAsBookmarked(accommodation.bookmarked),
});

export { parseAsCommonProperties, parseAsQuery };
