import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

interface DefaultContainerProps {
    children: React.ReactNode | JSX.Element
}

const DefaultContainer: React.FC<DefaultContainerProps> = ({children}) => {
    return (
        <div className='defaultcontainer'>
            <Sidebar />
            {children}
        </div>
    );
};

export default DefaultContainer;