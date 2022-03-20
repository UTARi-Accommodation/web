import {
    parseAsQueriedRooms,
    parseAsQueryRooms,
} from '../../../src/parser/general/room';

export default () =>
    describe('Query URL Param to Object', () => {
        describe('General Room Query', () => {
            it('should form query param object', () => {
                expect(
                    parseAsQueryRooms(
                        new URLSearchParams(
                            '?roomType=Room&region=BTHO&page=1'
                        ),
                        {
                            region: 'KP',
                            roomType: 'Roommate',
                        }
                    )
                ).toStrictEqual({
                    capacities: [],
                    maxRental: undefined,
                    minRental: undefined,
                    search: undefined,
                    region: 'BTHO',
                    roomType: 'Room',
                    page: 1,
                });
            });
            it(`should form array value for string joined by ',' delimiter`, () => {
                expect(
                    parseAsQueryRooms(
                        new URLSearchParams(
                            '?capacities=1,2,3,4,5&roomType=Room&region=BTHO&page=100'
                        ),
                        {
                            region: 'SL',
                            roomType: 'Roommate',
                        }
                    )
                ).toStrictEqual({
                    capacities: [1, 2, 3, 4, 5],
                    maxRental: undefined,
                    minRental: undefined,
                    search: undefined,
                    region: 'BTHO',
                    roomType: 'Room',
                    page: 100,
                });
            });
            it('should return default value of region, roomType, page and capacities should it fail to parse', () => {
                expect(
                    parseAsQueryRooms(new URLSearchParams(''), {
                        region: 'KP',
                        roomType: 'Roommate',
                    })
                ).toStrictEqual({
                    capacities: [],
                    maxRental: undefined,
                    minRental: undefined,
                    search: undefined,
                    region: 'KP',
                    roomType: 'Roommate',
                    page: 1,
                });
            });
        });
    });

describe('Parse Query Results', () => {
    describe('General Room', () => {
        it('should parse the queried rooms correctly', () => {
            const rooms = [
                {
                    id: 1,
                    bookmarked: true,
                    location: {
                        address:
                            '32A, Jalan Putera 7/1, Bandar Mahkota Cheras, 43200, Kajang, Selangor',
                        coordinate: {
                            latitude: 3.046815,
                            longitude: 101.786024,
                        },
                    },
                    facilities:
                        'Table · Chair · Cupboard · Fan · Internet · Washing Machine · Water Heater',
                    remarks: {
                        year: 2020,
                        month: 'August',
                    },
                    properties: {
                        size: 'Small',
                        rental: 380,
                        capacities: [1],
                    },
                    ratings: [],
                },
                {
                    id: 2,
                    bookmarked: false,
                    location: {
                        address:
                            '13A-13, The I Residence Comdominium, Bandar Mahkota Cheras, 43200, Cheras, Selangor',
                        coordinate: {
                            latitude: 3.049361,
                            longitude: 101.792054,
                        },
                    },
                    facilities:
                        'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Internet · Washing Machine · Water Heater',
                    remarks: {
                        year: 2020,
                        month: 'September',
                    },
                    properties: {
                        size: 'Small',
                        rental: 500,
                        capacities: [1],
                    },
                    ratings: [],
                },
            ];
            expect(parseAsQueriedRooms(rooms)).toStrictEqual(rooms);
        });
        it('should fail to parse', () => {
            const rooms = [
                {
                    id: 4,
                    location: {
                        address:
                            'A-18-08, Sutera Pines, Jalan Sutera Pines, 43000, Kajang, Selangor',
                        coordinate: {
                            latitude: 3.026723,
                            longitude: 101.814524,
                        },
                    },
                    facilities:
                        'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Washing Machine · Water Heater',
                    remarks: {
                        year: 2020,
                        month: 'January',
                    },
                    properties: {
                        rental: 500,
                        capacities: [1],
                    },
                    ratings: [],
                },
            ];
            expect(() => parseAsQueriedRooms(rooms)).toThrowError();
        });
    });
});
