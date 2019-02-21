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

import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';


class PracticePage extends Component {

    constructor(props) {
        super(props);
        var exampleLoans = [
            {
                title: 'Dance Peace',
                location: 'Uganda',
                endDate: 'December 31, 2017',
                description: 'A loan of $50,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: './img/loan_1.jpeg',
                attrs: {
                    kivaPassed: false,
                    borrower: 'Dance Peace',
                    country: 'UG',
                    sector: 'personal'
                }
            },
            {
                title: 'Kiwa Life',
                location: 'Ecuador',
                endDate: 'April 27, 2017',
                description: 'A loan of $75,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'vetted',
                img: './img/kiwa_life.jpg',
                attrs: {
                    kivaPassed: true,
                    borrower: 'Kiwa Life',
                    country: 'EC',
                    sector: 'personal'
                }
            },
            {
                title: 'Kiwa Life',
                location: 'Ecuador',
                endDate: 'March 12, 2016',
                description: 'A loan of $100,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'continue',
                img: './img/kiwa_life.jpg',
                attrs: {
                    kivaPassed: true,
                    borrower: 'Kiwa Life',
                    country: 'EC',
                    sector: 'personal'
                }
            },
            {
                title: 'Hello Tractor',
                location: 'Kenya, South Africa',
                endDate: 'October 15, 2017',
                description: 'A loan of $50,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: './img/hello_tractor.png',
                attrs: {
                    kivaPassed: true,
                    borrower: 'Hello Tractor',
                    country: 'KE',
                    sector: 'personal'
                }
            },
            {
                title: 'All Across Africa',
                location: 'US',
                endDate: 'October 10, 2017',
                description: 'A loan of $100,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'vetted',
                img: './img/aaa.jpg',
                attrs: {
                    kivaPassed: false,
                    borrower: 'All Across',
                    country: 'US',
                    sector: 'personal'
                }
            },
            {
                title: 'Nho Fishtail',
                location: 'Vietnam',
                endDate: 'October 5, 2017',
                description: 'A loan of $50,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: './img/nho.jpg',
                attrs: {
                    kivaPassed: false,
                    borrower: 'Nho Fishtail',
                    country: 'VN',
                    sector: 'personal'
                }
            },
            {
                title: 'Ecozoom',
                location: 'Kenya',
                endDate: 'September 30, 2017',
                description: 'A loan of $50,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: './img/ecozoom.jpg',
                attrs: {
                    kivaPassed: true,
                    borrower: 'Ecozoom',
                    country: 'KE',
                    sector: 'personal'
                }
            },
            {
                title: 'Wally Walk Group',
                location: 'San Paulo',
                endDate: 'September 25, 2017',
                description: 'A loan of $22,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: 'img/wally_walk.jpg',
                attrs: {
                    kivaPassed: true,
                    borrower: 'Wally Walk Group',
                    country: 'SP',
                    sector: 'personal'
                }
            },
            {
                title: 'Nho Fishtail',
                location: 'Vietnam',
                endDate: 'September 1, 2017',
                description: 'A loan of $44,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'vetted',
                img: 'img/nho.jpg',
                attrs: {
                    kivaPassed: false,
                    borrower: 'Nho Fishtail',
                    country: 'VN',
                    sector: 'personal'
                }
            }
        ];

        this.state = {
            loans: exampleLoans,
            show: {
                kivaStatus: [true, false],
                countries: ['VN', 'SP', 'US', 'UG', 'EC'],
                borrowers: ['Dance Peace', 'Nho Fishtail', 'Wally Walk Group',
                    'Ecozoom', 'All Across', 'Hello Tractor', 'Kiwa Life'],
                sectors: ['personal', 'philanthropic', 'other']
            }
        }
    }



    render() {
        let practiceCards = [];
        let formattedLoan;

        for (var i = 0; i < this.state.loans.length; i++) {
            let globalStatus = this.state.loans[i].attrs.kivaPassed;
            let globalCountry = this.state.loans[i].attrs.country;
            let globalBorrower = this.state.loans[i].attrs.borrower;
            let globalSector = this.state.loans[i].attrs.sector;
            formattedLoan = <PracticeCard title={this.state.loans[i].title}
                shouldShow={function () {
                    return this.state.show.kivaStatus.includes(globalStatus) &&
                        this.state.show.countries.includes(globalCountry) &&
                        this.state.show.borrowers.includes(globalBorrower) &&
                        this.state.show.sectors.includes(globalSector);
                }.bind(this)}

                location={this.state.loans[i].location}
                description={this.state.loans[i].description}
                endDate={this.state.loans[i].endDate}
                status={this.state.loans[i].status}
                img={this.state.loans[i].img}
                key={this.state.loans[i].title + '-' + i}
                attrs={this.state.loans[i].attrs} />;

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
                        <span className="practice-results-count">9 Results</span>
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

                    <AttributesCol updatePPState={function (newState) {
                        console.log(newState);
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
}


class PracticePageBuilder extends CVPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props
    data = {};

    // @override
    async onPageLoad() {
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
            <PracticePage />
        );
    }

}

export {
    PracticePage,
    PracticePageBuilder
};