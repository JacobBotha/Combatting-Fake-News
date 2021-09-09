import { Fragment } from "react";
import AnswerButton from "./button/answer_button";
import React from 'react';


class Question extends React.Component {
    constructor(props) {
        super(props);
        /** 
         * String : Question
         * Answer[] : Answers
        */
        this.CorrectAnswer = this.CorrectAnswer.bind(this);
        this.WrongAnswer = this.WrongAnswer.bind(this);
    }

    CorrectAnswer() {
        console.log(true)
        //next Question
    }

    WrongAnswer() {
        console.log(false)
        //next Question
    }

    render() {
        // Hard coded answers for now
        const answers = [new Answer('True', true), new Answer('False', false)];

        // Generate a sequence of answer buttons
        const ansButtons = answers.map((answer) =>
            <AnswerButton key={answer.text} label={answer.text}
                onClick={answer.isCorrect ? this.CorrectAnswer : this.WrongAnswer} />
        );

        return (
            <div>
                <div>
                    <h1>{this.props.question}</h1>
                </div>
                <div>
                    {ansButtons}
                </div>
            </div>);
    }
}

class Answer {
    text;
    isCorrect;

    constructor(text, isCorrect) {
        this.text = text;
        this.isCorrect = isCorrect;
    }
}

export default Question;