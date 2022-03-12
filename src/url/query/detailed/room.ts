import { QueryDetailedAPI } from 'utari-common';
import { formDetailedAPIQuery } from './common';
import { api } from '../../common';

const detailedRoomRoute = '/detailed-room';

const formDetailedRoomAPIQuery = (query: QueryDetailedAPI) =>
    `${api}${detailedRoomRoute}/${formDetailedAPIQuery(query)}`;

export { formDetailedRoomAPIQuery, detailedRoomRoute };
