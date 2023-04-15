import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../components/UI/Avatar/Avatar';
import { CHANNEL_PATH } from '../utils/Consts';
import { parseSubsToString } from '../utils/Parsers';
import { fetchedUser } from '../types/Interfaces';

interface SubsModuleProps {
    userSubs: fetchedUser[]
}

const SubsModule: React.FC<SubsModuleProps> = ({ userSubs }) => {
    return (
        <div className="subspage_w">
            {userSubs.length
                ? <div className='subspage_grid'>
                    {userSubs.map(sub =>
                        <div key={sub.id} className='subspage_item'>
                            <Avatar large channelId={sub.id} profileImg={sub.profileImg} />
                            <Link to={CHANNEL_PATH + `/${sub.id}`} className='subspage_item_username'>{sub.username}</Link>
                            <div className='subspage_item_subs'>{parseSubsToString(Number(sub.subscribersCount))}</div>
                        </div>
                    )}
                </div>
                : <div className='subspage_empty'>Похоже вы еще ни на кого ни подписаны...</div>
            }
        </div>
    );
};

export default SubsModule;