import {
    parseAsBoolean,
    parseAsCustomType,
    parseAsNumber,
    parseAsReadonlyArray,
    parseAsReadonlyObject,
    parseAsString,
} from 'parse-dont-validate';
import {
    HandlerType,
    Month,
    months,
    parseAsLatitude,
    parseAsLongitude,
    Region,
    RoomsQueried,
    UnitsQueried,
} from 'utari-common';
import { parseAsQueriedRooms } from './general/room';
import { parseAsQueriedUnits } from './general/unit';

// parse as non object
const parseAsId = (id: unknown) => parseAsNumber(id).orElseThrowDefault('id');

const parseAsAddress = (address: unknown) =>
    parseAsString(address).orElseThrowDefault('address');

const parseAsNumberFromQuery = (value: string | null) =>
    parseAsNumber(parseInt(value ?? ''))
        .inRangeOf(0, Number.MAX_SAFE_INTEGER)
        .orElseGetUndefined();

const parseAsRental = (rental: unknown) =>
    parseAsNumber(rental).orElseThrowDefault('rental');

const parseAsNullableRating = (rating: unknown) =>
    parseAsNumber(rating).inRangeOf(1, 5).orElseGetUndefined();

const parseAsRating = (rating: unknown) =>
    parseAsNumber(rating).inRangeOf(1, 5).orElseThrowDefault('rating');

const parseAsFacilities = (facilities: unknown) =>
    parseAsString(facilities).orElseThrowDefault('facilities');

const parseAsVisitCount = (visitCount: unknown) =>
    parseAsNumber(visitCount)
        .inRangeOf(0, Number.MAX_SAFE_INTEGER)
        .orElseThrowDefault('visitCount');

const parseAsMonth = (month: unknown) =>
    parseAsCustomType<Month>(month, (month) =>
        Boolean(months.find((m) => m.includes(month)))
    ).orElseThrowDefault('month');

const parseAsRegion = (region: string | null, defaultRegion: Region) =>
    parseAsCustomType<Region>(
        region,
        (region) => region === 'SL' || region === 'KP' || region === 'BTHO'
    ).orElseLazyGet(() => defaultRegion);

const parseAsBookmarked = (bookmarked: unknown) =>
    parseAsBoolean(bookmarked).orElseThrowDefault('bookmarked');

// parse as object
const parseAsLocation = (location: unknown) =>
    parseAsReadonlyObject(location, (location) => ({
        address: parseAsAddress(location.address),
        coordinate: parseAsReadonlyObject(
            location.coordinate,
            (coordinate) => ({
                latitude: parseAsLatitude(coordinate.latitude),
                longitude: parseAsLongitude(coordinate.longitude),
            })
        ).orElseThrowDefault('coordinate'),
    })).orElseThrowDefault('location');

const parseAsContact = (contact: unknown) =>
    parseAsReadonlyObject(contact, (contact) => ({
        email: parseAsReadonlyArray(contact.email, (email) =>
            parseAsString(email).orElseThrowDefault('email')
        ).orElseGetReadonlyEmptyArray(),
        mobileNumber: parseAsReadonlyArray(
            contact.mobileNumber,
            (mobileNumber) =>
                parseAsString(mobileNumber).orElseThrowDefault('mobileNumber')
        ).orElseGetReadonlyEmptyArray(),
    })).orElseThrowDefault('contact');

const parseAsRemarks = (remarks: unknown) =>
    parseAsReadonlyObject(remarks, (remarks) => ({
        ...parseAsRemarksWithoutRemark(remarks),
        remark: parseAsString(remarks.remark).orElseThrowDefault('remark'),
    })).orElseThrowDefault('remarks');

const parseAsRemarksWithoutRemark = (remarks: unknown) =>
    parseAsReadonlyObject(remarks, (remarks) => ({
        year: parseAsNumber(remarks.year).orElseThrowDefault('year'),
        month: parseAsMonth(remarks.month),
    })).orElseThrowDefault('remarks');

const parseAsRatings = (ratings: unknown) =>
    parseAsReadonlyArray(ratings, (rating) =>
        parseAsRating(rating)
    ).orElseGetReadonlyEmptyArray();

const parseAsHandler = (handler: unknown) =>
    parseAsReadonlyObject(handler, (handler) => ({
        name: parseAsString(handler.name).orElseThrowDefault('name'),
        handlerType: parseAsCustomType<HandlerType>(
            handler.handlerType,
            (type) => type === 'Owner' || type === 'Tenant' || type === 'Agent'
        ).orElseThrowDefault('handlerType'),
    })).orElseThrowDefault('handler');

// queried field
const parseAsCenter = (center: unknown) =>
    parseAsReadonlyObject(center, (center) => ({
        lat: parseAsLatitude(center.lat),
        lng: parseAsLongitude(center.lng),
    })).orElseThrowDefault('center');

const parseExactlyAsNumber = (num: unknown) =>
    parseAsNumber(num).orElseThrowDefault('num');

const parseAsRentalFrequencies = (rentalRangeFrequencies: unknown) =>
    parseAsReadonlyArray(
        rentalRangeFrequencies,
        ([rental, frequencies]) =>
            [
                parseAsNumber(rental).orElseThrowDefault('key/rental'),
                parseAsNumber(frequencies).orElseThrowDefault(
                    'value/frequency'
                ),
            ] as Readonly<[number, number]>
    ).orElseThrowDefault('rentalRangeFrequencies');

const parseExactlyAsReadonlyNumber = (numArray: unknown) =>
    parseAsReadonlyArray(numArray, (num) =>
        parseAsNumber(num).orElseThrowDefault('num')
    ).orElseThrowDefault('bedRooms');

const parseAsRoomsQueried = (data: unknown): RoomsQueried =>
    parseAsReadonlyObject(data, (data) => ({
        rooms: parseAsQueriedRooms(data.rooms),
        numberOfResultsQueried: parseExactlyAsNumber(
            data.numberOfResultsQueried
        ),
        rentalRangeFrequencies: parseAsRentalFrequencies(
            data.rentalRangeFrequencies
        ),
        capacities: parseExactlyAsReadonlyNumber(data.capacities),
        page: parseExactlyAsNumber(data.page),
        totalPage: parseExactlyAsNumber(data.totalPage),
        center: parseAsCenter(data.center),
    })).orElseThrowDefault('data');

const parseAsUnitsQueried = (data: unknown): UnitsQueried =>
    parseAsReadonlyObject(data, (data) => ({
        units: parseAsQueriedUnits(data.units),
        numberOfResultsQueried: parseExactlyAsNumber(
            data.numberOfResultsQueried
        ),
        rentalRangeFrequencies: parseAsRentalFrequencies(
            data.rentalRangeFrequencies
        ),
        bedRooms: parseExactlyAsReadonlyNumber(data.bedRooms),
        bathRooms: parseExactlyAsReadonlyNumber(data.bathRooms),
        page: parseExactlyAsNumber(data.page),
        totalPage: parseExactlyAsNumber(data.totalPage),
        center: parseAsCenter(data.center),
    })).orElseThrowDefault('data');

export {
    parseAsId,
    parseAsContact,
    parseAsLocation,
    parseAsRental,
    parseAsFacilities,
    parseAsRemarks,
    parseAsRatings,
    parseAsAddress,
    parseAsHandler,
    parseAsRemarksWithoutRemark,
    parseAsNumberFromQuery,
    parseAsRegion,
    parseAsBookmarked,
    parseAsNullableRating,
    parseAsRating,
    parseAsVisitCount,
    parseAsRoomsQueried,
    parseAsUnitsQueried,
};

export type { RoomsQueried, UnitsQueried };
