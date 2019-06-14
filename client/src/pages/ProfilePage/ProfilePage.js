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


class ProfilePage extends Component {

    render() {
        return (
            <div className="profile-page-content">
                <h2>Loan Review History</h2>
                <div>
                    <table className="loan-history-table" >
                        <thead>
                            <tr>
                                <th>Loan ID</th>
                                <th>Business Model Vote</th>
                                <th>Impact Vote</th>
                                <th>Prioritization Vote</th>
                            </tr>
                        </thead>
                        <tbody id="history-table">

                        </tbody>
                    </table>
                </div>
                <div></div>
            </div >);
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
