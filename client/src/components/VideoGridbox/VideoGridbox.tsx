import React from 'react';
import { IVideo } from '../../types/Interfaces';
import VideoItem from '../VideoItem/VideoItem';
import styles from './VideoGridbox.module.scss'

interface VideoGridboxProps {
    videos: IVideo[],
    className?: string
}

const VideoGridbox: React.FC<VideoGridboxProps> = ({videos, className}) => {
    return (
        <div className={[styles.videos, className].join(' ')}>
            {videos.map(video =>
                <VideoItem key={video.previewImg} video={video} />
            )}
        </div>
    );
};

export default VideoGridbox;