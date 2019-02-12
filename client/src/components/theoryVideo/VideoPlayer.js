import React from 'react'
import ReactDOM from 'react-dom'
import './VideoPlayer.css'


var videos = [
  {
    service: 'youtube',
    video: 'https://www.youtube.com/watch?v=TLQX_5kQHyo&t=1s'
  },
  {
    service: 'youtube',
    video: 'https://www.youtube.com/watch?v=LOdEG1bO9Ak'
  },
  {
    service: 'youtube',
    video: 'https://www.youtube.com/watch?time_continue=3&v=IEdy6XHkd9k'
  }
];

var vidIndex = 0;

//{"\"" + props.vid + "\""}
const VideoPlayer = (props) => {
	console.log(videos[vidIndex]);
	console.log(props);
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