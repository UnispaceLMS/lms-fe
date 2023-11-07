import { useRef, useState } from "react";
import styled from "styled-components";

import { GRAY_200, GRAY_300, GRAY_600, WHITE } from "@/constants/colors";

const Area = styled.textarea`
  width: 100%;
  resize: none;
  padding: 1rem;
  font-size: 1rem;
  color: ${GRAY_600};
  font-family: inherit;
  border-radius: 0.25rem;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
  height: ${({ height }) => `${height}px`};

  &::placeholder {
    color: ${GRAY_300};
  }
`;

const TextArea = props => {
  const areaRef = useRef(null);
  const [height, setHeight] = useState(areaRef?.current?.scrollHeight);

  return (
    <Area
      {...props}
      ref={areaRef}
      height={height}
      onChange={e => {
        props?.onChange?.(e);
        setHeight(areaRef?.current?.scrollHeight);
      }}
    />
  );
};

export default TextArea;
