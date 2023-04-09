import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, registration } from '../backendAPI/userAPI';
import Input from '../components/UI/Input/Input';
import { useAppDispatch } from '../hooks/useReduxHooks';
import { fetchUser, fetchUserError, fetchUserSuccess } from '../store/reducers/UserSlice';
import { IUser } from '../types/Interfaces';
import { MAIN_PATH } from '../utils/Consts';
import '../styles/authpage.scss'

function AuthPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [authType, setAuthType] = useState<boolean>(true)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [loginError, setLoginError] = useState<string>('')

    const auth = async (e: React.MouseEvent) => {
        try {
            e.preventDefault()
            let response: IUser;
            dispatch(fetchUser())
            if (authType) {
                response = await login({username, email, password})
            } else {
                response = await registration({username, email, password})
            }
            dispatch(fetchUserSuccess(response))
            navigate(MAIN_PATH)
        } catch (error: any) {
            dispatch(fetchUserError(error.response?.data?.message))
            setLoginError(error.response?.data?.message)
        }
    }

    const switchAuth = () => {
        setAuthType((prev) => !prev)
        setLoginError('')
    }

    return (
        <div className='authpage'>
            <form className="authpage_w">
                <div className='authpage_title'>{authType ? "Войти" : "Регистрация"}</div>
                {!authType &&
                    <div className='authpage_inputbox'>
                        <div className='authpage_label'>Никнейм</div>
                        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                }
                <div className='authpage_inputbox'>
                    <div className='authpage_label'>{authType ? "Введите электронную почту" : "Электронная почта"}</div>
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='authpage_inputbox'>
                    <div className='authpage_label'>{authType ? "Введите пароль" : "Пароль"}</div>
                    <Input value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button onClick={auth} className='authpage_auth'>{authType ? "Войти" : "Зарегистрироваться"}</button>
                {loginError &&
                    <div className='authpage_error'>{loginError}</div>
                }
                <div className='authpage_authtype'>
                    <span>
                        {authType ? "Нет аккаунта?" : "Есть Аккаунт?" }
                        <a onClick={switchAuth}> 
                            {authType ? " Зарегистрируйтесь " : " Войти " } 
                        </a>
                    </span> 
                </div>
            </form>
        </div>
    );
};

export default AuthPage;