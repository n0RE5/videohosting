import React, { useEffect, useState } from 'react';
import { getVideos } from '../backendAPI/videoAPI';
import Loader from '../components/UI/Loader/Loader';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { useFetching } from '../hooks/useFetching';
import { IVideo } from '../types/Interfaces';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import VideoSort from '../components/VideoSort/VideoSort';
import '../styles/mainpage.scss'
import MainModule from '../modules/MainModule';

function MainPage () {
    const [videos, setVideos] = useState<IVideo[]>([])
    const [sortedVideos, setSortedVideos] = useState<IVideo[]>(videos)

    const [fetchVideos, isFetching] = useFetching(async () => {
        const res = await getVideos({limit: 10, page: 1})
        setVideos(res)
        return 
    })

    useEffect(() => {
        fetchVideos()
    }, [])

    return (
        <DefaultContainer appTitle='YouVI'>
            {isFetching
                ? <Loader />
                : <MainModule videos={videos} setSortedVideos={setSortedVideos} sortedVideos={sortedVideos} />
            }
        </DefaultContainer>
    );
};

export default MainPage;