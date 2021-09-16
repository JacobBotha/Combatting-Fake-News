import { Fragment } from "react";
import AnswerButton from "./button/answer_button";
import React from 'react';

class Question extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        // Generate a sequence of answer buttons

        // console.log(this.props.answers)
        // const ansButtons = this.props.answers.map((answer, index) =>
        //     <React.Fragment> {answer} </React.Fragment>
        // );

        return (
            <div>
                <h1>{this.props.headline}</h1>
                
            </div>);
    }
}

export default Question;