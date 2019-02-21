import React from 'react'
import ReactDOM from 'react-dom'
import './VideoPlayer.css'


var videos = [
  {
    service: 'youtube',
    video: 'https://www.youtube.com/embed/TLQX_5kQHyo',
    name: 'the power of kiva',
    duration: "4:51"
  },
  {
    service: 'youtube',
    video: 'https://www.youtube.com/embed/IEdy6XHkd9k',
    name: 'rethinking how we give',
    duration: "1:47"
  },
  {
  	service: 'youtube',
  	video: 'https://www.youtube.com/embed/LOdEG1bO9Ak',
  	name: 'how kiva works',
  	duration: '8:41'
  }
];


const VideoPlayer = (props) => {
	return(
		<div className = "container">
		
			<iframe src={props.source}></iframe>

			<div style={{marginLeft:"30%"}}>
			{/*<div>*/}
				<button className="vidNext">Next</button>
				<button className="vidNext">Previous</button>
			</div>
		</div>
	);
};

export default VideoPlayer;
