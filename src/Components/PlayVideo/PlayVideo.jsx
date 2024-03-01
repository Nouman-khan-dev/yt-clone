import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import down from '../../assets/down.png';
import { API_KEY, value_converter } from '../../data/data';
import moment from 'moment';
import { useParams } from 'react-router-dom';
//
export default function PlayVideo({}) {
    const { videoId } = useParams();

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentsData, setCommentData] = useState([]);
    const [commentMinimize, setCommentMinimize] = useState(true);
    //
    const fetchVideosData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
        await fetch(videoDetails_url)
            .then((response) => {
                return response.json();
            })
            .then((data) => setApiData(data && data.items[0]))
            .catch((error) =>
                console.log('video data error = ', error)
            );
    };
    const getChannelData = async () => {
        const apiUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${
            apiData && apiData.snippet.channelId
        }&key=${API_KEY}
        `;
        await fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setChannelData(data && data.items[0]))
            .catch((e) => console.log(e));
    };
    const getCommentsData = async () => {
        const apiUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${
            apiData && apiData.id
        }&key=${API_KEY}`;
        await fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => setCommentData(data.items))
            .catch((e) => console.log(e));
    };

    //
    useEffect(() => {
        fetchVideosData();
    }, [videoId]);
    useEffect(() => {
        getChannelData();
        getCommentsData();
    }, [apiData]);

    return (
        <div className="play-video">
            {/* <video src={video1} muted controls autoPlay></video> */}
            <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            <h3>{apiData ? apiData.snippet.title : 'title here'}</h3>
            <div className="play-video-info">
                <p>
                    {apiData &&
                        value_converter(
                            apiData.statistics.viewCount
                        )}{' '}
                    Views &bull;{' '}
                    {apiData &&
                        moment(apiData.snippet.publishedAt).fromNow()}
                </p>
                <div className="">
                    <span>
                        <img src={like} alt="" />{' '}
                        {apiData &&
                            value_converter(
                                apiData.statistics.likeCount
                            )}
                    </span>
                    <span>
                        <img src={dislike} alt="" /> 2
                    </span>
                    <span>
                        <img src={share} alt="" /> Share
                    </span>
                    <span>
                        <img src={save} alt="" /> Save
                    </span>
                </div>
            </div>
            <hr />

            <div className="publisher">
                <img
                    src={
                        channelData &&
                        channelData.snippet.thumbnails.medium.url
                    }
                    alt=""
                />
                <div className="">
                    <p>{apiData && apiData.snippet.channelTitle}</p>
                    <span>
                        {channelData &&
                            value_converter(
                                channelData.statistics.subscriberCount
                            )}{' '}
                        Subscibers
                    </span>
                </div>
                <button>Subscribe</button>
            </div>
            <div className="vid-description">
                <p>{apiData && apiData.snippet.title}</p>
                <p>
                    {apiData &&
                        apiData.snippet.description.slice(0, 200)}
                </p>
                <hr />
                <div
                    className={`comments ${
                        commentMinimize ? 'minimize' : ''
                    }`}>
                    <h4>
                        {value_converter(
                            apiData && apiData.statistics.commentCount
                        )}{' '}
                        comments
                        <img
                            src={down}
                            onClick={() =>
                                setCommentMinimize((prev) => !prev)
                            }
                            className="down"
                        />
                    </h4>
                    {commentsData &&
                        commentsData.map((item) => (
                            <div className="comment" key={item.id}>
                                <img
                                    src={`
                                    ${item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                                `}
                                    alt="DP"
                                />
                                <div className="">
                                    <h3>
                                        {
                                            item.snippet
                                                .topLevelComment
                                                .snippet
                                                .autherDisplayName
                                        }{' '}
                                        <span>
                                            {moment(
                                                item.snippet
                                                    .topLevelComment
                                                    .snippet
                                                    .publishedAt
                                            ).fromNow()}
                                        </span>
                                    </h3>
                                    <p>
                                        {
                                            item.snippet
                                                .topLevelComment
                                                .snippet.textDisplay
                                        }
                                    </p>
                                    <div className="comment-action">
                                        <img src={like} alt="" />{' '}
                                        <span>
                                            {commentsData &&
                                                value_converter(
                                                    item.snippet
                                                        .topLevelComment
                                                        .snippet
                                                        .likeCount
                                                )}
                                        </span>
                                        <img src={dislike} alt="" />{' '}
                                    </div>
                                </div>
                                <hr />
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}
