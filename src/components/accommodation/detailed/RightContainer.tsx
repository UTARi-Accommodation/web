import * as React from 'react';
import { inRangeOf, isPositiveInt } from 'granula-string';
import { FaEye } from 'react-icons/fa';
import { IoLogoWhatsapp } from 'react-icons/io5';
import { MdEmail } from 'react-icons/md';
import styled, { css } from 'styled-components';
import {
    Month,
    QueriedRoomDetails,
    QueriedUnitDetails,
    RoomSize,
} from 'utari-common';
import {
    AccommodationRating,
    AccommodationRatingAverage,
} from '../display/AcommodationProperties';
import Rating, { RatingIcon } from '../rating/Rating';
import TitleWithBorder from './TitleWithBorder';
import { BsFillTelephoneFill } from 'react-icons/bs';

const RightContainer = ({
    rental,
    ratings,
    visitCount,
    year,
    month,
    handler: { name, handlerType },
    contact: { email, mobileNumber },
    rating,
    id,
    onRatingGiven,
    about,
}: Readonly<{
    rental: number;
    ratings: ReadonlyArray<number>;
    visitCount: number;
    year: number;
    month: Month;
    handler: QueriedRoomDetails['handler'];
    contact: QueriedRoomDetails['contact'];
    rating: number | undefined;
    id: number;
    onRatingGiven: () => void;
    about: Readonly<
        | {
              type: 'Unit';
              bathRooms: QueriedUnitDetails['properties']['bathRooms'];
              bedRooms: QueriedUnitDetails['properties']['bedRooms'];
          }
        | {
              type: 'Room';
              size: RoomSize;
              capacities: ReadonlyArray<number>;
          }
    >;
}>) => {
    const isMobile = (contact: string) =>
        isPositiveInt(contact) &&
        ((contact.startsWith('01') &&
            inRangeOf(contact, {
                min: 10,
                max: 10,
            })) ||
            (contact.startsWith('011') &&
                inRangeOf(contact, {
                    min: 11,
                    max: 11,
                })));

    return (
        <Container>
            <RightTopContainer>
                <RentalAndRatingContainer>
                    <TopLeftContainer>
                        <div>
                            <RentalContainer>RM {rental}</RentalContainer>
                            <span> / </span>
                        </div>
                        <div>
                            <span>
                                {about.type === 'Room' ? 'tenant' : 'unit'}
                            </span>
                        </div>
                    </TopLeftContainer>
                    <MarginlessAccommodationRating>
                        <QuantityAndIconContainer>
                            <RatingIcon />
                            <QuantityContainer>
                                {!ratings.length
                                    ? 0
                                    : (
                                          ratings.reduce(
                                              (prev, curr) => prev + curr,
                                              0
                                          ) / ratings.length
                                      ).toFixed(2)}
                            </QuantityContainer>
                        </QuantityAndIconContainer>
                        <QuantityAndIconContainer>
                            <VisitCountIcon />
                            <QuantityContainer>{visitCount}</QuantityContainer>
                        </QuantityAndIconContainer>
                    </MarginlessAccommodationRating>
                </RentalAndRatingContainer>
                <RightInnerContainer>
                    <TitleWithBorder title={`About ${about.type}`} />
                    <AvailableContainer>
                        <RightInnerInfoContainer>
                            <AvailableText>
                                Available from
                                {` ${month.slice(0, 3)} ${year}`}
                            </AvailableText>
                        </RightInnerInfoContainer>
                        {about.type === 'Room' ? (
                            <>
                                <RightInnerInfoContainer>
                                    <AvailableText>
                                        Max {about.capacities.join('-')} tenants
                                    </AvailableText>
                                </RightInnerInfoContainer>
                                <RightInnerInfoContainer>
                                    <AvailableText>
                                        Room Size: {about.size}
                                    </AvailableText>
                                </RightInnerInfoContainer>
                            </>
                        ) : (
                            <>
                                <RightInnerInfoContainer>
                                    <AvailableText>
                                        {about.bathRooms} bath rooms
                                    </AvailableText>
                                </RightInnerInfoContainer>
                                <RightInnerInfoContainer>
                                    <AvailableText>
                                        {about.bedRooms} bed rooms
                                    </AvailableText>
                                </RightInnerInfoContainer>
                            </>
                        )}
                    </AvailableContainer>
                </RightInnerContainer>
                <RightInnerContainer>
                    <TitleWithBorder title="Contact Details" />
                    <ContactContainer>
                        <RightInnerInfoContainer>
                            <AvailableText>
                                {name} · {handlerType}
                            </AvailableText>
                        </RightInnerInfoContainer>
                        {mobileNumber.map((number, index) =>
                            isMobile(number) ? (
                                <PortfolioLink
                                    href={`https://wa.me/+6${number}`}
                                    key={index}
                                >
                                    <ContactInfoContainer>
                                        <WhatsappIcon />
                                        <ContactText>{number}</ContactText>
                                    </ContactInfoContainer>
                                </PortfolioLink>
                            ) : (
                                <PortfolioLink
                                    href={`tel:${number}`}
                                    key={index}
                                >
                                    <ContactInfoContainer>
                                        <TelephoneIcon />
                                        <ContactText>{number}</ContactText>
                                    </ContactInfoContainer>
                                </PortfolioLink>
                            )
                        )}
                        {email.map((email, index) => (
                            <PortfolioLink href={`mailto:${email}`} key={index}>
                                <ContactInfoContainer>
                                    <EmailIcon />
                                    <ContactText>{email}</ContactText>
                                </ContactInfoContainer>
                            </PortfolioLink>
                        ))}
                    </ContactContainer>
                </RightInnerContainer>
            </RightTopContainer>
            <RightBottomContainer>
                <Rating
                    onRatingGiven={onRatingGiven}
                    type={about.type}
                    rating={rating}
                    id={id}
                />
            </RightBottomContainer>
        </Container>
    );
};

