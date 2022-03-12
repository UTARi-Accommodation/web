import {
    formGeneralRoomsQuery,
    formGeneralRoomsAPIQuery,
} from '../../../src/url/query/general/room';

describe('Object Room Query Object to Query URL Param', () => {
    it('should form query URL based on param object', () => {
        expect(
            formGeneralRoomsQuery({
                capacities: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                roomType: 'Room',
                region: 'BTHO',
                page: 1,
            })
        ).toBe('?roomType=Room&region=BTHO&page=1');
        expect(
            formGeneralRoomsAPIQuery({
                capacities: [],
                maxRental: undefined,
                minRental: undefined,
                search: undefined,
                roomType: 'Room',
                region: 'BTHO',
                page: 1,
                token: '1',
            })
        ).toBe('test/api/rooms/?roomType=Room&region=BTHO&page=1&token=1');
    });
    it('should form query URL with empty key-value pair for falsy value', () => {
        expect(
            formGeneralRoomsQuery({
                capacities: [0],
                maxRental: 0,
                minRental: 0,
                search: '',
                roomType: 'Room',
                region: 'BTHO',
                page: 1,
            })
        ).toBe('?roomType=Room&region=BTHO&page=1');
        expect(
            formGeneralRoomsAPIQuery({
                capacities: [0],
                maxRental: 0,
                minRental: 0,
                search: '',
                roomType: 'Room',
                region: 'BTHO',
                page: 1,
                token: '1',
            })
        ).toBe('test/api/rooms/?roomType=Room&region=BTHO&page=1&token=1');
    });
    it('should form query URL with joined string for array type query', () => {
        expect(
            formGeneralRoomsQuery({
                capacities: [1, 2, 3, 4, 5],
                maxRental: 0,
                minRental: 0,
                search: undefined,
                roomType: 'Room',
                region: 'BTHO',
                page: 1,
            })
        ).toBe('?capacities=1,2,3,4,5&roomType=Room&region=BTHO&page=1');
        expect(
            formGeneralRoomsAPIQuery({
                capacities: [1, 2, 3, 4, 5],
                maxRental: 0,
                minRental: 0,
                search: undefined,
                roomType: 'Room',
                region: 'BTHO',
                page: 1,
                token: '1',
            })
        ).toBe(
            'test/api/rooms/?capacities=1,2,3,4,5&roomType=Room&region=BTHO&page=1&token=1'
        );
    });
});
