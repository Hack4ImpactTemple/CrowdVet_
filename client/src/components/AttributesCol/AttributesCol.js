import React, { Component } from 'react';
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
                <AttributesColEntry title="Borrowers" id="borrowers"
                    entries={this.props.borrowers}
                    updatePPState={this.props.updatePPState} />
                <AttributesColEntry title="Country" id="country"
                    entries={this.props.countries}
                    updatePPState={this.props.updatePPState} />
                <AttributesColEntry title="Primary Sector" id="primary-sector"
                    entries={this.props.sectors}
                    updatePPState={this.props.updatePPState} />


            </div>
        );
    }
}

export default AttributesCol;