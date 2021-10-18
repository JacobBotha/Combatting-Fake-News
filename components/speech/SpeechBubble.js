import styled from "styled-components";
require('typeface-baloo-tamma')

const SpeechBubbleContainerV = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const SpeechBubbleContainerH = styled.div`
  display: flex;
  align-items: center;
`;

const SpeechBox = styled.div`
  flex: 1;
  margin: 0 0;
  padding: 10px;
  background: ${props => (props.alt ? "#9dcae6" : "#8EB2E7") };
  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 38px;
  color: #FFFFFF;
  border-radius: 10px;
`;

const SpeechArrowLeft = styled.div`
  border-top: 10px solid transparent;
  border-right: 20px solid ${props => (props.alt ? "#9dcae6" : "#8EB2E7") };
  border-bottom: 10px solid transparent;
`;

const SpeechArrowRight = styled.div`
  border-top: 10px solid transparent;
  border-left: 20px solid ${props => (props.alt ? "#9dcae6" : "#8EB2E7") };
  border-bottom: 10px solid transparent;
`;

const SpeechArrowBottomL = styled.div`
  align-self: flex-start;
  margin-left: 10px;
  border-left: 10px solid transparent;
  border-top: 20px solid ${props => (props.alt ? "#9dcae6" : "#8EB2E7") };
  border-right: 10px solid transparent;
`;

const SpeechArrowBottomR = styled.div`
  align-self: flex-end;
  margin-right: 10px;
  border-left: 10px solid transparent;
  border-top: 20px solid ${props => (props.alt ? "#9dcae6" : "#8EB2E7") };
  border-right: 10px solid transparent;
`;

const SpeechBubble = ({ alt, type, children }) => {
  if (type == "right") {
    return (
      <SpeechBubbleContainerH>
        <SpeechArrowLeft alt={alt}/>
        <SpeechBox alt={alt}>{children}</SpeechBox>
      </SpeechBubbleContainerH>
    );
  } else if (type == "left") {
    return (
      <SpeechBubbleContainerH>
        <SpeechBox alt={alt}>{children}</SpeechBox>
        <SpeechArrowRight alt={alt}/>
      </SpeechBubbleContainerH>
    );
  } else if (type == "bottomleft") {
    return (
      <SpeechBubbleContainerV>
        <SpeechBox alt={alt}>{children}</SpeechBox>
        <SpeechArrowBottomL alt={alt}/>
      </SpeechBubbleContainerV>
    );
  } else {
    return (
      <SpeechBubbleContainerV>
        <SpeechBox alt={alt}>{children}</SpeechBox>
        <SpeechArrowBottomR alt={alt}/>
      </SpeechBubbleContainerV>
    );
  }
};

export default SpeechBubble;
