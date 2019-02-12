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
            <div class="practice-filter">
                <AttributesColEntry title="Kiva Decision" id="kiva-decision"
                    entries={["Loan Passed", "Loan Failed"]} />
                <AttributesColEntry title="Borrowers" id="borrowers"
                    entries={["Dance Peace", "Kiwa Life", "Hello Tractor",
                        "All Across Africa", "Nho Fishtail", "Ecozoom",
                        "Wally Walk Group"]} />
                <AttributesColEntry title="Country" id="country"
                    entries={["Ecuador", "Uganda", "U.S.", "South Africa",
                        "Thailand", "Kenya", "Vietnam", "San Paulo"]} />
                <AttributesColEntry title="Primary Sector" id="primary-sector"
                    entries={["Personal", "Philanthropic", "Other"]} />
                <AttributesColEntry title="Attributes" id="attributes"
                    entries={["Attribute 1", "Attribute 2", "Attribute 3"]} />
            </div>
        );
    }
}

export default AttributesCol;