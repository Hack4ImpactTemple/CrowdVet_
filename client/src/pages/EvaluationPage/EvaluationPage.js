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
import './EvaluationPage.scss';


import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome'
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
        this.get_answers = this.get_answers.bind(this);
    }

    handle_question_input(e, id, answer_position) {
        e.persist();
        this.setState(state => {
            for (var i in state.questions) {
                if (state.questions[i].id == id) {
                    state.questions[i].answer = answer_position;
                    if (state.questions[i].answer != -1) state.questions[i].answered = true;
                }
            }
        });
    }

    get_answers() {
        if (!this.refs.terms.checked) {
            alert('You must read and agree to Kiva\'s terms of Agreement before submiting');
            return;
        }
    }

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
                <label class="terms-input-container">
                    <input type="checkbox" ref="terms" />
                    I have read and agree to the terms of Kiva's volunteer agreement. <a href="#">Terms of Agreement</a>
                    <span class="checkmark"></span>
                </label>
                <br />
                <div className="bottom-buttons">
                    <div className="button">
                        <CVButton title={'Previous'} />
                    </div>
                    <div className="button">
                        <CVButton secondary={true}  title={'Save'} />
                    </div>
                    <div className="button">
                        <CVButton title={'Submit'} onClick={this.get_answers} />
                    </div>
                </div>
            </div>
        );
    }
}

class EvaluationPageBuilder {

    sample_query = "Maecenas condimentum iaculis odio at malesuada. Etiam at pulvinar nunc?";
    sample_type = "radio";
    sample_answers = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Praesent pretium aliquet purus, a euismod dolor laoreet auctor.",
        "Nullam ullamcorper ligula ac consectetur consequat.",
        "Donec tempor metus vitae eleifend imperdiet.",
    ];

    data = {
        questions: [
            {
                query: this.sample_query,
                type: this.sample_type,
                answers: this.sample_answers
            },
            {
                query: this.sample_query,
                type: this.sample_type,
                answers: this.sample_answers
            },
            {
                query: this.sample_query,
                type: this.sample_type,
                answers: this.sample_answers
            },
            {
                query: this.sample_query,
                type: this.sample_type,
                answers: this.sample_answers
            },
        ]
    };

    // @override
    async onPageLoad() {
        return;
    }

    // @override
    pageLead() {
        return (
            <OrganizationLead 
            backgroundImage={'./img/headshot.jpg'}
            title={"title"}
            subtitle={"subtitle"}/>
        );
    }

    // @override
    pageContent() {
        return (
            <EvaluationPage data={this.data} />
        );
    }

}

export {
    EvaluationPage,
    EvaluationPageBuilder
};