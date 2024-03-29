import {
    parseAsNumber,
    parseAsReadonlyArray,
    parseAsString,
} from 'parse-dont-validate';
import {
    parseAsReadonlyIntArray,
    parseAsReadonlyRoomTypeArray,
    SortedBookmarkedRoomDownload,
} from 'utari-common';
import { QueryBookmarkedRoom } from '../../url/query/bookmarked/room';
import { parseAsProperties } from '../common/room';
import { parseAsQuery, parseAsDownloadProperties } from './common';

const parseAsQueryRooms = (params: URLSearchParams) =>
    ({
        ...parseAsQuery(params),
        roomTypes: parseAsReadonlyRoomTypeArray(params.get('roomTypes')),
        capacities: parseAsReadonlyIntArray(params.get('capacities')),
    } as QueryBookmarkedRoom);

const parseAsDownloadQueriedRooms = (
    rooms: unknown
): SortedBookmarkedRoomDownload =>
    parseAsReadonlyArray(rooms, (room) => ({
        ...parseAsDownloadProperties(room),
        properties: parseAsProperties(room.properties),
        timeCreated: new Date(
            parseAsString(room.timeCreated).elseThrow(
                `timeCreated is not an ISO string, its ${room.timeCreated}`
            )
        ),
        ratings: parseAsReadonlyArray(room.ratings, (rating) =>
            parseAsNumber(rating).elseThrow(
                `rating is not a number, it is ${rating}`
            )
        ).elseThrow(`ratings is not an array, it is ${room.ratings}`),
    })).elseThrow(`rooms is not an array, it is ${rooms}`);

export { parseAsQueryRooms, parseAsDownloadQueriedRooms };
