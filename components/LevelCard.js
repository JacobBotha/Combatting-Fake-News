import styled from "styled-components";
import Image from "next/image";
require("typeface-baloo-tamma");

const OuterBox = styled.div`
  position: absolute;
  width: 23%;
  height: 44%;
  top: 40%;
  left: 30%;
  font-size: max(2.8vh, 12px);
  border-radius: 10%/6.1%;
  background: #ffffff;
  color: #ffffff;
  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: 400;
  text-align: center;
  overflow: hidden;
`;

const InnerBox = styled.div`
  position: absolute;
  width: 91%;
  height: 91%;
  left: 4.5%;
  top: 4.5%;
  border-radius: 10%/6.1%;
  align-items: center;
  background: #89d0c2;
`;

const LevelText = styled.div`
  position: absolute;
  top: 11%;
  width: 100%;
  font-size: 1em;
`;

const HorizontalLine = styled.div`
  position: absolute;
  top: 24%;
  width: 80%;
  left: 10%;
  height: 0px;
  border: 1px solid #ffffff;
  margin: auto;
`;

const TopTextArea = styled.div`
  position: absolute;
  top: 26%;
  width: 100%;
  line-height: 1.5em;
  font-size: 0.66em;
  margin-top: 2.5%;
`;

const BottomTextArea = styled.div`
  position: absolute;
  top: 33%;
  width: 100%;
  line-height: 1.5em;
  font-size: 0.5em;
  margin-top: 2.5%;
`;

const ImageDiv = styled.div`
  position: absolute;
  left: 21.5%;
  width: 57%;
  bottom: 11.5%;
`;
const topText = [
  "Consider the source",
  "Read beyond the headline",
  "Check the authors",
  "Access the supporting sources",
  "Check the date of publication",
  "Ask if it is a joke",
  "Review your own biases",
  "Ask experts",
];

const bottomText = [
  "(to understand its mission and purpose)",
  "(to understand the whole story)",
  "(to see if they are real and credible",
  "(to ensure they support the claims)",
  "(to see if the story is relevent and up to date)",
  "(to deteremine if it is meant to be satire)",
  "(to see if they are affecting your judgment)",
  "(to get confirmation from independent people with knowledge)",
];

const LevelCard = ({ className, level, hideText }) => {
  return (
    <div>
      <OuterBox className={className}>
        <InnerBox>
          <LevelText>Level {level ? level : 1}</LevelText>
          <HorizontalLine />
          <TopTextArea>{topText[level ? level - 1 : 0]}</TopTextArea>
          {!hideText && (
            <BottomTextArea>{bottomText[level ? level - 1 : 0]}</BottomTextArea>
          )}
          <ImageDiv>
            <Image
              src={"/images/Level" + (level ? level : 1) + ".svg"}
              layout="responsive"
              width={350}
              height={350}
            />
          </ImageDiv>
        </InnerBox>
      </OuterBox>
    </div>
  );
};

export default LevelCard;
