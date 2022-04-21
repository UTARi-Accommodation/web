import {
    formGeneralRoomsQuery,
    formGeneralRoomsAPIQuery,
} from '../../../src/url/query/general/room';

const testFormGeneralRoomsQueryParam = () =>
    describe('General Room Query Object to Query URL Param', () => {
        it('should form query param based on param object', () => {
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
            ).toBe('/rooms/?roomType=Room&region=BTHO&page=1&token=1');
        });
        it('should form query param with empty key-value pair for falsy value', () => {
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
            ).toBe('/rooms/?roomType=Room&region=BTHO&page=1&token=1');
        });
        it('should form query param with joined string separated by delimiter "," for array type query', () => {
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
                '/rooms/?capacities=1,2,3,4,5&roomType=Room&region=BTHO&page=1&token=1'
            );
        });
    });

export default testFormGeneralRoomsQueryParam;
