import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data/data';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';

export default function Recommended({ categoryId, videoId }) {
    const [recData, setRecData] = useState([]);
    const getApiDAta = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;

        await fetch(videoList_url)
            .then((response) => response.json())
            .then((data) => setRecData(data.items))
            .catch((error) => console.loge(error));
    };
    useEffect(() => {
        getApiDAta();
        console.log(recData);
    }, [videoId, categoryId]);
    return (
        <div className="recommended">
            {recData &&
                recData.map((item) => {
                    return (
                        <Link
                            onClick={getApiDAta}
                            to={`/video/${item.snippet.categoryId}/${item.id}`}
                            key={item.id}
                            className="side-video-list">
                            <img
                                src={
                                    item.snippet.thumbnails.default
                                        .url
                                }
                                alt=""
                            />
                            <div className="vid-info">
                                <h4>
                                    {item.snippet.localized.title}
                                </h4>
                                <p>{item.snippet.channelTitle}</p>
                                <p>
                                    {value_converter(
                                        item.statistics.viewCount
                                    )}{' '}
                                    Views
                                </p>
                                <span>
                                    {moment(
                                        item.snippet.publishedAt
                                    ).fromNow()}
                                </span>
                            </div>
                        </Link>
                    );
                })}
        </div>
    );
}
