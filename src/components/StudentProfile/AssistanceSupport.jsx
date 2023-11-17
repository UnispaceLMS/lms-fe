import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";
import TextInput from "@common/TextInput";
import MultipleEntryTable from "@common/MultipleEntryTable";
import { PrimaryButton, SecondaryButton } from "@common/Buttons";

import Wrapper from "./Wrapper";
import InputContainer from "./InputContainer";
import ProfileCompletionWizard from "./ProfileCompletionWizard";

import { GRAY_100, GRAY_800 } from "@constants/colors";
import { saveUpdateProfile } from "@redux/Slices/studentSlice";

const SupportGrid = styled.div`
  width: 100%;
  display: grid;
  row-gap: 0.75rem;
  grid-template-columns: 1fr 1fr 0.42fr;
`;

const GridEntry = styled(FlexBox)`
  width: 100%;
  padding: 0.875rem;

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

const defaultEntries = Object.freeze({
  helpRequiredTasks: { task: "" },
  independentlyCapableTasks: { capability: "" },
});

const GridHeader = () => (
  <>
    <GridEntry header>
      <Text bold size="0.75rem">
        Support & Modification to the Environment
      </Text>
    </GridEntry>
    <GridEntry header>
      <Text bold size="0.75rem">
        Condition
      </Text>
    </GridEntry>
    <GridEntry header>
      <Text bold size="0.75rem">
        Location
      </Text>
    </GridEntry>
  </>
);

const GridRow = ({ id, label, condition, location, handleChange }) => (
  <>
    <GridEntry>
      <Text size="0.75rem">{label}</Text>
    </GridEntry>
    <GridEntry>
      <input
        id={id}
        name="condition"
        value={condition}
        onChange={handleChange}
        placeholder="Type Here"
      />
    </GridEntry>
    <GridEntry>
      <input
        id={id}
        name="location"
        value={location}
        onChange={handleChange}
        placeholder="Type Here"
      />
    </GridEntry>
  </>
);

const AssistanceSupport = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const studentProfile = useSelector(state => state?.student?.profile);

  const [supportData, setSupportData] = useState({
    "Access to Fidget": {
      location: "",
      condition: "",
    },
    "Breaks/ Alone Time": {
      location: "",
      condition: "",
    },
    "Reminder to Fill Medication": {
      location: "",
      condition: "",
    },
    "Mental Health Check Ins": {
      location: "",
      condition: "",
    },
    "Positive Reinforcement": {
      location: "",
      condition: "",
    },
  });

  const [assistanceData, setAssistanceData] = useState({
    helpRequiredTasks: [],
    independentlyCapableTasks: [],
    morningHelp: studentProfile?.morningHelp || "",
    eveningHelp: studentProfile?.eveningHelp || "",
    afternoonHelp: studentProfile?.afternoonHelp || "",
    accommodations: studentProfile?.accommodations || "",
  });

  const {
    morningHelp,
    eveningHelp,
    afternoonHelp,
    accommodations,
    helpRequiredTasks,
    independentlyCapableTasks,
  } = assistanceData;
  const {
    "Access to Fidget": fidget,
    "Breaks/ Alone Time": breaks,
    "Reminder to Fill Medication": reminder,
    "Mental Health Check Ins": mentalHealth,
    "Positive Reinforcement": positiveReinforcement,
  } = supportData;

  useEffect(() => {
    if (studentProfile) {
      let helpRequired = [{ ...defaultEntries.helpRequiredTasks }];
      let capabilities = [{ ...defaultEntries.independentlyCapableTasks }];

      if (!!studentProfile?.helpRequiredTasks?.length) {
        helpRequired = studentProfile?.helpRequiredTasks?.map(task => ({
          task,
        }));
      }
      if (!!studentProfile?.independentlyCapableTasks?.length) {
        capabilities = studentProfile?.independentlyCapableTasks?.map(
          capability => ({ capability })
        );
      }

      setAssistanceData(prev => ({
        ...prev,
        helpRequiredTasks: helpRequired,
        independentlyCapableTasks: capabilities,
        morningHelp: studentProfile?.morningHelp || "",
        eveningHelp: studentProfile?.eveningHelp || "",
        afternoonHelp: studentProfile?.afternoonHelp || "",
        accommodations: studentProfile?.accommodations || "",
      }));

      const suppData = { ...supportData };
      studentProfile?.supports?.forEach?.(
        ({ location, condition, supportAndModificationToEnv }) => {
          suppData[supportAndModificationToEnv].location = location;
          suppData[supportAndModificationToEnv].condition = condition;
        }
      );

      setSupportData(prev => ({ ...prev, ...suppData }));
    }
  }, [studentProfile]);

  const handleSupportInput = e => {
    try {
      const { id, name, value } = e.target;

      setSupportData(prev => ({
        ...prev,
        [id]: {
          ...prev?.[id],
          [name]: value,
        },
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleAssistanceInput = e => {
    try {
      const { name, value } = e.target;

      setAssistanceData(prev => ({ ...prev, [name]: value }));
    } catch (error) {
      console.log(error);
    }
  };

  const onSave = () => {
    try {
      const id = router?.query?.id;
      let supports = [];
      const payload = { id };

      const helpRequiredTasks = assistanceData?.helpRequiredTasks
        ?.filter(({ task }) => !!task)
        ?.map(({ task }) => task);
      const independentlyCapableTasks =
        assistanceData?.independentlyCapableTasks
          ?.filter(({ capability }) => !!capability)
          ?.map(({ capability }) => capability);

      Object?.keys(assistanceData)
        ?.filter(
          key =>
            typeof assistanceData?.[key] !== "object" && !!assistanceData?.[key]
        )
        ?.forEach(key => {
          payload[key] = assistanceData?.[key];
        });

      Object?.keys(supportData)
        ?.filter(
          key =>
            !!supportData?.[key]?.location && !!supportData?.[key]?.condition
        )
        ?.forEach(key => {
          const { location, condition } = supportData?.[key];

          supports?.push({
            location,
            condition,
            supportAndModificationToEnv: key,
          });
        });

      if (!!helpRequiredTasks?.length)
        payload.helpRequiredTasks = helpRequiredTasks;
      if (!!supports?.length) payload.supports = supports;
      if (!!independentlyCapableTasks?.length)
        payload.independentlyCapableTasks = independentlyCapableTasks;

      dispatch(
        saveUpdateProfile({
          data: payload,
          nextLink: `/student/${id}/profile/strengths-concerns`,
        })
      );
    } catch (error) {
      console.log(error, "Error in saving profile");
    }
  };

  const handleBack = () => router?.back();

  const addEntry = type => {
    try {
      const entryType = assistanceData?.[type];
      const defaultEntry = defaultEntries?.[type];

      const entries = [...entryType, { ...defaultEntry }];

      setAssistanceData(prev => ({ ...prev, [type]: entries }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleTasksInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const tasksCopy = [...helpRequiredTasks];
      let task = tasksCopy?.[i];

      task = { ...task, [name]: value };
      tasksCopy[i] = task;

      setAssistanceData(prev => ({ ...prev, helpRequiredTasks: tasksCopy }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleCapabilitiesInput = (e, i) => {
    try {
      const { name, value } = e.target;

      const capabilitiesCopy = [...independentlyCapableTasks];
      let capability = capabilitiesCopy?.[i];

      capability = { ...capability, [name]: value };
      capabilitiesCopy[i] = capability;

      setAssistanceData(prev => ({
        ...prev,
        independentlyCapableTasks: capabilitiesCopy,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Wrapper>
      <ProfileCompletionWizard currentStep={6} />

      <FlexBox column rowGap="7rem" margin="0 0 0 2.25rem">
        <FlexBox column rowGap="3rem">
          <Text bold size="1.25rem">
            Assistance
          </Text>

          <FlexBox column rowGap="1.5rem" align="flex-start">
            <FlexBox colGap="2rem">
              <InputContainer>
                <Text color={GRAY_800}>Morning Assistance</Text>
                <TextInput
                  name="morningHelp"
                  value={morningHelp}
                  placeholder="Type Here"
                  onChange={handleAssistanceInput}
                />
              </InputContainer>

              <InputContainer>
                <Text color={GRAY_800}>Afternoon Assistance</Text>
                <TextInput
                  name="afternoonHelp"
                  value={afternoonHelp}
                  placeholder="Type Here"
                  onChange={handleAssistanceInput}
                />
              </InputContainer>

              <InputContainer>
                <Text color={GRAY_800}>Evening Assistance</Text>
                <TextInput
                  name="eveningHelp"
                  value={eveningHelp}
                  placeholder="Type Here"
                  onChange={handleAssistanceInput}
                />
              </InputContainer>
            </FlexBox>

            <InputContainer>
              <Text color={GRAY_800}>Accommodations</Text>
              <TextInput
                name="accommodations"
                value={accommodations}
                placeholder="Type Here"
                onChange={handleAssistanceInput}
              />
            </InputContainer>

            <MultipleEntryTable
              entries={independentlyCapableTasks}
              columns={["Independent Capabilities"]}
              handleChange={handleCapabilitiesInput}
              addEntry={() => addEntry("independentlyCapableTasks")}
            />

            <MultipleEntryTable
              entries={helpRequiredTasks}
              handleChange={handleTasksInput}
              columns={["Help Required in (Areas)"]}
              addEntry={() => addEntry("helpRequiredTasks")}
            />
          </FlexBox>
        </FlexBox>

        <FlexBox column rowGap="3rem">
          <Text bold size="1.25rem">
            Support
          </Text>

          <SupportGrid>
            <GridHeader />

            <GridRow
              id="Access to Fidget"
              label="Access to Fidget"
              location={fidget?.location}
              condition={fidget?.condition}
              handleChange={handleSupportInput}
            />

            <GridRow
              id="Breaks/ Alone Time"
              label="Breaks/ Alone Time"
              location={breaks?.location}
              condition={breaks?.condition}
              handleChange={handleSupportInput}
            />

            <GridRow
              id="Mental Health Check Ins"
              label="Mental Health Check Ins"
              location={mentalHealth?.location}
              handleChange={handleSupportInput}
              condition={mentalHealth?.condition}
            />

            <GridRow
              location={reminder?.location}
              condition={reminder?.condition}
              id="Reminder to Fill Medication"
              handleChange={handleSupportInput}
              label="Reminder to Fill Medication"
            />

            <GridRow
              id="Positive Reinforcement"
              label="Positive Reinforcement"
              handleChange={handleSupportInput}
              location={positiveReinforcement?.location}
              condition={positiveReinforcement?.condition}
            />
          </SupportGrid>

          <FlexBox align="center" colGap="1.5rem">
            <PrimaryButton onClick={onSave}>Save & Next</PrimaryButton>
            <SecondaryButton onClick={handleBack}>Back</SecondaryButton>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Wrapper>
  );
};

export default AssistanceSupport;
