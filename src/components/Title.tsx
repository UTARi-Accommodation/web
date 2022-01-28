import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLinkType } from './header/NavLinks';

const Title = ({
    title,
    content,
}: Readonly<{
    title: NavLinkType['title'] | 'Page Not Found' | 'How UTARi Works';
    content: string;
}>) => (
    <Helmet>
        <meta charSet="utf-8" name="description" content={content} />
        <title>{title}</title>
    </Helmet>
);

export default Title;
