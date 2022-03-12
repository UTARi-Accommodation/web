import * as React from 'react';
import {
    HandlerType,
    Region,
    RentalFrequencies,
    RentalRange,
    SortedBookmarkedRoomDownload,
} from 'utari-common';
import { convertNameToRegion } from '../../../../util/converter';
import BookmarkedTypeDropDown from '../oneOptionDropdown/BookmarkedTypeDropdown';
import RegionDropdown from '../multiSelectDropdown/RegionDropdown';
import RentalRangeDropdown from '../RentalRangeDropdown';
import { DropdownSearch } from '../../display/container/Container';
import { NullableRentalRange } from './General';
import Download from '../../bookmarked/Download';
import { formDownloadAPIQuery } from '../../../../url/query/bookmarked/download';
import { parseAsDownloadQueriedUnits } from '../../../../parser/bookmarked/unit';
import { parseAsDownloadQueriedRooms } from '../../../../parser/bookmarked/room';
import AccommodationSpecificQuery, {
    AccommodationSpecificQueryProps,
} from './AccomodationSpecificQuery';
import { ToastError } from '../../../toaser/Toaser';
import AccommodationTypeDropdown from '../oneOptionDropdown/AccommodationTypeDropdown';
import utariAxios from '../../../../config/axios';
import { Markers } from '../../display/map/GoogleMapViewer';
import useWindowResize from '../../../../hook/windowResize';
import MapButton from '../../display/map/Button';

const processInfo = (info?: string) => info ?? '*NOT PROVIDED*';

const processContactInfo = ({
    name,
    handlerType,
    mobileNumber,
    email,
}: Readonly<{
    name: string;
    handlerType: HandlerType;
    mobileNumber: ReadonlyArray<string>;
    email: ReadonlyArray<string>;
}>) =>
    `1) Name: ${name}\n` +
    `2) Identity: ${handlerType}\n` +
    `3) Contact Number: ${processInfo(mobileNumber.join(' / '))}\n` +
    `4) Email: ${email.join(' / ')}`;

const commonPropertiesToText = ({
    id,
    handler: { name, handlerType },
    contact: { email, mobileNumber },
    address,
    facilities,
    remarks: { year, month, remark },
    rating,
    ratings,
    timeCreated,
}: Omit<SortedBookmarkedRoomDownload[0], 'properties'>) => {
    const idInfo = `Rental Room ID ${id}\n------------------------`;
    const addressInfo = `Address: ${address}`;
    const availableFrom = `Available from: ${year} ${month}`;
    const remarkInfo = `Remarks: ${processInfo(remark)}`;
    const facilitiesInfo = `Facilities: ${processInfo(facilities)}`;
    const contactInfo = `Contact Info: \n${processContactInfo({
        name,
        handlerType,
        mobileNumber,
        email,
    })}`;
    const ratingsInfo = `Average Rating: ${
        !ratings.length
            ? 0
            : ratings.reduce((prev, curr) => prev + curr, 0) / ratings.length
    }`;
    const ratingInfo = `Your Rating: ${rating ?? '*NOT PROVIDED*'}`;
    const bookmarkedDate = `Bookmarked Date/Time: ${timeCreated.toLocaleString()}`;

    return [
        idInfo,
        contactInfo,
        addressInfo,
        availableFrom,
        remarkInfo,
        facilitiesInfo,
        ratingsInfo,
        ratingInfo,
        bookmarkedDate,
    ] as const;
};

const unitsToText = async (url: string) => {
    try {
        const { data } = await utariAxios.get(formDownloadAPIQuery(url));
        return parseAsDownloadQueriedUnits(data.units)
            .map((unit) => {
                const {
                    properties: { bedRooms, bathRooms, rental },
                } = unit;
                const bedRoomsInfo = `Bed Rooms: ${bedRooms}`;
                const bathRoomsInfo = `Bath Rooms: ${bathRooms}`;
                const rentalInfo = `Rental: RM ${rental}`;
                return commonPropertiesToText(unit)
                    .concat([bedRoomsInfo, bathRoomsInfo, rentalInfo])
                    .join('\n');
            })
            .join('\n\n');
    } catch (error) {
        ToastError(error);
        return undefined;
    }
};

const roomsToText = async (url: string) => {
    try {
        const { data } = await utariAxios.get(formDownloadAPIQuery(url));
        return parseAsDownloadQueriedRooms(data.rooms)
            .map((room) => {
                const {
                    properties: { capacities, rental },
                } = room;
                const capacitiesInfo = `Capacities: ${capacities.join(
                    '/'
                )} tenant${capacities.length > 1 ? 's' : ''}`;
                const rentalInfo = `Rental: RM ${rental}`;
                return commonPropertiesToText(room)
                    .concat([capacitiesInfo, rentalInfo])
                    .join('\n');
            })
            .join('\n\n');
    } catch (error) {
        ToastError(error);
        return undefined;
    }
};

const Query = ({
    regions,
    setRegions,
    rentalFrequencies,
    selectedRange,
    setRentalFrequencies,
    prop,
    isEmpty,
    apiQuery,
    markers,
}: Readonly<{
    regions: ReadonlyArray<Region>;
    setRegions: (regions: ReadonlyArray<Region>) => void;
    rentalFrequencies: RentalFrequencies;
    selectedRange: NullableRentalRange;
    setRentalFrequencies: (rentalRange: RentalRange) => void;
    prop: AccommodationSpecificQueryProps;
    isEmpty: boolean;
    apiQuery: () => Promise<string>;
    markers: Markers;
}>) => {
    const { type } = prop;
    switch (type) {
        case 'Room':
        case 'Unit': {
            const { width } = useWindowResize();

            const breakPoint = 800;

            return (
                <DropdownSearch breakPoint={breakPoint}>
                    <RegionDropdown
                        breakPoint={breakPoint}
                        regions={regions}
                        onSearch={(regionNames) =>
                            setRegions(regionNames.map(convertNameToRegion))
                        }
                    />
                    <RentalRangeDropdown
                        breakPoint={breakPoint}
                        rentalFrequencies={rentalFrequencies}
                        selectedRange={selectedRange}
                        onSearch={setRentalFrequencies}
                    />
                    <AccommodationSpecificQuery
                        breakPoint={breakPoint}
                        prop={prop}
                    />
                    <BookmarkedTypeDropDown breakPoint={breakPoint} />
                    <Download
                        isEmpty={isEmpty}
                        stringifiedInfo={async () =>
                            prop.type === 'Room'
                                ? roomsToText(await apiQuery())
                                : unitsToText(await apiQuery())
                        }
                        type={type}
                    />
                    <AccommodationTypeDropdown
                        breakPoint={breakPoint}
                        value="Search"
                    />

                    <MapButton isShow={width <= breakPoint} markers={markers} />
                </DropdownSearch>
            );
        }
    }
    throw new Error(
        `Type can only be Room or Unit for Bookmarked, got "${type}" instead`
    );
};

export default Query;
