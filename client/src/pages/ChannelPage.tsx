import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getById } from '../backendAPI/userAPI';
import { getVideosFromUser } from '../backendAPI/videoAPI';
import Avatar from '../components/UI/Avatar/Avatar';
import Loader from '../components/UI/Loader/Loader';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { useFetching } from '../hooks/useFetching';
import { fetchedUser, IVideo } from '../types/Interfaces';
import { parseSubsToString } from '../utils/Parsers';
import '../styles/channelpage.scss'
import { useSubscriptions } from '../hooks/useSubscriptions';
import { fetchedUserPlacehoder } from '../utils/Placeholders';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';

function ChannelPage () {
    const param = useParams()
    const [videos, setVideos] = useState<IVideo[]>([])
    const [videoCount, setVideoCount] = useState<number>(0)
    const [channelUser, setChannelUser] = useState<fetchedUser>(fetchedUserPlacehoder)
    const [isSubscribed, subscribe, unsubscribe] = useSubscriptions(Number(param?.userId))

    const [fetchAll, isFetching] = useFetching(async() => {
        const response = await getVideosFromUser({userId: Number(param?.userId), limit: 0, page: 0})
        setVideos(response.rows)
        setVideoCount(response.count.length)
        const user = await getById(Number(param?.userId))
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
                        <Avatar large channelId={Number(param?.userId)} profileImg={channelUser.profileImg} />
                        <div className='channelpage_usercontainer'>
                            <div className='channelpage_user'>
                                <div className='channelpage_username'>@{channelUser.username}</div>
                                <span className='channelpage_user_media'>
                                    <span className='channelpage_subs'>{parseSubsToString(Number(channelUser.subscribersCount))}</span>
                                    &nbsp;&nbsp;
                                    <span className='channelpage_videoCount'>{videoCount} видео</span>
                                </span>
                            </div>
                            <button
                                onClick={() => {
                                    if(isSubscribed) {
                                        unsubscribe()
                                    } else {
                                        subscribe()
                                    }
                                }}
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