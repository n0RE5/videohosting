import React from 'react';
import StudioContainer from '../../components/StudioContainer/StudioContainer';
import StudioSettingsModule from '../../modules/StudioSettingsModule';

const StudioSettingsPage: React.FC = () => {
    return (
        <StudioContainer>
            <StudioSettingsModule />
        </StudioContainer>
    );
};

export default StudioSettingsPage;