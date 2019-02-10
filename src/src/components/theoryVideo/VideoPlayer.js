import React from 'react'
import ReactDOM from 'react-dom'
import './VideoPlayer.css'


const VideoPlayer = () => {
	return(
		<div className = "container">

			<iframe src="https://www.youtube.com/embed/35r0xXXn_Sw"></iframe>

			<div style={{marginLeft:"30%"}}>
			{/*<div>*/}
				<button className="vidNext">Next</button>
				<button className="vidNext">Previous</button>
			</div>
		</div>
	);
};

export default VideoPlayer;