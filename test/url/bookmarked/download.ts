import { formDownloadAPIQuery } from '../../../src/url/query/bookmarked/download';

export default () =>
    describe('Query download', () => {
        it('should return api query with type of download', () => {
            expect(formDownloadAPIQuery('testing')).toBe(
                'testing&type=download'
            );
        });
    });
