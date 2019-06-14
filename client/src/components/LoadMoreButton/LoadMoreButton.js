import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LoadMoreButton.css';

class LoadMoreButton extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }

    render() {

        return (
            <div className="results-load-more">
                Load More
            </div>
        );
    }
}

export default LoadMoreButton;