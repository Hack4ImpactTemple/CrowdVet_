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
import './FAQPage.scss';
import CVCollapsible from '../../components/CVCollapsible/CVCollapsible';
import ProfileLead from '../../leads/ProfileLead/ProfileLead';

class FAQPage extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        /*

        input data structure:
        
            topics: [
                {
                    topic: "This is the topic title",
                    questions: [
                        {
                            title: "This is the question title for this topic",
                            content: <> JSX can go here, and text too </>
                        },
                        {...},
                        ...
                    ]
                },
                {...},
                ...
            ]
        */
    }

    map_topics(topics) {
        return topics.map((topic, id) => (
            <CVCollapsible id={id} expansion_key={"arrow"} title={topic.title + '\tID: ' + id}>
                {this.map_questions(topic.questions)}
            </CVCollapsible>
        ));
    }

    map_questions(questions) {
        return questions.map((question, id) => (
            <CVCollapsible id={id} key={`question-${id}`} className="FAQ-entry" expansion_key={"show/hide"} title={question.title}>
                {question.content}
            </CVCollapsible>
        ));
    }

    render() {
        const { topics } = this.props.data;
        return (
            <div className="content">
                <div className="FAQ-title">
                    <h1>
                        FAQ
                    </h1>
                </div>
                <div className="FAQ-section">
                    {this.map_questions(topics[0].questions)}
                </div>
                <div id="evalButton">
                    Any more questions or feedback? Contact us at
                    <a href="mailto:crowdvet@kiva.org">
                        crowdvet@kiva.org
                    </a>
                </div>
            </div>
        );
    }
}

class FAQPageBuilder {

    // Here we'll keep all the data we get from the
    // api call before we pass it into our components as props

