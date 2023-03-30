import React from 'react';
import { Link } from 'react-router-dom';
import { MAIN_PATH } from '../../utils/Consts';
import SidebarLink from '../UI/SidebarLink/SidebarLink';
import styles from './Sidebar.module.scss'

const Sidebar: React.FC = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar_w}>
                <div className={styles.sidebar_container}>
                    <SidebarLink to={MAIN_PATH}>Главная</SidebarLink>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;