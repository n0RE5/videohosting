import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../backendAPI/userAPI';
import { getVideosFromUser } from '../backendAPI/videoAPI';
import Avatar from '../components/UI/Avatar/Avatar';
import Loader from '../components/UI/Loader/Loader';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { useFetching } from '../hooks/useFetching';
import { fetchedUser, IVideo } from '../types/Interfaces';
import { parseSubsToString } from '../utils/Parsers';
import { useSubscriptions } from '../hooks/useSubscriptions';
import { fetchedUserPlacehoder } from '../utils/Placeholders';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import '../styles/channelpage.scss'

function ChannelPage () {
    const param = useParams()
    const navigate = useNavigate()

    const [videos, setVideos] = useState<IVideo[]>([])
    const [channelUser, setChannelUser] = useState<fetchedUser>(fetchedUserPlacehoder)
    const [isSubscribed, subscribe] = useSubscriptions(channelUser.id)
    const subString = parseSubsToString(Number(channelUser.subscribersCount))

    const [fetchAll, isFetching] = useFetching( async() => {
        const user = await getById(Number(param.userId))

        if(!user) {
            return navigate('/error')
        }

        const response = await getVideosFromUser({userId: user.id, limit: 0, page: 0})

        setVideos(response.rows)
        setChannelUser(user)
    })

    useEffect(() => {
        fetchAll()
    }, [param.userId])

    if (isFetching) {
        return <Loader />
    }

    return (
        <DefaultContainer appTitle={`${channelUser.username} - YouVI`}>
            <div className='channelpage'>
                <div className="channelpage_w">
                    <div className='channelpage_usermeta'>
                        <Avatar large channelId={channelUser.id} profileImg={channelUser.profileImg} />
                        <div className='channelpage_usercontainer'>
                            <div className='channelpage_user'>
                                <div className='channelpage_username'>@{channelUser.username}</div>
                                <span className='channelpage_user_media'>
                                    <span className='channelpage_subs'>{subString}</span>
                                    &nbsp;&nbsp;
                                    <span className='channelpage_videoCount'>{videos.length} видео</span>
                                </span>
                            </div>
                            <button
                                onClick={subscribe}
                                data-subscribed={isSubscribed}
                                className='channelpage_subscribe'
                            >
                                {isSubscribed ? "Вы подписанны" : "Подписаться"}
                            </button>
                        </div>
                    </div>
                    <hr className='channelpage_hr'/>
                    {videos.length
                        ? <VideoGridbox className='channelpage_videogrid' videos={videos} />
                        : <div className='channelpage_empty'>Пока здесь ничего нет :(</div>
                    }
                </div>
            </div>
        </DefaultContainer>
    );
};

export default ChannelPage;