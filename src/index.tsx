import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';
import * as serviceWorker from './serviceWorkerRegistration';

ReactDOM.render(
    <React.StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

serviceWorker.register();
