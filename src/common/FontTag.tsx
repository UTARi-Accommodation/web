import * as React from 'react';
import fontURL, { FontWeight } from '../util/font/fontURL';

const FontTag = ({ weight }: Readonly<{ weight: FontWeight }>) => (
    <div>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
        />
        <link href={fontURL('Montserrat', weight)} rel="stylesheet" />
    </div>
);

export default FontTag;
