import React, {Component} from 'react';
import './EvaluationPage.scss';

import OrganizationLead from '../../leads/OrganizationLead/OrganizationLead';
import Question from './Question';
import CVButton from '../../components/CVButton/CVButton';

class EvaluationPage extends Component {

    constructor(props) {
        super(props);
        this.props = props;
        if (props.data.questions !== undefined) {
            var qs = [];
            for (var i = 0; i < props.data.questions.length; i++) {
                qs.push({id: i, answered: false, answer: -1});
            }
        }
        this.state = {
            questions: qs
        };

        this.handle_question_input = this.handle_question_input.bind(this);
        this.submit = this.submit.bind(this);
        this.save = this.save.bind(this);
    }

    handle_question_input(e, id, answer_position) {
        e.persist();
        this.setState(state => {
            for (var i in state.questions) {
                if (state.questions[i].id === id) {
                    state.questions[i].answer = answer_position;
                    if (state.questions[i].answer !== -1) state.questions[i].answered = true;
                }
            }
        });
    }

    //read data from the page form and store the answers in the server
    async submit() {
        if (!this.refs.terms.checked) {
            alert('You must read and agree to Kiva\'s terms of Agreement before submiting');
            return;
        }
        const {questions} = this.state;
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
                unanswered += (questions[j].id + 1) + ") " + answer + "\n";
            }
            alert("Thanks for completing the evaluation, you answered:\n" + unanswered);
        }
        else alert('You must answer all questions before continuing.\nSee Questions: ' + unanswered);
        console.log(window.user);
        await window.user.update({
            'evals': [
                {
                    id: this.props.loan_id,
                    answers: {
                        '0': questions[0].answer,
                        '1': questions[1].answer,
                        '2': questions[2].answer
                    }
                }
            ]
        });
    }

    //save answers
    save() {
        alert('check console');
        console.log(this.state.questions);
    }

    //a helper function to map a 'questions' array into Question components
    map_questions(questions) {
        return questions.map((question, id) => (
            <Question key={id} question={question} id={id} onChange={this.handle_question_input}/>
        ));
    }

    render() {
        const {questions} = this.props.data;
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
                <form id='questions'>
                    {this.map_questions(questions)}
                </form>
                <label className="terms-input-container">
                    <input type="checkbox" ref="terms" />
                    I have read and agree to the terms of Kiva's volunteer agreement. <a href="#">Terms of Agreement</a>
                    <span className="checkmark"></span>
                </label>
                <br />
                <div className="bottom-buttons">
                    <div className="button">
                        <CVButton title={'Previous'} />
                    </div>
                    <div className="button">
                        <CVButton secondary={true} onClick={this.save} title={'Save'} />
                    </div>
                    <div className="button">
                        <CVButton title={'Submit'} onClick={this.submit} />
                    </div>
                </div>
            </div>
        );
    }
}

class EvaluationPageBuilder {
    //the static questions and answers
    data = {
        questions: [
            {
                query: "Overall, the enterprise has a meaningful impact on low income or excluded communities [strongly disagree - strongly agree]",
                type: "radio",
                answers: [
                    "This indicates any social enterprise you feel has negative social impact, or takes advantage of people - either the people it claims to serve, or other parties.",
                    "This company has no discernable social impact at all. Most for-profit companies fall into this category rating.",
                    "This company has one or more of the following: - Questionable social impact; - Social impact based on donations; - Possible social impact that is not integral to the business model.",
                    "The social impact model of this company makes sense, but it is not currently being measured clearly and methodically.",
                    "The social impact model of this company makes sense, and is being measured clearly and methodically.",
                    "The social impact of this company has been documented and tested with a study or similarly rigorous measure, with demonstrated proof. Or, the company is following an established social impact model which has been tested and demonstrated by research."
                ]
            },
            {
                query: "Overall, the enterprise has a viable business model [strongly disagree - strongly agree]",
                type: "radio",
                answers: [
                    "This business is not making money. It is dependant on donations and grants.​",
                    "This business has some income, but is mostly dependent on grants and donations, somewhere around a 20:80 ratio.",
                    "This company has raised cash capital, but has minimal sales, or questionably low sales volume considering its current lifespan.​",
                    "This company is on the road to profitability - the business model has clear potential, it seems a barrier is the current lack of working capital.",
                    "This business does not display robust profits, as it is reinvesting its profit into growth of the company.",
                    "This company is already healthily profitable and sustainable, and has the ability to scale.​"
                ]
            },
            {
                query: "Overall, Kiva should move forward with this application and submit this loan for crowdfunding [strongly disagree  - strongly agree]",
                type: "radio",
                answers: [
                   " I really wouldn’t recommend moving forward with this enterprise.",
                    "I don’t like it. It might be profitable, but social impact is questionable; It might have great social impact, but business model has significant holes. I don’t think this is for Kiva.",
                    "I’m not sold on this. This isn’t a clear ‘yes’ for Kiva.",
                    "This sounds suitable for Kiva. I would recommend considering this.",
                    "This sounds mostly great. Only a few minor concerns with business model/social enterprise/other.",
                    "This is a definite yes. If everything checks out, let’s send this to crowdfunding right now."
                ]
            },
        ]
    };

    loan_id;

    // @override
    async onPageLoad(url) {
        if (window.user == null) {
            window.location.replace("../login");
        }
        this.loan_id = url['query']['id'];

        //To Do:
            //some sort of validation for the loan id
        return;
    }

    // @override
    pageLead() {
        return (
            <OrganizationLead 
            backgroundImage={'./img/kiwa_life.jpg'}
            title={"Kiwa Life"} />
        );
    }

    // @override
    pageContent() {
        return (
            <EvaluationPage data={this.data} loan_id={this.loan_id} />
        );
    }

}

export {
    EvaluationPage,
    EvaluationPageBuilder
};