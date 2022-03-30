import * as React from 'react';
import { Center, Region, SortedRoom } from 'utari-common';
import useWindowResize from '../../../../hook/windowResize';
import { BookmarkButtonClick } from '../../bookmarked/BookmarkButton';
import {
    NumberOfAccommodationFound,
    NumberOfBookmarkedAccommodationFound,
} from '../AcommodationProperties';
import {
    AccommodationContainer,
    AccommodationInfo,
    DisplayContainer,
} from '../container/Container';
import GoogleMapViewer from '../map/GoogleMapViewer';
import Pagination from '../Pagination';

const RoomDisplayContainer = ({
    rooms,
    numberOfResultsQueried,
    onMouseEnter,
    onMouseLeave,
    onBookmarkButtonClick,
    paginateQuery,
    totalPage,
    page,
    hoveredAccommodationId,
    center,
    numberOfAccommodationFound,
}: Readonly<{
    rooms: SortedRoom;
    numberOfResultsQueried: number;
    onMouseEnter: (id: number) => void;
    onMouseLeave: () => void;
    paginateQuery: (page: number) => void;
    totalPage: number;
    page: number;
    hoveredAccommodationId: number | undefined;
    center: Center;
    numberOfAccommodationFound: Readonly<
        | {
              type: 'general';
              region: Region;
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
                        type="Room"
                    />
                ) : (
                    <NumberOfBookmarkedAccommodationFound
                        numberOfResultsQueried={numberOfResultsQueried}
                        type="Room"
                    />
                )}
                {rooms.map(
                    ({
                        id,
                        location: { address },
                        properties: { capacities, rental },
                        facilities,
                        remarks: { year, month },
                        ratings,
                        bookmarked,
                    }) => (
                        <AccommodationInfo
                            id={id}
                            link="Room"
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
                                type: 'Room',
                                capacities,
                            }}
                        ></AccommodationInfo>
                    )
                )}
                <Pagination
                    totalPage={totalPage}
                    currentPage={page}
                    onClick={paginateQuery}
                    numberOfResults={rooms.length}
                    numberOfResultsQueried={numberOfResultsQueried}
                />
            </AccommodationContainer>
            {width <= breakPoint ? null : (
                <GoogleMapViewer
                    marker={{
                        type: 'array',
                        mapMarkerArrayProps: rooms.map(
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
                        hoveredAccommodationId,
                        link: 'Room',
                    }}
                    center={center}
                />
            )}
        </DisplayContainer>
    );
};

export default RoomDisplayContainer;
