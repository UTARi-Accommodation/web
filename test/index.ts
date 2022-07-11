import { testConvertRegionToName, testConvertNameToRegion } from './converter';
import {
    testBookmarkedRoomQueryParser,
    testBookmarkedRoomQueriedParser,
} from './parser/bookmarked/room';
import {
    testBookmarkedUnitQueryParser,
    testBookmarkedUnitQueriedParser,
} from './parser/bookmarked/unit';
import testContactParser from './parser/contact';
import {
    testDetailedRoomQueriedParser,
    testDetailedRoomQueryParser,
} from './parser/detailed/room';
import {
    testDetailedUnitQueriedParser,
    testDetailedUnitQueryParser,
} from './parser/detailed/unit';
import {
    testGeneralRoomQueriedParser,
    testGeneralRoomQueryParser,
} from './parser/general/room';
import {
    testGeneralUnitQueryParser,
    testGeneralUnitQueriedParser,
} from './parser/general/unit';
import testRoomsQueriedParser from './parser/queried/room';
import testUnitsQueriedParser from './parser/queried/unit';

import testFormBookmarkedDownloadAPIQuery from './url/bookmarked/download';
import testFormBookmarkedRoomsQueryParam from './url/bookmarked/room';
import testFormBookmarkedUnitsQueryParam from './url/bookmarked/unit';
import testFormDetailedRoomQueryParam from './url/detailed/room';
import testFormDetailedUnitQueryParam from './url/detailed/unit';
import testFormGeneralRoomsQueryParam from './url/general/room';
import testFormGeneralUnitsQueryParam from './url/general/unit';

const tests: ReadonlyArray<readonly [() => void, 'only'?]> = [
    //converter
    [testConvertRegionToName],
    [testConvertNameToRegion],

    //parser

    //bookmarked
    [testBookmarkedUnitQueryParser],
    [testBookmarkedUnitQueriedParser],
    [testBookmarkedRoomQueryParser],
    [testBookmarkedRoomQueriedParser],

    //contact
    [testContactParser],

    //detailed
    [testDetailedRoomQueriedParser],
    [testDetailedRoomQueryParser],
    [testDetailedUnitQueriedParser],
    [testDetailedUnitQueryParser],

    //general
    [testGeneralRoomQueriedParser],
    [testGeneralRoomQueryParser],
    [testGeneralUnitQueryParser],
    [testGeneralUnitQueriedParser],

    [testUnitsQueriedParser],
    [testRoomsQueriedParser],

    //url
    [testFormBookmarkedDownloadAPIQuery],
    [testFormBookmarkedRoomsQueryParam],
    [testFormBookmarkedUnitsQueryParam],

    [testFormDetailedRoomQueryParam],
    [testFormDetailedUnitQueryParam],

    [testFormGeneralUnitsQueryParam],
    [testFormGeneralRoomsQueryParam],
];

const selectedTests = tests.filter(([_, only]) => only);

if (process.env.IS_CI && selectedTests.length) {
    throw new Error('cannot have "only" in ci cd');
}

(!selectedTests.length ? tests : selectedTests).forEach(([test]) => test());
