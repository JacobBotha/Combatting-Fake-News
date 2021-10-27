import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import ReactAudioPlayer from "react-audio-player";

import FairyStory from "../../components/characters/FairyStory";
import PinocchioStory from "../../components/characters/PinocchioStory";
import SpeechBubble from "../../components/speech/SpeechBubble";

const Container = styled.div`
  position: relative;
  width: 140vh;
  min-width: 840px;
  min-height: 600px;
  height: 100vh;
  margin: auto;
`;

const LeftButton = styled.div`
  position: absolute;
  width: 14%;
  bottom: 3%;
  left: 1%;
  
  cursor: pointer;
`;

const RightButton = styled.div`
  position: absolute;
  width: 14%;
  bottom: 3%;
  right: 1%;
  cursor: pointer;
`;

const CenterButton = styled.div`
  position: absolute;
  width: 14%;
  bottom: 3%;
  left: 43%;
  cursor: pointer;
`;

const JailContainer = styled.div`
  position: absolute;
  width: 84%;
  top: 7%;
  left: 6.5%;
`;

const JailSpeechContainer = styled(SpeechBubble)`
  position: absolute;
  width: 24%;
  left: 69.31%;
  top: 15.82%;
  text-align: center;
  font-size: max(2.3vh, 13.8px);
`;

const FakeNewsText = styled.div`
  position: absolute;
  width: 100%;
  top: 60.25%;
  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: normal;
  font-size: max(14vh, 84px);
  text-align: center;
  color: #000000;
`;

const FakeNewsTextShadow = styled(FakeNewsText)`
  top: 61.62%;
  color: #b3b3b3;
  font-size: max(14vh, 84px);
`;

export default function Story() {
  const [sceneNum, setSceneNum] = useState(0);
  const enterSound = useRef(null)
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    if (enterSound !== null && window.localStorage.getItem("muted") !== "true") {
      enterSound.current.audioEl.current.play();
    }

    if (sceneNum < 5) {
      setSceneNum(sceneNum + 1);
    } else {
      router.push("/play/world");
    }
  };

  const buttons = () => {
    if (sceneNum < 5) {
      return (
        <>
          <LeftButton>
            <Link href={"/play/world"} passHref>
              <Image src="/images/skip2.svg" alt="skip" width={300} height={160} />
            </Link>
          </LeftButton>
          <RightButton>
            <Image
              onClick={handleClick}
              src="/images/next.svg"
              alt="next"
              width={270}
              height={200}
            />
          </RightButton>
        </>
      );
    } else {
      return (
        <>
          <CenterButton>
          <Image
              onClick={handleClick}
              src="/images/next.svg"
              alt="next"
              width={270}
              height={200}
            />
          </CenterButton>
        </>
      );
    }
  };

  const firstScene = () => {
    return (
      <>
        <JailContainer>
          <Image src="/images/jail.svg" alt="jail" width={2410} height={1056} />
        </JailContainer>
        <JailSpeechContainer type="bottomleft">Please help us!</JailSpeechContainer>
        <FakeNewsTextShadow>Fake News</FakeNewsTextShadow>
        <FakeNewsText>Fake News</FakeNewsText>
      </>
    );
  };

  return (
    <Container>
      <ReactAudioPlayer src="/sounds/enter.wav" ref={enterSound}/>
      {sceneNum == 0 && firstScene()}
      <FairyStory sceneNum={sceneNum} />
      <PinocchioStory sceneNum={sceneNum} />
      {buttons()}
    </Container>
  );
}
