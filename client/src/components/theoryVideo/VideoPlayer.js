import React from 'react';
import './VideoPlayer.css';


const VideoPlayer = (props) => {
    return (
        <div className="video-player-wrapper">
            <iframe src={props.source} title="kiva video"></iframe>
        </div>
    );
};

export default VideoPlayer;
