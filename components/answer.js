import React from 'react';
import styles from '../styles/Quiz.module.css';

export default class Answer extends React.Component {
    constructor(props) {
        super(props);
        //    statement;
        //    isCorrect;
        //    onClick function;
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.answerQuestion(this.props.isCorrect, this.props.answerId);
        this.setState({selected: true});
    }

    render() {
        return (

            <button onClick={this.handleClick} className={this.props.highlight ? styles.answered : styles.default}>
                {this.props.statement}
            </button>
        );
    }
}