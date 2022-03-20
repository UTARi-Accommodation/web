import {
    parseAsQueryRooms,
    parseAsDownloadQueriedRooms,
} from '../../../src/parser/bookmarked/room';

export default () =>
    describe('Query URL Param to Object Bookmarked Room Query', () => {
        it('should form query param object', () => {
            expect(
                parseAsQueryRooms(
                    new URLSearchParams('?roomTypes=Room&regions=BTHO&page=1')
                )
            ).toStrictEqual({
                capacities: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                regions: ['BTHO'],
                roomTypes: ['Room'],
                page: 1,
            });
        });
        it(`should form array value for string joined by ',' delimiter`, () => {
            expect(
                parseAsQueryRooms(
                    new URLSearchParams(
                        '?capacities=1,2,3,4,5&roomTypes=Room,Roommate&regions=BTHO,SL,KP&page=100'
                    )
                )
            ).toStrictEqual({
                capacities: [1, 2, 3, 4, 5],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                regions: ['BTHO', 'SL', 'KP'],
                roomTypes: ['Room', 'Roommate'],
                page: 100,
            });
        });
        it('should return default value for regions, roomTypes, capacities and page should it fail to parse', () => {
            expect(parseAsQueryRooms(new URLSearchParams(''))).toStrictEqual({
                capacities: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                regions: [],
                roomTypes: [],
                page: 1,
            });
        });
    });

describe('Parse Query Results Bookmarked Room', () => {
    it('should parse the queried units correctly', () => {
        const rooms = [
            {
                id: 12,
                handler: {
                    name: 'Lee Yuan Khai',
                    handlerType: 'Owner',
                },
                contact: {
                    mobileNumber: ['0173339988'],
                    email: ['yklee1306@gmail.com'],
                },
                timeCreated: new Date('2022-03-03T12:49:55.258Z'),
                address:
                    '1447, Jln Seksyen 1/4, Bandar Barat, 31900, Kampar, Perak',
                facilities:
                    'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Parking Bay · Internet · Washing Machine · Water Heater',
                remarks: {
                    remark: 'New 8" mattress, water filter',
                    year: 2021,
                    month: 'December',
                },
                properties: { size: 'Master', capacities: [7], rental: 320 },
                ratings: [3],
                rating: 4,
            },
        ];
        expect(
            parseAsDownloadQueriedRooms(JSON.parse(JSON.stringify(rooms)))
        ).toStrictEqual(rooms);
    });
    it('should fail to parse', () => {
        const rooms = [
            {
                id: 12,
                handler: {
                    name: 'Lee Yuan Khai',
                    handlerType: 'Owner',
                },
                contact: {
                    mobileNumber: ['0173339988'],
                    email: ['yklee1306@gmail.com'],
                },
                timeCreated: new Date('2022-03-03T12:49:55.258Z'),
                address:
                    '1447, Jln Seksyen 1/4, Bandar Barat, 31900, Kampar, Perak',
                facilities:
                    'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Parking Bay · Internet · Washing Machine · Water Heater',
                remarks: {
                    remark: 'New 8" mattress, water filter',
                    year: 2021,
                    month: 'December',
                },
                properties: { size: 'Master', capacities: [7], rental: 320 },
                rating: 4,
            },
        ];
        expect(() =>
            parseAsDownloadQueriedRooms(JSON.parse(JSON.stringify(rooms)))
        ).toThrowError();
    });
});
