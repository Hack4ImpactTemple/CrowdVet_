import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PracticeCard.css';

class PracticeCard extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }

    render() {
        let actionBtn;
        if (this.props.status === 'continue') {
            actionBtn = <div class="result-action continue">
                Continue Practice
                </div>;
        } else if (this.props.status === 'vetted') {
            actionBtn = <div class="result-action vetted">
                You've Vetted This
                </div>;
        } else if (this.props.status === 'start') {
            actionBtn = <div class="result-action start">
                Start Practice
                </div>;
        }

        return (
            <div class="result-col">
                <div class="result-splash">
                    <img class="result-splash-img" src={this.props.img}
                        draggable="false" />
                </div>
                <div class="result-header">
                    <span class="result-title">{this.props.title}</span>
                    <span class="result-location">{this.props.location}</span>
                </div>
                <div class="result-desc">
                    {this.props.description}
                </div>
                <div class="result-date">
                    <span class="date-tag">Voting ended: </span>
                    {this.props.endDate}
                </div>
                {actionBtn}
            </div>
        );
    }
}

PracticeCard.defaultProps = {
    title: 'Loan title not found',
    location: 'Loan location not found',
    endDate: 'Loan end date not found'
};

export default PracticeCard;