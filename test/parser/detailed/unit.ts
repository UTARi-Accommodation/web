import { parseAsQueryUnit } from '../../../src/parser/detailed/unit';
import { parseAsQueriedUnit } from '../../../src/parser/detailed/unit';
import { describe, it, expect } from 'vitest';

const testDetailedUnitQueryParser = () =>
    describe('Detailed Unit Query Param Parser', () => {
        it('should parse query param object from query param', () => {
            expect(
                parseAsQueryUnit(new URLSearchParams('?id=1'))
            ).toStrictEqual({
                id: 1,
            });
        });
    });

const testDetailedUnitQueriedParser = () =>
    describe('Detailed Unit Parse Query Results', () => {
        it('should parse the queried units correctly', () => {
            const unit = {
                id: 9,
                handler: { name: 'Lee Yuan Khai', handlerType: 'Owner' },
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
                properties: { bedRooms: 10, rental: 2600, bathRooms: 5 },
                bookmarked: false,
                visitCount: 2,
                ratings: [3],
                rating: undefined,
            };
            expect(parseAsQueriedUnit(unit)).toStrictEqual(unit);
        });
        it('should fail to parse because it lacks bookmarked and rating field', () => {
            const unit = {
                id: 9,
                handler: { name: 'Lee Yuan Khai', handlerType: 'Owner' },
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
                properties: { bedRooms: 10, rental: 2600, bathRooms: 5 },
                visitCount: 2,
                ratings: [3],
            };
            expect(() => parseAsQueriedUnit(unit)).toThrowError();
        });
    });

export { testDetailedUnitQueriedParser, testDetailedUnitQueryParser };
