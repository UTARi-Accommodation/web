import { parseAsNumber, parseAsReadonlyObject } from 'parse-dont-validate';
import { parseAsRental } from '../parser';

const parseAsProperties = (properties: any) =>
    parseAsReadonlyObject(properties, (properties) => ({
        bedRooms: parseAsNumber(properties.bedRooms).elseThrow(
            `bedRooms is not a number, it is ${properties.bedRooms}`
        ),
        bathRooms: parseAsNumber(properties.bathRooms).elseThrow(
            `bathRooms is not a number, it is ${properties.bathRooms}`
        ),
        rental: parseAsRental(properties.rental),
    })).elseThrow(`properties is an object, it is ${properties}`);

export { parseAsProperties };
