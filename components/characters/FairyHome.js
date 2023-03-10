import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

import SpeechBubble from "../speech/SpeechBubble";

const FairyHomeContainer = styled.div`
  position: absolute;
  width: 19%;
  left: 3%;
  bottom: 0%;
  transform: scaleX(-1);
`;
const SpeechContainer = styled(SpeechBubble)`
  position: absolute;
  top: 64%;
  left: 20%;
  width: 45%;
  font-size: max(2.3vh, 13.8px);
`;

const FairyHome = () => {
  return (
    <>
      <FairyHomeContainer>
        <Image src="/images/fairy2.svg" alt="pinnochio" width={454} height={760} />
      </FairyHomeContainer>
      <SpeechContainer type="right">
          Acquire your superpower by helping Pinocchio in this adventure!
      </SpeechContainer>
    </>
  );
};

export default FairyHome;
