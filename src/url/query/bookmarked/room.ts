import { QueryBookmarkedRoomAPI } from 'utari-common';
import { formQuery } from '../../common';

type QueryBookmarkedRoom = Omit<QueryBookmarkedRoomAPI, 'token'>;

const bookmarkedRoomsRoute = '/bookmarked-rooms';

const formBookmarkedRoomsQuery = (query: QueryBookmarkedRoom) =>
    formQuery({ type: 'bookmarkedRoom', query });

const formBookmarkedRoomsAPIQuery = (query: QueryBookmarkedRoomAPI) =>
    `${bookmarkedRoomsRoute}/${formQuery({
        type: 'bookmarkedRoomAPI',
        query,
    })}`;

export {
    formBookmarkedRoomsAPIQuery,
    formBookmarkedRoomsQuery,
    bookmarkedRoomsRoute,
};

export type { QueryBookmarkedRoom };
