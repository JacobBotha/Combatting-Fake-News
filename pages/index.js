import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";
import SpeechBubble from "../components/speech/SpeechBubble";

const EnterText = styled.span`
  position: absolute;
  top: 8%;
  left: 7%;
  width: 23%;
  height: 32%;

  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: normal;
  font-size: 75px;
  line-height: 129px;
  text-align: right;

  color: #FFFFCC;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: rotate(-4.14deg);
`

const Container = styled.div`
position: relative;
  width: 140vh;
  min-width: 840px;
  min-height: 600px;
  height: 100vh;
  margin: auto;

`
const Logo = styled.div`
  position: absolute;
  width: 96%;
  top: 4%;
  left: 4%;
`
const Cricket = styled.div`
  position: absolute;
  width: 12%;
  left: 64.44%;
  top: 46.09%;
`
const Fairy = styled.div`
  position: absolute;
  width: 19%;
  left: 3%;
  bottom: 0%;
`
const SignPost = styled.div`
  position: absolute;
  bottom: 2%;
  right: 2%;
  width: 23%;
  height: 32%;
`

const CricketSpeech = styled.div`
  position: absolute;
  top: 48%;
  left: 20%;
  width: 45%;

`

const FairySpeech = styled.div`
  position: absolute;
  top: 64%;
  left: 20%;
  width: 45%;
`

export default function Home() {

  const title = function () {
    return (
        <Container>
          <Logo>
            <Image src="/images/pinocchio-logo.svg" width={2000} height={730} />
          </Logo>
          <Cricket>
            <Image src="/images/cricket.svg" width={570} height={1050} />
          </Cricket>
          <CricketSpeech>
            <SpeechBubble type="left">
              Do you want to know if you are a master at identifying fake news?
            </SpeechBubble>
          </CricketSpeech>
          <Fairy>
            <Image src="/images/fairy2.svg" width={454} height={760} />
          </Fairy>
          <FairySpeech>
            <SpeechBubble alt type="right">
              Acquire your superpower by helping Pinocchio in this adventure!
            </SpeechBubble>
          </FairySpeech>
          <SignPost>
            <Image src="/images/signpost.svg" width={662} height={686}/>
            <EnterText>
            ENTER
            </EnterText>
          </SignPost>
        </Container>
    );
  }

  return (
    <div>
      {title()}
    </div>
  );
}