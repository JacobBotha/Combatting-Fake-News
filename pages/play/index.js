import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/router'
import styled from "styled-components";
// import styles from '../../styles/Quiz.module.css'

import HealthBar from "../../components/HealthBar";
import Question from "../../components/Question";
import NoseBar from "../../components/NoseBar";
import Answer from "../../components/answer";
import CountDown from '../../components/count_down';
import { useSession } from "next-auth/react";

import styles from '../../styles/Quiz.module.css';
import cookieCutter from 'cookie-cutter';
import LevelCard from "../../components/LevelCard";


const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`
const TopContent = styled.div`
  position: absolute;
  top: 3%;
  left: 4.5%;
`

const MainContent = styled.div`
  position: relative;
  top: 27%;
  display: flex;

  align-items: center;
  justify-content: center;
  flex-direction: column;
`
const RightSideContent = styled.div`
  position: absolute;
  top: 13%;
  right: 3%;
  bottom: 4%;
`

const ExitButton = styled.div`
  position: absolute;
  bottom: 4%;
  left: 5%;
`

const SkipButton = styled.div`
  position: absolute;
  bottom: 4%;
  right: 4.5%;
`

export default function Quiz({ quiz, questions }) {
  //currentAnswer is the key of the answer button
  const [currentAnswer, setCurrentAnswer] = useState(0)
  const [isCorrect, setIsCorrect] = useState(false)
  const [questionIndex, setQuestionIndex] = useState(0);
  const [health, setHealth] = useState(3);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);


  const router = useRouter()

  //The headline of the current question  
  const headline = questions[questionIndex].headline;
  
  //The headline of the current question  
  const body = questions[questionIndex].headline;

  //User Data
  const { data: session } = useSession()

  //When the question is answered
  const answerQuestion = function (answer, id) {
    setCurrentAnswer(id);
    setIsCorrect(answer);
    setIsAnswered(true);
  }

  const submitQuestion = () => {
    setIsSubmitted(true);
  }

  const nextQuestion = function() {
    if (questionIndex + 1 >= questions.length || failed) {
      setFinished(true);
      return;
    }

    setQuestionIndex(questionIndex + 1);
    setIsSubmitted(false);
  }

  const startQuiz = function () {
    setQuizStarted(true);
  }
  //The answer buttons to display
  const createAnswerButtons = function () {
    const question = questions[questionIndex];
    if (question.questionType == "True or False") {
      const isCorrect = question.answers[0].answer
      return [
        <Answer statement="True" isCorrect={isCorrect == true} highlight={isAnswered && currentAnswer == 1} answerQuestion={answerQuestion} answerId={1} key="1" />,
        <Answer statement="False" isCorrect={isCorrect == false} highlight={isAnswered && currentAnswer == 0} answerQuestion={answerQuestion} answerId={0} key="0" />
      ];
    } else if (question.questionType == "Multiple Choice") {
      return question.answers.map((answer, index) =>
        <Answer statement={answer.statement} isCorrect={answer.answer} highlight={isAnswered && currentAnswer == index} answerQuestion={answerQuestion} answerId={index} key={index} />
      );
    } else {
      return [];
    }
  }

  const loadingScreen = function () {
    return (<div className={styles.countdown}><CountDown countDownDone={startQuiz} seconds={3} finished="GO!" /></div>);
  }

  const questionBody = () => {
    return (
      <>
        <MainContent>
          <Question num={questionIndex + 1}>
            {headline}
          </Question>
          <span>
          {createAnswerButtons()}
          {/* <button onClick={nextQuestion}>Next</button> */}
          </span>
        </MainContent>

        <RightSideContent>
          <LevelCard width="200px" height={"300px"}/>
        </RightSideContent>
      </>
    );
  }

  const questionEnd = () => {
    if (isCorrect) {
      //Todo: Correct Screen
      return (
        <>
        <h2>Correct</h2>
        </>
      )
    }
    return (
      //Todo Incorrect Screen
      <>
        <h2>Incorrect</h2>
      </>
    )
  }

  const handleNextButton = () => {
    if (isAnswered && !isCorrect) {
      if (health - 1 <= 0) {
        setHealth(0);
        setFailed(true);
      }
      setHealth(health - 1);
    }
    
    setIsAnswered(false);

    if (finished) {  
      finishQuiz();
    } else if (isSubmitted) {
      nextQuestion();
    } else {
      submitQuestion();
    }
  }

  const quizScreen = function () {
    return (
      <Content>
        <TopContent>
          <NoseBar />
          <HealthBar health={health} />
        </TopContent>

        {finished ? endScreen() : (isSubmitted ? questionEnd() : questionBody())}

        <ExitButton >
          <Image src="/images/exit.svg" alt="exit" width={100} height={100} />
        </ExitButton>

        <SkipButton onClick={handleNextButton}>
          <Image src="/images/skip1.svg" alt="exit" width={100} height={100} />
        </SkipButton>
      </Content>
    );
  }

  const finishQuiz = () => {
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
    router.push('/play/world');
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
        {quizStarted == false ? loadingScreen() : quizScreen()}
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
