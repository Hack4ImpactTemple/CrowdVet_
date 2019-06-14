import React, { Component } from 'react';
import CVPageBuilder from '../../interfaces/CVPageBuilder.js';

import './LogoutPage.css';

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

var firebase = require('firebase');

class LogoutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            done: false
        }
    }

    render() {
        if (!this.state.done) {
            return (
                <div className="logout-wrapper">
                    <FontAwesomeIcon icon="circle-notch" className="fa-spin fa-logout-spinner" />
                    <br />
                    <div>Logging Out</div>
                </div>)
        } else {
            return (
                <div className="logout-wrapper">
                    <FontAwesomeIcon icon="circle-notch" className="fa-spin fa-10x" />
                    <br />
                    <div>
                        Logging Out...
                        If you are not redirected automatically in a few
                        seconds,
                        <a href="/" style={{ color: 'blue' }}>
                            click here
                        </a>
                    </div>
                </div>

            )
        }
    }

    componentDidMount() {
        this.logout();
    }

    async logout() {
        await firebase.auth().signOut();
        this.setState({
            done: true
        })
    }

}

class LogoutPageBuilder extends CVPageBuilder {

    async onPageLoad() {

    }

    pageLead() {
        return null;
    }

    pageContent() {
        return <LogoutPage />
    }
}

export {
    LogoutPage,
    LogoutPageBuilder
}