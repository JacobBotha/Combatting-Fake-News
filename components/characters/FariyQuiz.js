import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

import SpeechBubble from "../speech/SpeechBubble";

const FairyQuizRightContainer = styled.div`
  position: absolute;
  width: 19.5%;
  right: 4%;
  bottom: 5.5%;
`;

const FairyQuizWrongContainer = styled.div`
  position: absolute;
  width: 41.5%;
  right: 4%;
  bottom: 9%;
`;

const SpeechRightContainer = styled(SpeechBubble)`
  position: absolute;
  top: 44%;
  left: 27.5%;
  width: 30%;
  font-size: max(1.7vh, 10.2px);
`;

const SpeechWrongContainer = styled(SpeechBubble)`
  position: absolute;
  top: 26%;
  left: 22.5%;
  width: 38%;
  font-size: max(3vh, 18px);
`;

const FairyQuiz = ({ isCorrect }) => {
  if (isCorrect) {
    return (
      <>
        <FairyQuizRightContainer>
          <Image src="/images/fairy3.svg" width={948} height={1746} />
        </FairyQuizRightContainer>
        <SpeechRightContainer type="right">Congratulations!
        You have successfully unlocked this level! </SpeechRightContainer>
      </>
    );
  } else {
    return (
      <>
        <FairyQuizWrongContainer>
          <Image src="/images/fairy4.svg" width={1194} height={1634} />
        </FairyQuizWrongContainer>
        <SpeechWrongContainer type="right">Sorry! You failed!</SpeechWrongContainer>
      </>
    );
  }
};

export default FairyQuiz;
