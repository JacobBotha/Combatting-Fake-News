import styled from "styled-components";

const SpeechBubbleContainerV = styled.div`
  display: flex;
  justify-content: center;
  width: 600px;
  flex-direction: column;
`;

const SpeechBubbleContainerH = styled.div`
  display: flex;
  align-items: center;
  width: 600px;
`;

const SpeechBox = styled.div`
  flex: 1;
  margin: 0 0;
  background: #9dcae6;
  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: normal;
  font-size: 38px;
  line-height: 65px;
  color: #FFFFFF;
`;

const SpeechArrowLeft = styled.div`
  border-top: 10px solid transparent;
  border-right: 20px solid #9dcae6;
  border-bottom: 10px solid transparent;
`;

const SpeechArrowRight = styled.div`
  border-top: 10px solid transparent;
  border-left: 20px solid #9dcae6;
  border-bottom: 10px solid transparent;
`;

const SpeechArrowBottomL = styled.div`
  align-self: flex-start;
  margin-left: 10px;
  border-left: 10px solid transparent;
  border-top: 20px solid #9dcae6;
  border-right: 10px solid transparent;
`;

const SpeechArrowBottomR = styled.div`
  align-self: flex-end;
  margin-right: 10px;
  border-left: 10px solid transparent;
  border-top: 20px solid #9dcae6;
  border-right: 10px solid transparent;
`;

const SpeechBubble = ({ type, children }) => {
  if (type == "right") {
    return (
      <SpeechBubbleContainerH>
        <SpeechArrowLeft />
        <SpeechBox>{children}</SpeechBox>
      </SpeechBubbleContainerH>
    );
  } else if (type == "left") {
    return (
      <SpeechBubbleContainerH>
        <SpeechBox>{children}</SpeechBox>
        <SpeechArrowRight />
      </SpeechBubbleContainerH>
    );
  } else if (type == "bottomleft") {
    return (
      <SpeechBubbleContainerV>
        <SpeechBox>{children}</SpeechBox>
        <SpeechArrowBottomL />
      </SpeechBubbleContainerV>
    );
  } else {
    return (
      <SpeechBubbleContainerV>
        <SpeechBox>{children}</SpeechBox>
        <SpeechArrowBottomR />
      </SpeechBubbleContainerV>
    );
  }
};

export default SpeechBubble;
