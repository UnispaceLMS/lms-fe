import Image from "next/image";
import styled from "styled-components";

import Text from "./Text";
import FlexBox from "./FlexBox";

const Wrapper = styled(FlexBox)`
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  align-items: center;
  justify-content: center;

  ${Text} {
    position: absolute;
    letter-spacing: 0.07em;
  }
`;

const NameInitials = ({ name = "", fontSize = "0.5rem" }) => {
  const split = name?.trim()?.split(" ");

  const getInitial = word => {
    try {
      return word?.[0]?.toUpperCase();
    } catch (err) {
      console.log(err);
      return "";
    }
  };

  return (
    <Wrapper>
      <Image
        fill
        draggable="false"
        alt="Profile Gradient"
        src="/assets/images/blue-gradient.svg"
      />
      <Text bold size={fontSize}>
        {split?.map(word => getInitial(word))?.join("")}
      </Text>
    </Wrapper>
  );
};

export default NameInitials;
