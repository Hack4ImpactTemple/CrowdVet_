import React from 'react'
import ReactDOM from 'react-dom'
import faker from 'faker'
import './CommentDetail.css'

const CommentDetail = (props) => {
	return(
	<div align = "center">
	<div className="ui container comments">
		<div className="comment">
			<div className="content">
				<a href="/" className="author">
				Sams
				</a>
				<div className="metadata">
					<span className="date">Today at 11pm</span>
				</div>
				<div className="text">
				Comment on the blog post
				</div>
			</div>
		</div>
	</div>
	</div>
	);
};


export default CommentDetail;