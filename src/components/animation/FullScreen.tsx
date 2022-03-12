import styled, { keyframes } from 'styled-components';
import { FullScreenContainer } from '../../theme/GlobalTheme';

type FullScreenAnimation = Readonly<{
    isSlideIn: boolean;
}>;

const FullScreenSlideIn = keyframes`
    0% {top: 100%;}
    100% {top: 50%;}
`;

const FullScreenSlideOut = keyframes`
    0% {top: 50%;}
    100% {top: 100%;}
`;

const SlideInFullScreenContainer = styled(FullScreenContainer)`
    font-family: Montserrat, sans-serif;
    display: grid;
    grid-template-rows: 1fr 9fr;
    z-index: 5;
    background-color: ${({ theme }) => theme.primaryColor};
    animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -moz-animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -webkit-animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -o-animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
    -ms-animation: ${({ isSlideIn }: FullScreenAnimation) =>
            isSlideIn ? FullScreenSlideIn : FullScreenSlideOut}
        ease 0.5s;
`;

export default SlideInFullScreenContainer;
