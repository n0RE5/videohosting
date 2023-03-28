import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '../backendAPI/videoAPI';
import Loader from '../components/UI/Loader/Loader';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { useFetching } from '../hooks/useFetching';
import { IVideo } from '../types/Interfaces';

function SearchPage() {
    const [params] = useSearchParams()
    const [videos, setVideos] = useState<IVideo[]>([])
    const query = params.get('searchQuery') || ''

    const [fetchVideos, isFetching] = useFetching(async() => {
        const videos = await searchVideos({searchQuery: query, limit: 0, page: 0})
        setVideos(videos)
    })

    useEffect(() => {
        fetchVideos()
    }, [query])

    if(isFetching) {
        return <Loader />
    }

    return (
        <div>
            {videos.length
                ? <VideoGridbox videos={videos}/>
                : <span>Пока здесь ничего нет :(</span>
            }
        </div>
    );
};

export default SearchPage;