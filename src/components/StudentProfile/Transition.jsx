import { useState } from "react";
import styled, { css } from "styled-components";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import { PrimaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_100 } from "@constants/colors";

const AssessmentGrid = styled.div`
  width: 60%;
  display: grid;
  max-width: 75rem;
  grid-template-columns: 1fr 0.8fr;
`;

const GridEntry = styled(FlexBox)`
  width: 100%;
  padding: 0.625rem;

  input {
    width: 100%;
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
        value={value}
        onChange={handleChange}
        placeholder="Type Here"
      />
    </GridEntry>
  </>
);

const Transition = () => {
  const [assessmentScores, setAssessmentScores] = useState({
    health: "",
    safety: "",
    employment: "",
    transportation: "",
    homeManagement: "",
    moneyManagement: "",
    personalManagement: "",
    healthyRelationships: "",
  });

  const {
    health,
    safety,
    employment,
    transportation,
    homeManagement,
    moneyManagement,
    personalManagement,
    healthyRelationships,
  } = assessmentScores;

  const handleInput = e => {
    try {
      const { name, value } = e.target;

      setAssessmentScores(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {};

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={8} />

      <FlexBox column rowGap="3rem" margin="0 0 0 2.25rem">
        <Text bold size="1.25rem">
          Transition Assessment
        </Text>

        <AssessmentGrid>
          <GridHeader />

          <GridRow
            name="health"
            value={health}
            label="Health & Wellness"
            handleChange={handleInput}
          />

          <GridRow
            name="safety"
            value={safety}
            label="Safety"
            handleChange={handleInput}
          />

          <GridRow
            name="personalManagement"
            value={personalManagement}
            handleChange={handleInput}
            label="Personal Management"
          />

          <GridRow
            handleChange={handleInput}
            name="healthyRelationships"
            value={healthyRelationships}
            label="Healthy Relationships"
          />

          <GridRow
            name="homeManagement"
            value={homeManagement}
            label="Home Management"
            handleChange={handleInput}
          />

          <GridRow
            name="employment"
            value={employment}
            label="Employment"
            handleChange={handleInput}
          />

          <GridRow
            naem="moneyManagement"
            value={moneyManagement}
            label="Money Management"
            handleChange={handleInput}
          />

          <GridRow
            name="transportation"
            value={transportation}
            label="Transportation"
            handleChange={handleInput}
          />
        </AssessmentGrid>

        <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
      </FlexBox>
    </Wrapper>
  );
};

export default Transition;
