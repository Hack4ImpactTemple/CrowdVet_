import React, { Component } from 'react';
import CVPageBuilder from '../../interfaces/CVPageBuilder.js';
import CVButton from '../../components/CVButton/CVButton.js'

var firebase = require('firebase');

class LogoutPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            done: false
        }
    }

    render() {
        if(!this.state.done) {
            return <div>Logging out...</div>
        } else {
            return (
                <div>
                    <span>If you are not redirected automatically in a few seconds, <a href="/" style={{color: 'blue'}}>click here</a></span>
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