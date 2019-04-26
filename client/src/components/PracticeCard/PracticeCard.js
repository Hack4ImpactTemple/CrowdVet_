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
        if (!this.props.shouldShow()) {
            return null;
        }

        console.log(this.props.loanID);

        return (
            <div className="result-col">
                <span className="attr-info borrower">{this.props.attrs.borrower}</span>
                <span className="attr-info country">{this.props.attrs.country}</span>
                <span className="attr-info sector">{this.props.attrs.sector}</span>

                <div className="result-splash">
                    <img className="result-splash-img" src={this.props.img}
                        draggable="false" alt={this.props.title} />
                </div>
                <div className="result-header">
                    <span className="result-title">{this.props.title}</span>
                    <span className="result-location">{this.props.location}</span>
                </div>
                <div className="result-desc">
                    {this.props.description}
                </div>
                <div className="result-date">
                    <span className="date-tag">Voting ended: </span>
                    {this.props.endDate}
                </div>
                <a href={'/review?id=' + this.props.loanID}>
                    <ActionButton btnType={this.props.status} />
                </a>
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