import { parseAsNumber, parseAsReadonlyObject } from 'parse-dont-validate';
import { parseAsRental } from '../parser';

const parseAsProperties = (properties: any) =>
    parseAsReadonlyObject(properties, (properties) => ({
        bedRooms: parseAsNumber(properties.bedRooms).orElseThrowDefault(
            'bedRooms'
        ),
        bathRooms: parseAsNumber(properties.bathRooms).orElseThrowDefault(
            'bathRooms'
        ),
        rental: parseAsRental(properties.rental),
    })).orElseThrowDefault('unit properties');

export { parseAsProperties };
