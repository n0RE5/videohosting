import React from 'react';
import styles from './Searchbar.module.scss'

const Searchbar: React.FC = () => {
    return (
        <form className={styles.searchbar}>
            <div className={styles.search_input}>
                <input className={styles.searchbar_input} type="text" placeholder='Введите запрос' required  />
            </div>
            <button className={styles.searchbar_btn}>S</button>
        </form>
    );
};

export default Searchbar;