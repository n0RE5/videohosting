import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useReduxHooks';
import { AUTH_PATH, MAIN_PATH, STUDIO_PATH } from '../../utils/Consts';
import SidebarLink from '../UI/SidebarLink/SidebarLink';
import styles from './Sidebar.module.scss'

const Sidebar: React.FC = () => {
    const isAuth = useAppSelector(state => state.userSlice.isAuth)
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_w}>
                <div className={styles.sidebar_container}>
                    <SidebarLink to={MAIN_PATH}>Главная</SidebarLink>
                    <SidebarLink to={MAIN_PATH}>Подписки</SidebarLink>

                </div>
                <div className={styles.sidebar_container}>
                    <SidebarLink to={MAIN_PATH}>Все</SidebarLink>
                    <SidebarLink to={MAIN_PATH}>Видеоигры</SidebarLink>
                    <SidebarLink to={MAIN_PATH}>Музыка</SidebarLink>
                    <SidebarLink to={MAIN_PATH}>Мультфильмы</SidebarLink>
                    <SidebarLink to={MAIN_PATH}>Игры</SidebarLink>
                    <SidebarLink to={MAIN_PATH}>Фильмы</SidebarLink>
                </div>
                <div className={styles.sidebar_container}>
                    <SidebarLink to={MAIN_PATH}>Настройки</SidebarLink>
                    <SidebarLink to={MAIN_PATH}>Связаться с нами</SidebarLink>
                    <SidebarLink to={isAuth ? STUDIO_PATH : AUTH_PATH}>Ваш канал</SidebarLink>
                </div>
                <div className={styles.sidebar_container}>
                    <div className={styles.sidebar_contacts}>
                        <Link to=''>О нас</Link> 
                        <Link to=''>Пользовательское соглашение</Link>
                        <Link to=''>Политика конфиденциальности</Link>
                        <Link to=''>Связаться с нами</Link>
                        <Link to=''>Авторам</Link>
                    </div>
                    <div className={styles.sidebar_contacts}>
                        <span className={styles.sidebar_copy}>&copy; 2023, Yourtube</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;