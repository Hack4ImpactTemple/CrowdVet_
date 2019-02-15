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


class OrganizationLead extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="lead-content" class="lead-content" style={{backgroundImage: "url(" + this.props.backgroundImage + ")"}}>
                <div class="lead-content-titles">
                    <span class="lead-content-title">{this.props.title}</span>
                    <span class="lead-content-subtitle">{this.props.subtitle}</span>
                </div>
            </div>
        );
    }

}

export default OrganizationLead;