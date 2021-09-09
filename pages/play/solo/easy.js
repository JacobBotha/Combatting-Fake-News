import React from 'react';
import CountDown from '../../../components/count_down';
import Question from '../../../components/question';
import styles from '../../../styles/Home.module.css';

export default class SoloQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countdownDone: false };
    this.state = { currentQuestion: 0 };
    this.setCountdownDone = this.setCountdownDone.bind(this);
  }

  setCountdownDone() {
    this.setState({ countdownDone: true });
  };

  render() {
    console.log('yo ', this.props.questions)
    return (
      <div className={styles.container}>
        {!this.state.countdownDone
          ? <CountDown countdownDone={this.setCountdownDone} />
          : <div> <Question question={this.props.questions[this.state.currentQuestion]} /> </div>
        }
      </div>
    );
  }
}

export async function getServerSideProps({req, res}) {
  
  res = await fetch("http://localhost:3000/api/test");
  const results = await res.json();
  var questions = [];
  
  console.log('hello ', results.length)

  results.forEach(element => {
    questions.push(element.headline);

  });

  return { props: {questions : JSON.stringify(results) }}
}
