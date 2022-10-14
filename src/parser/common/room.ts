import {
    parseAsCustomType,
    parseAsNumber,
    parseAsReadonlyArray,
} from 'parse-dont-validate';
import { RoomSize } from 'utari-common';
import { parseAsRental } from '../parser';

const parseAsRoomSize = (size: unknown) =>
    parseAsCustomType<RoomSize>(
        size,
        (size) => size === 'Master' || size === 'Middle' || size === 'Small'
    ).elseThrow(`roomSize is not type of RoomSize, it is ${size}`);

const parseAsRoomCapacity = (capacities: unknown) =>
    parseAsReadonlyArray(capacities, (capacity) =>
        parseAsNumber(capacity).elseThrow(
            `capacity is not a number, it is ${capacity}`
        )
    ).elseThrow(`capacities is not an array, it is ${capacities}`);

const parseAsProperties = (properties: any) =>
    ({
        capacities: parseAsRoomCapacity(properties.capacities),
        size: parseAsRoomSize(properties.size),
        rental: parseAsRental(properties.rental),
    } as const);

export { parseAsProperties };
