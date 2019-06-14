import React, { Component } from 'react';
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
            <div className={className}>
                {actionStr}
            </div>
        );
    }

}

ActionButton.defaultProps = {
    btnType: 'start'
};

export default ActionButton;