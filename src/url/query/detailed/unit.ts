import { QueryDetailedAPI } from 'utari-common';
import { formDetailedAPIQuery } from './common';
import { api } from '../../common';

const detailedUnitRoute = '/detailed-unit';

const formDetailedUnitAPIQuery = (query: QueryDetailedAPI) =>
    `${api}${detailedUnitRoute}/${formDetailedAPIQuery(query)}`;

export { formDetailedUnitAPIQuery, detailedUnitRoute };
