import {
    testConvertRegionToName,
    testConvertNameToRegion,
} from './converter/converter';

import testBookmarkedRoomParser from './parser/bookmarked/room';
import testBookmarkedUnitParser from './parser/bookmarked/unit';
import testContactParser from './parser/contact/contact';
import {
    testDetailedRoomURLParser,
    testDetailedRoomQueryParser,
} from './parser/detailed/room';
import {
    testDetailedUnitQueryParser,
    testDetailedUnitURLParser,
} from './parser/detailed/unit';
import testGeneralRoomParser from './parser/general/room';
import testGeneralUnitParser from './parser/general/unit';
import testRoomQueriedParser from './parser/queried/room';
import testUnitQueriedParser from './parser/queried/unit';

import testBookmarkedDownloadURL from './url/bookmarked/download';
import testBookmarkedRoomURL from './url/bookmarked/room';
import testBookmarkedUnitURL from './url/bookmarked/unit';
import testDetailedRoomURL from './url/detailed/room';
import testDetailedUnitURL from './url/detailed/unit';
import testGeneralRoomURL from './url/general/room';
import testGeneralUnitURL from './url/general/unit';

//converter
testConvertRegionToName();
testConvertNameToRegion();

//parser
testBookmarkedUnitParser();
testBookmarkedRoomParser();

testContactParser();

testDetailedRoomURLParser();
testDetailedRoomQueryParser();

testDetailedUnitURLParser();
testDetailedUnitQueryParser();

testGeneralUnitParser();
testGeneralRoomParser();

testUnitQueriedParser();
testRoomQueriedParser();

//url
testBookmarkedDownloadURL();
testBookmarkedRoomURL();
testBookmarkedUnitURL();

testDetailedUnitURL();
testDetailedRoomURL();

testGeneralUnitURL();
testGeneralRoomURL();
