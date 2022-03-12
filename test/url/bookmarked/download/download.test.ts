import { formDownloadAPIQuery } from '../../../../src/url/query/bookmarked/download';

describe('Query download', () => {
    it('should return api query with type of download', () => {
        expect(formDownloadAPIQuery('testing')).toBe('testing&type=download');
    });
});
