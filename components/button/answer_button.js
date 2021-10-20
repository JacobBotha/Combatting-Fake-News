import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

const AnswerBox = styled.div`
  position: absolute;
  width: 42%; //600
  height: 12.5%; //130
  top: 72.56%;
  left: 29.2%;

  font-family: Baloo Tamma;
  font-size: max(2vh, 12px);
  text-align: center;
  line-height: max(2vh, 12px);
  font-style: normal;
  font-weight: normal;
  color: #ffffff;
`;

const AnswerBoxTF = styled.div`
  position: absolute;
  width: 37.5%; //540
  height: 9.225%; //111
  top: 72.56%;
  left: 31.25%;
  color: #ffffff;
`;

const Container = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

const CorrectButton = styled.div`
  width: 27.5%;
`;

const WrongButton = styled.div`
  width: 21.5%;
`;

const AnswerCircle = styled.div`
  width: 21.33%; //128
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;

  align-items: center;
`;

const AnswerText = styled.div`
  width: 100%;
  padding: 10%;
  vertical-align: bottom;
`;

const colors = ["#EFD55E", "#FF7777", "#89D0C2", "#B7AACB"];

const Answers = ({ className, type, answerQuestion, question }) => {
  if (question.questionType == "True or False") {
    return (
      <AnswerBoxTF className={className}>
        <Container>
          <CorrectButton
            onClick={() =>
              answerQuestion(question.answers[0].answer == true, 0)
            }
          >
            <Image src="/images/correct-button.png" alt="correct" width={294} height={222} />
          </CorrectButton>
          <WrongButton
            onClick={() =>
              answerQuestion(question.answers[0].answer == false, 1)
            }
          >
            <Image src="/images/wrong-button.png" alt="wrong" width={232} height={222} />
          </WrongButton>
        </Container>
      </AnswerBoxTF>
    );
  } else if (question.questionType == "Multiple Choice") {
    return (
      <AnswerBox className={className}>
        <Container>
          {question.answers.map((answer, index) => (
            <AnswerCircle key={index} onClick={() => answerQuestion(answer.answer, index)} color={colors[index]}>
              <AnswerText>{answer.statement}</AnswerText>
            </AnswerCircle>
          ))}
        </Container>
      </AnswerBox>
    );
  } else {
    return <AnswerCircle>ERROR</AnswerCircle>;
  }
};

export default Answers;
