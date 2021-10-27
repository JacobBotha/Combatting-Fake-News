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
  opacity: ${(props) => props.isSelected};
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
  cursor: pointer;
  opacity:  ${(props) => props.isSelected ? 1 : 0.4};
  &:hover {
    transform: scale(${(props) => props.isSubmitted ? 1 : 1.2});
  }
`;

const WrongButton = styled.div`
  width: 21.5%;
  cursor: pointer;
  opacity:  ${(props) => props.isSelected ? 1 : 0.4};
  &:hover {
    transform: scale(${(props) => props.isSubmitted ? 1 : 1.2});
  }
`;

const AnswerCircle = styled.div`
  width: 21.33%; //128
  background-color: ${(props) => props.color};
  border-radius: 50%;
  display: flex;
  align-items: center;
  cursor: pointer;
  opacity:  ${(props) => props.isSelected ? 1 : 0.4};
  &:hover {
    transform: scale(${(props) => props.isSubmitted ? 1 : 1.2});
  }
`;

const AnswerText = styled.div`
  width: 100%;
  padding: 10%;
  vertical-align: bottom;
`;

const colors = ["#EFD55E", "#FF7777", "#F9C2A3", "#B7AACB"];

/**
 * Constructs a series of buttons to be displayed for a corresponding question. 
 * Questions can either be true/false or multiple choice.
 * The questiontype and answer data are passed through the question prop and
 * depending on the type of question either true/false buttons are returned
 * or up to a max of 4 multiple choice buttons are returned. Each button has
 * a callback function that updates the current answer when clicked.
 * 
 * @param {function name(answer, id)} answerQuestion - callback function for 
 * clicking on the button
 * @param {int} isSelected - The index of the button currently selected
 * @param {boolean} isSubmitted - Wether the current question has been submitted
 */
const Answers = ({ className, answerQuestion, question, isSelected, isSubmitted }) => {
  if (question.questionType == "True or False") {
    return (

      <AnswerBoxTF className={className}>
        <Container>
          <CorrectButton
            isSelected={isSelected == 0 || isSelected == -1}
            isSubmitted={isSubmitted}
            onClick={() =>
              answerQuestion(question.answers[0].answer == true, 0)
            }
          >
            <Image src="/images/correct-button.png" alt="correct" width={294} height={222} />
          </CorrectButton>
          <WrongButton
            isSelected={isSelected == 1 || isSelected == -1}
            isSubmitted={isSubmitted}
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
    // Up to a max of 4 multiple choice answers allowed
    return (
      <AnswerBox className={className}>
        <Container>
          {question.answers.map((answer, index) => (

            <AnswerCircle isSelected={isSelected == index || isSelected == -1} isSubmitted={isSubmitted} key={index} onClick={() => answerQuestion(answer.answer, index)} color={colors[index]}>
              <AnswerText>{answer.statement}</AnswerText>
            </AnswerCircle>
          ))}
        </Container>
      </AnswerBox>
    );
  } else {
    // Other quesion types are not defined
    return <AnswerCircle>ERROR</AnswerCircle>;
  }
};

export default Answers;
