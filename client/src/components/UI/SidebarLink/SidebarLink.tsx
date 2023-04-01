import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SidebarLink.module.scss'

interface SidebarLinkProps {
    to: string
    children?: React.ReactNode | JSX.Element
    src: string
}

const SidebarLink: React.FC<SidebarLinkProps> = ({to, children, src}) => {
    return (
        <div className={styles.link_container}>
            <Link className={styles.link} to={to}> 
                <img src={src} className={styles.link_img}/>
                {children}
            </Link>
        </div>
    );
};

export default SidebarLink;