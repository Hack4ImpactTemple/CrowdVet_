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
import './ProfileLead.css';
import '../OrganizationLead/OrganizationLead.css';

class ProfileLead extends Component {

    render() {
        return (
            <div id="profile-section-wrapper">
                <div id="login-text">
                    You must be logged in, in order to view profile information
                </div>
                <div className="profile-section blur" id="profile-lead-content">
                    <div className="big-profile">
                        <div className="big-headshot-wrapper">
                            <span className="helper"></span>
                            <img className="big-headshot" src="./img/headshot.jpg"
                                draggable="false" id="profile-lead-headshot"
                                alt="profile headshot" />
                        </div>
                        <br />
                    </div>
                    <div className="profile-info">
                        <div className="info-header" id="profile-lead-name">
                            Fred Rogers
                        </div>
                    </div>
                </div>
            </div>

        )
    }

}

export default ProfileLead;