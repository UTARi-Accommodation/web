import * as React from 'react';

const Font = ({
    fontFamily,
}: Readonly<{
    fontFamily: 'Roboto' | 'Montserrat' | 'Okra';
}>) => (
    <>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
        />
        <link
            href={`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${[
                100, 200, 300, 400, 500, 600, 700, 800, 900,
            ].join(';')}&display=swap`}
            rel="stylesheet"
        />
    </>
);

const MontserratFont = () => <Font fontFamily="Montserrat" />;
const RobotoFont = () => <Font fontFamily="Roboto" />;

export { MontserratFont, RobotoFont };
