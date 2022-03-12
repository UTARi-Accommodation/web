import styled from 'styled-components';

const Container = styled.div`
    font-family: Montserrat, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 300px;
    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    padding: 32px;
    @media (max-width: 383px) {
        width: 250px;
    }
    @media (max-width: 322px) {
        padding: 24px;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    align: items: center;
    flex-direction: column;
    justify: center;
    width: 100%;
    @media (max-width: 383px) {
        width: 90%;
    }
`;

export { Container, InnerContainer };
