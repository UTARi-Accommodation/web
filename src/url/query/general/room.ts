import { QueryRoomsAPI } from 'utari-common';
import { formQuery } from '../../common';

type QueryRoom = Omit<QueryRoomsAPI, 'token'>;

const roomsRoute = '/rooms',
    roommatesRoute = '/roommates';

const formGeneralRoomsQuery = (query: QueryRoom) =>
    formQuery({ type: 'room', query });

const formGeneralRoomsAPIQuery = (query: QueryRoomsAPI) =>
    `/rooms/${formQuery({ type: 'roomsAPI', query })}`;

export {
    formGeneralRoomsAPIQuery,
    formGeneralRoomsQuery,
    roommatesRoute,
    roomsRoute,
};

export type { QueryRoom };
