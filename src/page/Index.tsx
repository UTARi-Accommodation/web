import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

enum ColorType {
    FIRST,
    SECOND,
    THIRD,
}

interface SubtitleProps {
    readonly colorType: ColorType;
}

interface IndexImageContainerProps {
    readonly imageName: 'roommate' | 'partition' | 'tailored';
}

interface CustomWordContainerProps extends SubtitleProps {
    readonly title: string;
    readonly subTitle: string;
    readonly titleDescription: string;
}

interface IndexInfoProps
    extends CustomWordContainerProps,
        IndexImageContainerProps {}

const IndexWordContainer = ({
    title,
    subTitle,
    titleDescription,
    colorType,
}: CustomWordContainerProps) => (
    <WordContainer>
        <HomeTitle>{title}</HomeTitle>
        <SubTitle colorType={colorType}>{subTitle}</SubTitle>
        <TitleDescription>{titleDescription}</TitleDescription>
    </WordContainer>
);

const IndexImageContainer = ({ imageName }: IndexImageContainerProps) => (
    <IndexContainer>
        <ImageContainer>
            <IndexImage src={`img/home/${imageName}.webp`} alt={imageName} />
        </ImageContainer>
    </IndexContainer>
);

const RightIndexInfo = ({
    title,
    subTitle,
    titleDescription,
    colorType,
    imageName,
}: IndexInfoProps): JSX.Element => {
    const breakPoint = 968;

    const [state, setState] = React.useState({
        width: window.innerWidth,
    });

    React.useEffect(() => {
        const handleResizeWindow = () =>
            setState(() => ({
                width: window.innerWidth,
            }));
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    const { width } = state;

    const RightWordContainer = () => (
        <IndexWordContainer
            title={title}
            colorType={colorType}
            subTitle={subTitle}
            titleDescription={titleDescription}
        />
    );

    return (
        <Intro>
            {width > breakPoint && <RightWordContainer />}
            <IndexImageContainer imageName={imageName} />
            {width <= breakPoint && <RightWordContainer />}
        </Intro>
    );
};

const LeftIndexInfo = ({
    title,
    subTitle,
    titleDescription,
    colorType,
    imageName,
}: IndexInfoProps): JSX.Element => {
    return (
        <Intro>
            <IndexImageContainer imageName={imageName} />
            <IndexWordContainer
                title={title}
                colorType={colorType}
                subTitle={subTitle}
                titleDescription={titleDescription}
            />
        </Intro>
    );
};

const WelcomeMessage = (): JSX.Element => {
    return (
        <WelcomeMsg>
            <WelcomeMsgContainer>
                <div>
                    <WelcomeMsgSpan>Welcome To UTARi</WelcomeMsgSpan>
                </div>
                <HowUtariWorksContainer>
                    <Link to="/tenant-work" rel="noopener noreferrer">
                        How UTARi works
                    </Link>
                </HowUtariWorksContainer>
            </WelcomeMsgContainer>
        </WelcomeMsg>
    );
};

const Index = (): JSX.Element => {
    return (
        <Container>
            <WelcomeMessage />
            <IntroContainer>
                <LeftIndexInfo
                    title="Welcome to the future of co-living!"
                    subTitle="A ROOMMATE FOR EVERYONE"
                    titleDescription="Whether you're looking for a new BFF or just someone to split the rent, UTARi is the easiest roommate finder out there."
                    imageName="roommate"
                    colorType={ColorType.FIRST}
                />
                <RightIndexInfo
                    title="Safe & Legal"
                    subTitle="NO ILLEGALLY PARTITIONED ROOMS"
                    titleDescription="All rooms put up for rent have been verified to be in compliance with regulation."
                    imageName="partition"
                    colorType={ColorType.SECOND}
                />
                <LeftIndexInfo
                    title="Rent Easier"
                    subTitle="HOSTEL SEARCHING ALGORITHM TAILORED FOR YOU"
                    titleDescription="UTARi makes finding affordable rooms easier than ever"
                    imageName="tailored"
                    colorType={ColorType.THIRD}
                />
            </IntroContainer>
        </Container>
    );
};

const Container = styled.main`
    font-family: 'Montserrat', sans-serif !important;
`;

const WelcomeMsg = styled.div`
    align-items: center;
    justify-content: space-evenly;
    display: flex;
`;

const WelcomeMsgContainer = styled.div`
    text-align: center;
    padding: 20px;
`;

const WelcomeMsgSpan = styled.span`
    color: ${({ theme }) => theme.secondaryColor};
    font-size: 3em;
`;

const HowUtariWorksContainer = styled.div`
    padding: 25px 0 25px 0;
    > a {
        text-decoration: none;
        color: ${({ theme }) => theme.howItWorks};
    }
`;

// intro

const IntroContainer = styled.div`
    margin: 0 150px 0 150px;
    @media (max-width: 968px) {
        margin: 0 200px 0 200px;
    }
    @media (max-width: 898px) {
        margin: 0 100px 0 100px;
    }
    @media (max-width: 710px) {
        margin: 0 50px 0 50px;
    }
`;

const Intro = styled.div`
    justify-content: center;
    display: flex;
    margin: 0 0 -4px 0;
    > div {
        flex: 0.5;
    }
    @media (max-width: 968px) {
        display: block;
        margin: 0 0 100px 0;
        > div {
            flex: 1;
        }
    }
`;

const IndexContainer = styled.div`
    @media (max-width: 968px) {
        width: 100%;
    }
`;

const ImageContainer = styled.div`
    align-items: center;
`;

const IndexImage = styled.img`
    max-width: 100px;
    flex-shrink: 0;
    min-width: 100%;
    min-height: auto;
`;

const WordContainer = styled(IndexContainer)`
    > div {
        margin: 0 10px 15px 10px;
    }
`;

const HomeTitle = styled.div`
    font-size: 40px;
    font-weight: bold;
    @media (max-width: 474px) {
        font-size: 30px;
    }
`;

const SubTitle = styled.div`
    color: ${({ colorType }: SubtitleProps) =>
        colorType === ColorType.FIRST
            ? ({ theme }) => theme.firstIndexSubtitle
            : colorType === ColorType.THIRD
            ? ({ theme }) => theme.secondIndexSubtitle
            : ({ theme }) => theme.thirdIndexSubtitle};
    font-size: 20px;
    margin-top: 30px 0 15px 0;
    @media (max-width: 474px) {
        font-size: 24px;
    }
`;

const TitleDescription = styled.div`
    font-size: 18px;
    @media (max-width: 474px) {
        font-size: 20px;
    }
`;

export default Index;
