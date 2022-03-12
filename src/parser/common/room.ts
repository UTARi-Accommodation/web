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
    ).orElseThrowDefault('roomSize');

const parseAsRoomCapacity = (capacities: unknown) =>
    parseAsReadonlyArray(capacities, (capacity) =>
        parseAsNumber(capacity).orElseThrowDefault('capacity')
    ).orElseThrowDefault('capacities');

const parseAsProperties = (properties: any) =>
    ({
        capacities: parseAsRoomCapacity(properties.capacities),
        size: parseAsRoomSize(properties.size),
        rental: parseAsRental(properties.rental),
    } as const);

export { parseAsProperties };
