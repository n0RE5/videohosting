import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useReduxHooks';
import { AUTH_PATH, MAIN_PATH } from '../../utils/Consts';
import Searchbar from '../Searchbar/Searchbar';
import Avatar from '../UI/Avatar/Avatar';
import Burger from '../UI/Burger/Burger';
import styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
    const user = useAppSelector(state => state.userSlice)
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_logobox}>
                <Burger />
                <Link to={MAIN_PATH} className={styles.navbar_logo}>YouVI</Link>
            </div>
            <Searchbar />
            <div className={styles.navbar_auth}>
                {user.isAuth
                    ? <Avatar channelId={user.user.id} profileImg={user.user.profileImg} />
                    : <Link to={AUTH_PATH} className={styles.navbar_login}>Войти</Link>
                }
            </div>
        </div>
    );
};

export default Navbar;