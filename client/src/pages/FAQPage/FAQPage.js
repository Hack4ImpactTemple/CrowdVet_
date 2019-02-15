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
import './FAQPage.scss';
import CVCollapsible from '../../components/CVCollapsible/CVCollapsible';

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome'

class FAQPage extends Component {

    constructor(props) {
        super(props);
        this.props = props;

    }

    render() {
        return (
            <div class="container">
                <CVCollapsible title='the title goes here'>
                    <CVCollapsible title='the title goes here'>
                        <p>
                            The content and JSX tags would go here
                    </p>
                    </CVCollapsible>
                    <CVCollapsible title='the title goes here'>
                        <p>
                            The content and JSX tags would go here
                    </p>
                    </CVCollapsible>
                </CVCollapsible>
            </div>
        );
    }
}

class FAQPageHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="profile-section">
                <div class="big-profile">
                    <div class="big-headshot-wrapper">
                        <span class="helper"></span>
                        <img class="big-headshot" src="./img/headshot.jpg"
                            draggable="false" />
                    </div>
                    <br />
                    <a href="#" class="view-profile-link">View Profile</a>
                </div>
                <div class="profile-info">
                    <div class="info-header">
                        Fred Rogers
                    </div>
                    <div class="info-stats">
                        Score: 550 | Accuracy: 57%
                    <i class="fa fa-question-circle-o info-qc" aria-hidden="true"></i>
                    </div>
                    <div class="info-subheader">
                        Community Member Since January 12, 2017 | Vetted 7 Social Enterprises
                    </div>
                </div>
            </div>

        )
    }
}

class FAQPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props
    data = {};

    // @override
    async onPageLoad() {
        return;
    }

    // @override
    pageLead() {
        return (
            <FAQPageHeader />
        );
    }

    // @override
    pageContent() {
        return (
            <FAQPage />
        );
    }

}

export {
    FAQPage,
    FAQPageBuilder
};