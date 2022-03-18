import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { AccommodationType, Month, SortedRoom, SortedUnit } from 'utari-common';
import { BookmarkButtonClick } from '../../bookmarked/BookmarkButton';
import {
    AccommodationFacilities,
    AccommodationProperties,
    AccommodationPropertiesBottom,
    AccommodationPropertiesTop,
    AccommodationProperty,
    Availability,
} from '../AcommodationProperties';
import HorizontalLine from '../HorizontalLine';

const NavigationToDetailedInfo = ({
    children,
    link,
    id,
}: Readonly<{
    children: React.ReactNode;
    link: AccommodationType;
    id: number;
}>) => (
    <LinkContainer>
        <Link
            to={`/detailed-${link.toLowerCase()}?id=${id}`}
            target="_blank"
            rel="nofollow noopener noreferrer"
        >
            {children}
        </Link>
    </LinkContainer>
);

const AccommodationInfo = ({
    id,
    link,
    isBookmarked,
    address,
    facilities,
    ratings,
    rental,
    month,
    year,
    info,
    onMouseEnter,
    onMouseLeave,
    onBookmarkButtonClick,
}: Readonly<{
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    link: AccommodationType;
    id: number;
    isBookmarked: boolean;
    address: string;
    facilities: string;
    ratings: ReadonlyArray<number>;
    rental: number;
    month: Month;
    year: number;
    info: Readonly<
        | {
              type: 'Room';
              capacities: SortedRoom[0]['properties']['capacities'];
          }
        | {
              type: 'Unit';
              bedRooms: SortedUnit[0]['properties']['bedRooms'];
              bathRooms: SortedUnit[0]['properties']['bedRooms'];
          }
    >;
    onBookmarkButtonClick: BookmarkButtonClick;
}>) => {
    const Component = () => (
        <AccommodationInfoStyled
            onMouseLeave={onMouseLeave}
            onMouseEnter={onMouseEnter}
        >
            <AccommodationPropertiesTop
                onBookmarkButtonClick={onBookmarkButtonClick}
                address={address}
                isBookmarked={isBookmarked}
                id={id}
                type={info.type}
            />
            <NavigationToDetailedInfo id={id} link={link}>
                <HorizontalLine />
                <AccommodationFacilities facilities={facilities} />
                <AccommodationProperties>
                    {info.type === 'Room' ? (
                        <AccommodationProperty>
                            {`${info.capacities.join('/')} tenant${
                                info.capacities.length > 1 ||
                                info.capacities.some((capacity) => capacity > 1)
                                    ? 's'
                                    : ''
                            }`}
                        </AccommodationProperty>
                    ) : (
                        <>
                            <AccommodationProperty>
                                {`${info.bathRooms} bath room${
                                    info.bathRooms > 1 ? 's' : ''
                                }`}
                            </AccommodationProperty>
                            <AccommodationProperty>·</AccommodationProperty>
                            <AccommodationProperty>
                                {`${info.bedRooms} bed room${
                                    info.bedRooms > 1 ? 's' : ''
                                }`}
                            </AccommodationProperty>
                        </>
                    )}
                </AccommodationProperties>
                <Availability month={month} year={year} />
                <AccommodationPropertiesBottom
                    ratings={ratings}
                    rental={rental}
                />
            </NavigationToDetailedInfo>
        </AccommodationInfoStyled>
    );

    return <Component />;
};

const Container = styled.div`
    font-family: Montserrat, sans-serif;
    align-items: center;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    width: 100vw;
`;

const QueryContainer = styled.div`
    width: 100%;
    height: 100%;
    margin: -23px 0 0 0;
    align-items: center;
    justify-content: space-between;
    display: flex;
    border-bottom: 1px solid transparent;
`;

const QueryInnerContainer = styled.div`
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    @media (max-width: 550px) {
        padding: 8px 0;
    }
`;

const HideScrollBar = css`
    /* refer: https://www.w3schools.com/howto/howto_css_hide_scrollbars.asp */
    /* Hide scrollbar for Chrome, Safari and Opera */
    ::-webkit-scrollbar {
        display: none;
    }
    /* Hide scrollbar for IE, Edge and Firefox */
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const DropdownSearch = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    > div {
        margin: 4px;
    }
    ${HideScrollBar}
    @media(max-width: ${({
        breakPoint,
    }: Readonly<{
        breakPoint: number;
    }>) => `${breakPoint}px`}) {
        overflow-x: auto;
        white-space: nowrap;
        display: inline-block;
        text-align: center;
    }
`;

const DisplayContainer = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
    height: 100vh !important;
    margin: 0 0 -64px 0;
    border-bottom: 1px solid ${({ theme }) => theme.border};
    @media (max-width: 760px) {
        flex-direction: column;
    }
    @media (max-width: 425px) {
        width: fit-content;
    }
`;

const AccommodationContainer = styled.div`
    width: 100%;
    font-family: Montserrat, sans-serif;
    margin: 0 16px;
    overflow-y: auto;
    ${HideScrollBar}
    @media (max-width: 760px) {
        width: fit-content;
    }
    @media (max-width: 365px) {
        margin: 0 8px;
    }
    @media (max-width: 350px) {
        margin: 0;
    }
`;

const AccommodationInfoStyled = styled.div`
    align-items: start;
    flex-direction: column;
    padding: 8px 16px;
    border-radius: 8px;
    margin: 0 0 8px 0;
    cursor: pointer;
    > a {
        text-decoration: none;
    }
    background-color: ${({ theme }) => theme.primaryColor};
    border: 1px solid ${({ theme }) => theme.border};
    @media (max-width: 350px) {
        margin: 16px;
    }
`;

const LinkContainer = styled.div`
    > a {
        text-decoration: none;
    }
`;

export {
    Container,
    QueryContainer,
    QueryInnerContainer,
    DropdownSearch,
    DisplayContainer,
    AccommodationContainer,
    AccommodationInfo,
    NavigationToDetailedInfo,
};
