import React, { useState } from 'react';
import StudioContainer from '../../components/StudioContainer/StudioContainer';
import ChangePasswordModal from '../../components/ChangePasswordModal/ChangePasswordModal';

const StudioSettingsPage: React.FC = () => {
    const [modalActive, setModalActive] = useState<boolean>(false)

    return (
        <StudioContainer>
            <div className='studiopage'>
                <div className='studiopage_w'>
                    <div className='studiopage_title'>Настройки</div>
                    <div className='studiopage_main_card'>
                        <div className='studiopage_main_upload'>Здесь вы можете поменять пароль</div>
                        <a onClick={() => setModalActive(true)} className='studiopage_main_upload_btn'>Изменить пароль</a>
                    </div>
                </div>
            </div>
            <ChangePasswordModal active={modalActive} setActive={setModalActive} />
        </StudioContainer>
    );
};

export default StudioSettingsPage;