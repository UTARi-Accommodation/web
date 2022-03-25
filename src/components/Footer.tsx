import * as React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import HorizontalLine from './accommodation/display/HorizontalLine';
import { condominiumsRoute, housesRoute } from '../url/query/general/unit';
import { roommatesRoute, roomsRoute } from '../url/query/general/room';

const LinkToContent = ({
    link,
    content,
}: Readonly<{
    link: string;
    content: string;
}>) => {
    const summaryContent = <SummaryContent>{content}</SummaryContent>;

    return (
        <LinkContainer>
            {link.startsWith('/') ? (
                <Link to={link}>{summaryContent}</Link>
            ) : (
                <a
                    href={link}
                    target="_blank"
                    rel="external nofollow noopener noreferrer"
                >
                    {summaryContent}
                </a>
            )}
        </LinkContainer>
    );
};

const Footer = () => (
    <Container>
        <InnerContainer>
            <SummaryContainer>
                <ColumnSummary>
                    <SummaryTitle>Accommodation Type</SummaryTitle>
                    <LinkToContent
                        content="Condominium"
                        link={condominiumsRoute}
                    />
                    <LinkToContent content="House" link={housesRoute} />
                    <LinkToContent content="Room" link={roomsRoute} />
                    <LinkToContent
                        content="Find Roommate"
                        link={roommatesRoute}
                    />
                </ColumnSummary>
                <ColumnSummary>
                    <SummaryTitle>Website</SummaryTitle>
                    <LinkToContent content="Home" link="/" />
                    <LinkToContent content="About" link="/about" />
                    <LinkToContent content="Contact" link="/contact" />
                    <LinkToContent content="How it works" link="/work" />
                </ColumnSummary>
                <ColumnSummary>
                    <SummaryTitle>Developers</SummaryTitle>
                    <LinkToContent
                        content="Open Source"
                        link="https://github.com/Utari-Room/"
                    />
                </ColumnSummary>
                <ColumnSummary>
                    <SummaryTitle>Social</SummaryTitle>
                    <LinkToContent
                        content="Github"
                        link="https://github.com/Utari-Room/"
                    />
                    <LinkToContent
                        content="Facebook"
                        link="https://m.facebook.com/GervinFung/"
                    />
                    <LinkToContent
                        content="LinkedIn"
                        link="https://my.linkedin.com/in/gervin-fung-387409209/"
                    />
                    <LinkToContent
                        content="Instagram"
                        link="https://www.instagram.com/poolofdeath20/"
                    />
                </ColumnSummary>
            </SummaryContainer>
            <FooterHozitonalLine />
            <CopyRightContainer>
                <CopyRight>
                    Copyright &copy;{new Date().getFullYear()}
                </CopyRight>
                <RowSummary>
                    <LinkToContent content="Privacy" link="/privacy-policy" />
                    <LinkToContent content="Terms" link="/terms-conditions" />
                </RowSummary>
            </CopyRightContainer>
        </InnerContainer>
    </Container>
);

const Container = styled.footer`
    font-family: Montserrat, sans-serif !important;
    margin: 64px 0 0 0;
    padding: 32px 0;
    font-weight: 400;
    display: grid;
    place-items: center;
    background-color: ${({ theme }) => theme.footerBackground};
`;

const InnerContainer = styled.div`
    display: grid;
    place-items: center;
    width: 75%;
    > div {
        width: 100%;
    }
    @media (max-width: 820px) {
        width: 85%;
    }
`;

const SummaryContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    grid-gap: 24px;
    @media (max-width: 365px) {
        flex-wrap: no-wrap;
        flex-direction: column;
    }
`;

const ColumnSummary = styled.div`
    display: flex;
    flex-direction: column;
`;

const RowSummary = styled(ColumnSummary)`
    flex-direction: row;
    grid-gap: 16px;
    justify-content: space-between;
`;

const SummaryTitle = styled.div`
    text-transform: uppercase;
    margin: 0 0 16px 0;
    font-weight: 500;
    color: ${({ theme }) => theme.highEmphasesTextColor};
`;

const SummaryContent = styled.div`
    margin: 0 0 8px 0;
    transition: 0.3s;
    &:hover {
        color: ${({ theme }) => theme.mediumEmphasesTextColor};
    }
    color: gray;
`;

const LinkContainer = styled.div`
    > a {
        text-decoration: none;
    }
`;

const CopyRightContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const FooterHozitonalLine = styled(HorizontalLine)`
    margin: 32px 0;
`;

const CopyRight = styled.div`
    font-size: 1em;
    color: gray;
`;

export default Footer;
