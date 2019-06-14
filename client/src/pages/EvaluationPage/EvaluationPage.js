import React, { Component } from 'react';
import './EvaluationPage.scss';

import OrganizationLead from '../../leads/OrganizationLead/OrganizationLead';
import Question from './Question';
import CVButton from '../../components/CVButton/CVButton';
import ClientSideRequests from '../../api/ClientSideRequests.js';

class EvaluationPage extends Component {

    constructor(props) {
        super(props);
        this.props = props;

        if (props.data.questions !== undefined) {
            var qs = [];
            for (var i = 0; i < props.data.questions.length; i++) {
                qs.push({ id: i, answered: false, answer: -1 });
            }
        }

        this.state = {
            questions: qs,
            locked: false
        };

        this.handle_question_input = this.handle_question_input.bind(this);
        this.submit = this.submit.bind(this);

    }

    componentWillUpdate() {

        // If the user already rated this org, just show
        // them what they put beforehand
        if (window.user !== undefined && window.user.inited) {
            if (!(window.user.votes)) {
                return;
            }
            if (window.user.votes[this.props.data.id] !== undefined) {

                // To avoid getting in a loop (because setState reinvokes componentWillUpdate)
                // only call this method when the state.locked is false
                if (!this.state.locked) {
                    this.simulate_answers(window.user.votes[this.props.data.id]);
                    this.setState({
                        locked: true
                    });
                }
            }
        }

    }

    simulate_answers(answers) {

        // Change the checked property of the corresponding UI elements
        document.getElementById("0," + (answers['impact'] - 1)).checked = true;
        document.getElementById("1," + (answers['business_model'] - 1)).checked = true;
        document.getElementById("2," + (answers['prioritization'] - 1)).checked = true;

        // Disable all other inputs so user cannot change the selection
        for (var input of document.getElementsByTagName("input")) {
            if (input.type === "radio" && !input.checked) {
                input.disabled = true;
            }
        }

    }

    handle_question_input(e, id, answer_position) {

        // When called manually, no event object will be passed
        if (e !== undefined) {
            e.persist();
        }


        // Update the question's answer in the state
        this.setState(state => {
            for (var i in state.questions) {
                if (state.questions[i].id === id) {
                    state.questions[i].answer = answer_position;
                    if (state.questions[i].answer !== -1) state.questions[i].answered = true;
                }
            }
        });
    }



    async submit() {
        if (!this.refs.terms.checked) {
            alert('You must read and agree to Kiva\'s terms of Agreement before submiting');
            return;
        }
        const { questions } = this.state;
        var unanswered = "";
        for (var i in questions) {
            if (!questions[i].answered) {
                unanswered += ((questions[i].id + 1) + (i === questions.length ? "" : ", "));
            }
        }
        if (unanswered === "") {
            for (var j in questions) {
                var answer = questions[j].answer + 1;
                //rebuild 'unanswered' to contain the actual answers
                unanswered += questions[j].id + ") " + answer + "\n";
            }
            try {
                await this.save_answers();
                this.go("results?id=" + this.props.data.id);
            } catch (error) {
                alert("Could not save your answers. Please check your connection and try again.")
            }
            return;
        }
        else alert('You must answer all questions before continuing.\nSee Questions: ' + unanswered);
    }

    map_questions(questions) {
        return questions.map((question, id) => (
            <Question key={id} question={question} id={id} onChange={this.handle_question_input} />
        ));
    }

    lock_answers() {

        // Disable all *un*checked radio buttons, thus
        // making it impossible to ever change our selection
        var inputs = document.getElementsByTagName("input");
        for (var input of inputs) {
            if (input['type'] === 'radio') {
                if (!input['checked']) {
                    input.disabled = true;
                }
            }
        }
    }

    parse_answer_update_object() {
        const { questions } = this.state;
        var votes = {
            'impact': -1,
            'business_model': -1,
            'prioritization': -1
        }
        for (var i = 0; i < questions.length; i++) {
            var answer = questions[i].answer + 1;
            if (i === 0) {
                votes['impact'] = answer;
            } else if (i === 1) {
                votes['business_model'] = answer;
            } else if (i === 2) {
                votes['prioritization'] = answer;
            } else {
                alert("FATAL ERROR! If you are seeing this, leave the page and try again (err: ep95)");
            }
        }
        return votes;
    }

