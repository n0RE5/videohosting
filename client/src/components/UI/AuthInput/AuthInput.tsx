import React from 'react';
import Input from '../Input/Input';
import styles from './AuthInput.module.scss'

interface AuthInputProps {
    value: string | number,
    setValue: (arg0: any) => void,
    label: string
}

const AuthInput: React.FC<AuthInputProps> = ({value, setValue, label}) => {
    return (
        <div className={styles.authpage_inputbox}>
            <div className={styles.authpage_label}>{label}</div>
            <Input value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
    );
};

export default AuthInput;