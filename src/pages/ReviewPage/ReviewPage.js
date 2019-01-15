/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                                Page: ReviewPage
 * 
 *      Shows all the details of the organization that the user can use
 *      to help them vet. For example, it shows amount requested, location, 
 *      documentation from the startup, etc.
 * 
 * State: None
 *  
 * Props: 

 */

import React, { Component } from 'react';
import './ReviewPage.css';

import CVTable from '../../components/CVTable/CVTable.js';
import CVStatCard from '../../components/CVStatCard/CVStatCard.js';

class ReviewPage extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ReviewPage">
                <div id="page-title">
                    <span class="title">Loan Summary Report</span>
                </div>
                <div id="page-info-cards">
                    <CVStatCard header="Company Sector" primary="Education"/>
                    <CVStatCard header="Amount Requested" primary="$14,000" subtitle="USD"/>
                    <CVStatCard header="Geographic Location" primary="Uganda" subtitle="East Africa"/>
                </div>
                <div id="page-info-content">
                    <div class="page-info-item" />
                    <div class="page-info-item" />
                    <div class="page-info-item" />
                    <div class="page-info-item" />
                    
                </div>
            </div>
        );
    }

}

export default ReviewPage;