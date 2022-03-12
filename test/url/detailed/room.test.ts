import { formDetailedRoomAPIQuery } from '../../../src/url/query/detailed/room';

describe('Object Room Query Object to Query URL Param', () => {
    it('should form query URL based on param object', () => {
        expect(
            formDetailedRoomAPIQuery({
                id: 1,
                token: 'token',
            })
        ).toBe('test/api/detailed-room/?id=1&token=token');
    });
});
