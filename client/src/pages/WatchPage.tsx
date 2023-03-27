import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getById } from '../backendAPI/userAPI';
import { getVideo, getVideosFromUser } from '../backendAPI/videoAPI';
import { useFetching } from '../hooks/useFetching';
import '../styles/watchpage.scss'
import { fetchedUser, IVideo } from '../types/Interfaces';

function WatchPage() {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const [video, setVideo] = useState<IVideo>()
    const [user, setUser] = useState<fetchedUser>()
    const videoURL = params.get('v')

    const [fetchAll, isFetching, error] = useFetching(async() => {
        const video = await getVideo(Number(videoURL))
        setVideo(video)
        const user = await getById(video.userId)
        setUser(user)
    })

    useEffect(() => {
        if (error !== "") {
            navigate('/')
        }
    }, [isFetching])

    useEffect(() => {
        fetchAll()        
    }, [])

    return (
        <div className='watchpage'>
            <div className="watchpage_w">
                <div className='watchpage_video_container'>
                    <video controls className='watchpage_videoplayer'>
                        <source type="video/mp4" src={process.env.REACT_APP_API_URL + `${video?.previewImg}`}/>
                    </video>
                </div>
                <div className='watchpage_media'>
                    <div className="media_left">
                        <div className="media_left_w">
                            <div className="media_meta">
                                <div className='media_title'>{video?.title}</div>
                                <div className="media_usermeta">
                                    <a className='user_avatar'>
                                        <div className='user_avatar_container'>
                                            <img src={process.env.REACT_APP_API_URL + `${user?.profileImg}`} />
                                        </div>
                                    </a>
                                    <div className='user_meta'>
                                        <Link to={`/channel/${video?.userId}`} className='user_username'>{user?.username}</Link>
                                        <div className='user_subscribers'>{user?.subscribersCount} подписчиков</div>
                                    </div>
                                    <button className='user_subscribebtn'>Подписаться</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WatchPage;