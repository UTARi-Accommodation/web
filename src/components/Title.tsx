import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLinkType } from './header/NavLinks';

interface TitleProps {
    readonly title:
        | NavLinkType['title']
        | 'Page Not Found'
        | 'How UTARi Works'
        | 'Account Recovery';
    readonly content: string;
}

const Title = ({ title, content }: TitleProps) => {
    return (
        <Helmet>
            <meta charSet="utf-8" name="description" content={content} />
            <title>{title}</title>
        </Helmet>
    );
};

export default Title;
