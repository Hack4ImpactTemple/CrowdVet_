/**
 * 
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 * 
 *                          Component: CVSegmentedControl
 * 
 *      Shows a segmented control. This component can be configured in two ways
 *          The default option presents one tab as "active" (slightly darker than the others)   
 *          When the progressMode prop is true, options allow for before-active, active, and after-active colors
            (Tabs the user has already done are light green, the current is dark green, the following are white)
 * 
 * State:
 *  int index: The index of the currently active tab
 *  
 * Props: 
 *  int index? = The currently active tab. If none, assumes 0 value
 *  string[] labels = 
 *  string[] colors = [active color, inactive/before-active color, (if applicable) after-active color]
 *  bool progressMode? = Optionally enables the three color progress control
 */

import React, { Component } from 'react';
import './ReviewPage.css';

import CVTable from '../../components/CVTable/CVTable.js';
import CVStatCard from '../../components/CVStatCard/CVStatCard.js';

class CVSegmentedControl extends Component {
    
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div class="subpages-header">
                <div class="subpages-header-col">Theory</div>
                <div class="subpages-header-col">Practice</div>
                <div class="subpages-header-col">FAQs</div>
            </div>
        );
    }
}