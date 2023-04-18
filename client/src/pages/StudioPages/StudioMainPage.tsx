import React from 'react';
import StudioContainer from '../../components/StudioContainer/StudioContainer';
import StudioMainModule from '../../modules/StudioMainModule';
import '../../styles/studiopage.scss'

const StudioMainPage: React.FC = () => {
    return (
        <StudioContainer>
            <StudioMainModule />
        </StudioContainer>
    );
};

export default StudioMainPage;