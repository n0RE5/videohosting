import React from 'react';
import styles from './Textarea.module.scss'

interface TextareaProps {
    value: string
    setValue: (arg0: string) => void
    placeholder: string
    label: string
    cols?: number
    rows?: number
    required?: boolean
}

const Textarea: React.FC<TextareaProps> = ({value, setValue, placeholder, label, cols, rows, required}) => {
    return (
        <div className={styles.textarea}>
            <div className={styles.textarea_label}>{label}</div>
            <textarea required={required} className={styles.textarea_input} value={value} onChange={(e) => setValue(e.target.value)} cols={cols} rows={rows} placeholder={placeholder}></textarea>
        </div>
    );
};

export default Textarea;