import React, { Component } from 'react';
import './CVEvaluation.css';

import CVNumberLineHeader from '../CVNumberLineHeader/index';
import CVNumberLine from '../CVNumberLine/index';

class CVEvaluation extends Component {

    /**
     * Constructs an Evaluation object
     * 
     * @constructor
     * @class CVEvaluation
     * @param {Object} props JSX Props
     * @param {String} props.prompt The quality we're rating on (Ex: Overall, has meaningful impact)
     * @param {Object} props.rating Please see nested properties
     * @param {int} props.rating.min Minimum rating possible
     * @param {int} props.rating.max Maximum rating possible
     * @param {String} props.descriptionKey 'impact' / 'business_model' / 'prioritization' based on what question was asked. Allows the CVEvaluation object to display the correct labels for every vote 1-6
     * @param {Object} props.votes Container for votes of kiva, user, and avergage community vetter 
     * @param {int} props.votes.kiva Kiva's vote
     * @param {int} props.votes.user User's vote
     * @param {int} props.votes.avg Average vote
     * @param {int[]} props.avgs Average votes for each tier (i.e. votes for 1,2,3,4,5,6) 
     *  
    */
    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;

    }

    render() {

        // Create a copy of the descriptions paired with each 1-6 vote
        // Choose either 'impact' / 'business_model' / 'prioritization'
        //   comments based on what the user passed into props
        var labels = ["Error", "Error", "Error", "Error", "Error", "Error"];
        if (this.props.descriptionKey !== undefined) {
            labels = window.Config.evaluationFeedbackDescriptions[this.props.descriptionKey];
        }

        // Return the property content, configured with the labels above
        return (
            <div id={"cv-evaluation-" + this.props.index} class={"cv-evaluation"}>
                <div>
                    <span class="text-align-left">{this.props.prompt}</span>
                </div>
                <div>
                    <CVNumberLineHeader
                        id={"cv-evaluation-" + this.props.index + "-header"}
                        title={"Scale ="}
                        height={38} width={700}
                        start={1} end={this.props.scale}
                        color={this.props.colors.header}
                    />
                </div>
                <div>
                    <CVNumberLine
                        id={"cv-evaluation-" + this.props.index + "-kiva"}
                        title={"Kiva's Vote"}
                        height={38} width={700}
                        value={this.props.votes.kiva} scale={this.props.scale}
                        color={this.props.colors.kiva}
                    />
                    <center><span class="cv-evaluation-description" style={{ color: this.props.colors.kiva, maxWidth: 700 }}>{this.props.votes.kiva + ": " + labels[this.props.votes.kiva - 1]}</span></center>
                </div>
                <div>
                    {
                        (this.props.votes.user >= 0) ?
                            <CVNumberLine
                                id={"cv-evaluation-" + this.props.index + "-you"}
                                title={"Your Vote"}
                                height={38} width={700}
                                value={this.props.votes.user} scale={this.props.scale}
                                color={this.props.colors.user} />
                            : null
                    }
                    <center><span class="cv-evaluation-description" style={{ color: this.props.colors.user, maxWidth: 700 }}>{this.props.votes.user + ": " + labels[this.props.votes.user - 1]}</span></center>
                </div>
                <div>
                    <CVNumberLine
                        id={"cv-evaluation-" + this.props.index + "-crowd"}
                        title={"Crowd Average"}
                        height={140} width={700}
                        value={this.props.votes.average} scale={this.props.scale}
                        votes={this.props.votes.distribution}
                        color={this.props.colors.average}
                    />
                </div>
            </div>
        );
    }


}

CVEvaluation.propTypes = {
    // ... prop types here
}

CVEvaluation.defaultProps = {
    // ... default props here
}

export default CVEvaluation;
