import {
    formBookmarkedUnitsQuery,
    formBookmarkedUnitsAPIQuery,
} from '../../../src/url/query/bookmarked/unit';

const testFormBookmarkedUnitsQueryParam = () =>
    describe('Bookmarked Unit Query Object to Query URL Param', () => {
        it('should form query param based on param object', () => {
            expect(
                formBookmarkedUnitsQuery({
                    bathRooms: [],
                    bedRooms: [],
                    maxRental: undefined,
                    minRental: undefined,
                    search: undefined,
                    unitTypes: ['Condominium'],
                    regions: ['BTHO'],
                    page: 1,
                })
            ).toBe('?unitTypes=Condominium&regions=BTHO&page=1');
            expect(
                formBookmarkedUnitsAPIQuery({
                    bathRooms: [],
                    bedRooms: [],
                    maxRental: undefined,
                    minRental: undefined,
                    search: undefined,
                    unitTypes: ['Condominium'],
                    regions: ['BTHO'],
                    page: 1,
                    token: '1',
                })
            ).toBe(
                '/bookmarked-units/?unitTypes=Condominium&regions=BTHO&page=1&token=1'
            );
        });
        it('should form query param with empty key-value pair for falsy value', () => {
            expect(
                formBookmarkedUnitsQuery({
                    bathRooms: [0, 1],
                    bedRooms: [0, 2],
                    maxRental: 0,
                    minRental: 0,
                    search: '',
                    unitTypes: ['Condominium', 'House'],
                    regions: ['BTHO', 'SL'],
                    page: 1,
                })
            ).toBe(
                '?bathRooms=1&bedRooms=2&unitTypes=Condominium,House&regions=BTHO,SL&page=1'
            );
            expect(
                formBookmarkedUnitsAPIQuery({
                    bathRooms: [0, 1],
                    bedRooms: [0, 2],
                    maxRental: 0,
                    minRental: 0,
                    search: '',
                    unitTypes: ['Condominium', 'House'],
                    regions: ['BTHO', 'SL'],
                    page: 1,
                    token: '1',
                })
            ).toBe(
                '/bookmarked-units/?bathRooms=1&bedRooms=2&unitTypes=Condominium,House&regions=BTHO,SL&page=1&token=1'
            );
        });
        it('should form query param with joined string for array type query', () => {
            expect(
                formBookmarkedUnitsQuery({
                    bathRooms: [1, 2, 3, 4, 5],
                    bedRooms: [1, 2, 3, 4, 5, 6],
                    maxRental: 0,
                    minRental: 0,
                    search: undefined,
                    unitTypes: ['Condominium', 'House'],
                    regions: ['BTHO'],
                    page: 1,
                })
            ).toBe(
                '?bathRooms=1,2,3,4,5&bedRooms=1,2,3,4,5,6&unitTypes=Condominium,House&regions=BTHO&page=1'
            );
            expect(
                formBookmarkedUnitsAPIQuery({
                    bathRooms: [1, 2, 3, 4, 5],
                    bedRooms: [1, 2, 3, 4, 5, 6],
                    maxRental: 0,
                    minRental: 0,
                    search: undefined,
                    unitTypes: ['Condominium', 'House'],
                    regions: ['BTHO'],
                    page: 1,
                    token: '1',
                })
            ).toBe(
                '/bookmarked-units/?bathRooms=1,2,3,4,5&bedRooms=1,2,3,4,5,6&unitTypes=Condominium,House&regions=BTHO&page=1&token=1'
            );
        });
    });

export default testFormBookmarkedUnitsQueryParam;
