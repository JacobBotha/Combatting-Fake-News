import styled from "styled-components";
import Image from "next/image"
require('typeface-baloo-tamma')

const OuterBox = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  min-height: 270px;
  min-width: 200px;
  font-size:   ${(props) => props.textSize};
  border-radius: 30px; 
  background: #FFFFFF;
  overflow:hidden;
`;

const InnerBox = styled.div`
  position: relative;
  width: calc(100% - 30px);
  height: calc(100% - 30px);
  border-radius: 30px;
  margin: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  padding-top: 5%;
  align-items: center;
  background: #89D0C2;
  color: #FFFFFF;
  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: center;
`;

const LevelText = styled.div`
  line-height: 1.6em;
  font-size: 1em;
  margin-top: 7.5%;
`;

const HorizontalLine = styled.div`
  width: 85%;
  height: 0px;
  border: 1px solid #FFFFFF;
  margin: auto;
`

const TopTextArea = styled.div`
  line-height: 1.5em;
  font-size: 0.66em;
  margin-top: 2.5%;
`;

const BottomTextArea = styled.div`
  line-height: 1.5em;
  font-size: 0.5em;
  margin-top: 2.5%;
`;

const ImageDiv = styled.div`
  position: absolute;
  margin-left: 20%;
  width: 60%;
  bottom: 0%;
  margin-bottom: 12.5%;
`
const topText = ["Consider the source",
    "Read beyond the headline",
    "Check the authors",
    "Access the supporting sources",
    "Check the date of publication",
    "Ask if it is a joke",
    "Review your own biases",
    "Ask experts"];

const bottomText = ["(to understand its mission and purpose)",
    "(to understand the whole story)",
    "(to see if they are real and credible",
    "(to ensure they support the claims)",
    "(to see if the story is relevent and up to date)",
    "(to deteremine if it is meant to be satire)",
    "(to see if they are affecting your judgment)",
    "(to get confirmation from independent people with knowledge)"];
    

const LevelCard = ({ level, width, height }) => {
    var textSize = "30px"

    if (parseInt(width, 0) < 300 ) {
      textSize = "22px"
    }

    return (
        <div>
            <OuterBox textSize={textSize} width={width} height={height}>
                <InnerBox>
                    <LevelText>Level {level ? level : 1}</LevelText>
                    <HorizontalLine />
                    <TopTextArea>
                        {topText[level ? level - 1: 0]}
                    </TopTextArea>
                    <BottomTextArea>
                        {bottomText[level ? level - 1: 0]}
                    </BottomTextArea>
                    <ImageDiv>
                        <Image src={"/images/Level" + (level ? level : 1) + ".svg"} layout="responsive" width={175} height={175} />
                    </ImageDiv>
                </InnerBox>
            </OuterBox>
        </div>
    );
};

export default LevelCard;
