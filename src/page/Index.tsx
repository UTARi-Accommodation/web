import * as React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Select from 'react-select';
import ReactTooltip from 'react-tooltip';
import Title from '../components/common/Title';
import { Region, RoomType, UnitType } from 'utari-common';
import {
    SearchIcon,
    SearchIconContainer,
} from '../components/accommodation/query/SearchBar';
import OutsideClickHandlerContainer from '../components/common/OutsideClickHandlerContainer';
import useWindowResize from '../hook/windowResize';
import useIntersectionObserver from '../hook/interSectionObserverHook';
import Roommate from '../../public/img/home/roommate.webp';
import Partition from '../../public/img/home/partition.webp';
import Tailored from '../../public/img/home/tailored.webp';

type IndexImageContainerProps = Readonly<{
    imageName: 'roommate' | 'partition' | 'tailored';
}>;

type CustomWordContainerProps = Readonly<{
    title: string;
    subTitle: string;
    titleDescription: string;
}>;

type IndexInfoProps = CustomWordContainerProps & IndexImageContainerProps;

type TextAlignPosition = Readonly<{
    align: 'left' | 'right';
}>;

type ImageContainerProps = Readonly<{
    isVisible: boolean;
}>;

type WordContainerProps = TextAlignPosition & ImageContainerProps;

const IndexWordContainer = ({
    title,
    subTitle,
    titleDescription,
    align,
}: CustomWordContainerProps & TextAlignPosition) => {
    const containerRef = React.createRef<HTMLDivElement>();

    const { isVisible } = useIntersectionObserver(containerRef);

    return (
        <WordContainer align={align} ref={containerRef} isVisible={isVisible}>
            <HomeTitle>{title}</HomeTitle>
            <SubTitle>{subTitle}</SubTitle>
            <TitleDescription>{titleDescription}</TitleDescription>
        </WordContainer>
    );
};

const IndexImageContainer = ({ imageName }: IndexImageContainerProps) => {
    const containerRef = React.createRef<HTMLDivElement>();

    const { isVisible } = useIntersectionObserver(containerRef);

    return (
        <ImageContainer ref={containerRef} isVisible={isVisible}>
            <IndexImage
                alt={imageName}
                src={
                    imageName === 'partition'
                        ? Partition
                        : imageName === 'roommate'
                        ? Roommate
                        : imageName === 'tailored'
                        ? Tailored
                        : undefined
                }
            />
        </ImageContainer>
    );
};

const RightIndexInfo = ({
    title,
    subTitle,
    titleDescription,
    imageName,
}: IndexInfoProps) => {
    const breakPoint = 1260;

    const { width } = useWindowResize();

    const RightWordContainer = () => (
        <IndexWordContainer
            title={title}
            align={width <= breakPoint ? 'left' : 'right'}
            subTitle={subTitle}
            titleDescription={titleDescription}
        />
    );

    return (
        <Intro>
            {width <= breakPoint ? null : <RightWordContainer />}
            <IndexImageContainer imageName={imageName} />
            {width > breakPoint ? null : <RightWordContainer />}
        </Intro>
    );
};

const LeftIndexInfo = ({
    title,
    subTitle,
    titleDescription,
    imageName,
}: IndexInfoProps) => (
    <Intro>
        <IndexImageContainer imageName={imageName} />
        <IndexWordContainer
            title={title}
            align="left"
            subTitle={subTitle}
            titleDescription={titleDescription}
        />
    </Intro>
);

const WelcomeMessage = () => (
    <Msg>
        <MsgContainer>
            <div>
                <MsgSpan>Welcome To UTARi</MsgSpan>
            </div>
            <HowUtariWorksContainer>
                <Link to="/work" rel="nofollow noopener noreferrer">
                    How UTARi works
                </Link>
            </HowUtariWorksContainer>
        </MsgContainer>
    </Msg>
);

const Index = () => {
    const regions = [
        {
            value: 'BTHO',
            label: 'Bandar Tun Hussein Onn',
        },
        { value: 'KP', label: 'Kampar' },
        { value: 'SL', label: 'Sungai Long' },
    ] as const;

    const accommodationTypes = [
        { value: 'Condominium', label: 'Condominium' },
        { value: 'House', label: 'House' },
        { value: 'Room', label: 'Room' },
        { value: 'Roommate', label: 'Find Roommate' },
    ] as const;

    const accommodationTypeBreakingPoint = 545;

    const [state, setState] = React.useState({
        region: undefined as Region | undefined,
        accommodationType: undefined as UnitType | RoomType | undefined,
        isMouseEnterSearch: false,
    });

    const { width } = useWindowResize();

    const { region, accommodationType, isMouseEnterSearch } = state;

    const setIsMouseEnterSearch = (isMouseEnterSearch: boolean) =>
        setState((prev) => ({
            ...prev,
            isMouseEnterSearch,
        }));

    const breakPoint = 405;
    const breakPointReached = width <= breakPoint;

    return (
        <Container>
            <Title title="Home" content="This is the Home Page of UTARi" />
            <WelcomeMessage />
            <OutsideClickHandlerContainer setFalse={setIsMouseEnterSearch}>
                <SearchContainer>
                    <SearchBarContainer
                        onClick={() => setIsMouseEnterSearch(true)}
                        isMouseEnterSearch={isMouseEnterSearch}
                    >
                        {breakPointReached ? null : (
                            <StyledSelect
                                defaultValue={undefined}
                                onChange={(option: any) =>
                                    setState((prev) => ({
                                        ...prev,
                                        region: regions.find(
                                            (region) =>
                                                region.value === option.value
                                        )?.value,
                                    }))
                                }
                                placeholder="Region"
                                options={regions}
                            />
                        )}
                        <StyledSelect
                            defaultValue={undefined}
                            onChange={(option: any) =>
                                setState((prev) => ({
                                    ...prev,
                                    accommodationType: accommodationTypes.find(
                                        (type) => type.value === option.value
                                    )?.value,
                                }))
                            }
                            placeholder={
                                width <= accommodationTypeBreakingPoint
                                    ? 'Search'
                                    : 'Accommodation Type'
                            }
                            options={accommodationTypes}
                        />
                        {region && accommodationType ? (
                            <Link
                                to={`/${accommodationType.toLowerCase()}s?region=${region}`}
                            >
                                <IndexSearchIconContainer>
                                    <IndexSearchIcon />
                                </IndexSearchIconContainer>
                            </Link>
                        ) : breakPointReached && accommodationType ? (
                            <Link to={`/${accommodationType.toLowerCase()}s?`}>
                                <IndexSearchIconContainer>
                                    <IndexSearchIcon />
                                </IndexSearchIconContainer>
                            </Link>
                        ) : (
                            <>
                                <IndexSearchIconContainer
                                    data-for="main"
                                    data-tip={`You must fill in<br />${
                                        breakPointReached ? 'search' : 'both'
                                    } field${
                                        breakPointReached ? '' : 's'
                                    } to search`}
                                    data-iscapture="true"
                                >
                                    <IndexSearchIcon />
                                </IndexSearchIconContainer>
                                <ReactTooltip
                                    id="main"
                                    multiline={true}
                                    place="bottom"
                                    type="info"
                                    effect="float"
                                />
                            </>
                        )}
                    </SearchBarContainer>
                </SearchContainer>
            </OutsideClickHandlerContainer>
            <IntroContainer>
                <IntroInnerContainer>
                    <LeftIndexInfo
                        title="Welcome to the future of co-living!"
                        subTitle="A ROOMMATE FOR EVERYONE"
                        titleDescription="Whether you're looking for a new BFF or just someone to split the rent, UTARi is the easiest roommate finder out there."
                        imageName="roommate"
                    />
                    <RightIndexInfo
                        title="Safe & Legal"
                        subTitle="NO ILLEGALLY PARTITIONED ROOMS"
                        titleDescription="All rooms put up for rent have been verified to be in compliance with regulation."
                        imageName="partition"
                    />
                    <LeftIndexInfo
                        title="Rent Easier"
                        subTitle="HOSTEL SEARCHING ALGORITHM TAILORED FOR YOU"
                        titleDescription="UTARi makes finding affordable rooms easier than ever"
                        imageName="tailored"
                    />
                </IntroInnerContainer>
            </IntroContainer>
        </Container>
    );
};

const Container = styled.div`
    font-family: Montserrat, sans-serif !important;
    font-weight: 400;
`;

const Msg = styled.div`
    align-items: center;
    justify-content: space-evenly;
    display: flex;
`;

const MsgContainer = styled.div`
    text-align: center;
    padding: 32px 0 0 0;
`;

const MsgSpan = styled.span`
    font-size: 3em;
    color: ${({ theme }) => theme.secondaryColor};
    @media (max-width: 635px) {
        font-size: 2.5em;
    }
    @media (max-width: 541px) {
        font-size: 2em;
    }
    @media (max-width: 437px) {
        font-size: 1.5em;
    }
`;

