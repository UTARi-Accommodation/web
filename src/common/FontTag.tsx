import * as React from 'react';
import fontURL, { FontWeight } from '../util/font/fontURL';

const FontTag = ({ weight }: { readonly weight: FontWeight }) => {
    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
                rel="preconnect"
                href="https://fonts.gstatic.com"
                crossOrigin="anonymous"
            />
            <link href={fontURL(weight)} rel="stylesheet" />
        </div>
    );
};

export default FontTag;
