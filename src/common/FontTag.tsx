import * as React from 'react';

const fontWeights = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
// Circular, -apple-system, BlinkMacSystemFont, Roboto, Helvetica Neue, sans-serif

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
        {fontWeights.map((fontWeight) => (
            <link
                key={fontWeight}
                href={`https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}&display=swap`}
                rel="stylesheet"
            />
        ))}
    </>
);

const MontserratFont = () => <Font fontFamily="Montserrat" />;
const RobotoFont = () => <Font fontFamily="Roboto" />;

export { MontserratFont, RobotoFont };
