import AuthPage from "../pages/AuthPage";
import MainPage from "../pages/MainPage";
import WatchPage from "../pages/WatchPage";
import { AUTH_PATH, MAIN_PATH, WATCH_PATH } from "./Consts";

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
    }
]