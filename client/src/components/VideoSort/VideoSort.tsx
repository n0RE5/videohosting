import React, { useEffect } from 'react';
import { IVideo } from '../../types/Interfaces';
import styles from 'VideoSort.module.scss'
import { useSearchParams } from 'react-router-dom';

interface VideoSortProps {
    defaultList: IVideo[]
    setSortedList: (arg0: IVideo[]) => void
}

const VideoSort: React.FC<VideoSortProps> = ({defaultList, setSortedList}) => {
    const [params] = useSearchParams()
    const tsort = params.get("s")

    const filterTags = (videos: IVideo[], tag: string) => {
        return [...videos].filter(video => video.tags.includes(tag))
    }

    const sort = () => {        
        switch (tsort) {
            case 'all':
                setSortedList(defaultList)
                break;
            case 'games':
                setSortedList(filterTags(defaultList, '#games'))
                break;
            case 'music':
                setSortedList(filterTags(defaultList, '#music'))
                break;
            case 'cartoons':
                setSortedList(filterTags(defaultList, '#cartoons'))
                break;
            case 'films':
                setSortedList(filterTags(defaultList, '#films'))
                break;
            default:
                setSortedList(defaultList)
                break;
        }                
    }

    useEffect(() => {
        sort()
    }, [tsort, defaultList])

    return (
        <>
        </>
    );
};

export default VideoSort;