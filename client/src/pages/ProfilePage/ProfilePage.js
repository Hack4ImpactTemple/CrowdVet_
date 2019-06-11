/**
 *
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 *
 *                                Page: Practice Page
 *
 *      Shows all the previously crowdsourced loans that the user can practice
 *      on. Think of this as the gateway to the beginning of a the CrowdVet
 *      practice platform.
 *
 * State: None
 *
 * Props:
 *   string sector: Type of loan (ex: Education)
 *   string amount: Amount of money requested
 *   string location: Location of the non-profit entity
 *   object[] items: A an array of objects (properties = string title and object content) that we'll show in a grid
 *   object[] items: A an array of objects (properties = string title and object items (title, link) ) that we'll show in the table
 */

import React, {
    Component
} from 'react';
import CVPageBuilder from '../../interfaces/CVPageBuilder.js';
import './ProfilePage.css';
import ProfileLead from '../../leads/ProfileLead/ProfileLead.js';

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/fontawesome-free-solid';


class ProfilePage extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log("UO");
        console.dir(window.user);
        return (
            <div className="profile-page-content">
                <div>
                    <h2 className="profile-page-label">
                        Number of loans reviewed:
                    </h2>
                    <span className="profile-page-stat" id="pp-num-loans">test</span>
                </div>
                <div></div>
            </div>);
    }

}


class ProfilePageBuilder extends CVPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props


    // @override
    async onPageLoad() {

    }

    // @override
    pageLead() {
        return (
            <ProfileLead

            />
        );
    }

    // @override
    pageContent() {
        return (
            <ProfilePage />
        );
    }

}

export {
    ProfilePage,
    ProfilePageBuilder
};
