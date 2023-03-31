import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';

interface DefaultContainerProps {
    children: React.ReactNode | JSX.Element
    appTitle: string
}

const DefaultContainer: React.FC<DefaultContainerProps> = ({children, appTitle}) => {

    useEffect(() => {
        document.title = appTitle
    }, [])

    return (
        <div className='defaultcontainer'>
            <Sidebar />
            {children}
        </div>
    );
};

export default DefaultContainer;