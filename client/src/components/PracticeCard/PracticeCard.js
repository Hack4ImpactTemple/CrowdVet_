import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './PracticeCard.css';
import ActionButton from '../ActionButton/ActionButton.js';

class PracticeCard extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }

    render() {
        return (
            <div class="result-col">
                <div class="result-splash">
                    <img class="result-splash-img" src={this.props.img}
                        draggable="false" alt={this.props.title} />
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
                <ActionButton btnType={this.props.status} />
            </div>
        );
    }
}

PracticeCard.defaultProps = {
    title: 'Loan title not found',
    location: 'Loan location not found',
    endDate: 'Loan end date not found',
    status: 'start'
};

export default PracticeCard;