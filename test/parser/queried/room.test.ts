import { parseAsRoomsQueried } from '../../../src/parser/parser';

describe('Parse Queried Fields Results', () => {
    it('should parse the rooms queried fields correctly', () => {
        const data = {
            rooms: [
                {
                    id: 45,
                    location: {
                        address:
                            '32a, Jalan Putera 7/1, Bandar Mahkota Cheras, 43200, Kajang, Selangor',
                        coordinate: {
                            latitude: 3.046815,
                            longitude: 101.786024,
                        },
                    },
                    properties: { size: 'Small', capacities: [1], rental: 380 },
                    ratings: [4],
                    facilities:
                        'Table · Chair · Cupboard · Fan · Internet · Washing Machine · Water Heater',
                    remarks: { year: 2020, month: 'August' },
                    bookmarked: false,
                },
                {
                    id: 144,
                    location: {
                        address:
                            'A-5-12, Mahkota Garden Condo, Jln Mahkota Garden, Bandar Mahkota Cheras 43200, Cheras, Selangor',
                        coordinate: {
                            latitude: 3.049859,
                            longitude: 101.783509,
                        },
                    },
                    properties: {
                        size: 'Middle',
                        capacities: [1, 2],
                        rental: 500,
                    },
                    ratings: [],
                    facilities:
                        'Bed · Table · Chair · Cupboard · Fan · Air-Conditioner · Parking Bay · Internet · Washing Machine · Water Heater',
                    remarks: { year: 2020, month: 'January' },
                    bookmarked: false,
                },
            ],
            numberOfResultsQueried: 11,
            rentalRangeFrequencies: [
                [300, 1],
                [380, 1],
                [400, 1],
                [475, 1],
                [500, 4],
                [550, 2],
                [600, 1],
            ],
            capacities: [1, 2],
            page: 1,
            totalPage: 1,
            center: { lat: 3.04439459901317, lng: 101.79291207873595 },
        };
        expect(parseAsRoomsQueried(data)).toStrictEqual(data);
    });
});
