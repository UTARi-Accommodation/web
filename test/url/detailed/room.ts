import { formDetailedRoomAPIQuery } from '../../../src/url/query/detailed/room';
import { describe, it, expect } from 'vitest';

const testFormDetailedRoomQueryParam = () =>
    describe('Detailed Room Query Object to Query URL Param', () => {
        it('should form query param based on param object', () => {
            expect(
                formDetailedRoomAPIQuery({
                    id: 1,
                    token: 'token',
                })
            ).toBe('/detailed-room/?id=1&token=token');
        });
    });

export default testFormDetailedRoomQueryParam;
