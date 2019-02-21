import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './AttributesCol.css';
import AttributesColEntry from '../AttributesColEntry/AttributesColEntry.js'

class AttributesCol extends Component {

    constructor(props) {
        super(props);

        this.state = {};
        this.props = props;
    }

    render() {

        return (
            <div className="practice-filter">
                <AttributesColEntry title="Kiva Decision" id="kiva-decision"
                    entries={["Loan Passed", "Loan Failed"]}
                    updatePPState={this.props.updatePPState} />
                <AttributesColEntry title="Borrowers" id="borrowers"
                    entries={["Dance Peace", "Kiwa Life", "Hello Tractor",
                        "All Across Africa", "Nho Fishtail", "Ecozoom",
                        "Wally Walk Group"]}
                    updatePPState={this.props.updatePPState} />
                <AttributesColEntry title="Country" id="country"
                    entries={["Ecuador", "Uganda", "U.S.", "South Africa",
                        "Thailand", "Kenya", "Vietnam", "San Paulo"]}
                    updatePPState={this.props.updatePPState} />
                <AttributesColEntry title="Primary Sector" id="primary-sector"
                    entries={["Personal", "Philanthropic", "Other"]}
                    updatePPState={this.props.updatePPState} />
                <AttributesColEntry title="Attributes" id="attributes"
                    entries={["Attribute 1", "Attribute 2", "Attribute 3"]}
                    updatePPState={this.props.updatePPState} />
            </div>
        );
    }
}

export default AttributesCol;