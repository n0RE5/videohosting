import { Navigate } from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import ChannelPage from "../pages/ChannelPage";
import ErrorPage from "../pages/ErrorPage";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import StudioMainPage from "../pages/StudioPages/StudioMainPage";
import StudioSettingsPage from "../pages/StudioPages/StudioSettingsPage";
import WatchPage from "../pages/WatchPage";
import { AUTH_PATH, CHANNEL_PATH, ERROR_PATH, MAIN_PATH, SEARCH_PATH, STUDIO_PATH, SUBSCRIPTIONS_PATH, WATCH_PATH } from "./Consts";
import SubsPage from "../pages/SubsPage";

interface IRoutes {
    path: string,
    element: React.ReactNode | JSX.Element
}

export const auth_routes: IRoutes[] = [
    {
        path: STUDIO_PATH,
        element: <StudioMainPage />
    },
    {
        path: STUDIO_PATH + `/settings`,
        element: <StudioSettingsPage />
    },
    {
        path: SUBSCRIPTIONS_PATH,
        element: <SubsPage />
    }
]

export const public_routes: IRoutes[] = [
    {
        path: MAIN_PATH,
        element: <MainPage />
    },
    {
        path: ERROR_PATH,
        element: <ErrorPage/>
    },
    {
        path: AUTH_PATH,
        element: <AuthPage />
    },
    {
        path: WATCH_PATH,
        element: <WatchPage />
    },
    {
        path: CHANNEL_PATH + '/:userId',
        element: <ChannelPage />
    },
    {
        path: SEARCH_PATH,
        element: <SearchPage />
    },
    {
        path: '*',
        element: <Navigate to={ERROR_PATH} replace/>
    }
]