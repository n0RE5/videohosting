import React from 'react';
import { Link } from 'react-router-dom';
import { CHANNEL_PATH } from '../../../utils/Consts';
import styles from './Avatar.module.scss'

interface AvatarProps {
    channelId?: number
    profileImg?: string
    large?: boolean
}

const Avatar: React.FC<AvatarProps> = ({channelId, profileImg, large}) => {
    return (
        <Link to={`${CHANNEL_PATH}/${channelId}`} className={styles.avatar}>
            <div data-large={large} className={styles.avatar_container}>
                <img data-large={large} src={process.env.REACT_APP_API_URL + `${profileImg}`} />
            </div>
        </Link>
    );
};

export default Avatar;