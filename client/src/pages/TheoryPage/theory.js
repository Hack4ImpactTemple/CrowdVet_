import React, {
    Component
} from 'react';
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

var videos = [
  {
    service: 'youtube',
    video: 'https://www.youtube.com/embed/LznnUZDir94',
    name: 'Problem: The Missing Middle',
    duration: "4:51"
  },
  {
    service: 'youtube',
    video: 'https://www.youtube.com/embed/WyGlrWMuIqQ',
    name: 'Kiva DSE',
    duration: "1:47"
  },
  {
    service: 'youtube',
    video: 'https://www.youtube.com/embed/7KK0HRWkrAs',
    name: 'Introduction to Crowdvetting',
    duration: '8:41'
  },
  {
    service: 'youtube',
    video: 'https://www.youtube.com/embed/35r0xXXn_Sw',
    name: 'How does Crowdvet work',
    duration: '8:41'
  },
  {
    service: 'youtube',
    video: 'https://www.youtube.com/embed/LOdEG1bO9Ak',
    name: 'Walkthrough',
    duration: '8:41'
  }
];


class TheoryPage extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            videoIndex:0
        };
    }

    goToVideo(index){
        let videoIndex = index;
        if(videoIndex < 0){
            videoIndex = videos.length - 1;
        }else if (videoIndex >= videos.length){
            videoIndex = 0;
        }
        this.setState({
            videoIndex
        });
    }

    render() {
        const{service,video} = videos[this.state.videoIndex];
        return (
            <div className="ui container comments">
                <Header />
                <div className="box">
                    <ScrollBar />
                    <VideoPlayer
                        source={video}
                    />
                </div>
                <div id="nxtButton">
                    <button className="vidPrev" onClick={this.goToVideo.bind(this,this.state.videoIndex - 1)}>Previous</button>
                    <button className="vidNext" onClick={this.goToVideo.bind(this,this.state.videoIndex + 1)}>Next</button>
                </div>
                <textarea id="theoryBox" />
                <div id="subButton">

                    <CVButton title={"Submit"} backgroundColor={"#13B5EA"} />
                </div>

                <div id="evalButton">
                    <CVButton title={"Evaluate a Sample Loan"} />
                </div>

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
