import { useEffect, useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import styled from "styled-components";
import { useRouter } from "next/router";
import cloneDeep from "lodash.clonedeep";

import Text from "@common/Text";
import Loader from "@common/Loader";
import FlexBox from "@common/FlexBox";
import TextArea from "@common/TextArea";
import { PrimaryButton } from "@common/Buttons";

import EntryTable from "./EntryTable";

import urls from "@urls";
import axiosInstance from "@axiosInstance";

import { WHITE, GRAY_200 } from "@constants/colors";
import { statusOptions } from "@metadata/statusOptions";
import { healthAndWellnessGoals } from "@metadata/goals";
import { frequencyOptions } from "@metadata/frequencies";
import { assessmentOptions } from "@metadata/assessments";

dayjs.extend(utc);

const LoaderWrapper = styled(FlexBox)`
  flex: 1;
`;

const Container = styled(FlexBox)`
  width: 100%;
  padding: 1.5rem;
  row-gap: 1.5rem;
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};
`;

const defaultTableEntry = Object.freeze({
  annual: {
    date: "",
    goal: null,
    criteria: "",
    frequency: null,
    assessment: null,
    shortTermGoal: "",
  },
  quarterly: {
    date: "",
    goal: null,
    status: "",
    criteria: "",
    statusNote: "",
    frequency: null,
    assessment: null,
    shortTermGoal: "",
  },
});

const HealthWellness = ({ isQuarterlyPlan }) => {
  const router = useRouter();

  const key = isQuarterlyPlan ? "quarterly" : "annual";
  const defaultEntry = cloneDeep(defaultTableEntry?.[key]);

  const [loading, setLoading] = useState(false);
  const [annualGoal, setAnnualGoal] = useState("");
  const [ctaDisabled, setCtaDisabled] = useState(false);
  const [tableEntries, setTableEntries] = useState([{ ...defaultEntry }]);

  useEffect(() => {
    if (router.isReady) {
      fetchPlanDetails();
    }
  }, [router.isReady]);

  const fetchPlanDetails = async () => {
    try {
      const { id, year, quarter } = router?.query || {};

      if (!id || !year) {
        setLoading(false);
        setCtaDisabled(false);
        return;
      }
      if (isQuarterlyPlan && !quarter) {
        setLoading(false);
        setCtaDisabled(false);
        return;
      }

      const params = { year: parseInt(year), studentId: parseInt(id) };

      if (isQuarterlyPlan) params.quarterNumber = parseInt(quarter);

      setLoading(true);
      setCtaDisabled(true);

      const URL = isQuarterlyPlan
        ? urls.fetchQuarterlyReport
        : urls.fetchAnnualPlan;

      const res = await axiosInstance.get(URL, { params });
      let healthWellnessData = res?.data?.goal?.healthWellness || null;

      let entries = [{ ...defaultEntry }];

      if (healthWellnessData) {
        healthWellnessData = cloneDeep(healthWellnessData);
        const healthWellnessEntries = healthWellnessData?.healthWellnessEntries;

        if (!!healthWellnessEntries?.length) {
          entries = healthWellnessEntries?.map(entry => {
            let {
              id,
              date,
              type,
              criteria,
              schedule,
              assessmentType,
              shortTermObjective,
            } = entry || {};

            date = date ? dayjs(date)?.toDate() : "";

            const goal = healthAndWellnessGoals?.find(
              ({ value }) => type === value
            );
            const frequency = frequencyOptions?.find(
              ({ value }) => schedule === value
            );
            const assessment = assessmentOptions?.find(
              ({ value }) => assessmentType === value
            );

            const entryObject = {
              date,
              criteria,
              goal: goal || null,
              frequency: frequency || null,
              assessment: assessment || null,
              shortTermGoal: shortTermObjective,
            };

            if (!isNaN(id)) entryObject.id = id;

            if (!isQuarterlyPlan) {
              return entryObject;
            }

            const { status, statusNote } = entry || {};

            const statusOption = statusOptions?.find(
              ({ value }) => value === status
            );

            return { ...entryObject, statusNote, status: statusOption || null };
          });
        }

        setAnnualGoal(healthWellnessData?.annualGoal);
      }

      setTableEntries(entries);
    } catch (error) {
      console.log(error, "Error in fetching annual plan");
    } finally {
      setLoading(false);
      setCtaDisabled(false);
    }
  };

  const onSave = async () => {
    try {
      setCtaDisabled(true);

      const { id, year } = router?.query || {};

      if (!id || !year) {
        setCtaDisabled(false);
        return;
      }

      const payload = {
        year: parseInt(year),
        studentId: parseInt(id),
        goal: { healthWellness: { annualGoal } },
      };

      let healthWellnessEntries = [];
      if (!!tableEntries?.length) {
        healthWellnessEntries = tableEntries?.map(entry => {
          let {
            id,
            date,
            goal,
            criteria,
            frequency,
            assessment,
            shortTermGoal,
          } = entry || {};

          date = !!date && dayjs(date)?.utc()?.format();

          const entryObject = {
            criteria,
            date: date || null,
            type: goal?.value || null,
            shortTermObjective: shortTermGoal,
            schedule: frequency?.value || null,
            assessmentType: assessment?.value || null,
          };

          if (!isNaN(id)) entryObject.id = id;

          if (!isQuarterlyPlan) {
            return entryObject;
          }

          const { status, statusNote } = entry || {};

          return { ...entryObject, statusNote, status: status?.value || null };
        });
      }

      payload.goal.healthWellness.healthWellnessEntries = healthWellnessEntries;

      await axiosInstance.put(urls.createUpdateAnnualPlan, payload);
    } catch (error) {
    } finally {
      setCtaDisabled(false);
    }
  };

  if (loading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  return (
    <FlexBox column width="100%" rowGap="1.5rem">
      <Text weight={500} size="1.125rem">
        Goals
      </Text>

      <Container>
        <Text weight={500} size="1.125rem">
          Health & Wellness
        </Text>

        <FlexBox column rowGap="0.75rem">
          <Text size="0.875rem">Annual Goal</Text>
          <TextArea
            rows={1}
            value={annualGoal}
            placeholder="Enter"
            onChange={e => setAnnualGoal(e.target.value)}
          />
        </FlexBox>
      </Container>

      <FlexBox column rowGap="0.75rem" align="flex-end">
        <EntryTable
          tableEntries={tableEntries}
          setTableEntries={setTableEntries}
          isQuarterlyPlan={isQuarterlyPlan}
          goalOptions={healthAndWellnessGoals}
          defaultTableEntry={defaultTableEntry}
        />

        <PrimaryButton onClick={onSave} disabled={ctaDisabled}>
          Save
        </PrimaryButton>
      </FlexBox>
    </FlexBox>
  );
};

export default HealthWellness;
