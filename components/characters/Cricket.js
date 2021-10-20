import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

import SpeechBubble from "../speech/SpeechBubble";

const CricketContainer = styled.div`
  position: absolute;
  width: 12%;
  left: 64.44%;
  top: 46.09%;
`
const SpeechContainer = styled(SpeechBubble)`
  position: absolute;
  top: 48%;
  left: 20%;
  width: 45%;
  font-size: max(2.3vh, 13.8px);
`

const Cricket = () => {
  return (
    <>
      <CricketContainer>
        <Image src="/images/cricket.svg" width={570} height={1050} />
      </CricketContainer>
        <SpeechContainer type="left" color="#8EB2E7">
          Do you want to know if you are a master at identifying fake news?
        </SpeechContainer>
    </>
  );
};

export default Cricket;
