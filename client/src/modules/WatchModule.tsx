import React from 'react';
import Avatar from '../components/UI/Avatar/Avatar';
import { Link } from 'react-router-dom';
import { CHANNEL_PATH } from '../utils/Consts';
import { parseRawDate, parseViewsToString } from '../utils/Parsers';
import { IVideo, fetchedUser } from '../types/Interfaces';
import { useLikes } from '../hooks/useLikes';
import { useSubscriptions } from '../hooks/useSubscriptions';

interface WatchModuleProps {
    video: IVideo
    videoOwner: fetchedUser
}

const WatchModule: React.FC<WatchModuleProps> = ({ video, videoOwner }) => {
    const [isLiked, like] = useLikes(video.id)
    const [isSubscribed, subscribe] = useSubscriptions(video.userId)

    const viewsString = parseViewsToString(video.views)
    const createdAtString = parseRawDate(video.createdAt)

    return (
        <div className='watchpage'>
            <div className="watchpage_w">
                <div className='watchpage_video_container'>
                    <video controlsList='nodownload' controls className='watchpage_videoplayer'>
                        <source type="video/mp4" src={process.env.REACT_APP_API_URL + `${video.video}`}/>
                    </video>
                </div>
                <div className='watchpage_media'>
                    <div className="media_left">
                        <div className="media_left_w">
                            <div className="media_meta">
                                <div className='media_title'>{video.title}</div>
                                <div className='media_user'>
                                    <div className="media_usermeta">
                                        <div className='user_avatar'>
                                            <Avatar channelId={video.userId} profileImg={videoOwner.profileImg}/>
                                        </div>
                                        <div className='user_meta'>
                                            <Link to={`${CHANNEL_PATH}/${video.userId}`} className='user_username'>{videoOwner.username}</Link>
                                            <div className='user_subscribers'>{videoOwner.subscribersCount} подписчиков</div>
                                        </div>
                                        <button 
                                            onClick={subscribe}
                                            className='user_subscribebtn'
                                        >
                                            {isSubscribed ? "Вы подписанны" : "Подписаться"}
                                        </button>
                                    </div>
                                    <button 
                                        onClick={like} 
                                        disabled={isLiked} 
                                        data-liked={isLiked} 
                                        className='user_likebtn'
                                    >
                                        <span className='user_likebtn_img'/>
                                        &nbsp; 
                                        <span className='user_likebtn_text'>
                                            {video.likesCount}
                                        </span> 
                                    </button>
                                </div>
                            </div>
                            <div className="media_videometa">
                                <div className="media_videometa_w">
                                    <div className='videometa_views'>
                                        {viewsString}
                                        &nbsp;&nbsp;
                                        {createdAtString}
                                    </div>
                                    <div className='video_description'>
                                        {video.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchModule;