/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                                Lead: ErrorLead
 * 
 *       Shown in the lead section when there was an error (Good for 404s)
 * 
 * State: None
 *  
 * Props: 
 *  title
 *  subtitle
 */

import React, { Component } from 'react';
import './ErrorLead.css';


class ErrorLead extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="lead-content" class="lead-content" style={{backgroundColor: '#aed2a3'}}>
                <div class="lead-content-titles">
                    <span class="lead-content-title">{this.props.title}</span>
                    <span class="lead-content-subtitle">{this.props.subtitle}</span>
                </div>
            </div>
        );
    }

}

export default ErrorLead;