import React from 'react';
import Answer from '../../../components/answer';
import CountDown from '../../../components/count_down';
import Question from '../../../components/question';
import styles from '../../../styles/Home.module.css';

export default class SoloQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countdownDone: false };
    this.state = { currentQuestion: 0 };
    this.state = { score: 0 };
    this.setCountdownDone = this.setCountdownDone.bind(this);
   
    this.updateScore = this.updateScore.bind(this);
  }

  setCountdownDone() {
    this.setState({ countdownDone: true });
  };

  updateScore(isCorrect){
    if (isCorrect){
      this.setState(prevState => ({
        score: prevState.score + 1
      }));
    }

    //update question
  }

  render() {

    var ansarr = [<Answer statement="True" isCorrect={true} answerQuestion={this.updateScore} />,
    <Answer statement="False" isCorrect={false} answerQuestion={this.updateScore}/>]

    const question = <Question headline="The Sky is blue" answers={ansarr} />

    const ansButtons = ansarr.map((answer, index) =>
      <React.Fragment> {answer} </React.Fragment>
    );

    return (
      <div className={styles.container}>
        {!this.state.countdownDone
          ? <CountDown countdownDone={this.setCountdownDone} />
          :  <div> score = {this.state.score}
            {question}
            {ansButtons}
          </div>
        }
      </div>
    );
  }
}
