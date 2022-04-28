import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Title from '../components/common/Title';

const TermsCondition = () => {
    const {
        location: { origin },
    } = window;

    return (
        <Container>
            <Title
                title="Terms and Conditions"
                content="The terms and conditions of UTARi"
            />
            <Content>
                <h1>Terms and Conditions</h1>
                <p>Last updated: April 28, 2022</p>
                <p>
                    These terms and conditions outline the rules and regulations
                    for the use of UTARi&apos;s Website, located at{' '}
                    <a
                        href={origin}
                        rel="external nofollow noopener noreferrer"
                        target="_blank"
                    >
                        {origin}
                    </a>
                </p>
                <p>
                    By accessing this website we assume you accept these terms
                    and conditions. If you do not agree to take all of the terms
                    and conditions stated on this page, then you are expressly
                    prohibited from using the site and you must discontinue use
                    immediately.
                </p>
                <h3>Cookies</h3>
                <p>
                    We employ the use of cookies. By accessing UTARi, you agreed
                    to use cookies in agreement with the UTAR&apos;s Privacy
                    Policy.{' '}
                </p>
                <p>
                    Most interactive websites use cookies to let us retrieve the
                    user’s details for each visit. Cookies are used by our
                    website to enable the functionality of certain areas to make
                    it easier for people visiting our website. Some of our
                    affiliate/advertising partners may also use cookies.
                </p>
                <h3>License</h3>
                <p>
                    Unless otherwise stated, UTARi and/or its licensors own the
                    intellectual property rights for all material on UTARi. All
                    intellectual property rights are reserved. You may access
                    this from UTARi for your own personal use subjected to
                    restrictions set in these terms and conditions.
                </p>
                <p>You must not:</p>
                <ul>
                    <li>Republish material from UTARi</li>
                    <li>Sell, rent or sub-license material from UTARi</li>
                    <li>Reproduce, duplicate or copy material from UTARi</li>
                    <li>Redistribute content from UTARi</li>
                </ul>
                <p>You warrant and represent that:</p>
                <ul>
                    <li>
                        You are entitled to post the Comments on our website and
                        have all necessary licenses and consents to do so;
                    </li>
                    <li>
                        The Comments do not invade any intellectual property
                        right, including without limitation copyright, patent or
                        trademark of any third party;
                    </li>
                    <li>
                        The Comments do not contain any defamatory, libelous,
                        offensive, indecent or otherwise unlawful material which
                        is an invasion of privacy
                    </li>
                    <li>
                        The Comments will not be used to solicit or promote
                        business or custom or present commercial activities or
                        unlawful activity.
                    </li>
                </ul>
                <h3>Hyperlinking to our Content</h3>
                <p>
                    The following organizations may link to our Website without
                    prior written approval:
                </p>
                <ul>
                    <li>Government agencies;</li>
                    <li>Search engines;</li>
                    <li>News organizations;</li>
                    <li>
                        Online directory distributors may link to our Website in
                        the same manner as they hyperlink to the Websites of
                        other listed businesses; and
                    </li>
                    <li>
                        System wide Accredited Businesses except soliciting
                        non-profit organizations, charity shopping malls, and
                        charity fundraising groups which may not hyperlink to
                        our Web site.
                    </li>
                </ul>
                <p>
                    These organizations may link to our home page, to
                    publications or to other Website information so long as the
                    link: (a) is not in any way deceptive; (b) does not falsely
                    imply sponsorship, endorsement or approval of the linking
                    party and its products and/or services; and (c) fits within
                    the context of the linking party’s site.
                </p>
                <p>
                    We may consider and approve other link requests from the
                    following types of organizations:
                </p>
                <ul>
                    <li>
                        commonly-known consumer and/or business information
                        sources;
                    </li>
                    <li>dot.com community sites;</li>
                    <li>
                        associations or other groups representing charities;
                    </li>
                    <li>online directory distributors;</li>
                    <li>internet portals;</li>
                    <li>accounting, law and consulting firms; and</li>
                    <li>educational institutions and trade associations.</li>
                </ul>
                <p>
                    We will approve link requests from these organizations if we
                    decide that: (a) the link would not make us look unfavorably
                    to ourselves or to our accredited businesses; (b) the
                    organization does not have any negative records with us; (c)
                    the benefit to us from the visibility of the hyperlink
                    compensates the absence of UTARi; and (d) the link is in the
                    context of general resource information.
                </p>
                <p>
                    These organizations may link to our home page so long as the
                    link: (a) is not in any way deceptive; (b) does not falsely
                    imply sponsorship, endorsement or approval of the linking
                    party and its products or services; and (c) fits within the
                    context of the linking party’s site.
                </p>
                <p>
                    If you are one of the organizations listed in paragraph 2
                    above and are interested in linking to our website, you must
                    inform us by sending an e-mail to UTARi. Please include your
                    name, your organization name, contact information as well as
                    the URL of your site, a list of any URLs from which you
                    intend to link to our Website, and a list of the URLs on our
                    site to which you would like to link. Wait 2-3 weeks for a
                    response.
                </p>
                <p>
                    Approved organizations may hyperlink to our Website as
                    follows:
                </p>
                <ul>
                    <li>By use of our corporate name; or</li>
                    <li>
                        By use of the uniform resource locator being linked to;
                        or
                    </li>
                    <li>
                        By use of any other description of our Website being
                        linked to that makes sense within the context and format
                        of content on the linking party’s site.
                    </li>
                </ul>
                <p>
                    No use of UTARi&apos;s logo or other artwork will be allowed
                    for linking absent a trademark license agreement.
                </p>
                <h3>iFrames</h3>
                <p>
                    Without prior approval and written permission, you may not
                    create frames around our Webpages that alter in any way the
                    visual presentation or appearance of our Website.
                </p>
                <h3>Content Liability</h3>
                <p>
                    We shall not be hold responsible for any content that
                    appears on your Website. You agree to protect and defend us
                    against all claims that is rising on your Website. No
                    link(s) should appear on any Website that may be interpreted
                    as libelous, obscene or criminal, or which infringes,
                    otherwise violates, or advocates the infringement or other
                    violation of, any third party rights.
                </p>
                <h3>Your Privacy</h3>
                <p>
                    Please read Privacy Policy:{' '}
                    <Link
                        to="/privacy-policy"
                        rel="nofollow noopener noreferrer"
                    >
                        {origin}/privacy-policy
                    </Link>
                </p>
                <h3>Reservation of Rights</h3>
                <p>
                    We reserve the right to request that you remove all links or
                    any particular link to our Website. You approve to
                    immediately remove all links to our Website upon request. We
                    also reserve the right to amen these terms and conditions
                    and it’s linking policy at any time. By continuously linking
                    to our Website, you agree to be bound to and follow these
                    linking terms and conditions.
                </p>
                <h3>Removal of links from our website</h3>
                <p>
                    If you find any link on our Website that is offensive for
                    any reason, you are free to contact and inform us any
                    moment. We will consider requests to remove links but we are
                    not obligated to or so or to respond to you directly.
                </p>
                <h3>Disclaimer</h3>
                <p>
                    To the maximum extent permitted by applicable law, we
                    exclude all representations, warranties and conditions
                    relating to our website and the use of this website. Nothing
                    in this disclaimer will:
                </p>
                <ul>
                    <li>
                        limit or exclude our or your liability for death or
                        personal injury;
                    </li>
                    <li>
                        limit or exclude our or your liability for fraud or
                        fraudulent misrepresentation;
                    </li>
                    <li>
                        limit any of our or your liabilities in any way that is
                        not permitted under applicable law; or
                    </li>
                    <li>
                        exclude any of our or your liabilities that may not be
                        excluded under applicable law.
                    </li>
                </ul>
                <p>
                    The limitations and prohibitions of liability set in this
                    Section and elsewhere in this disclaimer: (a) are subject to
                    the preceding paragraph; and (b) govern all liabilities
                    arising under the disclaimer, including liabilities arising
                    in contract, in tort and for breach of statutory duty.
                </p>
                <p>
                    As long as the website and the information and services on
                    the website are provided free of charge, we will not be
                    liable for any loss or damage of any nature.
                </p>
                <p>
                    If you have any questions about this Privacy Policy, You can
                    contact us:
                </p>
                <ul>
                    <li>
                        <p>By email: poolofdeath201@outlook.com</p>
                    </li>
                    <li>
                        <p>By phone number: 011-5548 4654</p>
                    </li>
                    <li>
                        <p>
                            By mail: P.O. Box 64, A309, Block F, Jalan Datuk
                            Haji Yassin 89907, Tenom, Sabah, Malaysia
                        </p>
                    </li>
                </ul>
            </Content>
        </Container>
    );
};

const Container = styled.div`
    margin: 32px auto;
    width: 75%;
    font-family: Montserrat, sans-serif;
`;

const Content = styled.div`
    width: 100%;
    text-align: left;
    margin: 0 auto;
    word-break: break-word;
`;

export default TermsCondition;
