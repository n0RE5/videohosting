import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { AUTH_PATH, CONTACT_MAIL, MAIN_PATH, STUDIO_PATH, SUBSCRIPTIONS_PATH } from '../../utils/Consts';
import SidebarLink from '../UI/SidebarLink/SidebarLink';
import styles from './Sidebar.module.scss'
import { userLogout } from '../../store/reducers/UserSlice';

const Sidebar: React.FC = () => {
    const isAuth = useAppSelector(state => state.userSlice.isAuth)
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
                <div className={styles.sidebar_container}>
                    <SidebarLink to={MAIN_PATH}>Главная</SidebarLink>
                    <SidebarLink to={isAuth ? SUBSCRIPTIONS_PATH : AUTH_PATH}>Подписки</SidebarLink>
                </div>
                <div className={styles.sidebar_container}>
                    <SidebarLink to={MAIN_PATH + '?s=all'}>Все</SidebarLink>
                    <SidebarLink to={MAIN_PATH + '?s=games'}>Видеоигры</SidebarLink>
                    <SidebarLink to={MAIN_PATH + '?s=music'}>Музыка</SidebarLink>
                    <SidebarLink to={MAIN_PATH + '?s=cartoons'}>Мультфильмы</SidebarLink>
                    <SidebarLink to={MAIN_PATH + '?s=films'}>Фильмы</SidebarLink>
                </div>
                <div className={styles.sidebar_container}>
                    <SidebarLink to={`${STUDIO_PATH}/settings`}>Настройки</SidebarLink>
                    <SidebarLink to={`mailto:${CONTACT_MAIL}`}>Связаться с нами</SidebarLink>
                    <SidebarLink to={isAuth ? STUDIO_PATH : AUTH_PATH}>Ваш канал</SidebarLink>
                    {isAuth &&
                        <a onClick={logout} className={styles.logout}>Выйти</a>
                    }
                </div>
                <div className={styles.sidebar_container}>
                    <div className={styles.sidebar_contacts}>
                        <Link to=''>О нас</Link> 
                        <Link to=''>Пользовательское соглашение</Link>
                        <Link to=''>Политика конфиденциальности</Link>
                        <Link to={`mailto:${CONTACT_MAIL}`}>Связаться с нами</Link>
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