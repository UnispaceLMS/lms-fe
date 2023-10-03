import { FiEye } from "react-icons/fi";
import { TbCloudUpload } from "react-icons/tb";
import styled, { css } from "styled-components";

import {
  WHITE,
  PRIMARY_300,
  PRIMARY_500,
  PRIMARY_600,
} from "@constants/colors";

export const PrimaryButton = styled.button`
  border: none;
  outline: none;
  color: ${WHITE};
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  font-size: 0.875rem;
  align-items: center;
  line-height: 1.25rem;
  padding: 0.5rem 1rem;
  display: inline-flex;
  letter-spacing: 0.1px;
  border-radius: 0.5rem;
  justify-content: center;
  background-color: ${PRIMARY_600};

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      background-color: ${PRIMARY_300};
    `}
`;

export const SecondaryButton = styled.button`
  cursor: pointer;
  width: fit-content;
  height: fit-content;
  font-size: 0.875rem;
  align-items: center;
  line-height: 1.25rem;
  display: inline-flex;
  color: ${PRIMARY_500};
  letter-spacing: 0.1px;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
  justify-content: center;
  background-color: transparent;
  border: 1px solid ${PRIMARY_500};

  ${({ gap }) =>
    gap &&
    css`
      column-gap: 0.5rem;
    `}
`;

export const UploadButton = () => (
  <SecondaryButton gap>
    <TbCloudUpload size="1rem" color={PRIMARY_500} strokeWidth={2.5} />
    Upload
  </SecondaryButton>
);

export const ViewButton = () => (
  <SecondaryButton gap>
    <FiEye size="1rem" color={PRIMARY_500} strokeWidth={2.5} />
    View
  </SecondaryButton>
);
