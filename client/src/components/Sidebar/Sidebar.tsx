import React, { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxHooks';
import { AUTH_PATH, CONTACT_MAIL, MAIN_PATH, STUDIO_PATH, SUBSCRIPTIONS_PATH } from '../../utils/Consts';
import SidebarLink from '../UI/SidebarLink/SidebarLink';
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

import styles from './Sidebar.module.scss'

const Sidebar = memo(() => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const isAuth = useAppSelector(state => state.userSlice.isAuth)
    const sidebarActive = useAppSelector(state => state.sidebarSlice.active)
    const rootClasses = [styles.sidebar]

    const logout = () => {
        localStorage.removeItem('token')
        dispatch(userLogout())
        navigate(MAIN_PATH)    
    }

    const [mainLinks] = useState([
        {
            src: homeSVG,
            href: MAIN_PATH,
            title: 'Главная',
        },
        {
            src: subsSVG,
            href: isAuth ? SUBSCRIPTIONS_PATH : AUTH_PATH,
            title: 'Подписки',
        },
    ])

    const [sortLinks] = useState([
        {
            src: fireSVG,
            href: MAIN_PATH + '?s=all',
            title: 'Все',
        },
        {
            src: joystickSVG,
            href: MAIN_PATH + '?s=games',
            title: 'Видеоигры',
        },
        {
            src: noteSVG,
            href: MAIN_PATH + '?s=music',
            title: 'Музыка',
        },
        {
            src: swordSVG,
            href: MAIN_PATH + '?s=cartoons',
            title: 'Мультфильмы',
        },
        {
            src: filmSVG,
            href: MAIN_PATH + '?s=films',
            title: 'Фильмы',
        }
    ])

    const [userLinks] = useState([
        {
            src: settingsSVG,
            href: isAuth ? STUDIO_PATH + '/settings' : AUTH_PATH,
            title: 'Настройки',
        },
        {
            src: contactSVG,
            href: `mailto:${CONTACT_MAIL}`,
            title: 'Связаться с нами',
        },
        {
            src: channelSVG,
            href: isAuth ? STUDIO_PATH : AUTH_PATH,
            title: 'Ваш канал',
        },
    ])

    if(sidebarActive) {
        rootClasses.push(styles.sidebar_active)
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.sidebar_w}>
                <div className={styles.sidebar_container}>
                    {mainLinks.map(link =>
                        <SidebarLink key={link.title} src={link.src} to={link.href}>{link.title}</SidebarLink>
                    )}
                </div>
                <div className={styles.sidebar_container}>
                    {sortLinks.map(link =>
                        <SidebarLink key={link.title} src={link.src} to={link.href}>{link.title}</SidebarLink>
                    )}
                </div>
                <div className={styles.sidebar_container}>
                    {userLinks.map(link =>
                        <SidebarLink key={link.title} src={link.src} to={link.href}>{link.title}</SidebarLink>
                    )}
                    {isAuth &&
                        <a onClick={logout} className={styles.logout}>
                            <img src={logoutSVG} className={styles.link_img}/>
                            Выйти
                        </a>
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