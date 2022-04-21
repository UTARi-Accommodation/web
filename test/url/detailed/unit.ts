import { formDetailedUnitAPIQuery } from '../../../src/url/query/detailed/unit';

const testFormDetailedUnitQueryParam = () =>
    describe('Detailed Unit Query Object to Query URL Param', () => {
        it('should form query param based on param object', () => {
            expect(
                formDetailedUnitAPIQuery({
                    id: 1,
                    token: 'token',
                })
            ).toBe('/detailed-unit/?id=1&token=token');
        });
    });

export default testFormDetailedUnitQueryParam;
