import React from 'react';
import { Link } from 'react-router-dom';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import '../styles/404.scss'
import { MAIN_PATH } from '../utils/Consts';

function ErrorPage ()  {
    return (
        <div className='p404'>
            <div className='err_404'>404!</div>
            <div className='p404_title'>Похоже вы попали сюда по ошибке, убедитесь в правильности запроса или попробуйте вернуться на <Link to={MAIN_PATH}>Главную</Link></div>
        </div>
    );
};

export default ErrorPage;