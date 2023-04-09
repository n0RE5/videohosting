import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getById } from '../backendAPI/userAPI';
import { addView, getVideo } from '../backendAPI/videoAPI';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import Avatar from '../components/UI/Avatar/Avatar';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { useLikes } from '../hooks/useLikes';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { fetchedUser, IVideo } from '../types/Interfaces';
import { CHANNEL_PATH } from '../utils/Consts';
import { parseRawDate, parseViewsToString } from '../utils/Parsers';
import { fetchedUserPlacehoder, videoPlacehoder } from '../utils/Placeholders';
import '../styles/watchpage.scss'

function WatchPage() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [video, setVideo] = useState<IVideo>(videoPlacehoder)
    const [videoOwner, setVideoOwner] = useState<fetchedUser>(fetchedUserPlacehoder)
    const [isLiked, like] = useLikes(video.id)
    const [isSubscribed, subscribe] = useSubscriptions(video.userId)
    const videoURL = params.get('v')

    const viewsString = parseViewsToString(video.views)
    const createdAtString = parseRawDate(video.createdAt)

    const [fetchAll, isFetching, error] = useFetching(async() => {
        const video = await getVideo(Number(videoURL))
        const videoOwner = await getById(video.userId)
        const addVideoView = await addView(video.id)
        setVideo(video)
        setVideoOwner(videoOwner)
    })

    useEffect(() => {
        if (error !== "") {
            navigate('/')
        }
    }, [isFetching])

    useEffect(() => {
        fetchAll()
    }, [])

    if(isFetching) {
        return <Loader />
    }

    return (
        <DefaultContainer appTitle={`${video.title} - YouVI`}>
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
        </DefaultContainer>
    );
};

export default WatchPage;