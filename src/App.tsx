import * as React from 'react';
import {
    enable as enableDarkMode,
    disable as disableDarkMode,
} from 'darkreader';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GlobalStyle from './theme/GlobalTheme';
import { ThemeProvider } from 'styled-components';
import theme from './theme/colorTheme';
import ErrorBoundary from './components/lazy/ErrorBoundary';
import { HashLoading } from './components/loader/Load';
import getVisitor from './visitor';
import visitorAPI from './url/mutation/visitor';
import { parseNullableAsDefaultOrUndefined, Region } from 'utari-common';
import { auth, onUtariUserStateChanged, UtariUser } from './auth/user';
import { MontserratFont } from './components/common/FontTag';
import { ToastContainer } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastError } from './components/toaser/Toaser';
import utariAxios from './config/axios';
import { bookmarkedUnitsRoute } from './url/query/bookmarked/unit';
import { bookmarkedRoomsRoute } from './url/query/bookmarked/room';
import { condominiumsRoute, housesRoute } from './url/query/general/unit';
import { roommatesRoute, roomsRoute } from './url/query/general/room';
import { detailedUnitRoute } from './url/query/detailed/unit';
import { detailedRoomRoute } from './url/query/detailed/room';

const Index = React.lazy(() => import('./page/Index'));
const Room = React.lazy(() => import('./page/general/Room'));
const Unit = React.lazy(() => import('./page/general/Unit'));
const BookmarkedRoom = React.lazy(() => import('./page/bookmarked/Room'));
const BookmarkedUnit = React.lazy(() => import('./page/bookmarked/Unit'));
const DetailedRoom = React.lazy(() => import('./page/detailed/Room'));
const DetailedUnit = React.lazy(() => import('./page/detailed/Unit'));
const Work = React.lazy(() => import('./page/Work'));
const Auth = React.lazy(() => import('./page/auth/Auth'));
const Delete = React.lazy(() => import('./page/auth/Delete'));
const Contact = React.lazy(() => import('./page/Contact'));
const PrivacyPolicy = React.lazy(() => import('./page/PrivacyPolicy'));
const TermsCondition = React.lazy(() => import('./page/TermsCondition'));
const Error = React.lazy(() => import('./page/Error'));
const About = React.lazy(() => import('./page/About'));

const AppContext = React.createContext({
    user: parseNullableAsDefaultOrUndefined(auth.currentUser) as UtariUser,
    authAction: undefined as ('add' | 'delete') | undefined,
    region: 'KP' as Region,
    visitor: getVisitor(),
    loadedUser: false,
    setRegion: (_: Region) => {},
    isDark: false,
    setIsDark: () => {},
});

if (typeof window !== 'undefined') {
    injectStyle();
}

