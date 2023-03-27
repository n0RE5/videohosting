import React from 'react';
import styles from './Input.module.scss'

interface InputProps {
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    value: any,
    placeholder?: string,
    type?: string,
    required?: boolean,
    className?: string,
}

const Input: React.FC<InputProps> = ({className='', required=true, placeholder, type="text", value, onChange}) => {
    return (
        <div className={[styles.inputbox, className].join(' ')}>
            <input value={value} onChange={onChange} className={styles.input} type={type} placeholder={placeholder} required={required}  />
        </div>
    );
};

export default Input;