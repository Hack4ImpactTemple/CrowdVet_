import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './ActionButton.css';

class ActionButton extends Component {

    constructor(props) {
        super(props);

        this.props = props;
    }

    render() {
        let actionStr = '';

        if (this.props.btnType === 'continue') {
            actionStr = 'Continue Practice';
        } else if (this.props.btnType === 'vetted') {
            actionStr = 'You\'ve vetted this';
        } else if (this.props.btnType === 'start') {
            actionStr = 'Start Practice';
        } else {
            actionStr = this.props.btnType;
        }

        let className = `result-action ${this.props.btnType}`;
        return (
            <div class={className} onClick={this.onClick.bind(this)}>
                {actionStr}
            </div>
        );
    }

    onClick() {
        window.location.href = 'review';
    }
}

ActionButton.defaultProps = {
    btnType: 'start'
};

export default ActionButton;