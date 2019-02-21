import React from 'react';



class Question extends React.Component {

    letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    map_answers(answers, question_id, type, onChange) {
        return answers.map((answer, key) =>(
            <div className="answer" key={key}>
                <input onChange={(e) => onChange(e, question_id, key)} key={key} type={type} name={question_id} value={answer} id={question_id + ',' + key}/>
                <label for={question_id + ',' + key}>{this.letters[key]}{' '}{answer}</label>
            </div>
        ));
    }
    
    render() {
        const {question, id, onChange} = this.props;
        const {query, type, answers} = question;
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