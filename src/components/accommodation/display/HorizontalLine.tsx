import styled from 'styled-components';

const HorizontalLine = styled.hr`
    width: 100%;
    align-items: flex-start;
    background-color: ${({ theme }) => theme.border};
    height: 1px;
    border: 0;
`;

export default HorizontalLine;