const App = () => {
    const [state, setState] = React.useState(React.useContext(AppContext));

    const { user, loadedUser, visitor, isDark } = state;

    React.useEffect(() => {
        !isDark
            ? disableDarkMode()
            : enableDarkMode({
                  brightness: 100,
                  contrast: 90,
                  sepia: 10,
              });
    }, [isDark]);

    React.useEffect(() => {
        const style = (color: string) =>
            `background: #282A36; color: ${color}; font-family:monospace; font-size: 2em`;
        console.log(
            '%cSo you like to break things to see how they work?',
            style('#50FA7B')
        );
        console.log(
            '%cPlease do me favor, contribute to https://github.com/Utari-Room/',
            style('#8BE9FD')
        );
        console.log(
            '%cAnd DO NOT COPY PASTE ANY MALICIOUS CODE HERE',
            style('#FF5555')
        );
        console.log('%cStay safe and drink more water', style('#6272A4'));
        const utariUnsubscribe = onUtariUserStateChanged((user) => {
            setState((prev) => ({
                ...prev,
                loadedUser: true,
                user,
            }));
        });
        visitor
            .then(({ visitorId }) => {
                utariAxios
                    .put(visitorAPI, {
                        data: { visitorId },
                    })
                    .catch(ToastError);
            })
            .catch(ToastError);
        return utariUnsubscribe;
    }, []);

    if (!loadedUser) {
        return <HashLoading />;
    }

    return (
        <AppContext.Provider
            value={{
                ...state,
                setRegion: (region: Region) =>
                    setState((prev) => ({
                        ...prev,
                        region,
                    })),
                setIsDark: () =>
                    setState((prev) => ({
                        ...prev,
                        isDark: !prev.isDark,
                    })),
            }}
        >
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <ErrorBoundary>
                        <React.Suspense fallback={<HashLoading />}>
                            <GlobalStyle />
                            <MontserratFont />
                            <ToastContainer
                                style={{
                                    fontFamily: 'MontserratFont, sans-serif',
                                }}
                            />
                            <Routes>
                                <Route
                                    path="/"
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <Index />
                                        </>
                                    }
                                />
                                <Route
                                    path="/about"
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <About />
                                        </>
                                    }
                                />
                                <Route
                                    path="/privacy-policy"
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <PrivacyPolicy />
                                        </>
                                    }
                                />
                                <Route
                                    path="/terms-conditions"
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <TermsCondition />
                                        </>
                                    }
                                />
                                <Route
                                    path="/contact"
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <Contact />
                                        </>
                                    }
                                />
                                <Route
                                    path="/work"
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <Work />
                                        </>
                                    }
                                />
                                <Route
                                    path={housesRoute}
                                    caseSensitive={true}
                                    element={<Unit unitType="House" />}
                                />
                                <Route
                                    path={condominiumsRoute}
                                    caseSensitive={true}
                                    element={<Unit unitType="Condominium" />}
                                />
                                <Route
                                    path={roomsRoute}
                                    caseSensitive={true}
                                    element={<Room roomType="Room" />}
                                />
                                <Route
                                    path={roommatesRoute}
                                    caseSensitive={true}
                                    element={<Room roomType="Roommate" />}
                                />
                                <Route
                                    path={bookmarkedRoomsRoute}
                                    caseSensitive={true}
                                    element={
                                        user ? (
                                            <BookmarkedRoom />
                                        ) : (
                                            <Navigate
                                                to="/auth"
                                                replace={true}
                                            />
                                        )
                                    }
                                />
                                <Route
                                    path={bookmarkedUnitsRoute}
                                    caseSensitive={true}
                                    element={
                                        user ? (
                                            <BookmarkedUnit />
                                        ) : (
                                            <Navigate
                                                to="/auth"
                                                replace={true}
                                            />
                                        )
                                    }
                                />
                                <Route
                                    path={detailedRoomRoute}
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <DetailedRoom />
                                        </>
                                    }
                                />
                                <Route
                                    path={detailedUnitRoute}
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <DetailedUnit />
                                        </>
                                    }
                                />
                                <Route
                                    path="/auth"
                                    caseSensitive={true}
                                    element={
                                        !user ? (
                                            <>
                                                <Header />
                                                <Auth />
                                            </>
                                        ) : (
                                            <Navigate to="/" replace={true} />
                                        )
                                    }
                                />
                                <Route
                                    path="/delete"
                                    caseSensitive={true}
                                    element={
                                        user ? (
                                            <>
                                                <Header />
                                                <Delete />
                                            </>
                                        ) : (
                                            <Navigate
                                                to="/auth"
                                                replace={true}
                                            />
                                        )
                                    }
                                />
                                <Route
                                    path="*"
                                    caseSensitive={true}
                                    element={
                                        <>
                                            <Header />
                                            <Error />
                                        </>
                                    }
                                />
                            </Routes>
                            <Footer />
                        </React.Suspense>
                    </ErrorBoundary>
                </ThemeProvider>
            </BrowserRouter>
        </AppContext.Provider>
    );
};

export default App;

export { AppContext };
