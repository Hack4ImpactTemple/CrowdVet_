import React, { Component } from 'react';
import './SplashPage.css';

export default class SplashPage extends Component {

    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div className="bg">
                <div className="loader"></div>
            </div>
        );
    }

}