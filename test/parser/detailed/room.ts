import { parseAsQueryRoom } from '../../../src/parser/detailed/room';
import { parseAsQueriedRoom } from '../../../src/parser/detailed/room';

const testDetailedRoomQueryParser = () =>
    describe('Detailed Room Query Param Parser', () => {
        it('should parse query param object from query param', () => {
            expect(
                parseAsQueryRoom(new URLSearchParams('?id=1'))
            ).toStrictEqual({
                id: 1,
            });
        });
    });

const testDetailedRoomQueriedParser = () =>
    describe('Detailed Room Parse Query Results', () => {
        it('should parse the queried rooms correctly', () => {
            const room = {
                id: 12,
                handler: {
                    name: 'Lee Yuan Khai',
                    handlerType: 'Owner',
                },
                contact: {
                    mobileNumber: ['0173339988'],
                    email: ['yklee1306@gmail.com'],
                },
                location: {
                    address:
                        '1447, Jln Seksyen 1/4, Bandar Barat, 31900, Kampar, Perak',
                    coordinate: {
                        latitude: 4.329029,
                        longitude: 101.134634,
                    },
                },
                facilities:
                    'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Parking Bay · Internet · Washing Machine · Water Heater',
                remarks: {
                    remark: 'New 8" mattress, water filter',
                    year: 2021,
                    month: 'December',
                },
                properties: {
                    size: 'Master',
                    capacities: [7],
                    rental: 320,
                },
                bookmarked: false,
                visitCount: 2,
                ratings: [3],
                rating: undefined,
            };
            expect(parseAsQueriedRoom(room)).toStrictEqual(room);
        });
        it('should fail to parse because it lacks bookmarked and rating field', () => {
            const room = {
                id: 12,
                handler: {
                    name: 'Lee Yuan Khai',
                    handlerType: 'Owner',
                },
                contact: {
                    mobileNumber: ['0173339988'],
                    email: ['yklee1306@gmail.com'],
                },
                location: {
                    address:
                        '1447, Jln Seksyen 1/4, Bandar Barat, 31900, Kampar, Perak',
                    coordinate: {
                        latitude: 4.329029,
                        longitude: 101.134634,
                    },
                },
                facilities:
                    'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Parking Bay · Internet · Washing Machine · Water Heater',
                remarks: {
                    remark: 'New 8" mattress, water filter',
                    year: 2021,
                    month: 'December',
                },
                properties: {
                    size: 'Master',
                    capacities: [7],
                    rental: 320,
                },
                visitCount: 2,
                ratings: [3],
            };
            expect(() => parseAsQueriedRoom(room)).toThrowError();
        });
    });

export { testDetailedRoomQueriedParser, testDetailedRoomQueryParser };
