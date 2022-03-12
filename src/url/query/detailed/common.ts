import { QueryDetailedAPI } from 'utari-common';
import { formQuery } from '../../common';

type QueryDetailed = Omit<QueryDetailedAPI, 'token'>;

const formDetailedQuery = (query: QueryDetailed) =>
    formQuery({ type: 'detailed', query });

const formDetailedAPIQuery = (query: QueryDetailedAPI) =>
    formQuery({ type: 'detailedAPI', query });

export { formDetailedQuery, formDetailedAPIQuery };

export type { QueryDetailed };
