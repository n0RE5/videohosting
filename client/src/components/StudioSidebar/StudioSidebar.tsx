import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { MAIN_PATH, STUDIO_PATH } from '../../utils/Consts';
import StudioSidebarLink from '../UI/StudioSidebarLink/StudioSidebarLink';
import styles from './StudioSidebar.module.scss'
import { useNavigate } from 'react-router-dom';
import { userLogout } from '../../store/reducers/UserSlice';

const StudioSidebar: React.FC = () => {
    const user = useAppSelector(state => state.userSlice.user)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(userLogout())
        navigate(MAIN_PATH)    
    }

    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_w}>
                <div className={styles.sidebar_user_meta}>
                    <span className={styles.user_avatar}>
                        <img src={process.env.REACT_APP_API_URL + user.profileImg} />
                    </span>
                    <div className={styles.sidebar_user_channel}>Ваш канал</div>
                    <div className={styles.user_username}>{user.username}</div>
                </div>
                <div className={styles.sidebar_link_container}>
                    <StudioSidebarLink to={STUDIO_PATH}>Главная</StudioSidebarLink>
                    <StudioSidebarLink to={STUDIO_PATH + '/settings'}>Настройки</StudioSidebarLink>
                    <a onClick={logout} className={styles.sidebar_logout}>Выйти</a>
                </div>
            </div>
        </div>
    );
};

export default StudioSidebar;