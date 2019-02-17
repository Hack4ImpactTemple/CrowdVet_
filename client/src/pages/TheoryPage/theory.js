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
import './theory.css';
import ProfileLead from '../../leads/ProfileLead/ProfileLead';

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

class TheoryPage extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }
    render() {
        return (
            <div className="ui container comments">
                <Header />
                <div className="box">
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

                <CVButton title={"Submit"} backgroundColor={"#13B5EA"} />
                <CVButton title={"Evaluate a Sample Loan"} />

  				<textarea id="theoryBox" name="firstname"/>
				<div id="subButton">
					
				<CVButton title={"Submit"} backgroundColor={"#13B5EA"}  />
				</div>

				<div id="evalButton">
				<CVButton title={"Evaluate a Sample Loan"} />
				</div>
			
			</ div>
		);
	}

};

class TheoryPageHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="profile-section">
                <div class="big-profile">
                    <div class="big-headshot-wrapper">
                        <span class="helper"></span>
                        <img class="big-headshot" src="./img/headshot.jpg"
                            draggable="false" />
                    </div>
                    <br />
                    <a href="#" class="view-profile-link">View Profile</a>
                </div>
                <div class="profile-info">
                    <div class="info-header">
                        Fred Rogers
                    </div>
                    <div class="info-stats">
                        Score: 550 | Accuracy: 57%
                    <i class="fa fa-question-circle-o info-qc" aria-hidden="true"></i>
                    </div>
                    <div class="info-subheader">
                        Community Member Since January 12, 2017 | Vetted 7 Social Enterprises
                    </div>
                </div>
            </div>

        )
    }
}


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
        return (
            <ProfileLead />
        );
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