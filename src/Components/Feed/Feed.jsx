import React, { Component, useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY } from '../../data/data';
import { value_converter } from '../../data/data';
import moment from 'moment';
//
export default function Feed({ category }) {
    const [data, setData] = useState([]);
    //
    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;

        await fetch(videoList_url)
            .then((response) => response.json())
            .then((data) => setData(data.items))
            .catch((error) => console.loge(error));
    };
    useEffect(() => {
        fetchData();
    }, [category]);

    //

    return (
        <div className="feed">
            {data &&
                data.map((item) => (
                    <Link
                        to={`video/${item.snippet.categoryId}/${item.id}`}
                        key={item.id}
                        className="card">
                        <img
                            src={item.snippet.thumbnails.high.url}
                            alt=""
                        />
                        <h2>{item.snippet.localized.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>
                            {value_converter(
                                value_converter(
                                    item.statistics.viewCount
                                )
                            )}{' '}
                            &bull;{' '}
                            {moment(
                                item.snippet.publishedAt
                            ).fromNow()}
                        </p>
                    </Link>
                ))}
            {/* {console.log(data)} */}
            {/* <Link to={`video/20/4521`} className="card">
                <img src={thumbnail1} alt="" />
                <h2>
                    Best channel to learn coding that help you to be a
                    webdeveloper
                </h2>
                <h3>Greatstack</h3>
                <p>15k views &bull; 2 days ago</p>
            </Link> */}
        </div>
    );
}
