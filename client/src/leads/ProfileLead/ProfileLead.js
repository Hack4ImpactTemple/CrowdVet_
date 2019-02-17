/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                               Lead: ProfileLead
 * 
 *      When the user isn't reviewing an organization, this is the default
 * 
 *  
 * Props: 
 *  backgroundImage
 *  title
 *  subtitle
 */

import React, { Component } from 'react';
import '../OrganizationLead/OrganizationLead.css';

class ProfileLead extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="profile-section">
                <div className="big-profile">
                    <div className="big-headshot-wrapper">
                        <span className="helper"></span>
                        <img className="big-headshot" src="./img/headshot.jpg"
                            draggable="false" alt="profile heashot" />
                    </div>
                    <br />
                    <a href="#" className="view-profile-link">View Profile</a>
                </div>
                <div className="profile-info">
                    <div className="info-header">
                        Fred Rogers
                    </div>
                    <div className="info-stats">
                        Score: 550 | Accuracy: 57%
                    <i className="fa fa-question-circle-o info-qc" aria-hidden="true"></i>
                    </div>
                    <div className="info-subheader">
                        Community Member Since January 12, 2017 | Vetted 7 Social Enterprises
                    </div>
                </div>
            </div>

        )
    }

}

export default ProfileLead;