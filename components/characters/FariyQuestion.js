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
const SpeechContainer = styled(SpeechBubble)`
  position: absolute;
  top: 44%;
  left: 54%;
  width: 21.5%;
  font-size: max(2.3vh, 13.8px);
`;

const FairyQuestion = ({ isCorrect }) => {
  if (isCorrect) {
    return (
      <>
        <FairyQuestionContainer>
          <Image src="/images/fairy3.svg" width={280} height={540} />
        </FairyQuestionContainer>
        <SpeechContainer type="right">Awesome! You are right!</SpeechContainer>
      </>
    );
  } else {
    return (
      <>
        <FairyQuestionContainer>
          <Image src="/images/fairy4.svg" width={280} height={540} />
        </FairyQuestionContainer>
        <SpeechContainer type="right">Opps! You missed the answer!</SpeechContainer>
      </>
    );
  }
};

export default FairyQuestion;
