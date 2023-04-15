import React from 'react';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { useQuery } from '../hooks/useQuery';
import { IVideo } from '../types/Interfaces';

interface SearchModuleProps {
    query: string | string[] | undefined
    videos: IVideo[]
}

const SearchModule: React.FC<SearchModuleProps> = ({videos, query}) => {
    const isPC = useQuery("(max-width: 800px")

    return (
        <div className='searchpage'>
            <div className="searchpage_w">
                {videos.length && <div className='searchpage_found'>По запросу "{query}" Найдено:</div>}
                <hr className='searchpage_hr'/>
                {videos.length
                    ? <div className='searchpage_videogrid'>
                        <VideoGridbox vertical={isPC} videos={videos}/>
                    </div>
                    : <div className='searchpage_notfound'>По вашему запросу ничего не найдено :(</div>
                }
            </div>
        </div>
    );
};

export default SearchModule;