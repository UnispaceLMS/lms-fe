import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_100 } from "@constants/colors";
import { saveUpdateProfile } from "@redux/Slices/studentSlice";
import { transitionAssessmentEnums } from "@metadata/transitionAssessments";

const AssessmentGrid = styled.div`
  width: 60%;
  display: grid;
  max-width: 75rem;
  grid-template-columns: 1fr 0.8fr;
`;

const GridEntry = styled(FlexBox)`
  width: 100%;
  padding: 0.625rem;
  column-gap: 0.5rem;
  align-items: flex-end;

  input {
    width: 5rem;
    border: none;
    font-size: 0.75rem;
  }

  ${({ header }) =>
    header &&
    css`
      background-color: ${GRAY_100};
    `}
`;

const GridHeader = () => (
  <>
    <GridEntry header>
      <Text bold size="0.75rem">
        Goal Category
      </Text>
    </GridEntry>
    <GridEntry header>
      <Text bold size="0.75rem">
        Score
      </Text>
    </GridEntry>
  </>
);

const GridRow = ({ label, name, value, handleChange }) => (
  <>
    <GridEntry>
      <Text size="0.75rem">{label}</Text>
    </GridEntry>
    <GridEntry>
      <input
        name={name}
        type="number"
        value={value}
        onChange={handleChange}
        placeholder="Type Here"
      />
      <Text size="0.75rem">%</Text>
    </GridEntry>
  </>
);

const Transition = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [requestLoading, setRequestLoading] = useState(false);
  const [assessments, setAssessments] = useState({
    healthWellness: {
      label: "Health & Wellness",
      score: "",
    },
    personalManagement: {
      label: "Personal Management",
      score: "",
    },
    homeManagement: {
      label: "Home Management",
      score: "",
    },
    safety: {
      label: "Safety",
      score: "",
    },
    transportation: {
      label: "Transportation",
      score: "",
    },
    healthyRelationship: {
      label: "Healthy Relationship",
      score: "",
    },
    moneyManagement: {
      label: "Money Management",
      score: "",
    },
    employment: {
      label: "Employment",
      score: "",
    },
  });

  const addAssessmentScore = e => {
    try {
      const { name, value } = e.target;

      setAssessments(prev => ({
        ...prev,
        [name]: {
          ...assessments?.[name],
          score: value,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    try {
      setRequestLoading(true);
      const id = router?.query?.id;
      const payload = { id };
      const transitionAssessments = [];

      Object?.keys?.(assessments)
        ?.filter(key => {
          const score = assessments?.[key]?.score;
          return score !== "";
        })
        ?.forEach(key => {
          const score = assessments?.[key]?.score;
          const type = transitionAssessmentEnums[key];

          transitionAssessments?.push({ type, score });
        });

      if (!!transitionAssessments?.length) {
        payload.transitionAssessments = transitionAssessments;
      }

      dispatch(
        saveUpdateProfile({ data: payload, nextLink: `/student/${id}/profile` })
      );
    } catch (error) {
      setRequestLoading(false);
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  if (requestLoading) {
    return (
      <Wrapper>
        <Loader />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={8} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Transition Assessment
        </Text>

        <AssessmentGrid>
          <GridHeader />

          {Object?.keys?.(assessments)?.map(key => {
            const { label, score } = assessments?.[key];

            return (
              <GridRow
                key={key}
                name={key}
                label={label}
                value={score}
                handleChange={addAssessmentScore}
              />
            );
          })}
        </AssessmentGrid>

        <FlexBox align="center" colGap="1.5rem">
          <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
          <SecondaryButton onClick={handleBack}>Back</SecondaryButton>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default Transition;
