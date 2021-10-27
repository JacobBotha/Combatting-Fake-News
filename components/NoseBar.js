import styled from "styled-components";
import Image from "next/image";
require('typeface-baloo-tamma')

const HeadContainer = styled.div`
  position: absolute;
  top: 3%;
  left: 4.75%;
  width: 9%;
`;

const HeadFinishContainer = styled.div`
  position: absolute;
  top: 3%;
  left: 4.75%;
  width: 6.6%;
  transform: scaleX(-1);
`;

const NoseContainer = styled.div`
  position: absolute;
  left: 9%;
  top: calc(9.3% - 16px);
  width: ${(props) => props.ratio * 60 + "%"};
`;

const TextContainer = styled.div`
  position: absolute;
  top: 6.5%;
  left: ${(props) => props.ratio * 60 + 9.5 + "%"};
  width: 10%;
  font-family: Baloo Tamma;
  font-size: max(5vh, 30px);
  font-style: normal;
  font-weight: 400;
  line-height:  max(7vh, 42px);;
  letter-spacing: 0em;
  color: #FFFFFF;
`;

const Numerator = styled.span`
  color: #F6F605;
`;

/**
 * Constructs a component that indicates how many questions are left with a 
 * numerical value as well as the length of pinocchio's nose.
 * 
 * @param {int} questionNum - The current question number.
 * @param {int} questionMax - The maximum number of questions in the current 
 * quiz.
 * @param {boolean} isFinished - Whether the quiz has been completed, to 
 * show the finished state.
 */
const NoseBar = ({ questionNum, questionMax, isFinished }) => {

  const questionsLeft = (questionMax - questionNum + 1);

  if (isFinished) {
    return (
      <>
        <HeadFinishContainer>
          <Image src="/images/pinocchio2.svg" alt="pinnochcio" width={144} height={145} />
        </HeadFinishContainer>
        <TextContainer ratio={0.05}>
          <Numerator>{questionMax}</Numerator>
        </TextContainer>
      </>
    )
  } else {
    return (
      <>
        <HeadContainer>
          <Image src="/images/pinocchio-base.svg" alt="pinnochcio-head" width={128} height={89} />
        </HeadContainer>
        <NoseContainer ratio={questionsLeft / questionMax}>
          <Image src="/images/nose.png" alt="pinnochcio-nose" width={842 * questionsLeft / questionMax} height={8} />
        </NoseContainer>
        <TextContainer ratio={questionsLeft / questionMax}>
          <Numerator>{questionsLeft}</Numerator>/{questionMax}
        </TextContainer>
      </>
    );
  }
};

export default NoseBar;