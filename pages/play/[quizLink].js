import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";
import cookieCutter from "cookie-cutter";
import ReactAudioPlayer from "react-audio-player";

import styled from "styled-components";
import styles from "../../styles/Quiz.module.css";

import HealthBar from "../../components/HealthBar";
import Question from "../../components/Question";
import NoseBar from "../../components/NoseBar";
import CountDown from "../../components/count_down";
import LevelCard from "../../components/LevelCard";
import FairyQuiz from "../../components/characters/FairyQuiz";
import FairyQuestion from "../../components/characters/FairyQuestion";
import Answers from "../../components/button/AnswerButton";
import Modal from "../../components/Modal";

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
  cursor: pointer;
`;

const SkipButton = styled.div`
  position: absolute;
  width: 6.9%;
  bottom: 4%;
  right: 4.5%;
  cursor: pointer;
`;

const Hint = styled.div`
  position: absolute;
  bottom: 35%;
  right: 4.5%;
  cursor: pointer;
`

export default function Quiz({ quiz, questions, level }) {
  //currentAnswer is the key of the answer button
  const [currentAnswer, setCurrentAnswer] = useState(-1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [health, setHealth] = useState(3);
  const [quizStarted, setQuizStarted] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [failed, setFailed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const endSound = useRef(null);

  const router = useRouter();

  //The headline of the current question
  const headline = questions[questionIndex].headline;

  //The headline of the current question
  const body = questions[questionIndex].body;

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

  const handleNextButton = () => {
    if (finished) {
      finishQuiz();
      return;
    }

    if (isSubmitted) {
      nextQuestion();
      setIsSubmitted(false);
      setCurrentAnswer(-1);
    } else {
      if (!isCorrect) {
        if (health - 1 <= 0) {
          setHealth(0);
          setFailed(true);
          // setFinished(true);
        }
        setHealth(health - 1);
      }
      setIsSubmitted(true);
    }
  };

  const startQuiz = function () {
    setQuizStarted(true);
  };

  const resetQuiz = function () {
        setCurrentAnswer(-1);
        setIsCorrect(false);
        setQuestionIndex(0);
        setHealth(3);
        setIsAnswered(false);
        setQuizStarted(false);
        setIsSubmitted(false);
        setFailed(false);
        setFinished(false);
      }; 

  const loadingScreen = function () {
    return (
      <div className={styles.countdown}>
        <CountDown countDownDone={startQuiz} seconds={3} finished="GO!" />
      </div>
    );
  };

  const questionCard = (selected) => {
    return (
      <>
        <Question num={questionIndex + 1}>
          <h3>{headline}</h3>
          <p>{body} </p>
        </Question>
        <Answers
          question={questions[questionIndex]}
          answerQuestion={answerQuestion}
          isSelected={selected}
          isSubmitted={isSubmitted}
        />
      </>
    );
  };

  const questionBody = () => {
    return (
      <>
        {questionCard(currentAnswer)}
        <ExitButton>
          <Link href={"/play/world"} passHref>
            <Image src="/images/exit.svg" alt="exit" width={150} height={150} />
          </Link>
        </ExitButton>
        {!(currentAnswer == -1) && (
          <SkipButton onClick={handleNextButton}>
            <Image src="/images/next.svg" alt="next" width={150} height={150} />
          </SkipButton>
        )}
        <Hint onClick={() => setShowHint(true)}>
          <Image src={showHint ? "/images/hint-open.svg" : "/images/hint-close.svg"} width="150" height="150"></Image>
        </Hint>
      </>
    );
  };

  const questionEnd = () => {
    return (
      <>
        <ReactAudioPlayer
          src={isCorrect ? "/sounds/right.wav" : "/sounds/wrong.wav"}
          onCanPlay={(e) => playSound(e)}
        />
        <FairyQuestion isCorrect={isCorrect} />
        <ShiftedQuizContent>{questionCard(currentAnswer)}</ShiftedQuizContent>
        <SkipButton onClick={handleNextButton}>
          <Image src="/images/next.svg" alt="next" width={150} height={150} />
        </SkipButton>
      </>
    );
  };

  // The modal that displays the hint for the questoin
  const hintModal  = <Modal closeModal={() => setShowHint(false)} size="small">
    <h1 style={{color: "#EFD55E", fontSize: "3.5em"}}>Hint!</h1>
    <p style={{color: "white", fontSize:"2em"}}>{questions[questionIndex].hint}</p>
  </Modal>

  const quizScreen = function () {
    return (
      <>
      <Container>
        <NoseBar
          questionNum={questionIndex + 1}
          questionMax={questions.length}
          isFinished={finished && health > 0}
        />
        <HealthBar health={health} />
        {finished ? (
          <LevelCard level={level} />
        ) : (
          <MiniLevelCard level={level} hideText />
        )}
        {finished ? endScreen() : isSubmitted ? questionEnd() : questionBody()}
      </Container>
      </>
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

  const playSound = (element) => {
    if (window.localStorage.getItem("muted") !== "true") {
      element.target.play();
    }
  };

  const endScreen = () => {
    return (
      <>
        <ReactAudioPlayer
          src={health > 0 ? "/sounds/victory.mp3" : "/sounds/lose.wav"}
          onCanPlay={(e) => playSound(e)}
        />
        <FairyQuiz isCorrect={health > 0} />
        <ExitButton>
          <Link href={"/play/world"} passHref>
            <Image src="/images/exit.svg" alt="exit" width={150} height={150} />
          </Link>
        </ExitButton>
        {health > 0 ? (
          <SkipButton onClick={handleNextButton}>
            <Image src="/images/next.svg" alt="next" width={150} height={150} />
          </SkipButton>
        ) : (
            <SkipButton onClick={resetQuiz}>
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

  return (
    <div>
      {showHint ? hintModal : null}
      {quizStarted == false ? loadingScreen() : quizScreen()}
    </div>);
}

export async function getServerSideProps(context) {
  const { quizLink } = context.query;
  // const res = await fetch("http://localhost:8081/api/quizzes/2622dddd5a7838aa21c7b208bea4614bee5957bd9cd97841c170736e7d2222c6");

  const res = await fetch(`http://localhost:8081/api/quizzes/${quizLink}`);
  if ((await res.status) === 404) {
    return {
      redirect: {
        permanent: false,
        destination: "/quiz-not-found",
      },
      props: {},
    };
  }

  const results = await res.json();

  // Get all level data
  const levelRes = await fetch("http://localhost:8081/api/quizzes");
  const levels = await levelRes.json();
  
  var levelData;
  // Get level data for this link
  for (var i = 0; i < levels.length; i++) {
    if (levels[i].link == quizLink) {
      levelData = levels[i];
      break;
    }
  }

  return {
    props: {
      quiz: results.quiz,
      questions: results.questions,
      level: levelData,
    },
  };
}
