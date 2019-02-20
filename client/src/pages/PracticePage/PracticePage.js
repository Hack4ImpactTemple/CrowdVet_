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
                img: './img/loan_1.jpeg'
            },
            {
                title: 'Kiwa Life',
                location: 'Ecuador',
                endDate: 'April 27, 2017',
                description: 'A loan of $75,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'vetted',
                img: './img/kiwa_life.jpg'
            },
            {
                title: 'Kiwa Life',
                location: 'ecuador',
                endDate: 'March 12, 2016',
                description: 'A loan of $100,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'continue',
                img: './img/kiwa_life.jpg'
            },
            {
                title: 'Hello Tractor',
                location: 'Kenya, South Africa',
                endDate: 'October 15, 2017',
                description: 'A loan of $50,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: './img/hello_tractor.png'
            },
            {
                title: 'All Across Africa',
                location: 'US',
                endDate: 'October 10, 2017',
                description: 'A loan of $100,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'vetted',
                img: './img/aaa.jpg'
            },
            {
                title: 'Nho Fishtail',
                location: 'Vietnam',
                endDate: 'October 5, 2017',
                description: 'A loan of $50,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: './img/nho.jpg'
            },
            {
                title: 'Ecozoom',
                location: 'Kenya',
                endDate: 'September 30, 2017',
                description: 'A loan of $50,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: './img/ecozoom.jpg'
            },
            {
                title: 'Wally Walk Group',
                location: 'San Paulo',
                endDate: 'September 25, 2017',
                description: 'A loan of $22,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'start',
                img: 'img/wally_walk.jpg'
            },
            {
                title: 'Nho Fishtail',
                location: 'Vietnam',
                endDate: 'September 1, 2017',
                description: 'A loan of $44,000 for Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                status: 'vetted',
                img: 'img/nho.jpg'
            }
        ];

        this.state = { loans: exampleLoans };
    }



    render() {
        let practiceCards = [];
        let formattedLoan;

        for (var i = 0; i < this.state.loans.length; i++) {
            formattedLoan = <PracticeCard title={this.state.loans[i].title}
                location={this.state.loans[i].location}
                description={this.state.loans[i].description}
                endDate={this.state.loans[i].endDate}
                status={this.state.loans[i].status}
                img={this.state.loans[i].img} />;

            practiceCards.push(formattedLoan);
        }

        return (
            <div class="content">
                <div class="practice-section">
                    <div class="practice-header-wrapper">
                        <span class="practice-header">
                            Practical Training
                        </span>
                        <span class="practice-desc">
                            You can hone your skills by practicing vetting on all the previous
                            enterprises that have been put up on CrowdVet.org. Kiva will
                            provide you with feedback on every enterprise you practice.
                            However, your practice results will not be incorporated into the
                            overall score calculations.
                        </span>
                    </div>
                    <div class="practice-results-header">
                        <span class="practice-results-count">9 Results</span>
                        <select>
                            <option disabled="" selected="">Sort by ...</option>
                            <option>Most Recent</option>
                            <option>Popularity (High to Low)</option>
                            <option>Popularity (Low to High)</option>
                        </select>
                    </div>
                </div>
                <br />
                <div class="results">

                    <AttributesCol />
                    <div class="practice-results-wrapper">
                        <div class="practice-results">
                            {practiceCards}
                            <LoadMoreButton />
                        </div>
                    </div>
                </div>
            </div>);
    }
}

class PracticePageBuilder {

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