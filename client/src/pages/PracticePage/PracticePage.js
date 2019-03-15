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


class PracticePage extends Component {

    constructor(props) {
        super(props);
        /*var exampleLoans = [
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
                    country: 'Uganda',
                    sector: 'Agriculture'
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
                    country: 'Ecuador',
                    sector: 'Agriculture'
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
                    country: 'Ecuador',
                    sector: 'Agriculture'
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
                    country: 'Kenya',
                    sector: 'Agriculture'
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
                    borrower: 'All Across Africa',
                    country: 'US',
                    sector: 'Agriculture'
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
                    country: 'Vietnam',
                    sector: 'Agriculture'
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
                    country: 'Kenya',
                    sector: 'Agriculture'
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
                    country: 'San Paulo',
                    sector: 'Agriculture'
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
                    country: 'Vietnam',
                    sector: 'Agriculture'
                }
            }
        ];*/

        this.state = {
            loans: [],
            show: {
                kivaStatus: [],
                countries: [],
                borrowers: [],
                sectors: []
            },
            ogShow: {
                kivaStatus: [true, false],
                countries: ['Vietnam', 'San Paulo', 'US', 'Uganda', 'Ecuador',
                    'Kenya'],
                borrowers: ['Dance Peace', 'Nho Fishtail', 'Wally Walk Group',
                    'Ecozoom', 'All Across Africa', 'Hello Tractor', 'Kiwa Life'],
                sectors: ['Agriculture', 'Artisan', 'Education', 'Health',
                    'ICT', 'RE', 'Shelter', 'Water']
            }
        }
    }



    render() {
        console.log("render")
        let practiceCards = [];
        let formattedLoan;

        for (var i = 0; i < this.props.loans.length; i++) {
            let globalCountry = this.props.loans[i].attrs.country;
            let globalBorrower = this.props.loans[i].attrs.borrower;
            let globalSector = this.props.loans[i].attrs.sector;
            formattedLoan = <PracticeCard title={this.props.loans[i].title}
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

                    <AttributesCol updatePPState={function (key, toggleVal) {
                        let newStatus = this.state.show.kivaStatus;
                        let newCountries = this.state.show.countries;
                        let newBorrowers = this.state.show.borrowers;
                        let newSectors = this.state.show.sectors;

                        switch (key) {
                            case 'kivaStatus':
                                this.toggleArrayItem(newStatus, toggleVal);
                                break;
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
            this.data.ogShow.countries.unshift(newLoan.location);
            this.data.ogShow.borrowers.unshift(newLoan.attrs.borrower);
            this.data.ogShow.sectors.unshift(newLoan.attrs.sector);
        }


        console.dir(json);

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
            <PracticePage loans={this.data.loans} ogShow={this.data.ogShow} />
        );
    }

}

export {
    PracticePage,
    PracticePageBuilder
};