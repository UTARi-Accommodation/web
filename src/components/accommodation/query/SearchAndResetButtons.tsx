import * as React from 'react';
import styled from 'styled-components';
import Button from '../button/Button';
import ResetButton from '../button/Reset';
import HorizontalLine from '../display/HorizontalLine';

const SearchAndResetButtons = ({
    reset,
    onReset,
    onSearch,
}: Readonly<{
    reset: boolean;
    onReset: () => void;
    onSearch: () => void;
}>) => (
    <>
        <HorizontalLineStyled />
        <ButtonContainer>
            <ResetButton reset={reset} onReset={onReset} />
            <Button type="positive" label="Search" onClick={onSearch} />
        </ButtonContainer>
    </>
);

const HorizontalLineStyled = styled(HorizontalLine)`
    margin: 16px 0;
`;

const ButtonContainer = styled.div`
    align-items: center;
    justify-content: space-between;
    display: flex;
    width: 100%;
`;

export default SearchAndResetButtons;
