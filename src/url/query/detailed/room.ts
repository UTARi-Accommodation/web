import { QueryDetailedAPI } from 'utari-common';
import { formDetailedAPIQuery } from './common';

const detailedRoomRoute = '/detailed-room';

const formDetailedRoomAPIQuery = (query: QueryDetailedAPI) =>
    `${detailedRoomRoute}/${formDetailedAPIQuery(query)}`;

export { formDetailedRoomAPIQuery, detailedRoomRoute };
