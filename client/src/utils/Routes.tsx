import AuthPage from "../pages/AuthPage";
import ChannelPage from "../pages/ChannelPage";
import MainPage from "../pages/MainPage";
import SearchPage from "../pages/SearchPage";
import WatchPage from "../pages/WatchPage";
import { AUTH_PATH, CHANNEL_PATH, MAIN_PATH, SEARCH_PATH, WATCH_PATH } from "./Consts";

interface IRoutes {
    path: string,
    element: React.ReactNode | JSX.Element
}

export const public_routes: IRoutes[] = [
    {
        path: MAIN_PATH,
        element: <MainPage />
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
    }
]