import { formDownloadAPIQuery } from '../../../src/url/query/bookmarked/download';
import { describe, it, expect } from 'vitest';

const testFormBookmarkedDownloadAPIQuery = () =>
    describe('Bookmarked Query Download', () => {
        it('should query param with type of download', () => {
            expect(formDownloadAPIQuery('testing')).toBe(
                'testing&type=download'
            );
        });
    });

export default testFormBookmarkedDownloadAPIQuery;
