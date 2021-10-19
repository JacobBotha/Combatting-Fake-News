import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");
import Link from "next/link";

const SignPostContainer = styled.div`
  position: absolute;
  bottom: 2%;
  right: 2%;
  width: 23%;
  height: 32%;
  color: #ffffcc;
  &:hover {
    color: #89d0c2;
  }
`;

const EnterText = styled.div`
  position: absolute;
  top: 4%;
  left: 5.5%;

  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: normal;
  font-size: max(9vh, 54px);
  text-align: right;
  justify-content: bottom;

  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transform: rotate(-4.14deg);
`;

const SignPost = () => {
  return (
    <>
     <Link href={"/play/story"}>
      <SignPostContainer>
        <Image src="/images/signpost.svg" width={662} height={686} />
        <EnterText> ENTER </EnterText>
      </SignPostContainer>
      </Link>
    </>
  );
};

export default SignPost;
