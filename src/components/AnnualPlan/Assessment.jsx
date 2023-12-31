import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useRouter } from "next/router";
import cloneDeep from "lodash.clonedeep";
import styled, { css } from "styled-components";

import AnnualPlanLayout from "@layouts/AnnualPlanLayout";

import Text from "@common/Text";
import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";

import urls from "@urls";
import axiosInstance from "@axiosInstance";

import {
  WHITE,
  GRAY_50,
  GRAY_200,
  GRAY_300,
  GRAY_500,
  GRAY_700,
} from "@constants/colors";
import { transitionAssessmentEnums } from "@metadata/transitionAssessments";

const LoaderWrapper = styled(FlexBox)`
  flex: 1;
`;

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  row-gap: 0.75rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const Table = styled.div`
  display: grid;
  width: 27.25rem;
  overflow: hidden;
  border-radius: 0.5rem;
  border: 1px solid ${GRAY_200};
  grid-template-columns: 69% 31%;
`;

const TableCell = styled(FlexBox)`
  width: 100%;
  padding: 0.75rem;
  background-color: ${WHITE};
  border-top: 1px solid ${GRAY_200};
  border-right: 1px solid ${GRAY_200};

  ${({ header }) =>
    header &&
    css`
      border: none;
      background-color: ${GRAY_50};
    `}

  ${({ footer }) =>
    footer &&
    css`
      border: none;
      align-items: center;
      justify-content: flex-end;
      background-color: ${GRAY_50};
      border-top: 1px solid ${GRAY_200};
    `}

  input {
    width: 100%;
    border: none;
    font: inherit;
    color: ${GRAY_700};
    font-size: 0.875rem;

    &::placeholder {
      color: ${GRAY_300};
    }
  }
`;

const defaultAssessmentEntry = Object.freeze({
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
  misc: {
    label: "Misc",
    score: "",
  },
});

const TableHeader = () => (
  <>
    <TableCell header>
      <Text weight={500} color={GRAY_500} size="0.75rem">
        Category
      </Text>
    </TableCell>
    <TableCell header>
      <Text weight={500} color={GRAY_500} size="0.75rem">
        Score
      </Text>
    </TableCell>
  </>
);

const TableRow = ({
  score,
  index,
  category,
  assessment,
  isAdditional,
  handleChange = () => {},
}) => {
  if (isAdditional) {
    return (
      <>
        <TableCell>
          <input
            type="text"
            name="category"
            value={category}
            placeholder="Enter"
            onChange={e => handleChange(e, index)}
          />
        </TableCell>
        <TableCell>
          <input
            name="score"
            type="number"
            value={score}
            placeholder="Enter"
            onChange={e => handleChange(e, index)}
          />
        </TableCell>
      </>
    );
  }

  return (
    <>
      <TableCell>
        <Text color={GRAY_700} size="0.875rem">
          {category}
        </Text>
      </TableCell>
      <TableCell>
        <input
          type="number"
          value={score}
          name={assessment}
          placeholder="Enter"
          onChange={handleChange}
        />
      </TableCell>
    </>
  );
};

const TableFooter = ({ children }) => (
  <>
    <TableCell footer />
    <TableCell footer>{children}</TableCell>
  </>
);

