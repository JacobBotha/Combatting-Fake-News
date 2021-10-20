import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

import SpeechBubble from "../speech/SpeechBubble";

const PinocchioStoryContainer = styled.div`
  position: absolute;
  width: 33.3%;
  top: 43%;
  left: 4%;
`;

const FlippedPinocchioStoryContainer = styled(PinocchioStoryContainer)`
  transform: scaleX(-1);
`;

const SpeechContainer = styled(SpeechBubble)`
  position: absolute;
  top: 15%;
  left: 21%;
  width: 26%;
  font-size: max(2.3vh, 13.8px);
  text-align: center;
`;

const PinocchioStory = ({sceneNum}) => {
  switch (sceneNum) {
    case 1:
      return (
        <>
          <PinocchioStoryContainer>
            <Image src="/images/pinocchio1.svg" width={480} height={332.51} />
          </PinocchioStoryContainer>
          <SpeechContainer type="bottomleft">
            Could you tell me how can I save my friends?
          </SpeechContainer>
        </>
      );
    case 2:
      return (
        <>
          <PinocchioStoryContainer>
            <Image src="/images/pinocchio1.svg" width={480} height={332.51} />
          </PinocchioStoryContainer>
        </>
      );
    case 3:
      return (
        <>
          <FlippedPinocchioStoryContainer>
            <Image src="/images/pinocchio2.svg" width={480} height={332.51} />
          </FlippedPinocchioStoryContainer>
          <SpeechContainer type="bottomleft">
            Let's start the adventure!
          </SpeechContainer>
        </>
      );
    case 4:
      return (
        <>
          <FlippedPinocchioStoryContainer>
            <Image src="/images/pinocchio2.svg" width={480} height={332.51} />
          </FlippedPinocchioStoryContainer>
        </>
      );
    default:
      return <></>;
  }
};

export default PinocchioStory;
