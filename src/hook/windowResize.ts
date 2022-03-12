import * as React from 'react';

const useWindowResize = () => {
    const [state, setState] = React.useState({
        width: window.innerWidth,
    });

    React.useEffect(() => {
        const handleResizeWindow = () =>
            setState((prev) => ({
                ...prev,
                width: window.innerWidth,
            }));
        window.addEventListener('resize', handleResizeWindow);
        return () => {
            window.removeEventListener('resize', handleResizeWindow);
        };
    }, []);

    return state;
};

export default useWindowResize;
