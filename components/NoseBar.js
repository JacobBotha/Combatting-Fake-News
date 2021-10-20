import styled from "styled-components";
import Image from "next/image";
require('typeface-baloo-tamma')

const ContainerH = styled.div`
  position: absolute;
  width: 9%;
  height: 5%;
  top: 3%;
  left: 4.5%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  font-family: Baloo Tamma;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: 62px;
  letter-spacing: 0em;
`;

const BaseContainer = styled.div`
  position: absolute;
`;

const NoseContainer = styled.div`
  position: relative;
  top: -40px;
  left: 60px;
  min-width: 150px;
`;

const TextContainer = styled.div`
  position: relative;
  top: 20px;
  font-family: Baloo Tamma;
  color: #FFFFFF;
`;

const Numerator = styled.span`
  color: #F6F605;
`;

const NoseImage = styled(Image)`

`

const NoseBar = ({ questionNum, questionMax }) => {

    //todo: Add nose image proportional to questions left
    return (
        <ContainerH>
            <BaseContainer>
                <Image src="/images/pinocchio-base.svg" alt="base" width={128} height={89} />
            </BaseContainer>
            <NoseContainer>
               </NoseContainer>
            <TextContainer>
                <Numerator>{questionNum}</Numerator>/{questionMax}
            </TextContainer>
        </ContainerH>
    );
};

export default NoseBar;