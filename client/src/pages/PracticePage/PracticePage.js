/**
 *
 *                              Temple Hack4Impact
 *                                 Kiva CrowdVet
 *
 *                                Page: Practice Page
 *
 *      Shows all the previously crowdsourced loans that the user can practice
 *      on. Think of this as the gateway to the beginning of a the CrowdVet
 *      practice platform.
 *
 * State: None
 *
 * Props:
 *   string sector: Type of loan (ex: Education)
 *   string amount: Amount of money requested
 *   string location: Location of the non-profit entity
 *   object[] items: A an array of objects (properties = string title and object content) that we'll show in a grid
 *   object[] items: A an array of objects (properties = string title and object items (title, link) ) that we'll show in the table
 */

import React, {
    Component
} from 'react';
import './PracticePage.css';

import CVPageBuilder from '../../interfaces/CVPageBuilder.js';
import AttributesCol from '../../components/AttributesCol/AttributesCol';
import PracticeCard from '../../components/PracticeCard/PracticeCard';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import ProfileLead from '../../leads/ProfileLead/ProfileLead';
import ClientSideRequests from '../../api/ClientSideRequests.js';

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import { faCircleNotch } from '@fortawesome/fontawesome-free-solid';


class PracticePage extends Component {

    constructor(props) {
        super(props);
        this.data = {
            loans: [],
            result_count: 0,
            ogShow: {
                countries: [],
                borrowers: [],
                sectors: []
            }
        };

        this.state = {
            loans: [],
            show: {
                kivaStatus: [],
                countries: [],
                borrowers: [],
                sectors: []
            },
            data: this.data,
            loansLoaded: false
        }
    }


    async getResults() {
        let loanIDs = ['1323015', '1530285', '1579699', '1616966']

        var request = new window.APIRequest();

        for (var i = 0; i < loanIDs.length; i++) {
            var json = await request.endpoint(ClientSideRequests.loan(loanIDs[i]));
            console.dir(json);

            let loanImage = '';
            switch (json['meta']['sector']['name']) {
                case 'Agriculture':
                    loanImage = './img/sectors/agriculture.jpg';
                    break;
                case 'Arts':
                    loanImage = './img/sectors/arts.jpg';
                    break;

                case 'Clothing':
                    loanImage = './img/sectors/clothing.jpg';
                    break;

                case 'Construction':
                    loanImage = './img/sectors/construction.jpg';
                    break;

                case 'Education':
                    loanImage = './img/sectors/education.jpg';
                    break;

                case 'Entertainment':
                    loanImage = './img/sectors/entertainment.jpg';
                    break;

                case 'Food':
                    loanImage = './img/sectors/food.jpg';
                    break;

                case 'Health':
                    loanImage = './img/sectors/health.jpg';
                    break;

                case 'Housing':
                    loanImage = './img/sectors/construction.jpg';
                    break;

                case 'Manufacturing':
                    loanImage = './img/sectors/manufacturing.jpg';
                    break;

                case 'Retail':
                    loanImage = './img/sectors/manufacturing.jpg';
                    break;

                case 'Services':
                    loanImage = './img/sectors/entertainment.jpg';
                    break;

                case 'Transportation':
                    loanImage = './img/sectors/agriculture.jpg';
                    break;

                case 'Wholesale':
                    loanImage = './img/sectors/entertainment.jpg';
                    break;

                default:
                    loanImage = './img/sectors/food.jpg';
                    break;
            }
            console.dir(json);

            let newLoan = {
                title: json.meta.name,
                location: json.meta.geocode.country.name,
                endDate: json.meta.fundraisingDate,
                description: json.application.problem,
                status: 'start',
                img: loanImage,
                loanID: json['meta']['id'],
                attrs: {
                    borrower: json.meta.name,
                    country: json.meta.geocode.country.name,
                    sector: json.meta.sector.name
                }
            };

            if (request.error) {
                return false;
            }


            this.state.data.loans.unshift(newLoan);
            if (this.state.data.ogShow.countries.indexOf(newLoan.location) === -1) {
                this.state.data.ogShow.countries.unshift(newLoan.location);
            }
            if (this.state.data.ogShow.borrowers.indexOf(newLoan.attrs.borrower) === -1) {
                this.state.data.ogShow.borrowers.unshift(newLoan.attrs.borrower);
            }

            if (this.state.data.ogShow.sectors.indexOf(newLoan.attrs.sector) === -1) {
                this.state.data.ogShow.sectors.unshift(newLoan.attrs.sector);
            }
        }

        this.state.data.result_count = this.state.data.loans.length;

        this.setState({ loansLoaded: true, data: this.data });

        return;
    }


