import React, {
    Component
} from 'react';
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
