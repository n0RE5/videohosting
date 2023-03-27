import React from 'react';
import styles from './VideoItem.module.scss'
import { IVideo } from '../../types/Interfaces';
import { Link } from 'react-router-dom';

interface VideoItemProps {
    video: IVideo
}

const VideoItem: React.FC<VideoItemProps> = ({video}) => {
    return (
        <div className={styles.video}>
            <div className={styles.video_w}>
                <a className={styles.video_preview}>
                    <img src={process.env.REACT_APP_API_URL + `${video.previewImg}`} className={styles.video_previewImg}/>
                </a>
                <div className={styles.video_details}>
                    <a className={styles.video_avatar}>
                        <div className={styles.video_avatar_container}>
                            <img src="" alt="" />
                        </div>
                    </a>
                    <div className={styles.video_meta}>
                        <div className={styles.video_meta_title}>
                            <Link to={`/watch?v=${video.video}`}>
                                {video.title}
                            </Link>
                        </div>
                        <Link to={`/channel/${video.userId}`} className={styles.video_meta_username}>username</Link>
                        <div className={styles.video_metadata}>
                            <span className={styles.video_views}>{video.views} тыс. просмотров</span>
                            <span className={styles.video_uploadDate}>2 недели назад</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;