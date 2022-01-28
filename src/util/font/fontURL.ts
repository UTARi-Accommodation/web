export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontFamily = 'Roboto' | 'Montserrat';

const fontURL = (fontFamily: FontFamily, fontWeight: FontWeight) =>
    `https://fonts.googleapis.com/css2?family=${fontFamily}:wght@${fontWeight}&display=swap`;

export default fontURL;
