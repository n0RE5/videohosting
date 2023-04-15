import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById } from '../backendAPI/userAPI';
import { getVideosFromUser } from '../backendAPI/videoAPI';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { fetchedUser, IVideo } from '../types/Interfaces';
import { fetchedUserPlacehoder } from '../utils/Placeholders';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import ChannelModule from '../modules/ChannelModule';
import '../styles/channelpage.scss'

function ChannelPage () {
    const param = useParams()
    const navigate = useNavigate()

    const [videos, setVideos] = useState<IVideo[]>([])
    const [channelUser, setChannelUser] = useState<fetchedUser>(fetchedUserPlacehoder)

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

    return (
        <DefaultContainer appTitle={`${channelUser.username} - YouVI`}>
            {isFetching
                ? <Loader />
                : <ChannelModule videos={videos} user={channelUser} />
            }
        </DefaultContainer>
    );
};

export default ChannelPage;