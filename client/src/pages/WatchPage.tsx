import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getVideo, getVideosFromUser } from '../backendAPI/videoAPI';
import { useFetching } from '../hooks/useFetching';
import '../styles/watchpage.scss'
import { IVideo } from '../types/Interfaces';

function WatchPage() {
    const [params] = useSearchParams()
    const [video, setVideo] = useState<IVideo>()
    const videoURL = params.get('v')

    const [fetchVideo] = useFetching(async () => {       
        const video = await getVideo(Number(videoURL))
        setVideo(video)
    })

    useEffect(() => {
        fetchVideo()
    }, [])

    return (
        <div className='watchpage'>
            <div className="watchpage_w">
                <div className='watchpage_video_container'>
                    <video controls className='watchpage_videoplayer'>
                        <source type="video/mp4" src={process.env.REACT_APP_API_URL + `${video?.previewImg}`}/>
                    </video>
                </div>
                <div className='watchpage_media'>
                    
                </div>
            </div>
        </div>
    );
};

export default WatchPage;