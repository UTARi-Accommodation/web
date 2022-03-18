import { QueryBookmarkedUnitAPI } from 'utari-common';
import { formQuery } from '../../common';

type QueryBookmarkedUnit = Omit<QueryBookmarkedUnitAPI, 'token'>;

const bookmarkedUnitsRoute = '/bookmarked-units';

const formBookmarkedUnitsQuery = (query: QueryBookmarkedUnit) =>
    formQuery({ type: 'bookmarkedUnit', query });

const formBookmarkedUnitsAPIQuery = (query: QueryBookmarkedUnitAPI) =>
    `${bookmarkedUnitsRoute}/${formQuery({
        type: 'bookmarkedUnitAPI',
        query,
    })}`;

export {
    formBookmarkedUnitsAPIQuery,
    formBookmarkedUnitsQuery,
    bookmarkedUnitsRoute,
};

export type { QueryBookmarkedUnit };
