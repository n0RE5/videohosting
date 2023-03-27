import React from 'react';
import Searchbar from '../Searchbar/Searchbar';
import Burger from '../UI/Burger/Burger';
import styles from './Navbar.module.scss'

const Navbar: React.FC = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_logobox}>
                <Burger />
                <span className={styles.navbar_logo}>YuVid</span>
            </div>
            <Searchbar />
            <div className={styles.navbar_auth}>
                <a className={styles.navbar_login}>Войти</a>
            </div>
        </div>
    );
};

export default Navbar;