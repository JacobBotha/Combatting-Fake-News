import React from 'react';

export default class Answer extends React.Component {
    constructor(props) {
        super(props);
        //    statement;
        //    isCorrect;
        //    onClick function;
        this.handleClick = this.handleClick.bind(this);
    }


    handleClick() {
        this.props.answerQuestion(this.props.isCorrect);
        this.setState({selected: true});
    }

    render() {
        return (

            <button onClick={this.handleClick}>
                {this.props.statement}
            </button>
        );
    }
}