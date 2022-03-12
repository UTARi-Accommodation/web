import { parseAsCustomType, parseAsReadonlyArray } from 'parse-dont-validate';
import {
    parseAsReadonlyIntArray,
    Region,
    RoomType,
    SortedRoom,
} from 'utari-common';
import { QueryRoom } from '../../url/query/general/room';
import { parseAsProperties } from '../common/room';
import { parseAsCommonProperties, parseAsQuery } from './common';

const parseAsRoomType = (roomType: string | null, defaultRoomType: RoomType) =>
    parseAsCustomType<RoomType>(
        roomType,
        (roomType) => roomType === 'Room' || roomType === 'Roommate'
    ).orElseLazyGet(() => defaultRoomType);

const parseAsQueryRooms = (
    params: URLSearchParams,
    {
        region,
        roomType,
    }: Readonly<{
        region: Region;
        roomType: RoomType;
    }>
) =>
    ({
        ...parseAsQuery(params, { region }),
        roomType: parseAsRoomType(params.get('roomType'), roomType),
        capacities: parseAsReadonlyIntArray(params.get('capacities')),
    } as QueryRoom);

const parseAsQueriedRooms = (rooms: unknown): SortedRoom =>
    parseAsReadonlyArray(rooms, (room) => ({
        ...parseAsCommonProperties(room),
        properties: parseAsProperties(room.properties),
    })).orElseThrowDefault('rooms');

export { parseAsQueriedRooms, parseAsQueryRooms };
