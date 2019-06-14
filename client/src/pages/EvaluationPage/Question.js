import React from 'react';

class Question extends React.Component {

    map_answers(answers, question_id, type, onChange) {
        return answers.map((answer, key) => (
            <label htmlFor={question_id + ',' + key} className="answer" key={key}>
                <input onChange={(e) => onChange(e, question_id, key)} type={type} name={question_id} id={question_id + ',' + key} />
                <span className="radio-button">{key + 1}</span>
                {answer}
            </label>
        ));
    }

    render() {
        const { question, id, onChange } = this.props;
        const { query, type, answers } = question;
        return (
            <div className="question">
                <div className="question-query">
                    {id + 1}) {query}
                </div>
                <div className="answers" id={id}>
                    {this.map_answers(answers, id, type, onChange)}
                </div>
            </div>
        );
    }
}


export default Question;