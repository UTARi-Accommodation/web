import {
    parseAsQueriedUnits,
    parseAsQueryUnits,
} from '../../../src/parser/general/unit';

const testGeneralUnitQueryParser = () =>
    describe('General Unit Query Param Parser', () => {
        it('should parse query param object from query param', () => {
            expect(
                parseAsQueryUnits(
                    new URLSearchParams(
                        '?unitType=Condominium&region=BTHO&page=1'
                    ),
                    {
                        region: 'KP',
                        unitType: 'House',
                    }
                )
            ).toStrictEqual({
                bathRooms: [],
                bedRooms: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                unitType: 'Condominium',
                region: 'BTHO',
                page: 1,
            });
        });
        it('should parse array value for string joined by "," delimiter', () => {
            expect(
                parseAsQueryUnits(
                    new URLSearchParams(
                        '?bathRooms=1,2,3,4,5&bedRooms=1,2,3,4,5,6&unitType=Condominium&region=BTHO&page=1'
                    ),
                    {
                        region: 'SL',
                        unitType: 'House',
                    }
                )
            ).toStrictEqual({
                bathRooms: [1, 2, 3, 4, 5],
                bedRooms: [1, 2, 3, 4, 5, 6],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                unitType: 'Condominium',
                region: 'BTHO',
                page: 1,
            });
        });
        it('should return default value of region, unitType, page, bathRooms and bedRooms should it fail to parse', () => {
            expect(
                parseAsQueryUnits(new URLSearchParams(''), {
                    region: 'KP',
                    unitType: 'House',
                })
            ).toStrictEqual({
                bathRooms: [],
                bedRooms: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                region: 'KP',
                unitType: 'House',
                page: 1,
            });
        });
    });

const testGeneralUnitQueriedParser = () =>
    describe('Parse General Unit Queried Results', () => {
        it('should parse the queried units correctly', () => {
            const units = [
                {
                    id: 1,
                    bookmarked: false,
                    location: {
                        address:
                            'C-3-10, Mahkota Garden, Persiaran Residence, Bandar Mahkota Cheras, 43200, Cheras, Selangor',
                        coordinate: {
                            latitude: 3.049859,
                            longitude: 101.783509,
                        },
                    },
                    facilities:
                        'Fan · Air-Conditioner · Parking Bay · Water Heater · Gym, swimming pool, sauna',
                    remarks: {
                        month: 'May',
                        year: 2020,
                    },
                    properties: {
                        bedRooms: 3,
                        bathRooms: 2,
                        rental: 1000,
                    },
                    ratings: [],
                },
                {
                    id: 2,
                    bookmarked: true,
                    location: {
                        address:
                            'A-33, Landmark Residence 1, 43000, Kajang, Selangor',
                        coordinate: {
                            latitude: 3.036199,
                            longitude: 101.772464,
                        },
                    },
                    facilities:
                        'Fan · Air-Conditioner · Parking Bay · Water Heater',
                    remarks: {
                        month: 'January',
                        year: 2020,
                    },
                    properties: {
                        bedRooms: 3,
                        bathRooms: 2,
                        rental: 1400,
                    },
                    ratings: [],
                },
            ];
            expect(parseAsQueriedUnits(units)).toStrictEqual(units);
        });
        it('should fail to parse because it did not contain bookmarked field', () => {
            const units = [
                {
                    id: 2,
                    location: {
                        address:
                            'A-33, Landmark Residence 1, 43000, Kajang, Selangor',
                    },
                    facilities:
                        'Fan · Air-Conditioner · Parking Bay · Water Heater',
                    remarks: {
                        month: 'January',
                        year: 2020,
                    },
                    properties: {
                        bedRooms: 3,
                        bathRooms: 2,
                        rental: 1400,
                    },
                    ratings: [],
                },
            ];
            expect(() => parseAsQueriedUnits(units)).toThrowError();
        });
    });

export { testGeneralUnitQueriedParser, testGeneralUnitQueryParser };
