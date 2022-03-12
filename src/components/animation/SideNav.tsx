import styled, { keyframes } from 'styled-components';
import { FullScreenContainer } from '../../theme/GlobalTheme';

type FullScreenAnimation = Readonly<{
    isSlideIn: boolean;
}>;

const FullScreenSlideIn = keyframes`
    0% {left: -100%;}
    100% {left: 0%;}
`;

const FullScreenSlideOut = keyframes`
    0% {left: 0%;}
    100% {left: -100%;}
`;

const SlideInFullScreenContainer = styled(FullScreenContainer)`
    font-family: Montserrat, sans-serif;
    display: grid;
    z-index: 7;
    background-color: transparent;
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
