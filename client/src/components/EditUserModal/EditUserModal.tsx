import React, { useState } from 'react';
import Modal from '../UI/Modal/Modal';
import styles from './EditUserModal.module.scss'
import { updateUser } from '../../backendAPI/userAPI';
import Loader from '../UI/Loader/Loader';

interface EditUserModalProps {
    active: boolean
    setActive: (arg0: boolean) => void
}

const EditUserModal: React.FC<EditUserModalProps> = ({ active, setActive }) => {
    const [profile, setProfile] = useState<string>('')
    const [photoUploading, setPhotoUploading] = useState<boolean>(false)

    const selectFile = (e: any, func: (arg0: any) => void) => {
        func(e.target.files[0])
    }

    const uploadPhoto = async (e: React.MouseEvent) => {
        try {
            e.preventDefault()
            let formData = new FormData()
            formData.append('files', profile)
            setPhotoUploading(true)
            const response = await updateUser(formData)
            if (response.status === 201) {
                setPhotoUploading(false)
                alert('You updated your profile!')
                setActive(false)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
            <form className={styles.usermodal}>
                <div className={styles.header}>
                    <div className={styles.header_title}>Изменение Пользователя</div>
                </div>
                <div className={styles.body}>
                    <div className={styles.body_info}>Изменить аватар</div>
                    <div className={styles.body_media}>
                        <div className={styles.body_selectfile}>
                            <span className={styles.selectfile}>
                                <div className={styles.selectfile_w}>
                                    <div>Выберите Фото</div>
                                    <input required onChange={(e) => selectFile(e, setProfile)} type='file' />
                                </div>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    {photoUploading
                        ? <Loader />
                        : <div />
                    }
                    <button onClick={uploadPhoto} className={styles.footer_btn}>Сохранить</button>
                </div>
            </form>
        </Modal>
    );
};

export default EditUserModal;