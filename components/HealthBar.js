import styled from "styled-components";
import Image from "next/image";

const ContainerH = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
`;

const HeartContainer = styled.div`
  margin-right: 8px;
`;

const HealthBar = ({ health }) => {
    return (
        <ContainerH>
            <HeartContainer>
                {health > 0 ? <Image src="/images/heart.svg" alt="heart" width={60} height={50} /> :
                    <Image src="/images/heart-grey.svg" alt="heart-grey" width={60} height={50} />}
            </HeartContainer>
            <HeartContainer>
                {health > 1 ? <Image src="/images/heart.svg" alt="heart" width={60} height={50} /> :
                    <Image src="/images/heart-grey.svg" alt="heart-grey" width={60} height={50} />}
            </HeartContainer>
            <HeartContainer>
                {health > 2 ? <Image src="/images/heart.svg" alt="heart" width={60} height={50} /> :
                    <Image src="/images/heart-grey.svg" alt="heart-grey" width={60} height={50} />}
            </HeartContainer>
        </ContainerH>
    );

};

export default HealthBar;