import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { public_routes } from '../utils/Routes';

const AppRouter: React.FC = () => {
    return (
        <>
            <Routes>
                {public_routes.map(({path, element}) =>
                    <Route key={path} path={path} element={element}/> 
                )}
            </Routes>  
        </>
    );
};

export default AppRouter;