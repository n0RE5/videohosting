import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useReduxHooks';
import StudioSidebarLink from '../UI/StudioSidebarLink/StudioSidebarLink';
import styles from './StudioSidebar.module.scss'

const StudioSidebar: React.FC = () => {
    const user = useAppSelector(state => state.userSlice.user)
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
                    <StudioSidebarLink to={``}>Главная</StudioSidebarLink>
                    <StudioSidebarLink to={``}>Ваш Контент</StudioSidebarLink>
                    <StudioSidebarLink to={``}>Настройки</StudioSidebarLink>
                </div>
            </div>
        </div>
    );
};

export default StudioSidebar;