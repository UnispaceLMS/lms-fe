import { useState } from "react";
import dayjs from "dayjs";
import range from "lodash.range";
import Select from "react-select";
import styled from "styled-components";
import { useRouter } from "next/router";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import ModalBackDrop from "@common/ModalBackDrop";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import {
  WHITE,
  GRAY_200,
  GRAY_300,
  GRAY_500,
  GRAY_900,
} from "@constants/colors";

const startYear = dayjs().year();
const years = range(startYear, startYear + 3, 1)?.map(year => ({
  value: year,
  label: year,
}));

const customSelectStyles = {
  container: baseStyles => ({
    ...baseStyles,
    width: "8rem",
  }),
  control: baseStyles => ({
    ...baseStyles,
    fontSize: "1rem",
    boxShadow: "none",
    minHeight: "unset",
    columnGap: "0.5rem",
    borderColor: GRAY_300,
    borderRadius: "0.5rem",
    padding: "0.5rem 0.875rem",
    "&:hover": {
      borderColor: GRAY_300,
    },
  }),
  valueContainer: baseStyles => ({
    ...baseStyles,
    padding: 0,
    justifyContent: "flex-start",
  }),
  input: baseStyles => ({
    ...baseStyles,
    margin: 0,
    padding: 0,
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: baseStyles => ({ ...baseStyles, padding: 0 }),
};

const Container = styled(FlexBox)`
  width: 47%;
  max-width: 31.5rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
`;

const TillYear = styled(FlexBox)`
  width: 8rem;
  border-radius: 0.5rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid ${GRAY_300};
`;

const Footer = styled(FlexBox)`
  align-items: center;
  column-gap: 0.75rem;
  padding: 0.75rem 1.25rem;
  justify-content: flex-end;
  border-top: 1px solid ${GRAY_200};
`;

const CreatePlanModal = () => {
  const router = useRouter();

  const [year, setYear] = useState(null);
  const [ctaDisabled, setCtaDisabled] = useState(false);

  const createAnnualPlan = async () => {
    try {
      setCtaDisabled(true);

      const id = router?.query?.id;

      if (!id || !year) return;

      router.push(`/student/${id}/annual-plan/${year}`);
    } catch (error) {
      console.log(error, "Error in creating plan");
      setCtaDisabled(false);
    }
  };

  return (
    <ModalBackDrop>
      <Container>
        <FlexBox
          column
          align="center"
          rowGap="1.25rem"
          padding="0.75rem 1.5rem"
        >
          <Text weight={600} size="1.125rem" color={GRAY_900}>
            Create Annual Plan
          </Text>

          <FlexBox align="center" width="100%" justify="space-between">
            <Text size="0.875rem" color={GRAY_500}>
              Academic Year
            </Text>

            <FlexBox align="center" colGap="0.75rem">
              <Select
                options={years}
                placeholder="Select"
                styles={customSelectStyles}
                onChange={year => setYear(year?.value)}
              />

              <Text color={GRAY_500}>-</Text>

              <TillYear>
                <Text color={GRAY_500}>{!year ? "‎" : year + 1}</Text>
              </TillYear>
            </FlexBox>
          </FlexBox>
        </FlexBox>

        <Footer>
          <SecondaryButton disabled={ctaDisabled}>Cancel</SecondaryButton>
          <PrimaryButton disabled={ctaDisabled} onClick={createAnnualPlan}>
            Create
          </PrimaryButton>
        </Footer>
      </Container>
    </ModalBackDrop>
  );
};

export default CreatePlanModal;
