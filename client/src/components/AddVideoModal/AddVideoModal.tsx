import React, { useState } from 'react';
import { createVideo } from '../../backendAPI/videoAPI';
import Modal from '../UI/Modal/Modal';
import Textarea from '../UI/Textarea/Textarea';
import styles from './AddVideoModal.module.scss'

interface AddVideoModalProps {
    visible: boolean
    setActive: (arg0: boolean) => void
}

const AddVideoModal: React.FC<AddVideoModalProps> = ({visible, setActive}) => {
    const [videoTitle, setVideoTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [preview, setPreview] = useState<string>('')
    const [tags, setTags] = useState<string>('')
    const [video, setVideo] = useState<string>('')

    const selectFile = (e: any, func: (arg0: any) => void) => {
        func(e.target.files[0])
    }

    const uploadVideo = async (e: React.MouseEvent) => {
        try {
            e.preventDefault()
            let formData = new FormData()
            formData.append('title', videoTitle)
            formData.append('description', description)
            formData.append('tags', tags)
            formData.append('filez', preview)
            formData.append('filez', video)
            const response = await createVideo(formData)
            if (response.status === 201) {
                alert('You uploaded a video!')
                setActive(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal active={visible} setActive={setActive}>
            <form className={styles.videomodal}>
                <div className={styles.header}>
                    <div className={styles.header_title}>{videoTitle}</div>
                </div>
                <div className={styles.body}>
                    <div className={styles.body_info}>Информация</div>
                    <div className={styles.body_media}>
                        <div className={styles.body_inputs}>
                            <Textarea required value={videoTitle} setValue={setVideoTitle} placeholder='Введите название для вашего видео' label='Название видео'/>
                            <Textarea required value={description} setValue={setDescription} placeholder='Введите описание для видео' rows={8} label='Описание'/>
                            <Textarea required value={tags} setValue={setTags} placeholder='Введите теги' rows={5} label='Теги'/>
                        </div>
                        <div className={styles.body_selectfile}>
                            <span className={styles.selectfile}>
                                <div className={styles.selectfile_w}>
                                    <div>Выберите изображение</div>
                                    <input required onChange={(e) => selectFile(e, setPreview)} type='file' accept=".jpg, .jpeg, .png" />
                                </div>
                            </span>
                            <span className={styles.selectfile}>
                                <div className={styles.selectfile_w}>
                                    <div>Выберите Видео</div>
                                    <input required onChange={(e) => selectFile(e, setVideo)} type='file' />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div></div>
                    <button onClick={uploadVideo} className={styles.footer_btn}>Далее</button>
                </div>
            </form>
        </Modal>
    );
};

export default AddVideoModal;