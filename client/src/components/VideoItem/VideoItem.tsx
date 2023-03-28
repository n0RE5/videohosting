import React, { useEffect, useState } from 'react';
import styles from './VideoItem.module.scss'
import { fetchedUser, IVideo } from '../../types/Interfaces';
import { Link } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';
import { getById } from '../../backendAPI/userAPI';
import Avatar from '../UI/Avatar/Avatar';
import { parseRawDate, parseViewsToString } from '../../utils/Parsers';

interface VideoItemProps {
    video: IVideo
}

const VideoItem: React.FC<VideoItemProps> = ({video}) => {
    const [user, setUser] = useState<fetchedUser>()

    const fetchUser = async () => {
        const user = await getById(video.userId)
        setUser(user)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className={styles.video}>
            <div className={styles.video_w}>
                <span className={styles.video_preview}>
                    <Link to={`/watch?v=${video.id}`} className={styles.video_preview_w}>
                        <img src={process.env.REACT_APP_API_URL + `${video.previewImg}`} className={styles.video_previewImg}/>
                    </Link>
                </span>
                <div className={styles.video_details}>
                    <div className={styles.video_avatar}>
                        <Avatar channelId={video.userId} profileImg={user?.profileImg} />
                    </div>
                    <div className={styles.video_meta}>
                        <div className={styles.video_meta_title}>
                            <Link to={`/watch?v=${video.id}`}>
                                {video.title}
                            </Link>
                        </div>
                        <Link to={`/channel/${video.userId}`} className={styles.video_meta_username}>{user?.username}</Link>
                        <div className={styles.video_metadata}>
                            <span className={styles.video_views}>{parseViewsToString(video.views)}</span>
                            <span className={styles.video_uploadDate}>{parseRawDate(video.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;