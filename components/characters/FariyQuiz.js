import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

import SpeechBubble from "../speech/SpeechBubble";

const FairyQuizRightContainer = styled.div`
  position: absolute;
  width: 41.5%;
  right: 4%;
  bottom: 8.7%;
`;

const FairyQuizWrongContainer = styled.div`
  position: absolute;
  width: 32.9%;
  right: 4%;
  bottom: 9%;
`;

const SpeechRightContainer = styled(SpeechBubble)`
  position: absolute;
  top: 15.4%;
  left: 22.5%;
  width: 38%;
  font-size: max(1.7vh, 10.2px);
  text-align: center;
`;

const SpeechWrongContainer = styled(SpeechBubble)`
  position: absolute;
  top: 26%;
  left: 27.5%;
  width: 30%;
  font-size: max(3vh, 18px);
  text-align: center;
`;

const FairyQuiz = ({ isCorrect }) => {
  if (isCorrect) {
    return (
      <>
        <FairyQuizRightContainer>
          <Image src="/images/fairy2.svg" alt="fairy" width={994} height={1634} />
        </FairyQuizRightContainer>
        <SpeechRightContainer type="left" color="#F9C2A3">Congratulations! <br/>
        You have successfully unlocked this level! </SpeechRightContainer>
      </>
    );
  } else {
    return (
      <>
        <FairyQuizWrongContainer>
          <Image src="/images/fairy5.svg" alt="fairy" width={948} height={1746} />
        </FairyQuizWrongContainer>
        <SpeechWrongContainer type="left">Sorry! You failed!</SpeechWrongContainer>
      </>
    );
  }
};

export default FairyQuiz;
