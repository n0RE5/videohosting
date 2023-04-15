import React from 'react';
import Avatar from '../components/UI/Avatar/Avatar';
import { parseSubsToString } from '../utils/Parsers';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { IVideo, fetchedUser } from '../types/Interfaces';
import { useSubscriptions } from '../hooks/useSubscriptions';

interface ChannelModuleProps {
    videos: IVideo[], 
    user: fetchedUser
}

const ChannelModule: React.FC<ChannelModuleProps> = ({videos, user}) => {
    const [isSubscribed, subscribe] = useSubscriptions(user.id)
    const subString = parseSubsToString(Number(user.subscribersCount))

    return (
        <div className='channelpage'>
            <div className="channelpage_w">
                <div className='channelpage_usermeta'>
                    <Avatar large channelId={user.id} profileImg={user.profileImg} />
                    <div className='channelpage_usercontainer'>
                        <div className='channelpage_user'>
                            <div className='channelpage_username'>@{user.username}</div>
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
    );
};

export default ChannelModule;