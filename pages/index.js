import React from "react";
import styled from "styled-components";

import Cricket from "../components/characters/Cricket";
import FairyHome from "../components/characters/FairyHome";
import PinocchioHome from "../components/characters/PinocchioHome";
import SignPost from "../components/SignPost";

const Container = styled.div`
  position: relative;
  width: 140vh;
  min-width: 840px;
  min-height: 600px;
  height: 100vh;
  margin: auto;
`;

export default function Home() {
  return (
    <Container>
      <PinocchioHome />
      <Cricket />
      <FairyHome />
      <SignPost />
    </Container>
  );
}
