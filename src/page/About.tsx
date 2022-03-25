import * as React from 'react';
import {
    VerticalTimeline,
    VerticalTimelineElement,
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import styled from 'styled-components';
import { FaSchool, FaSadTear, FaTired } from 'react-icons/fa';
import { IoMdSchool } from 'react-icons/io';
import { FaLungsVirus } from 'react-icons/fa';
import { MdEmojiObjects } from 'react-icons/md';

const About = () => {
    const contentStyleGenerator = (borderTop: string) => ({
        borderTop: `3px solid ${borderTop}`,
        background: '#FFF',
        color: '#000',
        borderRadius: '12px',
        boxShadow: '#00000059 0px 2px 4px',
    });

    const contentArrowStyleGenerator = (borderRight: string) => ({
        borderRight: `8px solid ${borderRight}`,
    });

    const iconStyleGenerator = (backgroundColor: string) => ({
        backgroundColor,
        color: '#FFF',
    });

    return (
        <>
            <Container>
                <TitleContainer>Ready for a story?</TitleContainer>
            </Container>
            <VerticalTimelineContainer>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2018 - 2019"
                    icon={<FaSchool />}
                    contentStyle={contentStyleGenerator('#34B7F1')}
                    contentArrowStyle={contentArrowStyleGenerator('#34B7F1')}
                    iconStyle={iconStyleGenerator('#34B7F1')}
                >
                    <h3 className="vertical-timeline-element-title">
                        Registered{' '}
                        <span style={{ textTransform: 'lowercase' }}>as</span>{' '}
                        UTAR student
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        Foundation in Science
                    </h4>
                    <JustifiedParagraph>
                        Although UTAR Accommodation List Website (UALW)
                        didn&apos;t provide any searching or filtering features,
                        and as a Sabahan, I am not familiar with the places at
                        all, thus it wasn&apos;t easy to search for hostel
                        rooms. Still, with the grace of God, my mom and I still
                        managed to found the first hostel room
                    </JustifiedParagraph>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2019 - 2020"
                    icon={<IoMdSchool />}
                    contentStyle={contentStyleGenerator('#2196f3')}
                    contentArrowStyle={contentArrowStyleGenerator('#2196f3')}
                    iconStyle={iconStyleGenerator('#2196f3')}
                >
                    <h3 className="vertical-timeline-element-title">
                        Furthered my studies
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        Bachelor of Software Engineering (Hons)
                    </h4>
                    <JustifiedParagraph>
                        Found the second hostel with my friends as UALW still
                        didn&apos;t provide any searching or filtering features.
                        As such it&apos;s still very hard to search for hostel
                        rooms that fits my needs
                    </JustifiedParagraph>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="2020 - 2021"
                    icon={<FaLungsVirus />}
                    contentStyle={contentStyleGenerator('#E91E63')}
                    contentArrowStyle={contentArrowStyleGenerator('#E91E63')}
                    iconStyle={iconStyleGenerator('#E91E63')}
                >
                    <h3 className="vertical-timeline-element-title">
                        Covid-19 hits hard
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        Terminated my rental contract
                    </h4>
                    <JustifiedParagraph>
                        Inspired by TTAP and the urge to solve a problem that
                        bothered me badly, I had decided to improve my
                        programming skills to build a website that search for
                        hostel rooms before I am required to go back to campus
                    </JustifiedParagraph>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--work"
                    date="May 2021"
                    icon={<FaSadTear />}
                    contentStyle={contentStyleGenerator('#FD4F31')}
                    contentArrowStyle={contentArrowStyleGenerator('#FD4F31')}
                    iconStyle={iconStyleGenerator('#FD4F31')}
                >
                    <h3 className="vertical-timeline-element-title">
                        A Failure that brought me to realization
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        Collaboration with my friend
                    </h4>
                    <JustifiedParagraph>
                        Eugene Yong and I collaborated and decided to solve this
                        problem. Unfortunately, because of my lack of experience
                        in creating a scalable web application, the final
                        product have a very bad UI/UX design and it&apos;s is a
                        total disaster. In the end, the project was abandoned by
                        us. On the bright side, it provided me experiences and
                        knowledge so I don&apos;t repeat the same mistake again
                    </JustifiedParagraph>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="Jan 2022"
                    icon={<FaTired />}
                    iconStyle={{
                        background: '#25D366',
                        color: '#FFF',
                    }}
                    contentStyle={{
                        borderTop: '3px solid #25D366',
                        background: '#FFF',
                        color: 'black',
                        borderRadius: '12px',
                        boxShadow: '#00000014 0px 2px 4px',
                    }}
                    contentArrowStyle={{
                        borderRight: '8px solid #25D366',
                    }}
                >
                    <h3 className="vertical-timeline-element-title">
                        Trying to do better
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        Rebuild the website
                    </h4>
                    <JustifiedParagraph>
                        After 7 months, I am well equipped with the knowledge
                        and skills I have obtained from both my internship at
                        Didian and from building my own website, I decided
                        it&apos;s time to rebuild the website, it wasn&apos;t
                        smooth sailing, thus I consulted my supervisor Wong Jia
                        Hau and a friend of mine, Lee Quan on database design
                    </JustifiedParagraph>
                </VerticalTimelineElement>
                <VerticalTimelineElement
                    className="vertical-timeline-element--education"
                    date="March 2022"
                    iconStyle={{
                        background: '#678EFB',
                        color: '#FFF',
                    }}
                    contentStyle={{
                        borderTop: '3px solid #678EFB',
                        background: '#FFF',
                        color: 'black',
                        borderRadius: '12px',
                        boxShadow: '#00000014 0px 2px 4px',
                    }}
                    contentArrowStyle={{
                        borderRight: '8px solid #678EFB',
                    }}
                    icon={<MdEmojiObjects />}
                >
                    <h3 className="vertical-timeline-element-title">
                        UTARi came to life
                    </h3>
                    <h4 className="vertical-timeline-element-subtitle">
                        An Open Source Project
                    </h4>
                    <JustifiedParagraph>
                        Due to the previous failure, experiences and guidance
                        from my supervisor and my friend, I was able to complete
                        the development of UTARi and deploy it. Now it&apos;s
                        available on Github as an Open Source project so anyone
                        can contribute to it
                    </JustifiedParagraph>
                </VerticalTimelineElement>
            </VerticalTimelineContainer>
        </>
    );
};

const VerticalTimelineContainer = styled(VerticalTimeline)`
    font-family: Montserrat, sans-serif;
    .vertical-timeline-element-title {
        text-transform: capitalize;
    }
    .vertical-timeline-element-date {
        color: ${({ theme }) => theme.highEmphasesTextColor};
    }
    width: 75% !important;
    &:before {
        box-shadow: ${({ theme }) => theme.aboutVerticalTimeline} 0px 2px 4px;
    }
    @media (max-width: 820px) {
        width: 85% !important;
    }
`;

const Container = styled.div`
    margin: 32px 0;
    width: 100%;
    display: grid;
    place-items: center;
    font-family: Montserrat, sans-serif;
`;

const TitleContainer = styled.div`
    margin: 0 0 32px 0;
    display: grid;
    place-items: center;
    font-weight: 400;
    font-size: 3em;
    text-transform: uppercase;
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

const JustifiedParagraph = styled.p`
    text-align: justify;
`;

export default About;
