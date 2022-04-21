import {
    parseAsQueryUnits,
    parseAsDownloadQueriedUnits,
} from '../../../src/parser/bookmarked/unit';

const testBookmarkedUnitQueryParser = () =>
    describe('Bookmarked Unit Query Param Parser', () => {
        it('should parse query param object from query param', () => {
            expect(
                parseAsQueryUnits(
                    new URLSearchParams('?unitTypes=House&regions=BTHO&page=1')
                )
            ).toStrictEqual({
                bathRooms: [],
                bedRooms: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                regions: ['BTHO'],
                unitTypes: ['House'],
                page: 1,
            });
        });
        it('should parse array value for string joined by "," delimiter', () => {
            expect(
                parseAsQueryUnits(
                    new URLSearchParams(
                        '?bathRooms=1,2,3,4,5&bedRooms=1,2,3,5&unitTypes=House,Condominium&regions=BTHO,SL,KP&page=100'
                    )
                )
            ).toStrictEqual({
                bathRooms: [1, 2, 3, 4, 5],
                bedRooms: [1, 2, 3, 5],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                regions: ['BTHO', 'SL', 'KP'],
                unitTypes: ['House', 'Condominium'],
                page: 100,
            });
        });
        it('should return default value for regions, unitTypes, bathRooms, bedRooms and page should it fail to parse', () => {
            expect(parseAsQueryUnits(new URLSearchParams(''))).toStrictEqual({
                bathRooms: [],
                bedRooms: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                regions: [],
                unitTypes: [],
                page: 1,
            });
        });
    });

const testBookmarkedUnitQueriedParser = () =>
    describe('Bookmarked Unit Queried Results Parser', () => {
        it('should parse the queried bookmarked units correctly', () => {
            const units = [
                {
                    id: 9,
                    handler: {
                        name: 'Lee Yuan Khai',
                        handlerType: 'Owner',
                    },
                    contact: {
                        mobileNumber: ['0173339988'],
                        email: ['yklee1306@gmail.com'],
                    },
                    timeCreated: new Date('2022-03-04T08:57:38.156Z'),
                    address:
                        '1447, Jln Seksyen 1/4, Bandar Barat, 31900, Kampar, Perak',
                    facilities:
                        'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Parking Bay · Internet · Washing Machine · Water Heater',
                    remarks: {
                        remark: 'New 8" mattress, water filter',
                        year: 2021,
                        month: 'December',
                    },
                    properties: { bedRooms: 10, rental: 2600, bathRooms: 5 },
                    ratings: [3],
                    rating: 4,
                },
            ];
            expect(
                parseAsDownloadQueriedUnits(JSON.parse(JSON.stringify(units)))
            ).toStrictEqual(units);
        });
        it('should fail to parse because it did not contain the rental in its properties', () => {
            const units = [
                {
                    id: 9,
                    handler: {
                        name: 'Lee Yuan Khai',
                        handlerType: 'Owner',
                    },
                    contact: {
                        mobileNumber: ['0173339988'],
                        email: ['yklee1306@gmail.com'],
                    },
                    timeCreated: new Date('2022-03-04T08:57:38.156Z'),
                    address:
                        '1447, Jln Seksyen 1/4, Bandar Barat, 31900, Kampar, Perak',
                    facilities:
                        'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Parking Bay · Internet · Washing Machine · Water Heater',
                    remarks: {
                        remark: 'New 8" mattress, water filter',
                        year: 2021,
                        month: 'December',
                    },
                    properties: {
                        bedRooms: 10,
                        bathRooms: 5,
                    },
                    rating: 3,
                    ratings: [3],
                },
            ];
            expect(() =>
                parseAsDownloadQueriedUnits(JSON.parse(JSON.stringify(units)))
            ).toThrowError();
        });
    });

export { testBookmarkedUnitQueriedParser, testBookmarkedUnitQueryParser };
