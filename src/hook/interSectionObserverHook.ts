import * as React from 'react';

const useIntersectionObserver = (
    containerRef: React.RefObject<HTMLDivElement>
) => {
    // ref https://dev.to/selbekk/how-to-fade-in-content-as-it-scrolls-into-view-10j4
    const [state, setState] = React.useState({
        isVisible: true,
    });

    React.useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) =>
                setState((prev) => ({
                    ...prev,
                    isVisible: entry.isIntersecting,
                }))
            );
        });

        const { current } = containerRef;

        if (current) {
            observer.observe(current);
            return () => {
                observer.unobserve(current);
            };
        }
    }, []);

    return state;
};

export default useIntersectionObserver;
