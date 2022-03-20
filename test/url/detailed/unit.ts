import { formDetailedUnitAPIQuery } from '../../../src/url/query/detailed/unit';

export default () =>
    describe('Object Unit Query Object to Query URL Param', () => {
        it('should form query URL based on param object', () => {
            expect(
                formDetailedUnitAPIQuery({
                    id: 1,
                    token: 'token',
                })
            ).toBe('/detailed-unit/?id=1&token=token');
        });
    });