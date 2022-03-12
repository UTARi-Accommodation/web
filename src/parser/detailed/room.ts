import { QueriedRoomDetails } from 'utari-common';
import { parseAsProperties } from '../common/room';
import { parseAsCommonProperties, parseAsQuery } from './common';

const parseAsQueryRoom = (params: URLSearchParams) => ({
    ...parseAsQuery(params),
});

const parseAsQueriedRoom = (room: any): QueriedRoomDetails => ({
    ...parseAsCommonProperties(room),
    properties: parseAsProperties(room.properties),
});

export { parseAsQueryRoom, parseAsQueriedRoom };
