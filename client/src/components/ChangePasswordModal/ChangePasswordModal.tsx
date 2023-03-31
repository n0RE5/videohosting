import React, { useState } from 'react';
import styles from './ChangePasswordModal.module.scss'
import Modal from '../UI/Modal/Modal';
import Textarea from '../UI/Textarea/Textarea';
import Loader from '../UI/Loader/Loader';
import { changePassword } from '../../backendAPI/userAPI';
import { useAppSelector } from '../../hooks/useReduxHooks';

interface ChangePasswordModalProps {
    active: boolean
    setActive: (arg0: boolean) => void
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({active, setActive}) => {
    const [oldPassword, setOldPassword] = useState<string>('')
    const [newPassword, setNewPassword] = useState<string>('')
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const user = useAppSelector(state => state.userSlice.user)

    const changeUserPassword = async (e: React.MouseEvent) => {
        try {
            e.preventDefault()
            setIsFetching(true)
            const response = await changePassword({username: user.username, password: oldPassword, email: user.email}, newPassword)
            if(response.status === 201) {
                setIsFetching(false)
                setActive(false)
                alert('Вы поменяли пароль')
            }
        } catch (error: any) {
            alert(error.response?.data?.message)
        }
    }

    return (
        <Modal active={active} setActive={setActive}>
                        <form className={styles.videomodal}>
                <div className={styles.header}>
                    <div className={styles.header_title}>Изменение Пароля</div>
                </div>
                <div className={styles.body}>
                    <div className={styles.body_info}>Ваши данные</div>
                    <div className={styles.body_media}>
                        <div className={styles.body_inputs}>
                            <Textarea required value={oldPassword} setValue={setOldPassword} placeholder='Введите ваш текущий пароль' label='Пароль'/>
                            <Textarea required value={newPassword} setValue={setNewPassword} placeholder='Введите новый пароль' rows={5} label='Новый пароль'/>
                        </div>
                    </div>
                </div>
                <div className={styles.footer}>
                    {isFetching
                        ? <Loader />
                        : <div />
                    }
                    <button onClick={changeUserPassword} className={styles.footer_btn}>Далее</button>
                </div>
            </form>
        </Modal>
    );
};

export default ChangePasswordModal;