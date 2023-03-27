import React from 'react';
import VideoGridbox from '../components/VideoGridbox/VideoGridbox';
import VideoItem from '../components/VideoItem/VideoItem';
import { IVideo } from '../types/Interfaces';

function MainPage () {
    const pl = {
        id: 1,
        previewImg: "google.png",
        video: "123",
        title: "looooorem impsum si dolor amet umpsi,",
        description: "123",
        views: 1,
        tags: "123",
        userId: 1,
        likesCount: "123",
    }
    const placeholder: IVideo[] = [pl, pl, pl, pl, pl, pl, pl, pl, pl]
    return (
        <div>
            <VideoGridbox videos={placeholder}/>
        </div>
    );
};

export default MainPage;