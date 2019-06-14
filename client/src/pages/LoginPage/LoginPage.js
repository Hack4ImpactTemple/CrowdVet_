import React, { Component } from 'react';
import CVPageBuilder from '../../interfaces/CVPageBuilder.js';
import './LoginPage.css';

var firebase = require('firebase');


class LoginPage extends Component {

    render() {

        if (firebase.auth().currentUser == null) {
            return (
                <div id="login-content">
                    <div id="page-title">
                        <span class="title">Ways to Login</span>
                    </div>
                    <div id="firebaseui-auth-container" style={{ marginTop: 16 }}></div>
                </div>
            );
        } else {
            return (
                <div>
                    <div id="page-title">
                        <span class="title">You're already logged in!</span>
                    </div>
                    <span>If this page does not redirect automatically <a href="/">click here</a></span>
                </div>
            )
        }
    }
}

class LoginPageBuilder extends CVPageBuilder {

    async onPageLoad() {

    }

    pageLead() {
        return null;
    }

    pageContent() {
        return <LoginPage />
    }
}

export {
    LoginPage,
    LoginPageBuilder
}