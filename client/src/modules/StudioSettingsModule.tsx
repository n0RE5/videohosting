import React, { useState } from 'react';
import ChangePasswordModal from '../components/ChangePasswordModal/ChangePasswordModal';
import EditUserModal from '../components/EditUserModal/EditUserModal';

const StudioSettingsModule: React.FC = () => {
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [userModalActive, setUserModalActive] = useState<boolean>(false)

    return (
        <>
            <div className='studiopage'>
                <div className='studiopage_w'>
                    <div className='studiopage_title'>Настройки</div>
                    <div className='studiopage_cards'>
                        <div className='studiopage_main_card'>
                            <div className='studiopage_main_upload'>Здесь вы можете поменять пароль</div>
                            <a onClick={() => setModalActive(true)} className='studiopage_main_upload_btn'>Изменить пароль</a>
                        </div>
                        <div className='studiopage_main_card'>
                            <div className='studiopage_main_upload'>Здесь вы можете редактировать профиль</div>
                            <a onClick={() => setUserModalActive(true)} className='studiopage_main_upload_btn'>Изменить Профиль</a>
                        </div>
                    </div>
                </div>
            </div>
            <ChangePasswordModal active={modalActive} setActive={setModalActive} />
            <EditUserModal active={userModalActive} setActive={setUserModalActive} />
        </>
    );
};

export default StudioSettingsModule;