import { QueryDetailedAPI } from 'utari-common';
import { formDetailedAPIQuery } from './common';

const detailedUnitRoute = '/detailed-unit';

const formDetailedUnitAPIQuery = (query: QueryDetailedAPI) =>
    `${detailedUnitRoute}/${formDetailedAPIQuery(query)}`;

export { formDetailedUnitAPIQuery, detailedUnitRoute };