    data = {
        topics: [
            {
                questions: [
                    {
                        title: "What is crowdvetting?",
                        content: `Crowdvetting was born from Kiva’s Direct-to-Social Enterprise (DSE) program, which
                            started in June 2016 as a pilot program to provide working capital loans to social
                            enterprises all over the world. Kiva decided to harness the power of the crowd by providing
                            them the materials to conduct due diligence on social enterprises. The crowd can vet more
                            borrowers faster than the Kiva staff can, making it easier for small and medium-sized
                            enterprises to access the capital they need through Kiva.`
                    },
                    {
                        title: "How do I evaluate an enterprise?",
                        content: `During the vetting process you will be asked to evaluate the enterprise based on
                            impact, business model and overall opinion using a 1 to 6 scale (1 being strongly disagree,
                            6 being strongly agree). You can also add additional comments or thoughts about the
                            enterprise to help us better understand your evaluation process.`
                    },
                    {
                        title: "Do I need to have a certain background/experience to participate?",
                        content: `There is no specific experience required. The ideal vetter would be a graduate student
                            who wants to learn about novel social enterprises and practice reviewing real financial and
                            loan application materials, or a working professional eager to contribute their skills.`
                    },
                    {
                        title: "What time commitment is expected of participants?",
                        content: <span>Participation is self-driven, with no strict time commitment. Participants can vet any
                            number of posted enterprises they choose at any time. The vetting process takes ~1 hour per
                            enterprise.
                            <br />
                            If you would like to become a certified vetter by committing regular time,
                            you can <a href="https://docs.google.com/presentation/d/1n3VvjQBPzj-3gD8ryQ2zVZ3jNWCFMGV557IIHMgj7Q8/edit?usp=sharing">
                                learn more about time commitment for different certificates and sign up here
                                    </a>.
                            </span>
                    },
                    {
                        title: "How are score and accuracy calculated?",
                        content: (
                            <span>
                                Each time a user vets an enterprise, their votes are compared to Kiva’s votes. The
                                absolute difference between each of these is then used to calculate your score out of
                                10.
                                <br /><br />
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Evaluation Question</th>
                                            <th>User Votes</th>
                                            <th>Kiva Votes</th>
                                            <th>Abs</th>
                                            <th>Sign</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td>Business Model</td>
                                            <td>3</td>
                                            <td>6</td>
                                            <td>3</td>
                                            <td>-</td>
                                        </tr>
                                        <tr>
                                            <td>Social Impact</td>
                                            <td>5</td>
                                            <td>5</td>
                                            <td>0</td>
                                            <td>+</td>
                                        </tr>
                                        <tr>
                                            <td>Recommendation</td>
                                            <td>5</td>
                                            <td>5</td>
                                            <td>5</td>
                                            <td>+</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <br />
                                <i>
                                    User score according to the table below (1 - and 2 +) would be 7 with an accuracy
                                    rating of 50%.
                                </i>
                                <br />
                                <img src="./img/table_conversion.png"
                                    alt="table conversion" id="table-conversion">
                                </img>
                            </span>
                        )
                    },
                    {
                        title: "Who evaluates the enterprises at Kiva?",
                        content: `The Kiva DSE program has a small, but dedicated team of staff and interns who review
                            the application materials and evaluate the enterprises.`
                    },
                    {
                        title: "What if I don’t want to give low votes to any enterprises?",
                        content: `We understand the desire to help everyone, but Kiva cannot approve every single
                            application. Some enterprises are not yet at a stage to receive a working capital loan and
                            approving them may do more harm than good. Kiva will always consider reapplicants in the
                            future when their needs better fit the DSE program, and your honest votes will help us fund
                            the enterprises most ready for growth.`
                    },
                    {
                        title: "How long are enterprises open for vetting on crowdvet.org?",
                        content: `Enterprises will typically accept evaluations for 14 days.`
                    },
                    {
                        title: "What happens after I complete an evaluation?",
                        content: (<span>After you complete an evaluation, you can continue to review and reevaluate the
                            enterprise until the crowdvetting period ends.
                            <br /><br />
                            Once the enterprise is closed for vetting, Kiva’s staff will post their votes and final
                            decision. Users will then receive their individual score and accuracy rating on their
                            profile. If an enterprise is approved, it will be posted to the Kiva website for funding
                            within 1-2 weeks.</span>)
                    },
                    {
                        title: "Who makes the final decision to approve or reject an application?",
                        content: `Kiva’s DSE and risk management teams evaluate the application and crowdvet data after
                                the evaluation period ends to make an informed decision about whether or not to approve the
                                loan.`
                    },
                    {
                        title: "What happens if an enterprise I evaluated is approved, but does not fully fund on Kiva?",
                        content: (<span>
                            Unfortunately, Kiva’s DSE program is an all-or-nothing campaign and it is possible for
                            an approved enterprise to not raise the full amount during the 30 day crowdfunding period.
                            In this event, the amount raised will be refunded back to the lenders.
                                <br /> <br />
                            We know that it can be difficult to see some loans miss their funding goal, which is why we
                            keep working hard to reach new lenders who can help create more positive impact.
                                </span>)
                    },
                    {
                        title: "How long does it take from the time vetting closes to loan disbursement?",
                        content: `From the time that user vetting closes on the crowdvet website, it can take up to 60
                                        days for the loan, if approved, to be fully funded and then disbursed to the enterprise.`
                    },
                    {
                        title: "Will my score change if an enterprise I evaluated defaults on their loan?",
                        content: "No. At this time, user scores will remain unchanged."
                    },

                ].concat(window.moreQuestions),
            }
        ]
    };


    // @override
    async onPageLoad() {

        return;
    }

    // @override
    pageLead() {
        return (
            <ProfileLead
                backgroundImage={'./img/headshot.jpg'}
                title={"title"}
                subtitle={"subtitle"} />
        );
    }

    // @override
    pageContent() {
        return (
            <FAQPage data={this.data} />
        );
    }

}

export {
    FAQPage,
    FAQPageBuilder
};
