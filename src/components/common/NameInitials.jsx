import styled from "styled-components";

import Text from "./Text";
import FlexBox from "./FlexBox";

import { PRIMARY_200, PRIMARY_500 } from "@constants/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;
  background: radial-gradient(${PRIMARY_500}, ${PRIMARY_200});

  span {
    letter-spacing: 0.07em;
  }
`;

const NameInitials = ({ name = "", fontSize = "0.5rem" }) => {
  const split = name?.trim()?.split(" ");

  const getInitial = (word = "") => {
    try {
      return word?.[0]?.toUpperCase();
    } catch (err) {
      console.log(err);
      return word;
    }
  };

  return (
    <Wrapper>
      <Text bold size={fontSize}>
        {split?.map((word) => getInitial(word))?.join("")}
      </Text>
    </Wrapper>
  );
};

export default NameInitials;
