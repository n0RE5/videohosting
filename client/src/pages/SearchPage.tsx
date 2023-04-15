import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '../backendAPI/videoAPI';
import Loader from '../components/UI/Loader/Loader';
import { useFetching } from '../hooks/useFetching';
import { IVideo } from '../types/Interfaces';
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';
import SearchModule from '../modules/SearchModule';
import '../styles/searchpage.scss'

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

    return (
        <DefaultContainer appTitle={`${query} - YouVI`}>
            {isFetching
                ? <Loader />
                : <SearchModule videos={videos} query={query} />
            }
        </DefaultContainer>
    );
};

export default SearchPage;