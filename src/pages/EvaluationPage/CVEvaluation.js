import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CVEvaluation.css';

import CVNumberLineHeader from './CVNumberLineHeader';
import CVNumberLine from './CVNumberLine';

/**
 * Constructs an Evaluation object
 * 
 * This JSX element requires the following props:
 *   String prompt: The quality we're rating on (Ex: Overall, has meaningful impact)
 *   Object rating: {
 *      int min: Minimum possible rating
 *      int max: Maximum possible rating
 *   }
 *   String description: Additional description (shown below the rating bars)
 *   Object votes: {
 *      int kiva: Kiva's vote
 *      int user: User's vote
 *      int avg: Average vote
 *      int[] avgs: Average votes for each tier (i.e. votes for 1,2,3,4,5,6) 
 *   }
 */
class CVEvaluation extends Component {
  
    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }
  
    render() { 
        return (
            <div id={"cv-evaluation-" + this.props.index} class={"cv-evaluation"}>
                <div>
                    <span class="text-align-left">{this.props.prompt}</span>
                </div>
                <div>
                    <CVNumberLineHeader
                        id={"cv-evaluation-" + this.props.index + "-header"}
                        title={"Prioritization ="}
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
                    <span class="cv-evaluation-description" style={{color: this.props.colors.kiva}}>{this.props.description}</span>
                </div>
                <div>
                    <CVNumberLine 
                        id={"cv-evaluation-" + this.props.index + "-you"}
                        title={"Your Vote"}
                        height={38} width={700}
                        value={this.props.votes.user} scale={this.props.scale}
                        color={this.props.colors.user}
                    />
                    <span class="cv-evaluation-description" style={{color: this.props.colors.user}}>{this.props.description}</span>
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

    componentDidMount() {
        
        return;

        var canvas = document.getElementById("cv-evaluation-" + this.props.index);
        var ctx = canvas.getContext("2d");

        var height = canvas.height;
        var width = canvas.width;

        var linewidth = width;

        ctx.moveTo(0,height/2);
        ctx.lineTo(linewidth,height/2);
        ctx.stroke();

        var tickHeight = 10;
        var ticks = [
            linewidth * 0.1,
            linewidth * 0.3,
            linewidth * 0.5,
            linewidth * 0.7,
            linewidth * 0.9
        ];

        for(var i = 0; i < ticks.length; i++) {
            ctx.moveTo(ticks[i],height/2);
            ctx.lineTo(ticks[i], (height/2) - tickHeight);
            ctx.stroke();
        }

    }
}

CVEvaluation.propTypes = {
   // ... prop types here
}

CVEvaluation.defaultProps = {
    // ... default props here
}

export default CVEvaluation;
