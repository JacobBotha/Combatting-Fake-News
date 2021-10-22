import styled from "styled-components";
import Image from "next/image";

const ContainerH = styled.div`
  position: absolute;
  width: 14.5%;
  height: 5%;
  top: 13.5%;
  left: 6.5%;
  margin: 0;
  padding: 0;
  display: flex;
`;

const HeartContainer = styled.div`
  flex: 1;
  margin-right: 5%;
`;

const HealthBar = ({ health }) => {
    return (
        <ContainerH>
            <HeartContainer>
                {health > 0 ? <Image src="/images/heart.svg" alt="heart" width={120} height={100} /> :
                    <Image src="/images/heart-grey.svg" alt="heart-grey" width={120} height={100} />}
            </HeartContainer>
            <HeartContainer>
                {health > 1 ? <Image src="/images/heart.svg" alt="heart" width={120} height={100} /> :
                    <Image src="/images/heart-grey.svg" alt="heart-grey" width={120} height={100} />}
            </HeartContainer>
            <HeartContainer>
                {health > 2 ? <Image src="/images/heart.svg" alt="heart" width={120} height={100} /> :
                    <Image src="/images/heart-grey.svg" alt="heart-grey" width={120} height={100} />}
            </HeartContainer>
        </ContainerH>
    );

};

export default HealthBar;