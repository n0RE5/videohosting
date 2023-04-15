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
import WatchModule from '../modules/WatchModule';

function WatchPage() {
    const navigate = useNavigate()
    const [params] = useSearchParams()
    const [video, setVideo] = useState<IVideo>(videoPlacehoder)
    const [videoOwner, setVideoOwner] = useState<fetchedUser>(fetchedUserPlacehoder)
    const videoURL = params.get('v')

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
            {isFetching
                ? <Loader />
                : <WatchModule video={video} videoOwner={videoOwner} />
            }
        </DefaultContainer>
    );
};

export default WatchPage;