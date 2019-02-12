import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            let checkboxPair = <div class="cb-pair">
                <input type="checkbox"
                    id="${this.props.entries[i]}-${i}"
                    value="${this.props.entries[i]}"
                    class="entry-cb"
                    onClick={this.onClickCB.bind(this)} />
                <label for="${this.props.entries[i]}-${i}"
                    onClick={this.onClickCB.bind(this)}>
                    {this.props.entries[i]}
                </label>
            </div>;
            entryListIDs.unshift(checkboxPair);
        }

        return (
            <div class={filterChoiceClass} id={this.props.id}
                onClick={this.onClick.bind(this)}>
                {this.props.title} <i class="fa fa-chevron-down" ></i>
                <div class={filterEntriesClass}>
                    {entryListIDs}
                </div>
            </div >);
    }

    onClickCB() {
        console.log("here")
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