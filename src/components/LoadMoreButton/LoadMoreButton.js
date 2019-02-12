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
            <div class="results-load-more" onClick={this.onClick.bind(this)}>
                Load More
            </div>
        );
    }

    onClick() {
        console.log("Load more clicked");
    }
}

export default LoadMoreButton;