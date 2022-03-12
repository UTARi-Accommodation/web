import * as React from 'react';
import { SortedUnit, Center, Region, UnitType } from 'utari-common';
import {
    AccommodationContainer,
    AccommodationInfo,
    DisplayContainer,
} from '../container/Container';
import {
    NumberOfAccommodationFound,
    NumberOfBookmarkedAccommodationFound,
} from '../AcommodationProperties';
import Pagination from '../Pagination';
import GoogleMapViewer from '../map/GoogleMapViewer';
import { BookmarkButtonClick } from '../../bookmarked/BookmarkButton';
import useWindowResize from '../../../../hook/windowResize';

const UnitDisplayContainer = ({
    units,
    numberOfResultsQueried,
    onMouseEnter,
    onMouseLeave,
    onBookmarkButtonClick,
    paginateQuery,
    totalPage,
    page,
    hoveredAccommodationID,
    center,
    numberOfAccommodationFound,
}: Readonly<{
    units: SortedUnit;
    numberOfResultsQueried: number;
    onMouseEnter: (id: number) => void;
    onMouseLeave: () => void;
    paginateQuery: (page: number) => void;
    totalPage: number;
    page: number;
    hoveredAccommodationID: number | undefined;
    center: Center;
    numberOfAccommodationFound: Readonly<
        | {
              type: 'general';
              region: Region;
              unitType: UnitType;
          }
        | {
              type: 'bookmarked';
          }
    >;
    onBookmarkButtonClick: BookmarkButtonClick;
}>) => {
    const breakPoint = 760;

    const { width } = useWindowResize();

    return (
        <DisplayContainer>
            <AccommodationContainer>
                {numberOfAccommodationFound.type === 'general' ? (
                    <NumberOfAccommodationFound
                        numberOfResultsQueried={numberOfResultsQueried}
                        region={numberOfAccommodationFound.region}
                        type={numberOfAccommodationFound.unitType}
                    />
                ) : (
                    <NumberOfBookmarkedAccommodationFound
                        numberOfResultsQueried={numberOfResultsQueried}
                        type="Unit"
                    />
                )}
                {units.map(
                    ({
                        id,
                        location: { address },
                        properties: { bathRooms, bedRooms, rental },
                        facilities,
                        remarks: { year, month },
                        ratings,
                        bookmarked,
                    }) => (
                        <AccommodationInfo
                            id={id}
                            link="Unit"
                            key={id}
                            onMouseEnter={() => onMouseEnter(id)}
                            onMouseLeave={onMouseLeave}
                            onBookmarkButtonClick={onBookmarkButtonClick}
                            address={address}
                            isBookmarked={bookmarked}
                            facilities={facilities}
                            ratings={ratings}
                            rental={rental}
                            month={month}
                            year={year}
                            info={{
                                type: 'Unit',
                                bedRooms,
                                bathRooms,
                            }}
                        ></AccommodationInfo>
                    )
                )}
                <Pagination
                    totalPage={totalPage}
                    currentPage={page}
                    onClick={(page) => paginateQuery(page)}
                    numberOfResults={units.length}
                    numberOfResultsQueried={numberOfResultsQueried}
                />
            </AccommodationContainer>
            {width <= breakPoint ? null : (
                <GoogleMapViewer
                    marker={{
                        type: 'array',
                        mapMarkerArrayProps: units.map(
                            ({
                                id,
                                location: { coordinate },
                                properties: { rental },
                            }) => ({
                                id,
                                coordinate,
                                rental,
                            })
                        ),
                        hoveredAccommodationID,
                    }}
                    center={center}
                />
            )}
        </DisplayContainer>
    );
};
export default UnitDisplayContainer;
