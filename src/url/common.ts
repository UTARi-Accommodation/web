import { QueryUnit } from './query/general/unit';
import { QueryRoom } from './query/general/room';
import {
    QueryBookmarkedRoom,
    QueryBookmarkedRoomAPI,
    QueryBookmarkedUnit,
    QueryBookmarkedUnitAPI,
    QueryDetailedAPI,
    QueryRoomsAPI,
    QueryUnitsAPI,
} from 'utari-common';
import { QueryDetailed } from './query/detailed/common';

const api = `${process.env.NODE_ENV === 'test' ? 'test' : process.env.API}/api`;

const formQuery = (
    query: Readonly<
        | {
              type: 'unit';
              query: QueryUnit;
          }
        | {
              type: 'room';
              query: QueryRoom;
          }
        | {
              type: 'unitAPI';
              query: QueryUnitsAPI;
          }
        | {
              type: 'roomsAPI';
              query: QueryRoomsAPI;
          }
        | {
              type: 'bookmarkedRoom';
              query: QueryBookmarkedRoom;
          }
        | {
              type: 'bookmarkedUnit';
              query: QueryBookmarkedUnit;
          }
        | {
              type: 'bookmarkedRoomAPI';
              query: QueryBookmarkedRoomAPI;
          }
        | {
              type: 'bookmarkedUnitAPI';
              query: QueryBookmarkedUnitAPI;
          }
        | {
              type: 'detailed';
              query: QueryDetailed;
          }
        | {
              type: 'detailedAPI';
              query: QueryDetailedAPI;
          }
    >
): string =>
    `?${Object.entries(query.query)
        .filter(([_, value]) => value)
        .map(([key, value]) => {
            if (Array.isArray(value)) {
                const valueURL = value.filter(Boolean).join(',');
                return !valueURL ? '' : `${key}=${valueURL}`;
            }
            return `${key}=${value}`;
        })
        .filter(Boolean)
        .join('&')}`;

export { formQuery, api };
