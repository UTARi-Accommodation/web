import * as React from 'react';
import styled, { css } from 'styled-components';
import Title from '../components/common/Title';
import {
    SiMicrosoftsqlserver,
    SiThreedotjs,
    SiHyperledger,
    SiElectron,
} from 'react-icons/si';

const Work = () => (
    <Container>
        <Title
            title="How UTARi Works"
            content="Brief explanation on how UTARi works"
        />
        <MsgContainer>
            <div>
                <Msg>
                    <MsgSpan>How does UTARi works</MsgSpan>
                </Msg>
            </div>
        </MsgContainer>
        <ContentContainer>
            <StepsContainer>
                <StepContainer>
                    <StepTitle>
                        <ScrapIcon />
                        <StrongTitle>1. The Scrapping</StrongTitle>
                    </StepTitle>
                    <StepContent>
                        All of the information of accommodations is obtained
                        through web scrapping the UTAR Accommodation List
                        Website periodically. The scrapped information is
                        processed or formatted and stored into a remote Database
                    </StepContent>
                </StepContainer>
                <StepContainer>
                    <StepTitle>
                        <ConnectionIcon />
                        <StrongTitle>2. The Connection</StrongTitle>
                    </StepTitle>
                    <StepContent>
                        Whenever you search for accommodations with UTARi, UTARi
                        will need to establish a stable connection to the remote
                        Database. Once connection is established, it will look
                        for for any information that matches your searching
                        criterias
                    </StepContent>
                </StepContainer>
                <StepContainer>
                    <StepTitle>
                        <AlgorithmIcon />
                        <StrongTitle>3. The Algorithm</StrongTitle>
                    </StepTitle>
                    <StepContent>
                        Once the searching is completed, there will be an
                        algorithm that ranks each accommodations according to
                        the information it has. Hence what was presented to you
                        you is deemed as the best by the algorithm
                    </StepContent>
                </StepContainer>
                <StepContainer>
                    <StepTitle>
                        <ResultIcon />
                        <StrongTitle>4. The Result</StrongTitle>
                    </StepTitle>
                    <StepContent>
                        Right after the algorithm completed its process, the
                        server sends you the informations you look for as soon
                        as possible, no more, no less, so that you will not
                        experience any delaying
                    </StepContent>
                </StepContainer>
            </StepsContainer>
        </ContentContainer>
    </Container>
);

const Container = styled.div`
    font-family: Montserrat, sans-serif;
    min-height: calc(100vh - 72px - 299px);
    @media (min-height: 1000px) {
        margin: 0 0 -64px 0;
    }
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

const ContentContainer = styled.div`
    width: 75%;
    margin: 40px auto 0 auto;
    display: grid;
    grid-gap: 16px;
    @media (max-width: 820px) {
        width: 85%;
    }
`;

const StepsContainer = styled.div`
    width: 100%;
    grid-gap: 16px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 704px) {
        grid-template-columns: none;
        grid-template-rows: 1fr 1fr;
    }
`;

const StepContainer = styled.div`
    width: 100%;
    position: relative;
    justify-content: center;
    align-items: center;
    border-radius: 12px;
    box-sizing: border-box;
    padding: 8px 16px;
    border: 1px solid ${({ theme }) => theme.border};
`;

const StepTitle = styled.div`
    margin: 16px 0;
    width: 100%;
    display: grid;
    place-items: center;
    grid-gap: 16px;
`;

const StepContent = styled.div`
    text-align: center;
    margin: 16px 0;
    width: 100%;
    line-height: 1.5;
    color: ${({ theme }) => theme.mediumEmphasesTextColor};
`;

const StrongTitle = styled.strong`
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const IconStyle = css`
    font-size: 2em !important;
`;

const ScrapIcon = styled(SiMicrosoftsqlserver)`
    color: ${({ theme }) => theme.workScrapAndResult};
    ${IconStyle}
`;

const ConnectionIcon = styled(SiHyperledger)`
    color: ${({ theme }) => theme.workConnection};
    ${IconStyle}
`;

const AlgorithmIcon = styled(SiElectron)`
    color: ${({ theme }) => theme.workAlgorithm};
    ${IconStyle}
`;

const ResultIcon = styled(SiThreedotjs)`
    color: ${({ theme }) => theme.workScrapAndResult};
    ${IconStyle}
`;

export default Work;