    async save_answers() {

        // Prepare the update object
        var update = {
            "votes": {}
        };
        update['votes'][this.props.data.id] = this.parse_answer_update_object();

        // If the update works's we're gucc, else pass up the chain
        // this will allow us to not advance to the next page without
        // having already saved the answers
        try {
            var result = await window.user.update(update);
            return result;
        } catch (error) {
            throw error;
        }

    }

    go(url) {
        window.location.href = url;
    }

    render() {

        const { questions } = this.props.data;
        return (
            <div className="evaluation-content">
                <div className="title">Loan Evaluation</div>
                <br />
                <div className="subtitle">
                    All enterprises can get funding; there is no competition between different
                    enterprises.  Please consider each enterprise on its own merits without
                    comparing it to other enterprises.  All applications can get funding.
                </div>
                <br />
                <div className="subtitle" id="note">
                    Note that since this is a practice, your results will not be incorporated into
                    the overall score calculations.
                </div>
                <br />
                {this.state.locked ?
                    <CVButton title={"Preview Only: You already voted"} horizontalPadding={16} borderRadius={8} height={48} />
                    : null
                }
                <form id='questions'>
                    {this.map_questions(questions)}
                </form>
                {this.state.locked ? null :
                    <div>
                        <label className="terms-input-container">
                            <input type="checkbox" ref="terms" />
                            I have read and agree to the
                            <a href="https://www.crowdvet.org/terms"
                                style={{ color: 'rgba(0,0,255,.5)', marginLeft: '5px' }}>
                                terms of Kiva's volunteer agreement.
                            </a>
                            <span className="checkmark"></span>
                        </label>
                        <br />
                    </div>
                }
                <div className="bottom-buttons">
                    <div className="button">
                        <CVButton title={'Previous'} onClick={() => this.go("review?id=" + this.props.data.id)} secondary />
                    </div>
                    { /* <div className="button">
                            <CVButton secondary={true} onClick={this.save} title={'Save'} />
                        </div> */
                    }
                    {this.state.locked ?
                        <div className="button">
                            <CVButton title={'View Results'} onClick={() => this.go("results?id=" + this.props.data.id)} />
                        </div> :
                        <div className="button">
                            <CVButton title={'Submit'} onClick={this.submit} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

class EvaluationPageBuilder {

    data = {
        id: null,
        questions: [
            {
                query: "Overall, the enterprise has a meaningful impact on low income or excluded communities [strongly disagree - strongly agree]",
                type: "radio",
                answers: window.Config.evaluationFeedbackDescriptions['impact']
            },
            {
                query: "Overall, the enterprise has a viable business model [strongly disagree - strongly agree]",
                type: "radio",
                answers: window.Config.evaluationFeedbackDescriptions['business_model']
            },
            {
                query: "Overall, Kiva should move forward with this application and submit this loan for crowdfunding [strongly disagree  - strongly agree]",
                type: "radio",
                answers: window.Config.evaluationFeedbackDescriptions['prioritization']
            },
        ],
        loanImage: '/img/kiwa_life.jpg'
    };

    // @override
    async onPageLoad(url) {

        var request = new window.APIRequest();
        var json = await request.endpoint(ClientSideRequests.loan(url['query']['id']));

        if (request.error) {
            return false;
        }

        // Preprocessing: Convert to a Loan object
        var loan = new window.Loan();
        loan.bind(json);

        let loanImage = '';
        switch (loan['meta']['sector']['name']) {
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

        this.data.id = parseInt(url.query.id);
        this.data.loanImage = loanImage;

    }

    // @override
    pageLead() {
        return (
            <OrganizationLead
                backgroundImage={this.data.loanImage}
                title={"Kiwa Life"} />
        );
    }

    // @override
    pageContent() {
        return (
            <EvaluationPage data={this.data} />
        );
    }

    // If we find out that the user already rated this organization,
    // we should show them what they did, but then lock the form down
    // Users should not be able to change their selections after seeing
    // what Kiva's answers were.
    rerenderOnUserLoaded() {
        return true;
    }

    // Because we should redirect away if the user is logged out
    allowRedirectIfDesired() {
        if (window.loggedIn === false || window.loggedIn === null) {
            alert('You must be logged in to view this page');
            window.location.href = '/login';
        }
    }

}

export {
    EvaluationPage,
    EvaluationPageBuilder
};