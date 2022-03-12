import styled, { createGlobalStyle, keyframes } from 'styled-components';

const FadeIn = keyframes`
    0% {
        opacity:0;
        transform: scale(1.1);
    }
    100% {
        opacity:1;
        transform: scale(1);
    }
`;

export const FullScreenContainer = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: 1;
    left: 0;
    top: 0;
    overflow: auto;
`;

export const GlobalContainer = styled.div`
    overflow: hidden;
    font-family: Montserrat, sans-serif;
    letter-spacing: -0.5px !important;
    animation: ${FadeIn} ease 0.5s;
    -moz-animation: ${FadeIn} ease 0.5s;
    -webkit-animation: ${FadeIn} ease 0.5s;
    -o-animation: ${FadeIn} ease 0.5s;
    -ms-animation: ${FadeIn} ease 0.5s;
`;

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        overflow-x: hidden;
        background-color: ${({ theme }) => theme.primaryColor};
        transition: all ease-in-out 0.1s;
    }
    html {
        scroll-behavior: smooth;
    }
    * {
        scrollbar-width: thin;
        scrollbar-color: gray ${({ theme }) => theme.scrollBarBackground};
    }
    *::-webkit-scrollbar {
        width: 7px;
    }
    *::-webkit-scrollbar-track {
        background: ${({ theme }) => theme.scrollBarBackground};
    }
    *::-webkit-scrollbar-thumb {
        border: 2px solid ${({ theme }) => theme.pureWhite};
        background-clip: padding-box;
        border-radius: 9999px;
        background-color: gray;
    }
`;

export default GlobalStyle;
