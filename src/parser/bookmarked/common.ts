import { parseAsReadonlyRegionArray, parseAsSearch } from 'utari-common';
import {
    parseAsAddress,
    parseAsContact,
    parseAsFacilities,
    parseAsHandler,
    parseAsId,
    parseAsNumberFromQuery,
    parseAsNullableRating,
    parseAsRatings,
    parseAsRemarks,
} from '../parser';

const parseAsQuery = (params: URLSearchParams) => ({
    regions: parseAsReadonlyRegionArray(params.get('regions')),
    maxRental: parseAsNumberFromQuery(params.get('maxRental')),
    minRental: parseAsNumberFromQuery(params.get('minRental')),
    page: parseInt(params.get('page') ?? '1'),
    search: parseAsSearch(params.get('search')),
});

const parseAsDownloadProperties = (accommodation: any) => ({
    id: parseAsId(accommodation.id),
    handler: parseAsHandler(accommodation.handler),
    contact: parseAsContact(accommodation.contact),
    address: parseAsAddress(accommodation.address),
    facilities: parseAsFacilities(accommodation.facilities),
    remarks: parseAsRemarks(accommodation.remarks),
    ratings: parseAsRatings(accommodation.ratings),
    rating: parseAsNullableRating(accommodation.rating),
});

export { parseAsQuery, parseAsDownloadProperties };
