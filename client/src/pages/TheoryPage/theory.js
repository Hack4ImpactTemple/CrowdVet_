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
} from '@fortawesome/react-fontawesome';

class TheoryPage extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            videoIndex: 0
        };
    }

    goToVideo(index) {
        const { videos } = this.props;
        let videoIndex = index;
        if (videoIndex < 0) {
            videoIndex = videos.length - 1;
        } else if (videoIndex >= videos.length) {
            videoIndex = 0;
        }
        this.setState({
            videoIndex
        });
    }

    map_videos(videos, activeVideo) {
        return videos.map((video, i) => (
            <div className="sb-wrapper">
                <li className={(activeVideo === i) ? " active" : ""}
                    onClick={this.goToVideo.bind(this, i)}> {i + 1}. {video.name} </li>
            </div>

        ));
    }

    render() {
        const { videos } = this.props;
        const { videoIndex } = this.state;
        const { service, video } = videos[videoIndex];

        return (
            <div className="ui container comments">
                <Header />
                <div className="box">
                    <div id="scrollBar" >
                        {this.map_videos(videos, videoIndex)}
                    </div>
                    <VideoPlayer
                        source={video}
                    />
                </div>
                <div id="nxtButton">
                    <button className="vidPrev" onClick={this.goToVideo.bind(this, videoIndex - 1)}>Previous</button>
                    <button className="vidNext" onClick={this.goToVideo.bind(this, videoIndex + 1)}>Next</button>
                </div>

                <div id="evalButton">
                    Any questions or feedback? Contact us at
                    <a href="mailto:crowdvet@kiva.org">
                        crowdvet@kiva.org
                    </a>
                </div>
            </ div>
        );
    }

};


class TheoryPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props
    data = [
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
            video: 'https://www.youtube.com/embed/NqtfMmJfm8g',
            name: 'Walkthrough',
            duration: '8:41'
        }
    ];

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
            <TheoryPage videos={this.data} />
        );
    }

}

export {
    TheoryPage,
    TheoryPageBuilder
}