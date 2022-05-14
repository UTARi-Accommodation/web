import * as React from 'react';

// refer https://stackblitz.com/edit/react-1zaeqk?file=src%2FusePagination.js
const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, index) => index + start);

const usePagination = ({
    siblingCount,
    currentPage,
    totalPage,
}: Readonly<{
    currentPage: number;
    totalPage: number;
    siblingCount: number;
}>) => {
    const dots = '...';
    const paginationRange: ReadonlyArray<string | number> =
        React.useMemo(() => {
            const totalPageNumbers = siblingCount + 5;

            if (totalPageNumbers >= totalPage) {
                return range(1, totalPage);
            }

            const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
            const rightSiblingIndex = Math.min(
                currentPage + siblingCount,
                totalPage
            );

            const shouldShowLeftDots = leftSiblingIndex > 2;
            const shouldShowRightDots = rightSiblingIndex < totalPage - 2;

            const firstPageIndex = 1;
            const lastPageIndex = totalPage;

            if (!shouldShowLeftDots && shouldShowRightDots) {
                const leftItemCount = 3 + 2 * siblingCount;
                const leftRange = range(1, leftItemCount);

                return [...leftRange, dots, totalPage];
            }

            if (shouldShowLeftDots && !shouldShowRightDots) {
                const rightItemCount = 3 + 2 * siblingCount;
                const rightRange = range(
                    totalPage - rightItemCount + 1,
                    totalPage
                );
                return [firstPageIndex, dots, ...rightRange];
            }

            if (shouldShowLeftDots && shouldShowRightDots) {
                const middleRange = range(leftSiblingIndex, rightSiblingIndex);
                return [
                    firstPageIndex,
                    dots,
                    ...middleRange,
                    dots,
                    lastPageIndex,
                ];
            }

            return [];
        }, [totalPage, siblingCount, currentPage]);

    return {
        paginationRange,
    };
};

export default usePagination;
