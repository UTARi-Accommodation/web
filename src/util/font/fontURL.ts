export type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

const fontURL = (fontWeight: FontWeight) =>
    `https://fonts.googleapis.com/css2?family=Montserrat:wght@${fontWeight}&display=swap`;

export default fontURL;
