import React, { useEffect } from 'react';
import './Video.css';
import { PlayVideo, Recommended } from '../../Components';
import { useParams } from 'react-router-dom';
//
export default function Video() {
    const { videoId, categoryId } = useParams();
    useEffect(() => {}, [videoId]);
    return (
        <div className="play-container">
            <PlayVideo videoId={videoId} categoryId={categoryId} />
            <Recommended videoId={videoId} categoryId={categoryId} />
        </div>
    );
}
