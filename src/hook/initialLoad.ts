import * as React from 'react';

const useInitialLoad = () => {
    const [state, setState] = React.useState({
        initialLoad: true,
    });

    React.useEffect(() => {
        setState((prev) => ({
            ...prev,
            initialLoad: false,
        }));
    }, []);

    return state;
};

export default useInitialLoad;
