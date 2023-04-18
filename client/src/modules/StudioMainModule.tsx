import React, { useState } from 'react';
import AddVideoModal from '../components/AddVideoModal/AddVideoModal';

const StudioMainModule: React.FC = () => {
    const [modalActive, setModalActive] = useState<boolean>(false)
    return (
        <>
            <div className='studiopage'>
                <div className='studiopage_w'>
                    <div className='studiopage_title'>Панель управления каналом</div>
                    <div className='studiopage_main_card'>
                        <div className='studiopage_main_upload'>Здесь вы можете загрузить видео на ваш канал</div>
                        <a onClick={() => setModalActive(true)} className='studiopage_main_upload_btn'>Добавить Видео</a>
                    </div>
                </div>
            </div>
            <AddVideoModal visible={modalActive} setActive={setModalActive} />
        </>
    );
};

export default StudioMainModule;