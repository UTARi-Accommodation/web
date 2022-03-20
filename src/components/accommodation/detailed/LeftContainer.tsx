import * as React from 'react';
import styled from 'styled-components';
import { AccommodationType } from 'utari-common';
import BookmarkButton, {
    BookmarkButtonClick,
} from '../bookmarked/BookmarkButton';
import TitleWithBorder from './TitleWithBorder';

const LeftContainer = ({
    id,
    bookmarked,
    address,
    facilities,
    remark,
    type,
    onBookmarkClick,
}: Readonly<{
    id: number;
    bookmarked: boolean;
    address: string;
    facilities: string;
    remark: string;
    type: AccommodationType;
    onBookmarkClick: BookmarkButtonClick;
}>) => (
    <Container>
        <RoomIdContainer>
            <Id>
                {type} {id}
            </Id>
            <BookmarkButton
                onClick={onBookmarkClick}
                margin={0}
                isBookmarked={bookmarked}
                id={id}
                type={type}
            />
        </RoomIdContainer>
        <LeftInnerContainer>
            <TitleWithBorder title="Located at" />
            <LeftInnerInfoContainer>{address}</LeftInnerInfoContainer>
        </LeftInnerContainer>
        <LeftInnerContainer>
            <TitleWithBorder title="Facilities provided" />
            <Facilities>
                {facilities.split(' · ').map((facility, index) => (
                    <Facility key={index}>{facility}</Facility>
                ))}
            </Facilities>
        </LeftInnerContainer>
        <LeftInnerContainer>
            <TitleWithBorder title="Additional info" />
            <LeftInnerInfoContainer>
                {remark.trim() || 'Not Provided'}
            </LeftInnerInfoContainer>
        </LeftInnerContainer>
    </Container>
);

const Container = styled.div`
    flex: 0.7;
    height: 100%;
    border-radius: 12px;
    padding: 24px;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px #00000014, 0px 4px 12px #0000000d;
    border: 1px solid ${({ theme }) => theme.border};
    height: fit-content;
    @media (max-width: 900px) {
        flex: 0.8;
    }
`;

const Id = styled.div`
    font-weight: 600;
`;

const RoomIdContainer = styled.div`
    justify-content: space-between;
    font-size: 1.1em;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const LeftInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 32px 0 0 0;
`;

const Facilities = styled.div`
    word-break: break-word;
    display: flex;
    align-items: stretch;
    justify-content: flex-start;
    flex-wrap: wrap;
    @media (max-width: 750px) {
        width: 100%;
    }
`;

const Facility = styled.div`
    width: calc(100% / 3);
    padding: 16px 0px;
    box-sizing: border-box;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
    @media (max-width: 556px) {
        width: calc(100% / 2);
    }
`;

const LeftInnerInfoContainer = styled.div`
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

export default LeftContainer;
