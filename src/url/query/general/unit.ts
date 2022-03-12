import { QueryUnitsAPI } from 'utari-common';
import { api, formQuery } from '../../common';

type QueryUnit = Omit<QueryUnitsAPI, 'token'>;

const housesRoute = '/houses',
    condominiumsRoute = '/condominiums';

const formGeneralUnitsQuery = (query: QueryUnit) =>
    formQuery({ type: 'unit', query });

const formGeneralUnitsAPIQuery = (query: QueryUnitsAPI) =>
    `${api}/units/${formQuery({ type: 'unitAPI', query })}`;

export {
    formGeneralUnitsAPIQuery,
    formGeneralUnitsQuery,
    housesRoute,
    condominiumsRoute,
};

export type { QueryUnit };
