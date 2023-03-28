import React, { useEffect, useState } from 'react';
import { getVideos } from '../backendAPI/videoAPI';
import Loader from '../components/UI/Loader/Loader';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import VideoItem from '../components/VideoItem/VideoItem';
import { useFetching } from '../hooks/useFetching';
import { IVideo } from '../types/Interfaces';

function MainPage () {
    const [videos, setVideos] = useState<IVideo[]>([])

    const [fetchVideos, isFetching] = useFetching(async () => {
        const res = await getVideos({limit: 10, page: 1})
        setVideos(res)
        return 
    })

    useEffect(() => {
        fetchVideos()
    }, [])

    return (
        <div>
            {isFetching
                ? <Loader />
                : <VideoGridbox videos={videos}/>
            }
        </div>
    );
};

export default MainPage;