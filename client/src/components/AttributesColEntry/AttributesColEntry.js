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
                    onClick={this.onClickCB.bind(this)} />
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
        this.props.updatePPState("test");
        /*let flag = this.split('-')[1]
        if (this.startsWith('Kiva Decision')) {

            document.querySelectorAll('.attr-info.kiva-passed').forEach((elem, i) => {

                if (elem.innerText === 'false' && flag === 'Loan Passed') {
                    elem.parentElement.classList.toggle('hide-col');
                } else if (elem.innerText === 'true' && flag === 'Loan Failed') {
                    elem.parentElement.classList.toggle('hide-col');
                }

            });

        } else if (this.startsWith('Borrowers')) {
            console.log(flag);
            document.querySelectorAll('.attr-info.borrower').forEach((elem, i) => {
                if (elem.innerText !== flag) {
                    elem.parentElement.classList.toggle('hide-col');
                }
            });
        } else if (this.startsWith('Country')) {
            console.log("cy");
            console.log(flag);
        } else if (this.startsWith('Primary Sector')) {
            console.log("ps");
            console.log(flag);
        }*/
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