const HowUtariWorksContainer = styled.div`
    padding: 32px 0;
    > a {
        text-decoration: none;
        color: ${({ theme }) => theme.howItWorks};
    }
    font-family: Roboto, Helvetica Neue, sans-serif;
`;

// Intro
const IntroContainer = styled.div`
    width: 100%;
    display: grid;
    place-items: center;
`;

const IntroInnerContainer = styled.div`
    width: 75%;
`;

const FadeIn = css`
    opacity: 0;
    transform: translateY(20vh);
    visibility: hidden;
    transition: opacity 1200ms ease-out, transform 600ms ease-out,
        visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
`;

const Visible = css`
    ${FadeIn};
    opacity: 1;
    transform: none;
    visibility: visible;
`;

const Intro = styled.div`
    justify-content: center;
    display: flex;
    margin: 0 0 -4px 0;
    > div {
        flex: 0.5;
    }
    @media (max-width: 1260px) {
        flex-direction: column;
        > div {
            flex: 1;
        }
        margin: 0;
    }
`;

const IndexContainer = styled.div`
    @media (max-width: 968px) {
        width: 100%;
    }
`;

const ImageContainer = styled.div`
    ${({ isVisible }: ImageContainerProps) => (isVisible ? Visible : FadeIn)};
`;

const IndexImage = styled.img`
    width: 100%;
    @media (max-width: 1260px) {
        height: 100%;
    }
`;

const WordContainer = styled(IndexContainer)`
    height: fit-content;
    > div {
        margin: 32px;
        text-align: ${({ align }: WordContainerProps) => align};
    }
    ${({ isVisible }: WordContainerProps) => (isVisible ? Visible : FadeIn)};
    @media (max-width: 1260px) {
        > div {
            margin: 16px 0;
        }
    }
`;

const HomeTitle = styled.div`
    font-size: 2.5em;
    @media (max-width: 635px) {
        font-size: 2.25em;
    }
    @media (max-width: 541px) {
        font-size: 1.75em;
    }
    @media (max-width: 437px) {
        font-size: 1.25em;
    }
`;

const SubTitle = styled.div`
    font-size: 1.25em;
    color: ${({ theme }) => theme.denseBlue};
    @media (max-width: 635px) {
        font-size: 1.125em;
    }
    @media (max-width: 541px) {
        font-size: 1.1em;
    }
    @media (max-width: 437px) {
        font-size: 1em;
    }
`;

const TitleDescription = styled.div`
    font-size: 1.125em;
    color: ${({ theme }) => theme.indexTitleDescription};
    @media (max-width: 1260px) {
        margin: 16px 0 40px 0 !important;
    }
    @media (max-width: 635px) {
        font-size: 1.1em;
    }
    @media (max-width: 541px) {
        font-size: 1em;
    }
`;

const SearchContainer = styled.div`
    display: grid;
    place-items: center;
    margin: 16px auto 32px auto;
`;

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 32px;
    padding: 8px 16px;
    box-sizing: border-box;
    border: 1px solid
        ${({
            isMouseEnterSearch,
        }: Readonly<{
            isMouseEnterSearch: boolean;
        }>) =>
            isMouseEnterSearch
                ? ({ theme }) => theme.secondaryColor
                : ({ theme }) => theme.border};
    @media (max-width: 916px) {
        width: 75% !important;
    }
    @media (max-width: 820px) {
        width: 85% !important;
    }
`;

const IndexSearchIconContainer = styled(SearchIconContainer)`
    padding: 12px;
`;

const IndexSearchIcon = styled(SearchIcon)`
    font-size: 1em;
`;

const StyledSelect = styled(Select)`
    width: 300px;
    cursor: text;
    .css-1s2u09g-control {
        border: none !important;
    }
    .css-1pahdxg-control {
        border: none !important;
        box-shadow: none !important;
    }
    .css-1pahdxg-control:hover {
        border: none !important;
    }
    .select__menu-list::-webkit-scrollbar {
        width: 4px;
        height: 0px;
    }
    .select__menu-list::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.indexSelectMenuListScrollBarTrack};
    }
    .select__menu-list::-webkit-scrollbar-thumb {
        background: ${({ theme }) => theme.indexSelectMenuListScrollBarThumb};
    }
    .select__menu-list::-webkit-scrollbar-thumb:hover {
        background: ${({ theme }) =>
            theme.indexSelectMenuListScrollBarThumbHover};
    }
    @media (max-width: 682px) {
        width: 250px;
    }
    @media (max-width: 580px) {
        width: 200px;
    }
    @media (max-width: 480px) {
        width: 150px;
    }
    @media (max-width: 405px) {
        width: 100%;
    }
`;

export default Index;