const Assessment = () => {
  const router = useRouter();

  const [purpose, setPurpose] = useState("");
  const [loading, setLoading] = useState(false);
  const [assessments, setAssessments] = useState(
    cloneDeep(defaultAssessmentEntry)
  );
  const [ctaDisabled, setCtaDisabled] = useState(false);
  const [additionalAssessments, setAdditionalAssessments] = useState([]);

  useEffect(() => {
    if (router?.isReady) fetchPlanData();
  }, [router?.isReady]);

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

  const handleAddAssessment = () => {
    try {
      const assessments = [
        ...additionalAssessments,
        { category: "", score: "" },
      ];

      setAdditionalAssessments(assessments);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAdditionalAssessmentData = (e, index) => {
    try {
      const { name, value } = e.target;
      let assessments = [...additionalAssessments];

      if (index > -1)
        assessments[index] = { ...assessments?.[index], [name]: value };

      setAdditionalAssessments(assessments);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlanData = async () => {
    try {
      const { id, year } = router?.query || {};

      if (!id || !year) return;

      setLoading(true);
      setCtaDisabled(true);

      const params = { year: parseInt(year), studentId: parseInt(id) };

      const res = await axiosInstance.get(urls.fetchAnnualPlan, { params });
      const assessment = res?.data?.assessment;

      if (assessment) {
        setPurpose(assessment?.purpose);

        const assessments = cloneDeep(defaultAssessmentEntry);
        const additionalScores = assessment?.additionalScores;

        if (!!additionalScores?.length)
          setAdditionalAssessments(additionalScores);

        if (!!assessment?.scores?.length) {
          assessment?.scores?.forEach(({ score, category }) => {
            const assessmentCategory = Object?.keys(
              transitionAssessmentEnums
            )?.find(key => transitionAssessmentEnums?.[key] === category);

            assessments[assessmentCategory].score = score?.toString();
          });
        }
        setAssessments(assessments);
      }
    } catch (error) {
      console.log(error, "Error in fetching plan data");
    } finally {
      setLoading(false);
      setCtaDisabled(false);
    }
  };
  const onSave = async () => {
    try {
      const { id, year } = router?.query || {};

      if (!id || !year) return;

      const payload = {
        year: parseInt(year),
        studentId: parseInt(id),
        assessment: {
          purpose,
        },
      };

      let scores = [];
      let additionalScores = additionalAssessments
        ?.filter(({ category, score }) => !!score && !!category)
        ?.map(({ score, category }) => ({ category, score: parseInt(score) }));

      Object?.keys(assessments)?.forEach(key => {
        const score = assessments?.[key]?.score;
        const category = transitionAssessmentEnums?.[key];

        if (!!score) {
          scores.push({ category, score: parseInt(score) });
        }
      });

      if (!!scores?.length) payload.assessment.scores = scores;
      if (!!additionalScores?.length)
        payload.assessment.additionalScores = additionalScores;

      await axiosInstance.put(urls.createUpdateAnnualPlan, payload);
    } catch (error) {
      console.log(error, "Error in saving data");
    }
  };

  if (loading) {
    return (
      <AnnualPlanLayout>
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      </AnnualPlanLayout>
    );
  }

  return (
    <AnnualPlanLayout>
      <FlexBox column rowGap="1.5rem">
        <Text weight={500} size="1.125rem">
          Assessment
        </Text>

        <Container>
          <Text size="0.875rem">Purpose/ Administration</Text>
          <TextArea
            rows={1}
            value={purpose}
            placeholder="Enter"
            onChange={e => setPurpose(e.target?.value)}
          />
        </Container>

        <Table>
          <TableHeader />

          {Object?.keys?.(assessments)?.map(key => {
            const { label, score } = assessments?.[key];

            return (
              <TableRow
                key={key}
                score={score}
                assessment={key}
                category={label}
                handleChange={addAssessmentScore}
              />
            );
          })}

          <TableFooter />
        </Table>

        <FlexBox column rowGap="0.75rem" justify="flex-end">
          <Table>
            <TableHeader />

            {additionalAssessments?.map(({ category, score }, i) => (
              <TableRow
                key={i}
                index={i}
                isAdditional
                score={score}
                category={category}
                handleChange={handleAdditionalAssessmentData}
              />
            ))}

            <TableFooter>
              <FlexBox
                align="center"
                colGap="0.5rem"
                cursor="pointer"
                onClick={handleAddAssessment}
              >
                <FiPlus color={GRAY_500} />
                <Text weight={500} size="0.75rem" color={GRAY_500}>
                  Add
                </Text>
              </FlexBox>
            </TableFooter>
          </Table>

          <PrimaryButton onClick={onSave} disabled={ctaDisabled}>
            Save
          </PrimaryButton>
        </FlexBox>
      </FlexBox>
    </AnnualPlanLayout>
  );
};

export default Assessment;
