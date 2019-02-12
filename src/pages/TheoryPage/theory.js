import React, {
    Component
} from 'react';
import ReactDOM from 'react-dom'
//import faker from 'faker'
import CommentDetail from '../../components/comments/CommentDetail'
import Header from '../../components/theoryHeader/Header'
import VideoPlayer from '../../components/theoryVideo/VideoPlayer'
import ScrollBar from '../../components/verticalScroll/ScrollBar'
import CVButton from '../../components/CVButton/CVButton'
import './theory.css'

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

class TheoryPage extends Component {

    constructor(props) {
    	super(props);
    	this.props = props;
    }
    render(){
    	return (
			<div className="ui container comments">
				<Header />
				<div className = "box">
					<ScrollBar />
					<VideoPlayer 
						source="https://www.youtube.com/watch?v=2Ru6mvHeYSE"
					/>
				</div>
				<h1>Discussion</h1>
				<CommentDetail 
					author="Sam" 
				/>
				<CommentDetail 
					author="Alex" 
				/>
				<CommentDetail 
					author="Jane" 
				/>

				<CVButton title={"Submit"} backgroundColor={"#13B5EA"}  />
				<CVButton title={"Evaluate a Sample Loan"} />
			
			</ div>
		);
	}
	
};

class TheoryPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props
    data = {};

    // @override
    async onPageLoad() {
        return;
    }

    // @override
    pageLead() {
        return;
    }

    // @override
    pageContent() {
        return (
            <TheoryPage />
        );
    }

}

export {
	TheoryPage,
	TheoryPageBuilder
}