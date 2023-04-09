import React, { useMemo } from 'react';
import { IVideo } from '../../types/Interfaces';
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

    const sort = useMemo(() => {
        let sortedList: IVideo[] = [];      
        switch (tsort) {
            case 'all':
                sortedList = defaultList
                break;
            case 'games':
                sortedList = filterTags(defaultList, '#games')
                break;
            case 'music':
                sortedList = filterTags(defaultList, '#music')
                break;
            case 'cartoons':
                sortedList = filterTags(defaultList, '#cartoons')
                break;
            case 'films':
                sortedList = filterTags(defaultList, '#films')
                break;
            default:
                sortedList = defaultList
                break;
        }
        setSortedList(sortedList)
    }, [tsort, defaultList])

    return (
        <>
        </>
    );
};

export default VideoSort;