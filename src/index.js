import React from 'react'
import ReactDOM from 'react-dom'
import faker from 'faker'
import CommentDetail from './components/comments/CommentDetail'
import Header from './components/theoryHeader/Header'
import VideoPlayer from './components/theoryVideo/VideoPlayer'
import ScrollBar from './components/verticalScroll/ScrollBar'
import CVButton from './components/CVButton/CVButton'
import './theory.css'




const App = () => {
	return (
		<div className="ui container comments">
			<Header />
			<div className = "box">
			<ScrollBar />
			<VideoPlayer />
			</div>
			<h1>Discussion</h1>
			<CommentDetail author="Sam" />
			<CommentDetail author="Alex" />
			<CommentDetail author="Jane" />

			<CVButton title={"Submit"} backgroundColor={"#13B5EA"}  />
			<CVButton title= {"Evaluate a Sample Loan"}/>
			
		</div>
	);
};

ReactDOM.render(<App  />, document.querySelector('#root'))