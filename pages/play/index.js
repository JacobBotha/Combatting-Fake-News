import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import cookieCutter from "cookie-cutter";

import styled from "styled-components";
import styles from "../../styles/Quiz.module.css";

import HealthBar from "../../components/HealthBar";
import Question from "../../components/Question";
import NoseBar from "../../components/NoseBar";
import Answer from "../../components/answer";
import CountDown from "../../components/count_down";
import LevelCard from "../../components/LevelCard";
import FairyQuiz from "../../components/characters/FariyQuiz";
import FairyQuestion from "../../components/characters/FariyQuestion";
import Answers from "../../components/button/answer_button";

const Container = styled.div`
  position: relative;
  width: 140vh;
  min-width: 840px;
  min-height: 600px;
  height: 100vh;
  margin: auto;
`;

const ShiftedQuizContent = styled.div`
  position: absolute;
  left: -20.4%;
  width: 100%;
  height: 100%;
`;

const MiniLevelCard = styled(LevelCard)`
  top: 13%;
  left: 83%;
  width: 14%;
  height: 26.5%;
  font-size: max(1.8vh, 10px);
`;

const ExitButton = styled.div`
  position: absolute;
  width: 6.9%;
  bottom: 4%;
  left: 5%;
`;

const SkipButton = styled.div`
  position: absolute;
  width: 6.9%;
  bottom: 4%;
  right: 4.5%;
`;

export default function Quiz({ quiz, questions }) {
  //currentAnswer is the key of the answer button
  const [currentAnswer, setCurrentAnswer] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [health, setHealth] = useState(3);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);

  const router = useRouter();

  //The headline of the current question
  const headline = questions[questionIndex].headline;

  //The headline of the current question
  const body = questions[questionIndex].headline;

  //User Data
  const { data: session } = useSession();

  //When the question is answered
  const answerQuestion = function (answer, id) {
    if (!isSubmitted) {
      setCurrentAnswer(id);
      setIsCorrect(answer);
      setIsAnswered(true);
    }
  };

  const nextQuestion = function () {
    if (questionIndex + 1 >= questions.length || failed) {
      setFinished(true);
      return;
    }

    setQuestionIndex(questionIndex + 1);
    setIsAnswered(false);
    setIsCorrect(false);
  };

  const startQuiz = function () {
    setQuizStarted(true);
  };

  const loadingScreen = function () {
    return (
      <div className={styles.countdown}>
        <CountDown countDownDone={startQuiz} seconds={3} finished="GO!" />
      </div>
    );
  };

  const questionBody = () => {
    return (
      <>
        <Question num={questionIndex + 1}>{headline}</Question>
        <Answers
          question={questions[questionIndex]}
          answerQuestion={answerQuestion}
        />
        <ExitButton>
          <Image src="/images/exit.svg" alt="exit" width={150} height={150} />
        </ExitButton>
        <SkipButton onClick={handleNextButton}>
          <Image src="/images/next.svg" alt="next" width={150} height={150} />
        </SkipButton>
      </>
    );
  };

  const questionEnd = () => {
    return (
      <>
        <FairyQuestion isCorrect={isCorrect} />
        <ShiftedQuizContent>
          <Question num={questionIndex + 1}>{headline}</Question>
          <Answers
            question={questions[questionIndex]}
            answerQuestion={answerQuestion}
          />
        </ShiftedQuizContent>
        <SkipButton onClick={handleNextButton}>
          <Image src="/images/next.svg" alt="next" width={150} height={150} />
        </SkipButton>
      </>
    );
  };

  const handleNextButton = () => {
    if (isSubmitted) {
      nextQuestion();
      setIsSubmitted(false);
    } else {
      if (!isCorrect) {
        if (health - 1 <= 0) {
          setHealth(0);
          setFailed(true);
        }
        setHealth(health - 1);
      }
      setIsSubmitted(true);
    }

    if (finished) {
      finishQuiz();
    }
  };

  const quizScreen = function () {
    return (
      <Container>
        <NoseBar
          questionNum={questionIndex + 1}
          questionMax={questions.length}
          isFinished={finished && health > 0}
        />
        <HealthBar health={health} />
        {finished ? <LevelCard /> : <MiniLevelCard hideText />}
        {finished ? endScreen() : isSubmitted ? questionEnd() : questionBody()}
      </Container>
    );
  };

  const finishQuiz = () => {
    if (session) {
      var formData = new FormData();
      formData.append("user", session.user.id);
      formData.append("quiz", quiz.link);

      fetch(process.env.NEXTAUTH_URL + "/quizzes/" + quiz.link, {
        method: "POST",
        body: data,
      });
    }

    cookieCutter.set(quiz.link, "complete");
    router.push("/play/world");
  };

  const endScreen = () => {
    return (
      <>
        <FairyQuiz isCorrect={health > 0} />
        <ExitButton>
          <Image src="/images/exit.svg" alt="exit" width={150} height={150} />
        </ExitButton>
        {health > 0 ? (
          <SkipButton onClick={handleNextButton}>
            <Image src="/images/next.svg" alt="next" width={150} height={150} />
          </SkipButton>
        ) : (
          <SkipButton>
            <Image
              src="/images/restart.svg"
              alt="restart"
              width={440}
              height={89}
            />
          </SkipButton>
        )}
      </>
    );
  };

  return <div>{quizStarted == false ? loadingScreen() : quizScreen()}</div>;
}

export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:8081/api/quizzes/2622dddd5a7838aa21c7b208bea4614bee5957bd9cd97841c170736e7d2222c6"
  );
  const results = await res.json();

  return {
    props: {
      quiz: results.quiz,
      questions: results.questions,
    },
  };
}
