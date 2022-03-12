import styled from 'styled-components';

const Container = styled.div`
    display: grid;
    place-items: center;
    box-sizing: border-box;
    @media (max-width: 800px) {
        padding: 0 8px 8px 8px;
    } ;
`;

const CommonButtonComponents = styled.div`
    font-family: Montserrat, sans-serif;
    transition: all 0.25s ease;
    font-size: 1em;
    border-radius: 16px;
    padding: 8px 16px;
    cursor: pointer;
    font-weight: 500;
`;

export { CommonButtonComponents, Container };
