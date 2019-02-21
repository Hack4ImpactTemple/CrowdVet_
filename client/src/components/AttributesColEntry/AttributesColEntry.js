import React, { Component } from 'react';
import './AttributesColEntry.css';

class AttributesColEntry extends Component {

    constructor(props) {
        super(props);

        this.state = { entriesShow: props.entriesShow };
        this.props = props;
    }

    render() {
        let filterEntriesClass = 'filter-entries ' + this.state.entriesShow;
        let filterChoiceClass = 'filter-choice ' + this.state.entriesShow;
        let entryListIDs = [];

        for (var i = 0; i < this.props.entries.length; i++) {
            let checkboxPair = <div className="cb-pair" key={"cb-pair" + i}>
                <input type="checkbox"
                    id={this.props.entries[i] + '-' + i}
                    value={this.props.entries[i]}
                    className="entry-cb"
                    onClick={this.onClickCB.bind([this, this.props.title + '-' + this.props.entries[i]])} />
                <label htmlFor={this.props.entries[i] + '-' + i}>
                    {this.props.entries[i]}
                </label>
            </div>;
            entryListIDs.push(checkboxPair);
        }

        return (
            <div className={filterChoiceClass} id={this.props.id}>
                <span className="filter-choice-title"
                    onClick={this.onClick.bind(this)}>
                    {this.props.title} <i className="fa fa-chevron-down" ></i>
                </span>
                <div className={filterEntriesClass}>
                    {entryListIDs}
                </div>
            </div >);
    }

    onClickCB() {
        let flag = this[1].split('-')[1];

        if (this[1].startsWith('Kiva Decision')) {
            if (flag === 'Loan Passed') {
                this[0].props.updatePPState("kivaStatus", false);
            } else if (flag === 'Loan Failed') {
                this[0].props.updatePPState("kivaStatus", true);
            }

        } else if (this[1].startsWith('Borrowers')) {

            this[0].props.updatePPState("borrowers", flag);

        } else if (this[1].startsWith('Country')) {
            this[0].props.updatePPState("countries", flag);
        } else if (this[1].startsWith('Primary Sector')) {
            this[0].props.updatePPState("sectors", flag);
        }
        return;
    }

    onClick() {
        console.dir(this)
        if (this.state.entriesShow === 'hide-entries') {
            this.setState({ entriesShow: 'show-entries' });
        } else {
            this.setState({ entriesShow: 'hide-entries' });
        }
    }
}

AttributesColEntry.defaultProps = {
    entriesShow: 'hide-entries',
    entries: []
};

export default AttributesColEntry;