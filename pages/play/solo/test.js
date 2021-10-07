import SpeechBubble from "../../../components/speech/SpeechBubble";
import styled from "styled-components";
import Image from "next/image";

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

const PageElement = styled.div`
  flex: 1;
`;

const Title = styled(Image)`
`;

export default function SoloHard() {
  return (
    <PageContent>
      <Title src="/pinocchio-logo.png" alt="logo" width={1438} height={525} />
      <PageContentBottom>
      <Image src="/fairy.png" alt="logo" width={265} height={380} />
      
        <div>
          <SpeechBubble type="left">
            Do you want to know if you are a master at identifying facke news?
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
    </PageContent>
  );
}
