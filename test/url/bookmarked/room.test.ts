import {
    formBookmarkedRoomsQuery,
    formBookmarkedRoomsAPIQuery,
} from '../../../src/url/query/bookmarked/room';

describe('Object Bookmarked Room Query Object to Query URL Param', () => {
    it('should form query URL based on param object', () => {
        expect(
            formBookmarkedRoomsQuery({
                capacities: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                roomTypes: ['Room'],
                regions: ['BTHO'],
                page: 1,
            })
        ).toBe('?roomTypes=Room&regions=BTHO&page=1');
        expect(
            formBookmarkedRoomsAPIQuery({
                capacities: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                roomTypes: ['Room'],
                regions: ['BTHO'],
                page: 1,
                token: '1',
            })
        ).toBe(
            'test/api/bookmarked-rooms/?roomTypes=Room&regions=BTHO&page=1&token=1'
        );
    });
    it('should form query URL with empty key-value pair for falsy value', () => {
        expect(
            formBookmarkedRoomsQuery({
                capacities: [0],
                maxRental: 0,
                minRental: 0,
                search: '',
                roomTypes: ['Room', 'Roommate'],
                regions: ['BTHO', 'KP'],
                page: 1,
            })
        ).toBe('?roomTypes=Room,Roommate&regions=BTHO,KP&page=1');
        expect(
            formBookmarkedRoomsAPIQuery({
                capacities: [0],
                maxRental: 0,
                minRental: 0,
                search: '',
                roomTypes: ['Room', 'Roommate'],
                regions: ['BTHO', 'KP'],
                page: 1,
                token: '1',
            })
        ).toBe(
            'test/api/bookmarked-rooms/?roomTypes=Room,Roommate&regions=BTHO,KP&page=1&token=1'
        );
    });
    it('should form query URL with joined string for array type query', () => {
        expect(
            formBookmarkedRoomsQuery({
                capacities: [1, 2, 3, 4, 5],
                maxRental: 0,
                minRental: 0,
                search: undefined,
                roomTypes: ['Room'],
                regions: ['BTHO'],
                page: 1,
            })
        ).toBe('?capacities=1,2,3,4,5&roomTypes=Room&regions=BTHO&page=1');
        expect(
            formBookmarkedRoomsAPIQuery({
                capacities: [1, 2, 3, 4, 5],
                maxRental: 0,
                minRental: 0,
                search: undefined,
                roomTypes: ['Room'],
                regions: ['BTHO'],
                page: 1,
                token: '123',
            })
        ).toBe(
            'test/api/bookmarked-rooms/?capacities=1,2,3,4,5&roomTypes=Room&regions=BTHO&page=1&token=123'
        );
    });
});
