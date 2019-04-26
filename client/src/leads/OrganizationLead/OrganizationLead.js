/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                            Lead: OrganizationLead
 * 
 *      When the user is reviewing an organization, this is the lead
 *      that will be shown in the header (between the top title links and 
 *      the main page content)
 * 
 * State: None
 *  
 * Props: 
 *  backgroundImage
 *  title
 *  subtitle
 */

import React, { Component } from 'react';
import './OrganizationLead.css';


class OrganizationLead extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (

            <div id="lead-content" className="lead-content" style={{backgroundImage: "url(" + this.props.backgroundImage + ")"}}>
                <div className="lead-content-titles">
                    <span className="lead-content-title">{this.props.title}</span>
                    <span className="lead-content-subtitle">{this.props.subtitle}</span>
                </div>
            </div>
        );
    }

}

export default OrganizationLead;