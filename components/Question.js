import styled from "styled-components";
require("typeface-baloo-tamma");

const QuestionBox = styled.div`
  position: absolute;
  width: 41%; //588
  height: 47.5%; //486
  top: 22.5%;
  left: 31.5%;
  background: #89d0c2;
  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: normal;
  color: #000000;
  box-shadow: 4px #00000099;
  border-radius: 3.4%/4.1%;
`;

const ContentBox = styled.div`
  position: absolute;
  width: 100%;
  height: 76.7%;
  top: 17.9%;
  left: -9.5%;
  padding: 2%;
  background: #ffffff;
  font-family: arial;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
  box-shadow: 5px 5px 4px #00000099;
  border-radius: 3.4%/5.35%;
`;

const QuestionTriangle = styled.div`
  position: absolute;
  width: 8.45%;
  height: 13.13%;
  top: -11.5%;
  left: 1.1%;
  background: linear-gradient(
    to top left,
    #fff 0%,
    #fff 50%,
    transparent 50%,
    transparent 100%
  );
`;

const QuestionText = styled.div`
  position: absolute;
  top: 2.3%;
  left: 19.5%;
  font-style: normal;
  font-weight: normal;
  font-size: max(5.2vh, 31.2px);
  line-height: max(8.6vh, 51.6px);
  color: #ffffff;
  background-color: transparent;
  &:before {
    content: "Question";
  }
`;

const QuestionNum = styled.div`
  position: absolute;
  top: 4.7%;
  left: 72.28%;
  height: 9.8%;
  width: 8.1%;
  font-style: normal;
  font-weight: normal;
  font-size: max(3.9vh, 23.4px);
  line-height: max(5.7vh, 34.2px);
  text-align: center;
  color: #ff7777;
  background-color: #ffffff;
  border-radius: 50%;
`;

const Question = ({ className, children, num }) => {
  return (
    <QuestionBox className={className}>
      <QuestionText />
      <QuestionNum>{num}</QuestionNum>
      <ContentBox>
        <QuestionTriangle />
        {children}
      </ContentBox>
    </QuestionBox>
  );
};

export default Question;
