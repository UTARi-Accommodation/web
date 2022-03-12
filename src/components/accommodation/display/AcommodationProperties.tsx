import * as React from 'react';
import { AiFillStar } from 'react-icons/ai';
import styled, { css } from 'styled-components';
import { AccommodationType, Month, Region } from 'utari-common';
import { convertRegionToName } from '../../../util/converter';
import BookmarkButton, {
    BookmarkButtonClick,
} from '../bookmarked/BookmarkButton';
import Address from './Address';
import { NavigationToDetailedInfo } from './container/Container';

const NumberOfAccommodationFound = ({
    numberOfResultsQueried,
    type,
    region,
}: Readonly<{
    numberOfResultsQueried: number;
    type: 'Room' | 'House' | 'Condominium';
    region: Region;
}>) => (
    <NumberOfAccommodationFoundedContainer>
        {numberOfResultsQueried}{' '}
        {`${type.toLowerCase()}${numberOfResultsQueried > 1 ? 's' : ''} `}
        found in {convertRegionToName(region)}
    </NumberOfAccommodationFoundedContainer>
);

const NumberOfBookmarkedAccommodationFound = ({
    numberOfResultsQueried,
    type,
}: Readonly<{
    numberOfResultsQueried: number;
    type: AccommodationType;
}>) => (
    <NumberOfAccommodationFoundedContainer>
        {numberOfResultsQueried}{' '}
        {`${type.toLowerCase()}${numberOfResultsQueried > 1 ? 's' : ''} `}
        bookmarked
    </NumberOfAccommodationFoundedContainer>
);

const AccommodationPropertiesTop = ({
    address,
    isBookmarked,
    id,
    type,
    onBookmarkButtonClick,
}: Readonly<{
    address: string;
    isBookmarked: boolean;
    id: number;
    type: AccommodationType;
    onBookmarkButtonClick: BookmarkButtonClick;
}>) => (
    <AccommodationPropertiesTopContainer>
        <NavigationToDetailedInfo id={id} link={type}>
            <div>
                <Address address={address} />
            </div>
        </NavigationToDetailedInfo>
        <BookmarkButtonContainer>
            <BookmarkButton
                onClick={onBookmarkButtonClick}
                margin={0}
                isBookmarked={isBookmarked}
                id={id}
                type={type}
            />
        </BookmarkButtonContainer>
    </AccommodationPropertiesTopContainer>
);

const AccommodationFacilities = ({
    facilities,
}: Readonly<{
    facilities: string;
}>) => (
    <AccommodationProperties>
        <AccommodationFacilitiesStyled>
            {facilities}
        </AccommodationFacilitiesStyled>
    </AccommodationProperties>
);

const AccommodationPropertiesBottom = ({
    ratings,
    rental,
}: Readonly<{
    ratings: ReadonlyArray<number>;
    rental: number;
}>) => (
    <AccommodationPropertiesSpaceBetween>
        <AccommodationRating>
            <AccommodationRatingStar />
            <AccommodationRatingAverage>
                {!ratings.length
                    ? ''
                    : (
                          ratings.reduce((prev, curr) => prev + curr, 0) /
                          ratings.length
                      ).toFixed(2)}
            </AccommodationRatingAverage>
            <AccommodationRatingCount>
                {`(${ratings.length} rating${ratings.length > 1 ? 's' : ''})`}
            </AccommodationRatingCount>
        </AccommodationRating>
        <AccommodationRental>RM {rental}</AccommodationRental>
    </AccommodationPropertiesSpaceBetween>
);

const Availability = ({
    month,
    year,
}: Readonly<{
    month: Month;
    year: number;
}>) => (
    <AccommodationProperties>
        <AccommodationProperty>
            Available from
            {` ${month.slice(0, 3)} ${year}`}
        </AccommodationProperty>
    </AccommodationProperties>
);

const NumberOfAccommodationFoundedContainer = styled.div`
    padding: 8px 16px;
    margin: 8px 0;
    font-style: italic;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const AccommodationProperties = styled.div`
    margin: 0 0 8px 0;
    align-items: self;
    display: flex;
    width: 100%;
    flex: 0.75;
    font-size: 1em;
`;

const AccommodationPropertiesSpaceBetween = styled(AccommodationProperties)`
    justify-content: space-between;
`;

const AccommodationPropertiesTopContainer = styled(
    AccommodationPropertiesSpaceBetween
)`
    margin: 8px 0 16px 0;
    display: grid;
    grid-template-columns: 8fr 2fr;
`;

const AccommodationInfoStyle = css`
    margin: 0 8px 16px 0;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

const AccommodationProperty = styled.span`
    ${AccommodationInfoStyle}
`;

const AccommodationFacilitiesStyled = styled(AccommodationProperty)`
    flex: 0.75;
    @media (max-width: 450px) {
        flex: 1;
    }
`;

const AccommodationRental = styled.span`
    color: white;
    font-weight: 400;
    padding: 8px 16px;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.rental};
`;

const AccommodationRating = styled.div`
    display: flex;
    margin: 8px 0 0 0;
    > span {
        margin: 0 0 0 8px;
        font-size: 0.85em;
    }
`;

const AccommodationRatingStar = styled(AiFillStar)`
    color: ${({ theme }) => theme.airBnbRed};
`;

const AccommodationRatingAverage = styled.span`
    font-weight: bold;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const AccommodationRatingCount = styled.span`
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

const BookmarkButtonContainer = styled.div`
    margin: 0 0 0 auto;
`;

export {
    AccommodationProperties,
    AccommodationPropertiesTop,
    AccommodationFacilities,
    AccommodationProperty,
    AccommodationPropertiesBottom,
    Availability,
    NumberOfAccommodationFound,
    NumberOfBookmarkedAccommodationFound,
    //detailed
    AccommodationRatingStar,
    AccommodationRatingAverage,
    AccommodationRating,
};
