import React from 'react'
import ReactDOM from 'react-dom'


const VideoPlayer = () => {
	return(
		<div className = "container">

			<iframe width="560" height="315" src="https://www.youtube.com/embed/35r0xXXn_Sw" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

			<div style={{marginLeft:"30%"}}>
			{/*<div>*/}
				<button style = {{backgroundColor: "#4CAF50", border: "none", color: "white",padding: "15px 32px", align: "center",display: "inlineBlock",fontSize: "16px", margin:"20px"}}>Next</button>
				<button style = {{backgroundColor: "#4CAF50", border: "none", color: "white",padding: "15px 32px", align: "center",display: "inlineBlock",fontSize: "16px", margin:"20px"}}>Previous</button>
			</div>
		</div>
	);
};

export default VideoPlayer;