import React, { useEffect, useState } from 'react';
import styles from './VideoItem.module.scss'
import { fetchedUser, IVideo } from '../../types/Interfaces';
import { Link } from 'react-router-dom';
import { useFetching } from '../../hooks/useFetching';
import { getById } from '../../backendAPI/userAPI';
import Avatar from '../UI/Avatar/Avatar';
import { parseRawDate, parseViewsToString } from '../../utils/Parsers';
import { CHANNEL_PATH, WATCH_PATH } from '../../utils/Consts';
import { fetchedUserPlacehoder } from '../../utils/Placeholders';

interface VideoItemProps {
    video: IVideo
    vertical?: boolean
}

const VideoItem: React.FC<VideoItemProps> = ({video, vertical}) => {
    const [user, setUser] = useState<fetchedUser>(fetchedUserPlacehoder)

    const fetchUser = async () => {
        const user = await getById(video.userId)
        setUser(user)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div data-vertical={vertical} className={styles.video}>
            <div className={styles.video_w}>
                <span className={styles.video_preview}>
                    <Link to={`${WATCH_PATH}?v=${video.id}`} className={styles.video_preview_w}>
                        <img src={process.env.REACT_APP_API_URL + `${video.previewImg}`} className={styles.video_previewImg}/>
                    </Link>
                </span>
                <div className={styles.video_details}>
                    {vertical 
                        ? null
                        : <div className={styles.video_avatar}>
                            <Avatar channelId={video.userId} profileImg={user.profileImg} />
                          </div>
                    }
                    <div className={styles.video_meta}>
                        <div className={styles.video_meta_title}>
                            <Link to={`${WATCH_PATH}?v=${video.id}`}>
                                {video.title}
                            </Link>
                        </div>
                        {vertical
                            ? <div className={styles.video_verticaluser}>
                                <div className={styles.video_avatar}>
                                    <Avatar channelId={video.userId} profileImg={user.profileImg} />
                                </div>
                                <Link to={`${CHANNEL_PATH}/${video.userId}`} className={styles.video_meta_username}>{user.username}</Link>
                              </div>
                            : <Link to={`${CHANNEL_PATH}/${video.userId}`} className={styles.video_meta_username}>{user.username}</Link>
                        }
                        <div className={styles.video_metadata}>
                            <span className={styles.video_views}>{parseViewsToString(video.views)}</span>
                            <span className={styles.video_uploadDate}>{parseRawDate(video.createdAt)}</span>
                        </div>
                        {vertical &&
                             <span className={styles.video_description}>{video.description}</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoItem;