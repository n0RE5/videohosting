import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getVideosFromUser } from '../backendAPI/videoAPI';
import Loader from '../components/UI/Loader/Loader';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { useFetching } from '../hooks/useFetching';
import { IVideo } from '../types/Interfaces';

interface ChannelPageProps {
    
}

function ChannelPage () {
    const [videos, setVideos] = useState<IVideo[]>([])
    const param = useParams()

    const [fetchAll, isFetching] = useFetching(async() => {
        const response = await getVideosFromUser({userId: Number(param?.userId), limit: 0, page: 0})
        setVideos(response.rows)
    })

    useEffect(() => {
        fetchAll()
    }, [])

    if (isFetching) {
        return <Loader />
    }

    return (
        <div>
            <VideoGridbox videos={videos} />
        </div>
    );
};

export default ChannelPage;