import React, { memo } from 'react';
import { IVideo } from '../../types/Interfaces';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoGridbox.module.scss'
import VerticalVideoItem from '../VerticalVideoItem/VerticalVideoItem';

interface VideoGridboxProps {
    videos: IVideo[],
    className?: string
    vertical?: boolean
}

const VideoGridbox: React.FC<VideoGridboxProps> = memo(({videos, className, vertical}) => {
    return (
        <div data-vertical={vertical} className={[styles.videos, className].join(' ')}>
            {vertical
                ? videos.map(video => <VerticalVideoItem key={video.previewImg} video={video} />)
                : videos.map(video => <VideoItem key={video.previewImg} video={video} />)
            }
        </div>
    );
});

export default VideoGridbox;