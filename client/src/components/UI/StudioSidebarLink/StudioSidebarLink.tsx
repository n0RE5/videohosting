import React from 'react';
import { Link } from 'react-router-dom';
import styles from './StudioSidebarLink.module.scss'

interface StudioSidebarLinkProps {
    to: string
    children?: React.ReactNode | JSX.Element
}

const StudioSidebarLink: React.FC<StudioSidebarLinkProps> = ({to, children}) => {
    return (
        <div className={styles.link_container}>
            <Link className={styles.link} to={to}>{children}</Link>
        </div>
    );
};

export default StudioSidebarLink;