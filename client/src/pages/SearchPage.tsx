import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchVideos } from '../backendAPI/videoAPI';
import Loader from '../components/UI/Loader/Loader';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { useFetching } from '../hooks/useFetching';
import { IVideo } from '../types/Interfaces';
import '../styles/searchpage.scss'
import DefaultContainer from '../components/DefaultContainer/DefaultContainer';

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
        <DefaultContainer appTitle={`${query} - YouVI`}>
            <div className='searchpage'>
                <div className="searchpage_w">
                    {videos.length 
                        ? <div className='searchpage_found'>По запросу "{query}" Найдено:</div>
                        : null
                    }
                    <hr className='searchpage_hr'/>
                    {videos.length
                        ? <div className='searchpage_videogrid'>
                            <VideoGridbox vertical={true} videos={videos}/>
                        </div>
                        : <div className='searchpage_notfound'>По вашему запросу ничего не найдено :(</div>
                    }
                </div>
            </div>
        </DefaultContainer>
    );
};

export default SearchPage;