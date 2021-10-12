import { Children } from "react";
import styled from "styled-components";
require('typeface-baloo-tamma')

const QuestionBox = styled.div`
  position: relative;
  width: 588px;
  height: 486px;
  margin-left: 56px;
  padding-top: 44px;
  background: #89D0C2;
  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: normal;
  font-size: 38px;
  color: #000000;
  box-shadow: 4px #00000099;
  border-radius: 20px;
`;

const ContentBox = styled.div`
  width: 588px;
  height: 373px;
  margin-left: -56px;
  padding: 25px;
  background: #FFFFFF;
  font-family: arial;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: #000000;
  box-shadow: 5px 5px 4px #00000099;
  border-radius: 20px;
`;

const QuestionTriangle = styled.div`
  width: 0;
  height: 0;
  margin-left: -50px;
  margin-bottom: -5px;
  border-style: solid;
  border-width: 0 0 50px 50px;
  border-color: transparent transparent #FFFFFF transparent;
`;

const QuestionText = styled.div`
  position: absolute;
  top: 15px;
  left: 115px;
  font-style: normal;
  font-weight: normal;
  font-size: 48px;
  color: #FFFFFF;
  background-color: transparent;
  &:before {
    content: "Question";
  }
`;

const QuestionNum = styled.div`
  position: absolute;
  top: 23px;
  right: 115px;
  height: 48px;
  width: 48px;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  text-align: center;
  color: #FF7777;
  background-color: #FFFFFF;
  border-radius: 50%;
`;

const Question = ({ children, num }) => {

  return (
    <QuestionBox>
      <QuestionText />
      <QuestionNum>
        {num}
      </QuestionNum>
      <QuestionTriangle />
      <ContentBox>
        {children}
      </ContentBox>
    </QuestionBox>
  );
}

export default Question;