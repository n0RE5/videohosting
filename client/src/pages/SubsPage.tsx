import React, { useEffect, useState } from 'react';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import { getUserSubs } from '../backendAPI/subscribtionsAPI';
import { useFetching } from '../hooks/useFetching';
import { fetchedUser } from '../types/Interfaces';
import Avatar from '../components/UI/Avatar/Avatar';
import { parseSubsToString } from '../utils/Parsers';
import '../styles/subspage.scss'
import Loader from '../components/UI/Loader/Loader';
import { Link } from 'react-router-dom';
import { CHANNEL_PATH } from '../utils/Consts';

function SubsPage() {
    const [userSubs, setUserSubs] = useState<fetchedUser[]>([])

    const [fetchSubscriptions, isFetching] = useFetching(async () => {
        const response = await getUserSubs()
        setUserSubs(response)
    })

    useEffect(() => {
       fetchSubscriptions()
    }, [])

    if(isFetching) {
        return <Loader />
    }

    return (
        <DefaultContainer appTitle='Подписки - YouVI'>
            <div className="subspage_w">
                {userSubs.length
                    ? <div className='subspage_grid'>
                        {userSubs.map(sub =>
                            <div className='subspage_item'>
                                <Avatar large channelId={sub.id} profileImg={sub.profileImg} />
                                <Link to={CHANNEL_PATH + `/${sub.id}`} className='subspage_item_username'>{sub.username}</Link>
                                <div className='subspage_item_subs'>{parseSubsToString(Number(sub.subscribersCount))}</div>
                            </div>
                        )}
                    </div>
                    : <div className='subspage_empty'>Похоже вы еще ни на кого ни подписаны...</div>
                }
            </div>
        </DefaultContainer>
    );
};

export default SubsPage;