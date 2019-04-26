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
import { faTshirt } from '@fortawesome/fontawesome-free-solid';


class PracticePage extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loans: [],
            show: {
                kivaStatus: [],
                countries: [],
                borrowers: [],
                sectors: []
            }
        }
    }



    render() {
        let practiceCards = [];
        let formattedLoan;

        for (var i = 0; i < this.props.loans.length; i++) {
            let globalCountry = this.props.loans[i].attrs.country;
            let globalBorrower = this.props.loans[i].attrs.borrower;
            let globalSector = this.props.loans[i].attrs.sector;
            formattedLoan = <PracticeCard title={this.props.loans[i].title}
                loanID={this.props.loans[i].loadID}
                shouldShow={function () {
                    let countryList = this.state.show.countries;
                    let borrowerList = this.state.show.borrowers;
                    let sectorList = this.state.show.sectors;


                    if (countryList.length === 0) {
                        countryList = this.props.ogShow.countries;
                    }

                    if (borrowerList.length === 0) {
                        borrowerList = this.props.ogShow.borrowers;
                    }

                    if (sectorList.length === 0) {
                        sectorList = this.props.ogShow.sectors;
                    }

                    return countryList.includes(globalCountry) &&
                        borrowerList.includes(globalBorrower) &&
                        sectorList.includes(globalSector);
                }.bind(this)}

                location={this.props.loans[i].location}
                description={this.props.loans[i].description}
                endDate={this.props.loans[i].endDate}
                status={this.props.loans[i].status}
                img={this.props.loans[i].img}
                key={this.props.loans[i].title + '-' + i}
                attrs={this.props.loans[i].attrs} />;

            practiceCards.push(formattedLoan);
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
                            {this.props.result_count} Results
                        </span>
                        <select defaultValue="">
                            <option disabled={true} value="">
                                Sort by ...
                            </option>
                            <option value="mr">
                                Most Recent
                            </option>
                            <option value="phl">
                                Popularity (High to Low)
                            </option>
                            <option value="plh">
                                Popularity (Low to High)
                            </option>
                        </select>
                    </div>
                </div>
                <br />
                <div className="results">

                    <AttributesCol
                        sectors={this.props.ogShow.sectors}
                        borrowers={this.props.ogShow.borrowers}
                        countries={this.props.ogShow.countries}
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
                            <LoadMoreButton />
                        </div>
                    </div>
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
    data = {
        loans: [],
        result_count: 0,
        ogShow: {
            countries: [],
            borrowers: [],
            sectors: []
        }
    };

    // @override
    async onPageLoad() {
        let loanIDs = ['1323015', '1530285', '1579699', '1616966']

        var request = new window.APIRequest();

        for (var i = 0; i < loanIDs.length; i++) {
            var json = await request.endpoint(ClientSideRequests.loan(loanIDs[i]));

            let loanImage = '';
            switch (json.sector.name) {
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

            let newLoan = {
                title: json.name,
                location: json.geocode.country.name,
                endDate: json.fundraisingDate,
                description: json.description,
                status: 'start',
                img: loanImage,
                loadID: json.id,
                attrs: {
                    borrower: json.name,
                    country: json.geocode.country.name,
                    sector: json.sector.name
                }
            };

            if (request.error) {
                console.log("failed");
                return false;
            }


            this.data.loans.unshift(newLoan);
            if (this.data.ogShow.countries.indexOf(newLoan.location) === -1) {
                this.data.ogShow.countries.unshift(newLoan.location);
            }
            if (this.data.ogShow.borrowers.indexOf(newLoan.attrs.borrower) === -1) {
                this.data.ogShow.borrowers.unshift(newLoan.attrs.borrower);
            }

            if (this.data.ogShow.sectors.indexOf(newLoan.attrs.sector) === -1) {
                this.data.ogShow.sectors.unshift(newLoan.attrs.sector);
            }
        }

        this.data.result_count = this.data.loans.length;

        return;
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
            <PracticePage loans={this.data.loans} ogShow={this.data.ogShow}
                result_count={this.data.result_count} />
        );
    }

}

export {
    PracticePage,
    PracticePageBuilder
};