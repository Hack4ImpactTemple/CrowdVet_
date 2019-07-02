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
import CVButton from '../../components/CVButton/CVButton.js'
import './ProfileLead.css';
import '../OrganizationLead/OrganizationLead.css';

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';

class ProfileLead extends Component {

    render() {
        return (
            <div id="profile-section-wrapper">
                <div id="login-text">{"You must be logged in, in order to view profile information"}</div>
                <div id="profile-section-loading">
                    <FontAwesomeIcon icon="circle-notch"
                        className="fa-spin profile-load" />
                    Loading Profile Info
                </div>
                <div className="profile-section blur" id="profile-lead-content">
                    <div className="padding"></div>
                    <div className="big-profile">
                        <div className="big-headshot-wrapper">
                            <span className="helper"></span>
                            <img className="big-headshot" src="/img/ProfileIcon.png"
                                width="300px;"
                                draggable="false" id="profile-lead-headshot"
                                alt="profile headshot" />
                        </div>
                        <br />
                    </div>
                    <div className="profile-info">
                        <div className="info-header" id="profile-lead-name">
                            John Doe
                        </div>
                        <div id="profile-lead-buttons" style={{ flexDirection: 'row' }}>
                            <div className="small-pad"></div>
                            <CVButton
                                title="View Profile"
                                borderRadius={8}
                                height={40}
                                fontSize={14}
                                width={100}
                                onClick={function () { window.location.href = '/profile' }}
                            />
                            <CVButton
                                title="Logout"
                                borderRadius={8}
                                height={40}
                                fontSize={14}
                                width={100}
                                secondary={true}
                                onClick={function () { window.location.href = '/logout' }}
                            />
                            <div className="small-pad"></div>
                        </div>
                    </div>
                    <div className="padding"></div>
                </div>
            </div>

        )
    }

}

export default ProfileLead;