// Right Container
const Container = styled.div`
    flex: 0.3;
    height: 100%;
    height: fit-content;
    @media (max-width: 900px) {
        flex: 0.2;
    }
`;

const RightInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 32px 0 0 0;
`;

const TopLeftContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const RightTopContainer = styled.div`
    border-radius: 12px;
    box-sizing: border-box;
    padding: 24px;
    height: 100%;
    width: 100%;
    height: fit-content;
    box-shadow: 0px 1px 2px #00000014, 0px 4px 12px #0000000d;
    border: 1px solid ${({ theme }) => theme.border};
`;

const RightBottomContainer = styled(RightTopContainer)`
    margin: 8px 0 0 0;
    display: flex;
    flex-direction: column;
    grid-gap: 8px;
    box-sizing: border-box;
    box-shadow: 0px 1px 2px #00000014, 0px 4px 12px #0000000d;
`;

const RightInnerInfoContainer = styled.div`
    margin: 8px 0;
`;

// Rating, rental and visit count
const RentalAndRatingContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RentalContainer = styled.span`
    font-weight: 600;
    font-size: 1.3em;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const MarginlessAccommodationRating = styled(AccommodationRating)`
    margin: 0 0 0 0 !important;
    grid-gap: 8px;
    align-self: flex-start;
`;

const QuantityAndIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const QuantityContainer = styled(AccommodationRatingAverage)`
    margin: 0 0 0 4px;
`;

const VisitCountIcon = styled(FaEye)`
    font-size: 1.1em !important;
    color: ${({ theme }) => theme.emptyAuthAndVisitCountIcon};
`;

// Available
const AvailableContainer = styled.div`
    display: flex;
    flex-direction: column;
    grid-gap: 16px;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

const AvailableText = styled.div`
    vertical-align: middle;
    font-size: 1em;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

// Contact
const ContactContainer = styled.div`
    flex: 0.3;
    display: flex;
    flex-direction: column;
    grid-gap: 12px;
`;
const ContactInfoContainer = styled.div`
    display: flex;
    align-items: center;
    grid-gap: 8px;
`;

const PortfolioLink = styled.a.attrs({
    target: '_blank',
    rel: 'noopener noreferrer',
})`
    display: block;
    text-decoration: none;
`;

const ContactText = styled.div`
    font-size: 1em;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

const ContactIconStyled = css`
    font-size: 2em !important;
    border-radius: 10px;
    margin: 1px;
    cursor: pointer;
    background-color: ${({ theme }) => theme.primaryColor};
`;

const WhatsappIcon = styled(IoLogoWhatsapp)`
    color: ${({ theme }) => theme.whatsappIcon};
    ${ContactIconStyled};
`;

const TelephoneIcon = styled(BsFillTelephoneFill)`
    color: ${({ theme }) => theme.telephoneIcon};
    ${ContactIconStyled}
`;

const EmailIcon = styled(MdEmail)`
    color: ${({ theme }) => theme.emailIcon};
    ${ContactIconStyled};
`;

export default RightContainer;
