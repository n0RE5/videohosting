import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { AUTH_PATH, CONTACT_MAIL, MAIN_PATH, STUDIO_PATH, SUBSCRIPTIONS_PATH } from '../../utils/Consts';
import SidebarLink from '../UI/SidebarLink/SidebarLink';
import styles from './Sidebar.module.scss'
import { userLogout } from '../../store/reducers/UserSlice';
import settingsSVG from '../../assets/svg/settings.svg';
import channelSVG from '../../assets/svg/channel.svg';
import contactSVG from '../../assets/svg/contact.svg';
import homeSVG from '../../assets/svg/home.svg';
import logoutSVG from '../../assets/svg/logout.svg';
import subsSVG from '../../assets/svg/subs.svg';
import noteSVG from '../../assets/svg/note.svg';
import fireSVG from '../../assets/svg/fire.svg';
import joystickSVG from '../../assets/svg/joystick.svg';
import swordSVG from '../../assets/svg/sword.svg';
import filmSVG from '../../assets/svg/film.svg';

const Sidebar = memo(() => {
    const isAuth = useAppSelector(state => state.userSlice.isAuth)
    const sidebarActive = useAppSelector(state => state.sidebarSlice.active)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const rootClasses = [styles.sidebar]

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(userLogout())
        navigate(MAIN_PATH)    
    }

    if(sidebarActive) {
        rootClasses.push(styles.sidebar_active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.sidebar_w}>
                <div className={styles.sidebar_container}>
                    <SidebarLink src={homeSVG} to={MAIN_PATH}>Главная</SidebarLink>
                    <SidebarLink src={subsSVG} to={isAuth ? SUBSCRIPTIONS_PATH : AUTH_PATH}>Подписки</SidebarLink>
                </div>
                <div className={styles.sidebar_container}>
                    <SidebarLink src={fireSVG} to={MAIN_PATH + '?s=all'}>Все</SidebarLink>
                    <SidebarLink src={joystickSVG} to={MAIN_PATH + '?s=games'}>Видеоигры</SidebarLink>
                    <SidebarLink src={noteSVG} to={MAIN_PATH + '?s=music'}>Музыка</SidebarLink>
                    <SidebarLink src={swordSVG} to={MAIN_PATH + '?s=cartoons'}>Мультфильмы</SidebarLink>
                    <SidebarLink src={filmSVG} to={MAIN_PATH + '?s=films'}>Фильмы</SidebarLink>
                </div>
                <div className={styles.sidebar_container}>
                    <SidebarLink src={settingsSVG} to={isAuth ? STUDIO_PATH + '/settings' : AUTH_PATH}>Настройки</SidebarLink>
                    <SidebarLink src={contactSVG} to={`mailto:${CONTACT_MAIL}`}>Связаться с нами</SidebarLink>
                    <SidebarLink src={channelSVG} to={isAuth ? STUDIO_PATH : AUTH_PATH}>Ваш канал</SidebarLink>
                    {isAuth &&
                        <a onClick={logout} className={styles.logout}><img src={logoutSVG} className={styles.link_img}/>Выйти</a>
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
});

export default Sidebar;