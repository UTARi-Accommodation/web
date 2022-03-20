import { BrowserHistory } from 'history';

const historyListener = (
    startsWith: string,
    setState: (search: string, shouldNotPush: boolean) => void,
    history: BrowserHistory
) =>
    history.listen(({ location: { pathname, search } }) => {
        if (pathname.startsWith(startsWith)) {
            setState(search, history.action === 'POP');
        }
    });

export default historyListener;
