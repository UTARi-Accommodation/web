import * as React from 'react';
import styled, { css } from 'styled-components';
import { FaInstagram, FaTwitter, FaTiktok } from 'react-icons/fa';
import { TiSocialLinkedin, TiSocialFacebook } from 'react-icons/ti';

const Footer = () => (
    <Container>
        <CopyRight>
            <p>copyright &copy;{new Date().getFullYear()}</p>
        </CopyRight>
        <SocialLinkContainer>
            <Linkedin href="https://www.linkedin.com/school/universiti-tunku-abdul-rahman/?originalSubdomain=my">
                <LinkedinLogo />
            </Linkedin>
            <Facebook href="https://www.facebook.com/UTARnet">
                <FacebookLogo />
            </Facebook>
            <Instagram href="https://www.instagram.com/utarnet1/?hl=en">
                <InstagramLogo />
            </Instagram>
            <Twitter href="https://twitter.com/utarnet?lang=en">
                <TwitterLogo />
            </Twitter>
            <TikTok href="https://www.tiktok.com/@utarnet?lang=en">
                <TikTokLogo />
            </TikTok>
        </SocialLinkContainer>
    </Container>
);

const Container = styled.footer`
    height: fit-content;
    text-align: center;
    background-color: transparent;
    font-family: 'Montserrat', sans-serif !important;
`;

const SocialLinkContainer = styled.div`
    display: inline-flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 20px;
`;

const CopyRight = styled.div`
    font-size: 1.3em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.secondaryColor};
    @media (max-width: 586px) {
        font-size: 1em;
    }
`;

const SocialIcon = styled.a.attrs({
    target: '_blank',
    rel: 'noreferrer noopener',
})`
    display: grid;
    place-items: center;
    color: whitesmoke;
    border-radius: 50%;
    padding: 10px;
    width: 40px;
    height: 40px;
    transition: all 0.3s ease;
    margin: 5px 10px;
    border: none;
    &:hover {
        transform: rotate(360deg) scale(1.3);
        background: whitesmoke;
    }
    &:focus {
        outline: none;
    }
    @media (max-width: 366px) {
        padding: 5px;
    } ;
`;

const BigIcon = css`
    font-size: 2.5em !important;
    @media (max-width: 366px) {
        font-size: 2.2em !important;
    }
`;

const SmallIcon = css`
    font-size: 2.2em !important;
    @media (max-width: 366px) {
        font-size: 2em !important;
    }
`;

const Facebook = styled(SocialIcon)`
    background: #3b5998;
    &:hover {
        color: #3b5998;
    }
`;

const FacebookLogo = styled(TiSocialFacebook)`
    ${SmallIcon}
`;

const Linkedin = styled(SocialIcon)`
    background: #007bb5;
    &:hover {
        color: #007bb5;
    }
`;

const LinkedinLogo = styled(TiSocialLinkedin)`
    ${SmallIcon}
`;

const Instagram = styled(SocialIcon)`
    background: #f09433;
    background: -moz-linear-gradient(
        45deg,
        #f09433 0%,
        #e6683c 25%,
        #dc2743 50%,
        #cc2366 75%,
        #bc1888 100%
    );
    background: -webkit-linear-gradient(
        45deg,
        #f09433 0%,
        #e6683c 25%,
        #dc2743 50%,
        #cc2366 75%,
        #bc1888 100%
    );
    background: linear-gradient(
        45deg,
        #f09433 0%,
        #e6683c 25%,
        #dc2743 50%,
        #cc2366 75%,
        #bc1888 100%
    );
    &:hover {
        color: #dc2743;
    }
`;

const InstagramLogo = styled(FaInstagram)`
    ${BigIcon}
`;

const TikTok = styled(SocialIcon)`
    background: #282a36;
    &:hover {
        color: #282a36;
    }
`;

const TikTokLogo = styled(FaTiktok)`
    ${SmallIcon}
`;

const Twitter = styled(SocialIcon)`
    background: #326ada;
    &:hover {
        color: #326ada;
    }
`;

const TwitterLogo = styled(FaTwitter)`
    ${SmallIcon}
`;

export default Footer;
