import React from 'react'
import ReactDOM from 'react-dom'
import './ScrollBar.css'

const ScrollBar = () => {
	return(
		//<div style={{border:"1px solid black", width: "150px", height: "100px", overflowY: "scroll"}}>
		// style="width:150px; height:150px;overflow:auto;padding:5px;"
		<div id = "scrollBar" >
			<li>Video1</li>
			<li>Video2</li>
			<li>Video3</li>
			<li>Video4</li>
			<li>Video1</li>
			<li>Video2</li>
			<li>Video3</li>
			<li>Video4</li>
			<li>Video1</li>
			<li>Video2</li>
			<li>Video3</li>
			<li>Video4</li>
			<li>Video1</li>
			<li>Video2</li>
			<li>Video3</li>
			<li>Video4</li>
			<li>Video1</li>
			<li>Video2</li>
			<li>Video3</li>
			<li>Video4</li>
		</div>
	);
};

export default ScrollBar;