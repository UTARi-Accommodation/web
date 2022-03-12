import { QueryRoomsAPI } from 'utari-common';
import { api, formQuery } from '../../common';

type QueryRoom = Omit<QueryRoomsAPI, 'token'>;

const roomsRoute = '/rooms',
    roommatesRoute = '/roommates';

const formGeneralRoomsQuery = (query: QueryRoom) =>
    formQuery({ type: 'room', query });

const formGeneralRoomsAPIQuery = (query: QueryRoomsAPI) =>
    `${api}/rooms/${formQuery({ type: 'roomsAPI', query })}`;

export {
    formGeneralRoomsAPIQuery,
    formGeneralRoomsQuery,
    roommatesRoute,
    roomsRoute,
};

export type { QueryRoom };
