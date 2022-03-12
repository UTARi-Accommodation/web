import { QueryBookmarkedRoomAPI } from 'utari-common';
import { api, formQuery } from '../../common';

type QueryBookmarkedRoom = Omit<QueryBookmarkedRoomAPI, 'token'>;

const bookmarkedRoomsRoute = '/bookmarked-rooms';

const formBookmarkedRoomsQuery = (query: QueryBookmarkedRoom) =>
    formQuery({ type: 'bookmarkedRoom', query });

const formBookmarkedRoomsAPIQuery = (query: QueryBookmarkedRoomAPI) =>
    `${api}${bookmarkedRoomsRoute}/${formQuery({
        type: 'bookmarkedRoomAPI',
        query,
    })}`;

export {
    formBookmarkedRoomsAPIQuery,
    formBookmarkedRoomsQuery,
    bookmarkedRoomsRoute,
};

export type { QueryBookmarkedRoom };
