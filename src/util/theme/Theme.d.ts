import 'styled-components';

// interface Theme {
//     readonly primaryColor: '#FEFEFE' | '#121212';
//     readonly secondaryColor: '#121212' | '#FEFEFE';
//     readonly highEmphasesTextColor: '#FFFFFFE2' | '#000000DD';
//     readonly mediumEmphasesTextColor: '#FFFFFF99' | '#000000B3';
//     readonly disabledTextColor: '#FFFFFF61' | '#00000061';
//     readonly scrollBarBackground: '#000D0D' | '#F5F5F5';
// }

type Theme = Readonly<{
    title: '#678EFB';
    redColor: '#CC0F39';
    greenColor: '#0FFBF9';

    denseBlue: '#4fC0DF';
    denseOrange: '#DF6E4F';

    errorHomeButton: '#1DACD6';
    firstIndexSubtitle: '#EFCEA3';
    secondIndexSubtitle: '#F55F36';

    thirdIndexSubtitle: '#4fC0DF';
    stepDescription: '#4A4A4A';

    lightBlue: '#D9E3FF';
    lightOrange: '#FAF0E3';

    mediumOrange: '#EBC291';
    mediumBlue: '#6D8FFE';

    primaryColor: '#FEFEFE';
    secondaryColor: '#121212';
    highEmphasesTextColor: '#000000DD';
    mediumEmphasesTextColor: '#000000B3';
    disabledTextColor: '#00000061';

    scrollBarBackground: '#F5F5F5';

    howItWorks: '#002ee3';

    smallRoom: '#337AB7';
    middleRoom: '#5CB85C';
    masterRoom: '#E0115F';

    unit: '#BC1A6E';

    rating: '#FF385C';

    accommodationHorizontalLine: '#EBEBEB';
    border: '#D3D3D3';
}>;

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}
