import * as React from 'react';

const Footer = React.lazy(() => import('./components/Footer'));
const Header = React.lazy(() => import('./components/Header'));

import { BrowserRouter, Switch, Route } from 'react-router-dom';
import GlobalStyle from './util/theme/GlobalTheme';
import { ThemeProvider } from 'styled-components';
import { primaryTheme } from './util/theme/colorTheme';
import { HashLoading, ErrorBoundary } from './components/HashLoading';
import FontTag from './common/FontTag';
import Index from './page/Index';
import Room from './page/Room';
import House from './page/House';
import Apartment from './page/Apartment';
import Roommate from './page/Roommate';
import TenantWork from './page/Work';

const App = () => (
    <BrowserRouter>
        <ThemeProvider theme={primaryTheme}>
            <ErrorBoundary>
                <React.Suspense fallback={<HashLoading />}>
                    <GlobalStyle />
                    <Header />
                    <FontTag weight={300} />
                    <Switch>
                        <Route path="/" exact component={Index} />
                        <Route
                            path="/tenant-work"
                            exact
                            component={TenantWork}
                        />
                        <Route path="/house" exact component={House} />
                        <Route path="/room" exact component={Room} />
                        <Route path="/apartment" exact component={Apartment} />
                        <Route path="/roommate" exact component={Roommate} />
                    </Switch>
                    <Footer />
                </React.Suspense>
            </ErrorBoundary>
        </ThemeProvider>
    </BrowserRouter>
);

export default App;
