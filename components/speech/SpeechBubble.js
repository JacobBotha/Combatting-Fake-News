import styled from "styled-components";
require("typeface-baloo-tamma");

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
  background: ${(props) => (props.color ? props.color : "#9dcae6")};
  font-family: Baloo Tamma;
  font-style: normal;
  font-weight: normal;
  font-size: 1.5em; //28px
  line-height: 1.5em; //38px
  color: #ffffff;
  border-radius: 10px;
`;

const SpeechArrowLeft = styled.div`
  border-top: 10px solid transparent;
  border-right: 20px solid ${(props) => (props.color ? props.color : "#9dcae6")};
  border-bottom: 10px solid transparent;
`;

const SpeechArrowRight = styled.div`
  border-top: 10px solid transparent;
  border-left: 20px solid ${(props) => (props.color ? props.color : "#9dcae6")};
  border-bottom: 10px solid transparent;
`;

const SpeechArrowBottomL = styled.div`
  align-self: flex-start;
  margin-left: 10px;
  border-left: 10px solid transparent;
  border-top: 20px solid ${(props) => (props.color ? props.color : "#9dcae6")};
  border-right: 10px solid transparent;
`;

const SpeechArrowBottomR = styled.div`
  align-self: flex-end;
  margin-right: 10px;
  border-left: 10px solid transparent;
  border-top: 20px solid ${(props) => (props.color ? props.color : "#9dcae6")};
  border-right: 10px solid transparent;
`;

const SpeechBubble = ({ className, color, type, children }) => {
  if (type == "right") {
    return (
      <div className={className}>
        <SpeechBubbleContainerH>
          <SpeechArrowLeft color={color} />
          <SpeechBox color={color}>{children}</SpeechBox>
        </SpeechBubbleContainerH>
      </div>
    );
  } else if (type == "left") {
    return (
      <div className={className}>
        <SpeechBubbleContainerH>
          <SpeechBox color={color}>{children}</SpeechBox>
          <SpeechArrowRight color={color} />
        </SpeechBubbleContainerH>
      </div>
    );
  } else if (type == "bottomleft") {
    return (
      <div className={className}>
        <SpeechBubbleContainerV>
          <SpeechBox color={color}>{children}</SpeechBox>
          <SpeechArrowBottomL color={color} />
        </SpeechBubbleContainerV>
      </div>
    );
  } else {
    return (
      <div className={className}>
        <SpeechBubbleContainerV>
          <SpeechBox color={color}>{children}</SpeechBox>
          <SpeechArrowBottomR color={color} />
        </SpeechBubbleContainerV>
      </div>
    );
  }
};

export default SpeechBubble;
