import React from 'react';
import VideoSort from '../components/VideoSort/VideoSort';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import { IVideo } from '../types/Interfaces';

interface MainModuleProps {
    videos: IVideo[],
    sortedVideos: IVideo[],
    setSortedVideos: (arg0: IVideo[]) => void
}

const MainModule: React.FC<MainModuleProps> = ({videos, sortedVideos, setSortedVideos}) => {
    return (
        <div className='mainpage'>
            <div className='mainpage_videogrid'>
                {sortedVideos.length
                    ? <VideoGridbox videos={sortedVideos}/>
                    : <div className='mainpage_notfound'>По вашему запросу ничего не найдено :(</div>
                }
            </div>
            <VideoSort setSortedList={setSortedVideos} defaultList={videos} />
        </div>
    );
};

export default MainModule;