import styled from "styled-components";
import Image from "next/image";

import Question from "../../components/Question";
import SpeechBubble from "../../components/speech/SpeechBubble";
import HealthBar from "../../components/HealthBar";
import NoseBar from "../../components/NoseBar";
import LevelCard from "../../components/LevelCard";

const PageContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const PageContentBottom = styled.div`
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
`;

export default function test() {
  return (
    <PageContent>
      <Image src="/pinocchio-logo.png" alt="logo" width={1438} height={525} />
      <PageContentBottom>
        <Image src="/fairy.png" alt="logo" width={265} height={380} />
        <div>
          <SpeechBubble type="left">
            Do you want to know if you are a master at identifying fake news?
          </SpeechBubble>
          <SpeechBubble type="right">
            Acquire your superpower by helping Pinocchio in this adventure!
          </SpeechBubble>
        </div>
        <Image src="/cricket.png" alt="logo" width={114} height={210} />

      </PageContentBottom>


      <SpeechBubble type="left">
        Do you want to know if you are a master at identifying fake news?
      </SpeechBubble>
      <SpeechBubble type="right">
        Do you want to know if you are a master at identifying fake news?
      </SpeechBubble>
      <SpeechBubble type="bottomleft">
        Do you want to know if you are a master at identifying fake news?
      </SpeechBubble>
      <SpeechBubble type="bottomright">
        Do you want to know if you are a master at identifying fake news?
      </SpeechBubble>
      <Question num ={2}>
      </Question>
      <HealthBar health={2}>
      </HealthBar>
      <NoseBar />
      <LevelCard width="336px" height="454px"/>
      <LevelCard width="236px" height="324px"/>
    </PageContent>
    
  );
}
