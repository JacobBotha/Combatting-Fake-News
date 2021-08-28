import React from 'react';
import CountDown from '../../../components/count_down';
import Question from '../../../components/question';
import styles from '../../../styles/Home.module.css'

export default class SoloQuiz extends React.Component {

  constructor(props) {
    super(props);
    this.state = {countdownDone: false };

    this.setCountdownDone = this.setCountdownDone.bind(this);
  }

  setCountdownDone() {
    this.setState({ countdownDone: true });
  };

  render() {
    return (
      <div className={styles.container}>
        {!this.state.countdownDone
          ? <CountDown countdownDone={this.setCountdownDone} />
          : <div> <Question question={'True == True?'}/> </div>
        }
      </div>
    );
  }
}
