import React, {
    Component
} from 'react';
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



    submit() {
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
            return;
        }
        else alert('You must answer all questions before continuing.\nSee Questions: ' + unanswered);
    }


    save() {
        alert('check console');
        console.log(this.state.questions);
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

    sample_query = "Maecenas condimentum iaculis odio at malesuada. Etiam at pulvinar nunc?";
    sample_type = "radio";
    sample_answers = [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        "Praesent pretium aliquet purus, a euismod dolor laoreet auctor. Praesent pretium aliquet purus, a euismod dolor laoreet auctor.",
        "Nullam ullamcorper ligula ac consectetur consequat. Nullam ullamcorper ligula ac consectetur consequat.",
        "Donec tempor metus vitae eleifend imperdiet. Donec tempor metus vitae eleifend imperdiet.",
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
            backgroundImage={'./img/kiwa_life.jpg'}
            title={"Kiwa Life"} />
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