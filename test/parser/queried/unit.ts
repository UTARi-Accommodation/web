import { parseAsUnitsQueried } from '../../../src/parser/parser';
import { describe, it, expect } from 'vitest';

const testUnitsQueriedParser = () =>
    describe('All Unit Information Queried Parser', () => {
        it('should parse the units queried fields correctly', () => {
            const data = {
                units: [
                    {
                        id: 5,
                        location: {
                            address:
                                '12-8, Taming Mutiara, 43200, Kajang, Selangor',
                            coordinate: {
                                latitude: 3.022523,
                                longitude: 101.762727,
                            },
                        },
                        properties: {
                            bedRooms: 3,
                            rental: 900,
                            bathRooms: 2,
                        },
                        ratings: [],
                        facilities: 'Parking Bay · Water Heater',
                        remarks: {
                            year: 2020,
                            month: 'January',
                        },
                        bookmarked: false,
                    },
                    {
                        id: 2,
                        location: {
                            address:
                                'C-3-10, Mahkota Garden, Persiaran Residence, Bandar Mahkota Cheras, 43200, Cheras, Selangor',
                            coordinate: {
                                latitude: 3.049859,
                                longitude: 101.783509,
                            },
                        },
                        properties: {
                            bedRooms: 3,
                            rental: 1000,
                            bathRooms: 2,
                        },
                        ratings: [],
                        facilities:
                            'Fan · Air-Conditioner · Parking Bay · Water Heater · Gym, swimming pool, sauna',
                        remarks: {
                            year: 2020,
                            month: 'May',
                        },
                        bookmarked: false,
                    },
                ],
                numberOfResultsQueried: 6,
                rentalRangeFrequencies: [
                    [900, 1],
                    [1000, 1],
                    [1100, 1],
                    [1400, 2],
                    [1650, 1],
                ],
                bedRooms: [3, 4],
                bathRooms: [2],
                page: 1,
                totalPage: 1,
                center: {
                    lat: 3.0376206220165254,
                    lng: 101.78558248327505,
                },
            };
            expect(parseAsUnitsQueried(data)).toStrictEqual(data);
        });
        it('should failed to parse the units queried fields correctly because id of a unit is missing', () => {
            const data = {
                units: [
                    {
                        location: {
                            address:
                                '12-8, Taming Mutiara, 43200, Kajang, Selangor',
                            coordinate: {
                                latitude: 3.022523,
                                longitude: 101.762727,
                            },
                        },
                        properties: {
                            bedRooms: 3,
                            rental: 900,
                            bathRooms: 2,
                        },
                        ratings: [],
                        facilities: 'Parking Bay · Water Heater',
                        remarks: {
                            year: 2020,
                            month: 'January',
                        },
                        bookmarked: false,
                    },
                    {
                        id: 2,
                        location: {
                            address:
                                'C-3-10, Mahkota Garden, Persiaran Residence, Bandar Mahkota Cheras, 43200, Cheras, Selangor',
                            coordinate: {
                                latitude: 3.049859,
                                longitude: 101.783509,
                            },
                        },
                        properties: {
                            bedRooms: 3,
                            rental: 1000,
                            bathRooms: 2,
                        },
                        ratings: [],
                        facilities:
                            'Fan · Air-Conditioner · Parking Bay · Water Heater · Gym, swimming pool, sauna',
                        remarks: {
                            year: 2020,
                            month: 'May',
                        },
                        bookmarked: false,
                    },
                ],
                numberOfResultsQueried: 6,
                rentalRangeFrequencies: [
                    [900, 1],
                    [1000, 1],
                    [1100, 1],
                    [1400, 2],
                    [1650, 1],
                ],
                bedRooms: [3, 4],
                bathRooms: [2],
                page: 1,
                totalPage: 1,
                center: {
                    lat: 3.0376206220165254,
                    lng: 101.78558248327505,
                },
            };
            expect(() => parseAsUnitsQueried(data)).toThrowError();
        });
    });

export default testUnitsQueriedParser;
