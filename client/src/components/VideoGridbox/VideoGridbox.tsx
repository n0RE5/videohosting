import React, { memo } from 'react';
import { IVideo } from '../../types/Interfaces';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoGridbox.module.scss'

interface VideoGridboxProps {
    videos: IVideo[],
    className?: string
    vertical?: boolean
}

const VideoGridbox: React.FC<VideoGridboxProps> = memo(({videos, className, vertical}) => {
    return (
        <div data-vertical={vertical} className={[styles.videos, className].join(' ')}>
            {videos.map(video =>
                <VideoItem vertical={vertical} key={video.previewImg} video={video} />
            )}
        </div>
    );
});

export default VideoGridbox;