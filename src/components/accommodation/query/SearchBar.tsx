import * as React from 'react';
import styled from 'styled-components';
import { AiOutlineSearch } from 'react-icons/ai';
import OutsideClickHandlerContainer from '../../OutsideClickHandler';

const SearchBar = ({
    prompt,
    value,
    onSearch,
}: Readonly<{
    prompt: 'Units' | 'Rooms';
    value: string;
    onSearch: (search: string) => void;
}>) => {
    const [state, setState] = React.useState({
        isMouseEnter: false,
    });

    const { isMouseEnter } = state;

    const setIsMouseEnterSearch = (isMouseEnter: boolean) =>
        setState((prev) => ({
            ...prev,
            isMouseEnter,
        }));

    return (
        <OutsideClickHandlerContainer setFalse={setIsMouseEnterSearch}>
            <SearchBarContainer>
                <SearchBarInputContainer
                    spellCheck={false}
                    onClick={() => setIsMouseEnterSearch(true)}
                    isMouseEnter={isMouseEnter}
                >
                    <SearchBarInput
                        value={value}
                        onChange={(e) => onSearch(e.target.value)}
                        type="text"
                        placeholder={`Search ${prompt}`}
                    />
                    <SearchIconContainer>
                        <SearchIcon />
                    </SearchIconContainer>
                </SearchBarInputContainer>
            </SearchBarContainer>
        </OutsideClickHandlerContainer>
    );
};

const SearchBarContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 24px 0;
    width: 100%;
`;

const SearchBarInputContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    border-radius: 24px;
    padding: 8px 16px;
    transition: border-color 0.1s ease, -webkit-box-shadow 0.1s ease;
    &:hover {
        box-shadow: 0px 1px 2px #00000014, 0px 4px 12px #0000000d;
        border: 1px solid ${({ theme }) => theme.secondaryColor};
    }
    border: 1px solid
        ${({
            isMouseEnter,
        }: Readonly<{
            isMouseEnter: boolean;
        }>) =>
            isMouseEnter
                ? ({ theme }) => theme.secondaryColor
                : ({ theme }) => theme.border};
    @media (max-width: 730px) {
        width: 350px;
    }
    @media (max-width: 650px) {
        width: 300px;
    }
    @media (max-width: 620px) {
        width: 250px;
    }
    @media (max-width: 551px) {
        width: 200px;
        padding: 6px 12px;
    }
    @media (max-width: 541px) {
        width: 250px;
    }
    @media (max-width: 350px) {
        width: 200px;
    }
`;

const SearchIconContainer = styled.div`
    padding: 8px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    cursor: pointer;
    background-color: ${({ theme }) => theme.searchBarIcon};
`;

const SearchIcon = styled(AiOutlineSearch)`
    font-size: 1em;
    color: ${({ theme }) => theme.primaryColor};
`;

const SearchBarInput = styled.input`
    border: none;
    font-size: 1em;
    outline: none;
    width: 100%;
    font-family: Montserrat, sans-serif;
    text-overflow: ellipsis;
`;

export { SearchIcon, SearchIconContainer };

export default SearchBar;
