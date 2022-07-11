import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLinkType } from '../header/NavLinks';

const Title = ({
    title,
    content,
}: Readonly<{
    title:
        | NavLinkType['title']
        | 'Page Not Found'
        | 'How UTARi Works'
        | 'Sign in | UTARi'
        | 'Delete Account'
        | 'Bookmarked Rooms'
        | 'Bookmarked Units'
        | 'Home'
        | 'Room Detailed Info'
        | 'Unit Detailed Info'
        | 'Terms and Conditions'
        | 'Privacy Policy';
    content: string;
}>) => {
    const image = 'https://utari.netlify.app/img/icons/icon-512x512.png';
    const utari = 'UTARi';

    return (
        <Helmet>
            <meta charSet="utf-8" name="description" content={content} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:site" content="@utari" />
            <meta name="twitter:title" content={utari} />
            <meta name="twitter:description" content={content} />
            <meta name="twitter:image" content={image} />

            <meta property="og:title" content={utari} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content="https://utari.netlify.app" />
            <meta property="og:description" content={content} />
            <meta property="og:image" content={image} />
            <meta property="og:image:width" content="512" />
            <meta property="og:image:height" content="512" />

            <title>{`${utari} | ${title}`}</title>
        </Helmet>
    );
};

export default Title;
