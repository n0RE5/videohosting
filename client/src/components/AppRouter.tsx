import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/useReduxHooks';
import { auth_routes, public_routes } from '../utils/Routes';

const AppRouter: React.FC = () => {
    const isAuth = useAppSelector(state => state.userSlice.isAuth)
    return (
        <>
            <Routes>
                {isAuth && auth_routes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/> 
                )}
                {public_routes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/> 
                )}
            </Routes>  
        </>
    );
};

export default AppRouter;