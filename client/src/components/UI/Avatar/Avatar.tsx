import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Avatar.module.scss'

interface AvatarProps {
    channelId?: number
    profileImg?: string
}

const Avatar: React.FC<AvatarProps> = ({channelId, profileImg}) => {
    return (
        <Link to={`/channel/${channelId}`} className={styles.avatar}>
            <div className={styles.avatar_container}>
                <img src={process.env.REACT_APP_API_URL + `${profileImg}`} />
            </div>
        </Link>
    );
};

export default Avatar;