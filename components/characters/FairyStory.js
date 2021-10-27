import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

import SpeechBubble from "../speech/SpeechBubble";

const FairyStoryContainer = styled.div`
  position: absolute;
  width: 26%;
  bottom: 6.5%;
  right: 2.5%;
  transform: scaleX(-1);
`;

const FairyStoryFinalContainer = styled.div`
  position: absolute;
  width: 36%;
  top: 13%;
  left: 7.5%;
`;

const SpeechContainer = styled(SpeechBubble)`
  position: absolute;
  top: 13.5%;
  left: 33%;
  width: 41%;
  font-size: max(2.3vh, 13.8px);
  text-align: center;
`;

const SpeechFinalContainer = styled(SpeechContainer)`
  top: 12%;
  left: 44%;
  width: 36%;
`;

/**
 * Depending on the current scene id, display the fairy character with 
 * the appropriate speech for that scene.
 * 
 * @param {int} sceneNum - The id of the current scene
 */
const FairyStory = ({ sceneNum }) => {
  switch (sceneNum) {
    case 1:
    // Fallthrough
    case 3:
      return (
        <>
          <FairyStoryContainer>
            <Image src="/images/fairy1.svg" alt="fairy" width={378} height={737} />
          </FairyStoryContainer>
        </>
      );
    case 2:
      return (
        <>
          <FairyStoryContainer>
            <Image src="/images/fairy1.svg" alt="fairy" width={378} height={737} />
          </FairyStoryContainer>
          <SpeechContainer type="bottomright">
            Sure, to save your friends and return to a real boy you need to unlock 8 skills as the
            key to save them.
          </SpeechContainer>
        </>
      );
    case 4:
      return (
        <>
          <FairyStoryContainer>
            <Image src="/images/fairy1.svg" alt="fairy" width={378} height={737} />
          </FairyStoryContainer>
          <SpeechContainer type="bottomright">
            Only once you've unlocked all skills can your friends go back to the fairy tale.
          </SpeechContainer>
        </>
      );
    case 5:
      return (
        <>
          <FairyStoryFinalContainer>
            <Image src="/images/fairy.svg" alt="fairy" width={522} height={714} />
          </FairyStoryFinalContainer>
          <SpeechFinalContainer type="right">
            Please complete each quiz, you have 3 chances of making mistakes to
            unlock each skill.
          </SpeechFinalContainer>
        </>
      );
    default:
      return <></>;
  }
};

export default FairyStory;
