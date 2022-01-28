import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../components/Title';

type WorkInformation = Readonly<{
    title: string;
    stepDescription: string;
    imageName: string;
}>;

type Tenant = Readonly<{
    message: 'SEARCH PROPERTY';
    title: 'How to search for rental property';
}>;

type ButtonProps = Readonly<{
    message: Tenant['message'];
}>;

type ImageContainer = Readonly<{
    hide: boolean;
}>;

const MessageContainer = ({
    title,
}: Readonly<{
    title: Tenant['title'];
}>): JSX.Element => (
    <WorkMessageContainer>
        <div>
            <WorkMessageDiv>
                <WorkMessageSpan>{title}</WorkMessageSpan>
            </WorkMessageDiv>
        </div>
    </WorkMessageContainer>
);

const RightWorkInfo = ({
    title,
    stepDescription,
    imageName,
}: WorkInformation): JSX.Element => {
    const breakPoint = 1237;

    const [state, setState] = React.useState({
        width: window.innerWidth,
    });

    const handleResizeWindow = () =>
        setState(() => ({
            width: window.innerWidth,
        }));

    React.useEffect(() => {
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    const { width } = state;

    const ImageContainer = ({ hide }: ImageContainer) =>
        hide ? null : (
            <WorkImageContainer>
                <WorkImage
                    src={`img/work/${imageName}.webp`}
                    alt={imageName.split('/')[1]}
                />
            </WorkImageContainer>
        );

    return (
        <WorkStepContainer>
            <ImageContainer hide={width <= breakPoint} />
            <WorkContentContainer>
                <WorkTitle>{title}</WorkTitle>
                <WorkDescription>{stepDescription}</WorkDescription>
            </WorkContentContainer>
            <ImageContainer hide={width > breakPoint} />
        </WorkStepContainer>
    );
};

const LeftWorkInfo = ({
    title,
    stepDescription,
    imageName,
}: WorkInformation): JSX.Element => (
    <WorkStepContainer>
        <WorkContentContainer>
            <WorkTitle>{title}</WorkTitle>
            <WorkDescription>{stepDescription}</WorkDescription>
        </WorkContentContainer>
        <WorkImageContainer>
            <WorkImage
                src={`img/work/${imageName}.webp`}
                alt={imageName.split('/')[1]}
            />
        </WorkImageContainer>
    </WorkStepContainer>
);

const Button = ({ message }: ButtonProps): JSX.Element => (
    <div>
        <FinalStepContainer>
            <FinalStepTitle>Ready to get started?</FinalStepTitle>
            <Link to="/room">{message}</Link>
        </FinalStepContainer>
    </div>
);

const NavigationButton = (): JSX.Element => (
    <NavigationButtonContainer>
        <NavigationLinkContainer>
            <Link to="/tenant-work">
                <Search>Search Property</Search>
            </Link>
        </NavigationLinkContainer>
    </NavigationButtonContainer>
);

const TenantWork = () => {
    const { message, title }: Tenant = {
        message: 'SEARCH PROPERTY',
        title: 'How to search for rental property',
    };

    return (
        <main>
            <Title
                title="How UTARi Works"
                content="This page explains how UTARi works in general"
            />
            <MessageContainer title={title} />
            <NavigationButton />
            <WorkContainer>
                <LeftWorkInfo
                    title="Browse Properties"
                    stepDescription="Browse hundreds of places on UTARi for free. Listing are verified to ensure a safe searching experience."
                    imageName="tenant/search"
                />
                <RightWorkInfo
                    title="Contact The Landlord!"
                    stepDescription="WhatsApp or email of the landlord to learn more about a listing and send a booking request when you find the perfect place!"
                    imageName="tenant/chat"
                />
                <LeftWorkInfo
                    title="Move In"
                    stepDescription="Time to pack your stuffs and celebrate finding a new place to move into."
                    imageName="tenant/pack"
                />
                <Button message={message} />
            </WorkContainer>
        </main>
    );
};

const WorkMessageContainer = styled.div`
    font-family: 'Montserrat', serif;
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    margin: 30px 0 30px;
    padding: 25px 100px 25px 100px;
    @media (max-width: 563px) {
        padding: 25px 30px 25px 30px;
    }
`;

const WorkContainer = styled.div`
    margin: 0 150px 150px 150px;
    padding: 100px;
    border: 5px solid ${({ theme }) => theme.lightBlue};
    @media (max-width: 1237px) {
        justify-content: center;
    }
    @media (max-width: 948px) {
        margin: 0 100px 150px 100px;
    }
    @media (max-width: 894px) {
        padding: 100px 50px 100px 50px;
    }
    @media (max-width: 694px) {
        margin: 0 50px 150px 50px;
    }
    @media (max-width: 500px) {
        margin: 100px 50px 150px 50px;
        padding: 0;
        border: none;
    }
    @media (max-width: 400px) {
        margin: 70px 25px 90px 25px;
    }
`;

const WorkMessageDiv = styled.div`
    text-align: center;
`;

const WorkMessageSpan = styled.span`
    font-size: 42px;
    font-weight: bold;
    @media (max-width: 563px) {
        font-size: 35px;
    }
`;

const NavigationButtonContainer = styled.div`
    justify-content: center;
    display: flex;
`;

const NavigationLinkContainer = styled.div`
    justify-content: center;
    display: flex;
    text-align: center;
    > a {
        text-decoration: none;
    }
    @media (max-width: 505px) {
        flex-direction: column;
        width: 50%;
    }
    @media (max-width: 390px) {
        width: 60%;
    }
    @media (max-width: 321px) {
        width: 70%;
    }
`;

const NavigationStyled = styled.div`
    padding: 10px 30px 10px 30px;
    margin: 0 1px 30px 1px;
    text-decoration: none;
    font-size: 22px;
    border-radius: 5px;
    outline: none;
    border: 0;
    @media (max-width: 800px) {
        font-size: 18px;
    }
    @media (max-width: 575px) {
        font-size: 17px;
    }
    @media (max-width: 505px) {
        padding: 10px 22px 10px 22px;
    }
`;

const Search = styled(NavigationStyled)`
    background-color: ${({ theme }) => theme.denseBlue};
    border: 3px solid ${({ theme }) => theme.denseBlue};
    color: ${({ theme }) => theme.primaryColor};
`;

const WorkStepContainer = styled.div`
    justify-content: center;
    display: flex;
    margin: 0 0 -3px 0;
    > div {
        flex: 0.5;
    }
    @media (max-width: 1237px) {
        margin: 0 0 100px 0;
        display: block;
    }
`;

const WorkContentContainer = styled.div`
    @media (max-width: 1237px) {
        width: 100%;
        max-width: none;
    }
`;

const WorkImageContainer = styled(WorkContentContainer)`
    margin: 0 10px 0 10px;
    display: flex;
    @media (max-width: 1237px) {
        justify-content: center;
    }
`;

const WorkImage = styled.img`
    max-width: 100px;
    flex-shrink: 0;
    min-width: 100%;
    min-height: auto;
    @media (max-width: 1237px) {
        margin-top: 25px;
        width: 75%;
        max-width: none;
    }
    @media (max-width: 1096px) {
        width: 85%;
    }
`;

const WorkTitle = styled.div`
    font-size: 26px;
    margin-bottom: 15px;
    margin: 10px 10px 15px 10px;
    font-weight: bolder;
    text-transform: uppercase;
    font-family: 'Montserrat', serif;
    color: ${({ theme }) => theme.denseBlue};
`;

const WorkDescription = styled.div`
    margin: 0 10px 15px 10px;
    color: ${({ theme }) => theme.stepDescription};
    font-family: 'Montserrat', serif;
    font-size: 20px;
`;

const FinalStepContainer = styled.div`
    margin: 100px 0 -25px 0;
    font-size: 32px;
    text-align: center;
    font-weight: 700;
    font-family: 'Montserrat', serif;
    > a {
        background-color: ${({ theme }) => theme.denseBlue};
        color: ${({ theme }) => theme.primaryColor};
        padding: 25px 50px 25px 50px;
        text-decoration: none;
        font-size: 22px;
        border-radius: 4px;
        outline: none;
        border: 0;
    }
`;

const FinalStepTitle = styled.div`
    margin: 0 0 50px 0;
    font-family: 'Montserrat', serif;
`;

export default TenantWork;
