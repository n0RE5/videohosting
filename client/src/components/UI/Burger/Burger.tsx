import React from 'react';
import styles from './Burger.module.scss'

interface BurgerProps {
    onClick?: React.MouseEventHandler<HTMLElement>
}

const Burger: React.FC<BurgerProps> = ({onClick}) => {
    return (
        <div 
            className={styles.burger} 
            onClick={onClick}
        >
            <div className={styles.burger_w}>
                <span/>
                <span/>
                <span/>
            </div>
        </div>
    );
};

export default Burger;