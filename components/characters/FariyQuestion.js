import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

import SpeechBubble from "../speech/SpeechBubble";

const FairyQuestionContainer = styled.div`
  position: absolute;
  width: 19.5%;
  right: 4%;
  bottom: 5.5%;
`;

const FairyQuestionContainerFlipped = styled(FairyQuestionContainer)`
  transform: scaleX(-1);
`;
const SpeechContainer = styled(SpeechBubble)`
  position: absolute;
  top: 44%;
  left: 54%;
  width: 21.5%;
  font-size: max(1.9vh, 12.6px);
  text-align: center;
`;

const FairyQuestion = ({ isCorrect }) => {
  if (isCorrect) {
    return (
      <>
        <FairyQuestionContainerFlipped>
          <Image src="/images/fairy1.svg" alt="fairy" width={280} height={540} />
        </FairyQuestionContainerFlipped>
        <SpeechContainer type="left">Awesome! You are right!</SpeechContainer>
      </>
    );
  } else {
    return (
      <>
        <FairyQuestionContainer>
          <Image src="/images/fairy4.svg" alt="fairy" width={280} height={540} />
        </FairyQuestionContainer>
        <SpeechContainer type="left">Opps! You missed the answer!</SpeechContainer>
      </>
    );
  }
};

export default FairyQuestion;
