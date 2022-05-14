import * as React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import styled, { css } from 'styled-components';
import { maxItemsPerPage } from 'utari-common';
import usePagination from '../../../hook/pagination';

//ref https://stackoverflow.com/questions/49784294/warning-received-false-for-a-non-boolean-attribute-how-do-i-pass-a-boolean-f
//ref https://styled-components.com/docs/api#transient-props
type PaginationNavigationProps = Readonly<{
    $disallowed: boolean;
}>;

const Pagination = ({
    totalPage,
    currentPage,
    onClick,
    numberOfResults,
    numberOfResultsQueried,
}: Readonly<{
    totalPage: number;
    currentPage: number;
    onClick: (page: number) => void;
    numberOfResults: number;
    numberOfResultsQueried: number;
}>) => {
    const { paginationRange } = usePagination({
        currentPage,
        totalPage,
        siblingCount: 1,
    });

    return (
        <>
            <Container>
                <NumberPaginationContainer
                    $disallowed={!numberOfResults || currentPage === 1}
                >
                    <LeftCircle
                        onClick={() => {
                            if (currentPage > 1) {
                                onClick(currentPage - 1);
                            }
                        }}
                    />
                </NumberPaginationContainer>
                {paginationRange.map((page) =>
                    currentPage === page ? (
                        <CurrentPaginationContainer key={page}>
                            <CurrentPaginationButton>
                                {page}
                            </CurrentPaginationButton>
                        </CurrentPaginationContainer>
                    ) : typeof page === 'number' ? (
                        <NumberPaginationContainer
                            key={page}
                            onClick={() => onClick(page)}
                            $disallowed={!numberOfResults}
                        >
                            <PaginationButton>{page}</PaginationButton>
                        </NumberPaginationContainer>
                    ) : (
                        <DotPaginationContainer key={page}>
                            <PaginationButton>{page}</PaginationButton>
                        </DotPaginationContainer>
                    )
                )}
                <NumberPaginationContainer
                    $disallowed={!numberOfResults || currentPage === totalPage}
                >
                    <RightCircle
                        onClick={() => {
                            if (currentPage < totalPage) {
                                onClick(currentPage + 1);
                            }
                        }}
                    />
                </NumberPaginationContainer>
            </Container>
            <SearchResultDescription>
                {`${
                    !numberOfResults
                        ? 0
                        : (currentPage - 1) * maxItemsPerPage + 1
                } - ${
                    !currentPage
                        ? maxItemsPerPage
                        : Math.min(
                              maxItemsPerPage * currentPage,
                              numberOfResultsQueried
                          )
                } out of ${numberOfResultsQueried} result${
                    numberOfResultsQueried > 1 ? 's' : ''
                } was shown`}
            </SearchResultDescription>
        </>
    );
};

const Container = styled.div`
    width: 100%;
    padding: 16px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const PaginationContainer = styled.div`
    border-radius: 50%;
    padding: 4px;
    display: grid;
    place-items: center;
    margin: 8px;
    @media (max-width: 460px) {
        margin: 4px;
    }
    @media (max-width: 330px) {
        margin: 2px;
    }
`;

const DotPaginationContainer = styled(PaginationContainer)`
    color: ${({ theme }) => theme.primaryColor};
`;

const NumberPaginationContainer = styled(PaginationContainer)`
    &:hover {
        background-color: whitesmoke;
    }
    color: ${({ theme }) => theme.primaryColor};
    cursor: ${({ $disallowed }: PaginationNavigationProps) =>
        $disallowed ? 'not-allowed' : 'pointer'};
`;

const CurrentPaginationContainer = styled(PaginationContainer)`
    background-color: black;
    cursor: pointer;
`;

const PaginationCircle = css`
    height: 24px;
    width: 24px;
    display: grid;
    place-items: center;
    color: ${({ theme }) => theme.secondaryColor};
`;

const PaginationButton = styled.div`
    text-align: center;
    ${PaginationCircle}
`;

const CurrentPaginationButton = styled(PaginationButton)`
    color: ${({ theme }) => theme.primaryColor};
`;

const LeftCircle = styled(IoChevronBackOutline)`
    ${PaginationCircle};
`;

const RightCircle = styled(IoChevronForwardOutline)`
    ${PaginationCircle};
`;

const SearchResultDescription = styled.div`
    display: grid;
    place-items: center;
    color: ${({ theme }) => theme.secondaryColor};
    padding: 0 0 16px 0;
`;

export default Pagination;
