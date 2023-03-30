import React, { useState } from 'react';
import StudioContainer from '../../components/StudioContainer/StudioContainer';
import Modal from '../../components/UI/Modal/Modal';
import '../../styles/studiopage.scss'

const StudioMainPage: React.FC = () => {
    const [modalActive, setModalActive] = useState<boolean>(false)
    return (
        <StudioContainer>
            <div className='studiopage'>
                <div className='studiopage_w'>
                    <div className='studiopage_title'>Панель управления каналом</div>
                    <div className='studiopage_main_card'>
                        <div className='studiopage_main_upload'>Здесь вы можете загрузить видео на ваш канал</div>
                        <a onClick={() => setModalActive(true)} className='studiopage_main_upload_btn'>Добавить Видео</a>
                    </div>
                </div>
            </div>
            <Modal active={modalActive} setActive={setModalActive}>
            </Modal>
        </StudioContainer>
    );
};

export default StudioMainPage;