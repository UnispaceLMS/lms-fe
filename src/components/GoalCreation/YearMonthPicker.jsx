import { forwardRef } from "react";
import dayjs from "dayjs";
import { FiChevronDown } from "react-icons/fi";
import ReactDatePicker from "react-datepicker";
import styled, { css } from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

import FlexBox from "@common/FlexBox";

import {
  WHITE,
  GRAY_400,
  GRAY_500,
  GRAY_700,
  PRIMARY_600,
} from "@constants/colors";

const Wrapper = styled(FlexBox)`
  width: 100%;

  @import url("~react-datepicker/dist/react-datepicker.css");

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__header {
    border-bottom: none;
    background-color: ${WHITE};
  }

  .react-datepicker__input-container {
    input {
      width: 100%;
    }
  }

  .react-datepicker__month-text {
    margin: 0;
    width: 5rem;
    padding: 0.625rem 0;
  }

  .react-datepicker__month-text--selected {
    color: ${WHITE};
    background-color: ${PRIMARY_600};
  }
`;

const CustomInput = styled(FlexBox)`
  width: 100%;
  cursor: default;
  color: ${GRAY_700};
  font-size: 0.75rem;
  align-items: center;
  border-radius: 0.25rem;
  background-color: ${WHITE};
  justify-content: space-between;

  ${({ empty }) =>
    empty &&
    css`
      color: ${GRAY_500};
    `}

  svg {
    color: ${GRAY_400};
    min-width: 1.125rem;
    min-height: 1.125rem;
  }
`;

const CalendarInput = forwardRef(({ value, onClick }, ref) => (
  <CustomInput
    ref={ref}
    empty={!value}
    onClick={onClick}
    className="custom-input"
  >
    {value ? dayjs(value)?.format("MMM YYYY") : "Enter"}

    <FiChevronDown />
  </CustomInput>
));

CalendarInput.displayName = "CalendarInput";

const YearMonthPicker = ({ min, max, date, handleChange }) => {
  return (
    <Wrapper>
      <ReactDatePicker
        value={date}
        minDate={min}
        maxDate={max}
        selected={date}
        showMonthYearPicker
        onChange={handleChange}
        showPopperArrow={false}
        showFullMonthYearPicker
        showTwoColumnMonthYearPicker
        customInput={<CalendarInput />}
      />
    </Wrapper>
  );
};

export default YearMonthPicker;
