import React from 'react';
import { Link } from 'react-router-dom';
import Searchbar from '../Searchbar/Searchbar';
import Burger from '../UI/Burger/Burger';
import styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_logobox}>
                <Burger />
                <Link to='/' className={styles.navbar_logo}>YuVid</Link>
            </div>
            <Searchbar />
            <div className={styles.navbar_auth}>
                <Link to='/auth' className={styles.navbar_login}>Войти</Link>
            </div>
        </div>
    );
};

export default Navbar;