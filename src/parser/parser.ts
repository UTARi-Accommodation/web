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
const parseAsId = (id: unknown) =>
    parseAsNumber(id).elseThrow(`id is not a number, it is ${id}`);

const parseAsAddress = (address: unknown) =>
    parseAsString(address).elseThrow(
        `address is not a string, it is ${address}`
    );

const parseAsNumberFromQuery = (value: string | null) =>
    parseAsNumber(parseInt(value ?? ''))
        .inRangeOf(0, Number.MAX_SAFE_INTEGER)
        .elseGet(undefined);

const parseAsRental = (rental: unknown) =>
    parseAsNumber(rental).elseThrow(`rental is not a number, it is ${rental}`);

const parseAsNullableRating = (rating: unknown) =>
    parseAsNumber(rating).inRangeOf(1, 5).elseGet(undefined);

const parseAsRating = (rating: unknown) =>
    parseAsNumber(rating)
        .inRangeOf(1, 5)
        .elseThrow(`rating is not a number, it is ${rating}`);

const parseAsFacilities = (facilities: unknown) =>
    parseAsString(facilities).elseThrow(
        `facilities is not a string, it is ${facilities}`
    );

const parseAsVisitCount = (visitCount: unknown) =>
    parseAsNumber(visitCount)
        .inRangeOf(0, Number.MAX_SAFE_INTEGER)
        .elseThrow(`visitCount is not a number, it is ${visitCount}`);

const parseAsMonth = (month: unknown) =>
    parseAsCustomType<Month>(month, (month) =>
        Boolean(months.find((m) => m.includes(month)))
    ).elseThrow(`month is not typeof Month, it is ${month}`);

const parseAsRegion = (region: string | null, defaultRegion: Region) =>
    parseAsCustomType<Region>(
        region,
        (region) => region === 'SL' || region === 'KP' || region === 'BTHO'
    ).elseLazyGet(() => defaultRegion);

const parseAsBookmarked = (bookmarked: unknown) =>
    parseAsBoolean(bookmarked).elseThrow(
        `bookmarked is not a boolean, it is ${bookmarked}`
    );

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
        ).elseThrow(
            `coordinate is not an object, it is ${location.coordinate}`
        ),
    })).elseThrow(`location is not an object, it is ${location}`);

const parseAsContact = (contact: unknown) =>
    parseAsReadonlyObject(contact, (contact) => ({
        email: parseAsReadonlyArray(contact.email, (email) =>
            parseAsString(email).elseThrow(
                `email is not a string, it is ${email}`
            )
        ).elseGet([]),
        mobileNumber: parseAsReadonlyArray(
            contact.mobileNumber,
            (mobileNumber) =>
                parseAsString(mobileNumber).elseThrow(
                    `mobileNumber is not a string, it is ${mobileNumber}`
                )
        ).elseGet([]),
    })).elseThrow(`contact is not an object, it is ${contact}`);

const parseAsRemarks = (remarks: unknown) =>
    parseAsReadonlyObject(remarks, (remarks) => ({
        ...parseAsRemarksWithoutRemark(remarks),
        remark: parseAsString(remarks.remark).elseThrow(
            `remark is not a string, it is ${remarks.remark}`
        ),
    })).elseThrow(`remarks is not an object, it is ${remarks}`);

const parseAsRemarksWithoutRemark = (remarks: unknown) =>
    parseAsReadonlyObject(remarks, (remarks) => ({
        year: parseAsNumber(remarks.year).elseThrow(
            `year is not a number, it is ${remarks.year}`
        ),
        month: parseAsMonth(remarks.month),
    })).elseThrow(`remarks is not an object, it is ${remarks}`);

const parseAsRatings = (ratings: unknown): ReadonlyArray<number> =>
    parseAsReadonlyArray(ratings, (rating) => parseAsRating(rating)).elseGet(
        []
    );

const parseAsHandler = (handler: unknown) =>
    parseAsReadonlyObject(handler, (handler) => ({
        name: parseAsString(handler.name).elseThrow(
            `name is not a string, it is ${handler.name}`
        ),
        handlerType: parseAsCustomType<HandlerType>(
            handler.handlerType,
            (type) => type === 'Owner' || type === 'Tenant' || type === 'Agent'
        ).elseThrow(
            `handlerType is not of HandlerType, it is ${handler.handlerType}`
        ),
    })).elseThrow(`handler is not an object, it is ${handler}`);

// queried field
const parseAsCenter = (center: unknown) =>
    parseAsReadonlyObject(center, (center) => ({
        lat: parseAsLatitude(center.lat),
        lng: parseAsLongitude(center.lng),
    })).elseThrow(`center is not an object, it is ${center}`);

const parseExactlyAsNumber = (num: unknown) =>
    parseAsNumber(num).elseThrow(`num is not a number, it is ${num}`);

const parseAsRentalFrequencies = (rentalRangeFrequencies: unknown) =>
    parseAsReadonlyArray(
        rentalRangeFrequencies,
        ([rental, frequencies]) =>
            [
                parseAsNumber(rental).elseThrow(
                    `rental is not number, it is ${rental}`
                ),
                parseAsNumber(frequencies).elseThrow(
                    `frequencies is not number, it is ${frequencies}`
                ),
            ] as Readonly<[number, number]>
    ).elseThrow(
        `rentalRangeFrequencies is not an object, it is ${rentalRangeFrequencies}`
    );

const parseExactlyAsReadonlyNumber = (numArray: unknown) =>
    parseAsReadonlyArray(numArray, (num) =>
        parseAsNumber(num).elseThrow(`num is not a number, it is ${num}`)
    ).elseThrow(`bedRooms is not an array, it is ${numArray}`);

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
    })).elseThrow(`data is not an object, it is ${data}`);

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
    })).elseThrow(`data is not an object, it is ${data}`);

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
