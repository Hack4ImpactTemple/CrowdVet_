import React from 'react'
import ReactDOM from 'react-dom'
import faker from 'faker'
import CommentDetail from './CommentDetail'
import Header from './Header'
import VideoPlayer from './VideoPlayer'
import ScrollBar from './ScrollBar'
import styledDropDown from './styledDropDown'
import './theory.css'
import SocialVideo from './social-video'




const App = () => {
	return (
		<div className="ui container comments">
			<Header />
			<div class = "box">
			<div> <ScrollBar /></div>
			<div> <VideoPlayer /></div>
			</div>
			<h1>Discussion</h1>
			<CommentDetail author="Sam" />
			<CommentDetail author="Alex" />
			<CommentDetail author="Jane" />
			<styledDropDown />
			
		</div>
	);
};

ReactDOM.render(<App  />, document.querySelector('#root'))