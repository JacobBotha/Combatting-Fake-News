import React, { Component } from "react";
import Question from "../../components/question";
import Answer from "../../components/answer";
import CountDown from '../../components/count_down';

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isToggleOn: true,
        questions: props.questions,
        questionIndex: 0,
        score: 0
    };

    // This binding is necessary to make `this` work in the callback
    this.skipQuestion = this.skipQuestion.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }

  currentQuestion() {
    return this.state.questions[this.state.questionIndex];
  }

  skipQuestion() {
    this.setState(prevState => ({
        questionIndex: prevState.questionIndex + 1
    }));
  }

  updateScore(isCorrect){
    if (isCorrect){
      this.setState(prevState => ({
        score: prevState.score + 1
      }));
    }
  }

  createAnswerButtons() {
    if (this.currentQuestion().Question_Type_idQuestion_Type == 1) {
      return [
        <Answer statement="True" isCorrect={true} answerQuestion={this.updateScore} />,
        <Answer statement="False" isCorrect={false} answerQuestion={this.updateScore}/>
      ];
    } else if(this.currentQuestion().Question_Type_idQuestion_Type == 2) {
      return this.currentQuestion().answers.map((answer, index) => 
        <Answer statement={answer.statement} isCorrect={answer.answer} answerQuestion={this.updateScore} key={index}/>
      );
    } else {
      return [];
    }
  }

  render() {
    const answerButtons =  this.createAnswerButtons();
    return (
        <div>
            <Question headline = {this.currentQuestion().headline}/>         
            {answerButtons} 
            <button onClick={this.skipQuestion}>Next</button>
        </div>
    );
  }
}

export async function getStaticProps() {
  
    const res = await fetch("http://localhost:3000/api/quizzes");
    const questions = await res.json();

    return {
        props: {
            questions,
        },  
    }
}
