import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SidebarLink.module.scss'

interface SidebarLinkProps {
    to: string
    children?: React.ReactNode | JSX.Element
}

const SidebarLink: React.FC<SidebarLinkProps> = ({to, children}) => {
    return (
        <div className={styles.link_container}>
            <Link className={styles.link} to={to}>{children}</Link>
        </div>
    );
};

export default SidebarLink;