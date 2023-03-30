import React from 'react';
import styles from './Modal.module.scss'

interface ModalProps {
    active: boolean
    setActive: (arg0: boolean) => void
    children?: React.ReactNode | JSX.Element
}

const Modal: React.FC<ModalProps> = ({active, setActive, children}) => {
    return (
        <> 
            {active &&
                <div onClick={() => setActive(false)} className={styles.modal}>
                    <div onClick={(e) => e.stopPropagation()} className={styles.modal_w}>
                        {children}
                    </div>
                </div>
            }
        </>
    );
};

export default Modal;