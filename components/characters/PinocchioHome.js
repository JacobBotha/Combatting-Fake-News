import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

const PinocchioHomeContainer = styled.div`
  position: absolute;
  width: 96%;
  top: 4%;
  left: 4%;
`

const PinocchioHome = () => {
  return (
    <>
      <PinocchioHomeContainer>
      <Image src="/images/game-icon.svg" width={2000} height={730} />
      </PinocchioHomeContainer>
    </>
  );
};

export default PinocchioHome;