    render() {
        let practiceCards = [];
        let formattedLoan;

        let results = (
            <div className="results-loading-wrapper">
                <FontAwesomeIcon icon="circle-notch" className="fa-spin results-loading" />
            </div>
        );

        if (this.state.loansLoaded) {
            for (var i = 0; i < this.state.data.loans.length; i++) {
                let globalCountry = this.state.data.loans[i].attrs.country;
                let globalBorrower = this.state.data.loans[i].attrs.borrower;
                let globalSector = this.state.data.loans[i].attrs.sector;
                formattedLoan = <PracticeCard title={this.state.data.loans[i].title}
                    loanID={this.state.data.loans[i].loanID}
                    shouldShow={function () {
                        let countryList = this.state.show.countries;
                        let borrowerList = this.state.show.borrowers;
                        let sectorList = this.state.show.sectors;


                        if (countryList.length === 0) {
                            countryList = this.state.data.ogShow.countries;
                        }

                        if (borrowerList.length === 0) {
                            borrowerList = this.state.data.ogShow.borrowers;
                        }

                        if (sectorList.length === 0) {
                            sectorList = this.state.data.ogShow.sectors;
                        }

                        return countryList.includes(globalCountry) &&
                            borrowerList.includes(globalBorrower) &&
                            sectorList.includes(globalSector);
                    }.bind(this)}

                    location={this.state.data.loans[i].location}
                    description={this.state.data.loans[i].description}
                    endDate={this.state.data.loans[i].endDate}
                    status={this.state.data.loans[i].status}
                    img={this.state.data.loans[i].img}
                    key={this.state.data.loans[i].title + '-' + i}
                    attrs={this.state.data.loans[i].attrs} />;

                practiceCards.push(formattedLoan);
            }
            results = (
                <span>
                    <AttributesCol
                        sectors={this.state.data.ogShow.sectors}
                        borrowers={this.state.data.ogShow.borrowers}
                        countries={this.state.data.ogShow.countries}
                        updatePPState={function (key, toggleVal) {
                            let newStatus = this.state.show.kivaStatus;
                            let newCountries = this.state.show.countries;
                            let newBorrowers = this.state.show.borrowers;
                            let newSectors = this.state.show.sectors;

                            switch (key) {
                                case 'countries':
                                    this.toggleArrayItem(newCountries, toggleVal);
                                    break;
                                case 'borrowers':
                                    this.toggleArrayItem(newBorrowers, toggleVal);
                                    break;
                                case 'sectors':
                                    this.toggleArrayItem(newSectors, toggleVal);
                                    break;
                                default:
                                    break;
                            }



                            this.setState({
                                show: {
                                    kivaStatus: newStatus,
                                    countries: newCountries,
                                    borrowers: newBorrowers,
                                    sectors: newSectors
                                }
                            });
                            //this.setState(newState);
                        }.bind(this)} />
                    <div className="practice-results-wrapper">
                        <div className="practice-results">
                            {practiceCards}
                            {/*<LoadMoreButton />*/}
                        </div>
                    </div>
                </span>
            );
        } else {
            this.getResults();
        }



        return (
            <div className="content">
                <div className="practice-section">
                    <div className="practice-header-wrapper">
                        <span className="practice-header">
                            Practical Training
                        </span>
                        <span className="practice-desc">
                            You can hone your skills by practicing vetting on all the previous
                            enterprises that have been put up on CrowdVet.org. Kiva will
                            provide you with feedback on every enterprise you practice.
                            However, your practice results will not be incorporated into the
                            overall score calculations.
                        </span>
                    </div>
                    <div className="practice-results-header">
                        <span className="practice-results-count">
                            {this.state.data.result_count} Results
                        </span>
                    </div>
                </div>
                <br />
                <div className="results">
                    {results}
                </div>
            </div>);
    }

    toggleArrayItem(a, v) {
        var i = a.indexOf(v);
        if (i === -1)
            a.push(v);
        else
            a.splice(i, 1);
    }

}


class PracticePageBuilder extends CVPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props


    // @override
    async onPageLoad() {

    }

    // @override
    pageLead() {
        return (
            <ProfileLead

            />
        );
    }

    // @override
    pageContent() {
        return (
            <PracticePage />
        );
    }

}

export {
    PracticePage,
    PracticePageBuilder
};
