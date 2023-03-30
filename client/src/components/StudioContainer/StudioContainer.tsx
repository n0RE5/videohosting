import React from 'react';
import StudioSidebar from '../StudioSidebar/StudioSidebar';

interface StudioContainerProps {
    children: React.ReactNode | JSX.Element
}

const StudioContainer: React.FC<StudioContainerProps> = ({children}) => {
    return (
        <div className='studiocontainer'>
            <StudioSidebar />
            {children}
        </div>
    );
};

export default StudioContainer;