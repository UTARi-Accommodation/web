import {
    formGeneralUnitsQuery,
    formGeneralUnitsAPIQuery,
} from '../../../src/url/query/general/unit';

const testFormGeneralUnitsQueryParam = () =>
    describe('General Unit Query Object to Query URL Param', () => {
        it('should form query params based on param object', () => {
            expect(
                formGeneralUnitsQuery({
                    bathRooms: [],
                    bedRooms: [],
                    maxRental: undefined,
                    minRental: undefined,
                    search: undefined,
                    unitType: 'Condominium',
                    region: 'BTHO',
                    page: 1,
                })
            ).toBe('?unitType=Condominium&region=BTHO&page=1');
            expect(
                formGeneralUnitsAPIQuery({
                    bathRooms: [],
                    bedRooms: [],
                    maxRental: undefined,
                    minRental: undefined,
                    search: undefined,
                    unitType: 'Condominium',
                    region: 'BTHO',
                    page: 1,
                    token: '1',
                })
            ).toBe('/units/?unitType=Condominium&region=BTHO&page=1&token=1');
        });
        it('should form query params with empty key-value pair for falsy value', () => {
            expect(
                formGeneralUnitsQuery({
                    bathRooms: [0, 1],
                    bedRooms: [0, 2],
                    maxRental: 0,
                    minRental: 0,
                    search: '',
                    unitType: 'Condominium',
                    region: 'BTHO',
                    page: 1,
                })
            ).toBe(
                '?bathRooms=1&bedRooms=2&unitType=Condominium&region=BTHO&page=1'
            );
            expect(
                formGeneralUnitsAPIQuery({
                    bathRooms: [0, 1],
                    bedRooms: [0, 2],
                    maxRental: 0,
                    minRental: 0,
                    search: '',
                    unitType: 'Condominium',
                    region: 'BTHO',
                    page: 1,
                    token: '1',
                })
            ).toBe(
                '/units/?bathRooms=1&bedRooms=2&unitType=Condominium&region=BTHO&page=1&token=1'
            );
        });
        it('should form query params with joined string separated by delimiter of "," for array type query', () => {
            expect(
                formGeneralUnitsQuery({
                    bathRooms: [1, 2, 3, 4, 5],
                    bedRooms: [1, 2, 3, 4, 5, 6],
                    maxRental: 0,
                    minRental: 0,
                    search: undefined,
                    unitType: 'Condominium',
                    region: 'BTHO',
                    page: 1,
                })
            ).toBe(
                '?bathRooms=1,2,3,4,5&bedRooms=1,2,3,4,5,6&unitType=Condominium&region=BTHO&page=1'
            );
            expect(
                formGeneralUnitsAPIQuery({
                    bathRooms: [1, 2, 3, 4, 5],
                    bedRooms: [1, 2, 3, 4, 5, 6],
                    maxRental: 0,
                    minRental: 0,
                    search: undefined,
                    unitType: 'Condominium',
                    region: 'BTHO',
                    page: 1,
                    token: '1',
                })
            ).toBe(
                '/units/?bathRooms=1,2,3,4,5&bedRooms=1,2,3,4,5,6&unitType=Condominium&region=BTHO&page=1&token=1'
            );
        });
    });

export default testFormGeneralUnitsQueryParam;
