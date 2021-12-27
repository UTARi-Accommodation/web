import 'styled-components';

// interface Theme {
//     readonly primaryColor: '#FEFEFE' | '#121212';
//     readonly secondaryColor: '#121212' | '#FEFEFE';
//     readonly highEmphasesTextColor: '#FFFFFFE2' | '#000000DD';
//     readonly mediumEmphasesTextColor: '#FFFFFF99' | '#000000B3';
//     readonly disabledTextColor: '#FFFFFF61' | '#00000061';
//     readonly scrollBarBackground: '#000D0D' | '#F5F5F5';
//     readonly signUpLabel: '#0FFBF9' | '#00539C';
// }

declare module 'styled-components' {
    export interface DefaultTheme {
        readonly title: '#678EFB';
        readonly redColor: '#CC0F39';
        readonly greenColor: '#0FFBF9';
        readonly denseBlue: '#4fC0DF';
        readonly denseOrange: '#DF6E4F';
        readonly errorHomeButton: '#1DACD6';
        readonly firstIndexSubtitle: '#EFCEA3';
        readonly secondIndexSubtitle: '#F55F36';
        readonly thirdIndexSubtitle: '#4fC0DF';
        readonly stepDescription: '#4A4A4A';
        readonly lightBlue: '#D9E3FF';
        readonly lightOrange: '#FAF0E3';
        readonly mediumOrange: '#EBC291';
        readonly mediumBlue: '#6D8FFE';
        readonly signUpInputBorder: '#DDDFE2';
        readonly friendlyErrorColor: '#E0115F';

        readonly primaryColor: '#FEFEFE';
        readonly secondaryColor: '#121212';
        readonly highEmphasesTextColor: '#000000DD';
        readonly mediumEmphasesTextColor: '#000000B3';
        readonly disabledTextColor: '#00000061';

        readonly scrollBarBackground: '#F5F5F5';
        readonly signUpLabel: '#00539C';

        readonly accountFormBoxShadow: '#0000001a';

        readonly google: '#4285f4';
        readonly mobile: '#000000DD';

        readonly howItWorks: '#002ee3';

        readonly floatingLabel: '#32CD32';
        readonly placeHolder: '#999';

        readonly loginButton: '#4fC0DF';
        readonly loginHover: '#27AFD4';

        readonly signUpButton: '#DF6E4F';
        readonly signUpHover: '#D44C27';

        readonly recoveryButton: '#121212';
        readonly recoverHover: '#000D0D';
    }
}
