import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SEARCH_PATH } from '../../utils/Consts';
import styles from './Searchbar.module.scss'

const Searchbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState<string>('')
    const navigate = useNavigate()
    
    const redirect = (e: React.MouseEvent) => {
        e.preventDefault()
        navigate(`${SEARCH_PATH}?searchQuery=${searchQuery}`)
        return
    }

    return (
        <form className={styles.searchbar}>
            <div className={styles.search_input}>
                <input className={styles.searchbar_input} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" placeholder='Введите запрос' required  />
            </div>
            <button onClick={redirect} className={styles.searchbar_btn}>S</button>
        </form>
    );
};

export default Searchbar;