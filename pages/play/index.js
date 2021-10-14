import React, { useState, useEffect } from "react";
import Question from "../../components/question";
import Answer from "../../components/answer";
import CountDown from '../../components/count_down';
import { useSession } from "next-auth/react";

import styles from '../../styles/Quiz.module.css';
import cookieCutter from 'cookie-cutter';

import head from "next/head";

export default function Quiz({ quiz, questions }) {
  //currentAnswer is the key of the answer button
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [timeLeft, setTimeLeft] = useState(quiz.time);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  //The headline of the current question  
  const headline = questions[questionIndex].headline;
  
  //The headline of the current question  
  const body = questions[questionIndex].headline;

  //User Data
  const { data: session } = useSession()

  //When the question is answered
  const answerQuestion = function(answer, id) {
    setCurrentAnswer(id);
    setIsCorrect(answer);
    setIsAnswered(true);
  }

  const nextQuestion = function() {
    setIsAnswered(false);
    setIsCorrect(false);
    if (questionIndex + 1 >= questions.length) {
      finishQuiz();
      return;
    }

    setQuestionIndex(questionIndex + 1);
    if (isAnswered && isCorrect){
      setScore(score + 1);
      //todo: integrate add time feature
      setTimeLeft(timeLeft + 10);
    }
  }

  const timeUp = function() {
    //todo: end quiz because timeout
    return;
  }

  const startQuiz = function() {
    setQuizStarted(true);
  }
  //The answer buttons to display
  const createAnswerButtons = function () {
    const question = questions[questionIndex];
    if (question.questionType == "True or False") {
      const isCorrect = question.answers[0].answer
      return [
        <Answer statement="True" isCorrect={isCorrect == true} highlight={isAnswered && currentAnswer == 1} answerQuestion={answerQuestion} answerId={1} key="1"/>,
        <Answer statement="False" isCorrect={isCorrect == false} highlight={isAnswered && currentAnswer == 0} answerQuestion={answerQuestion} answerId={0} key="0"/>
      ];
    } else if (question.questionType == "Multiple Choice") {
      return question.answers.map((answer, index) =>
        <Answer statement={answer.statement} isCorrect={answer.answer} highlight={isAnswered && currentAnswer == index} answerQuestion={answerQuestion} answerId={index} key={index}/>
      );
    } else {
      return [];
    }
  }

  const loadingScreen = function () {
    return (<div  className={styles.countdown}><CountDown countDownDone={startQuiz} seconds={3} finished="GO!" /></div>);
  }

  const quizScreen = function () {
    return (
      <div>
          <Question headline={headline} />
          {createAnswerButtons()}
          <button onClick={nextQuestion}>Next</button>
          <div><h5>score = {score}</h5></div>
          <CountDown countDownDone={timeUp} seconds={timeLeft} finished="Time Up!"/>
      </div>
    );
  }

  const finishQuiz = () => {
    setFinished(true);
    if (session) {
      var formData = new FormData();
      formData.append('user', session.user.id);
      formData.append('quiz', quiz.link);
      
      fetch(process.env.NEXTAUTH_URL + '/quizzes/' + quiz.link, {
        method: 'POST',
        body: data
      });
    }

    cookieCutter.set(quiz.link, 'complete') 
  }

  const endScreen = () => {
    if (failed) {
      return (
        //Todo: Insert failed component
        <h2>Failed</h2>
      )
    }
    
    return (
      //Todo: Insert success component
      <h2>Success</h2>
    )
  }

  return (
    <div>
        {finished ? endScreen() : (quizStarted == false ? loadingScreen() : quizScreen())}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/quizzes/2622dddd5a7838aa21c7b208bea4614bee5957bd9cd97841c170736e7d2222c6");
  const results = await res.json();
  return {
    props: {
      quiz: results.quiz,
      questions: results.questions,
    },
  }
}
