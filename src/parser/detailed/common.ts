import { parseAsNumber } from 'parse-dont-validate';
import {
    parseAsContact,
    parseAsFacilities,
    parseAsHandler,
    parseAsId,
    parseAsRemarks,
    parseAsRatings,
    parseAsBookmarked,
    parseAsLocation,
    parseAsNullableRating,
} from '../parser';

const parseAsQuery = (params: URLSearchParams) => ({
    id: parseAsId(parseInt(params.get('id') ?? '')),
});

const parseAsCommonProperties = (accommodation: any) => ({
    id: parseAsId(accommodation.id),
    handler: parseAsHandler(accommodation.handler),
    contact: parseAsContact(accommodation.contact),
    location: parseAsLocation(accommodation.location),
    facilities: parseAsFacilities(accommodation.facilities),
    remarks: parseAsRemarks(accommodation.remarks),
    ratings: parseAsRatings(accommodation.ratings),
    rating: parseAsNullableRating(accommodation.rating),
    bookmarked: parseAsBookmarked(accommodation.bookmarked),
    visitCount: parseAsNumber(accommodation.visitCount)
        .inRangeOf(0, Number.MAX_SAFE_INTEGER)
        .elseThrow(
            `visitCount is not a number, it is ${accommodation.visitCount}`
        ),
});

export { parseAsQuery, parseAsCommonProperties };
