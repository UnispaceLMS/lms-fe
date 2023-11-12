import { forwardRef, useState } from "react";
import dayjs from "dayjs";
import range from "lodash.range";
import ReactDatePicker from "react-datepicker";
import styled, { css } from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

import Text from "@common/Text";
import FlexBox from "@common/FlexBox";

import {
  WHITE,
  GRAY_200,
  GRAY_300,
  GRAY_600,
  GRAY_700,
  PRIMARY_600,
  PRIMARY_100,
} from "@constants/colors";

import "react-datepicker/dist/react-datepicker.css";

const months = Object.freeze([
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]);
const years = Object.freeze(range(dayjs()?.year(), 1979, -1));

const Wrapper = styled(FlexBox)`
  width: 100%;

  @import url("~react-datepicker/dist/react-datepicker.css");

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker-popper {
    z-index: 10;
  }

  .react-datepicker {
    display: inline-flex;
    flex-direction: column;
  }

  .react-datepicker__month-container {
    display: flex;
    padding: 1.25rem;
    font-size: 0.875rem;
    flex-direction: column;
  }

  .react-datepicker__header {
    padding: 0;
    display: flex;
    border-bottom: none;
    flex-direction: column;
    background-color: ${WHITE};
  }

  .react-datepicker__current-month {
    font-size: 1rem;
    font-weight: 500;
    color: ${GRAY_700};
  }

  .react-datepicker__day-names {
    margin: 0.75rem 0 0.25rem;
  }

  .react-datepicker__month {
    margin: 0;
    display: flex;
    row-gap: 0.25rem;
    flex-direction: column;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    margin: 0;
    width: 2.5rem;
    aspect-ratio: 1;
    padding: 0.625rem;
    line-height: unset;
    color: ${GRAY_700};
    align-items: center;
    display: inline-flex;
    justify-content: center;
  }

  .react-datepicker__day {
    font-weight: 400;
    border-radius: 50%;
  }

  .react-datepicker__day:hover {
    font-weight: 500;
  }

  .react-datepicker__day-name {
    font-weight: 500;
  }

  .react-datepicker__day--disabled {
    opacity: 0.5;
  }

  .react-datepicker__day--selected {
    color: ${WHITE};
    background-color: ${PRIMARY_600} !important;
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background-color: unset;
  }

  .react-datepicker__day--today:hover {
    background-color: #bad9f1;
  }
`;

const CustomInput = styled(FlexBox)`
  width: 100%;
  padding: 1rem;
  cursor: default;
  color: ${GRAY_600};
  border-radius: 0.25rem;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_200};

  ${({ empty }) =>
    empty &&
    css`
      color: ${GRAY_300};
    `}
`;

const Container = styled(FlexBox)`
  border-radius: 0.5rem;
  flex-direction: column;
  background-color: ${WHITE};
  border: 0.75px solid ${GRAY_200};
  box-shadow: 0px 8px 8px -4px rgba(16, 24, 40, 0.03),
    0px 20px 24px -4px rgba(16, 24, 40, 0.08);
`;

const Footer = styled(FlexBox)`
  column-gap: 0.75rem;
  align-items: center;
  padding: 1rem 1.5rem;
  border-top: 1px solid ${GRAY_200};
`;

const Button = styled.button`
  flex: 1;
  cursor: pointer;
  color: ${WHITE};
  font-weight: 500;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  border: 1px solid ${PRIMARY_600};
  background-color: ${PRIMARY_600};

  ${({ outline }) =>
    outline &&
    css`
      color: ${GRAY_700};
      background-color: ${WHITE};
      border: 1px solid ${GRAY_300};
    `}
`;

const Relative = styled(FlexBox)`
  position: relative;

  ${Text} {
    cursor: pointer;
  }
`;

const DropDown = styled(FlexBox)`
  width: 100%;
  top: 1.5rem;
  z-index: 100;
  overflow: auto;
  max-height: 11rem;
  position: absolute;
  flex-direction: column;
  background-color: ${WHITE};
  border: 1px solid ${GRAY_300};
`;

const Cell = styled(FlexBox)`
  width: 100%;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 0.8rem;
  color: ${GRAY_700};
  justify-content: center;

  &:hover {
    background-color: ${PRIMARY_100};
  }
`;

const CalendarInput = forwardRef(({ date, onClick }, ref) => (
  <CustomInput
    ref={ref}
    empty={!date}
    onClick={onClick}
    className="custom-input"
  >
    {date ? dayjs(date)?.format("MMMM DD, YYYY") : "Enter"}
  </CustomInput>
));

CalendarInput.displayName = "CalendarInput";

const CalendarHeader = props => {
  const {
    monthDate,
    changeYear,
    changeMonth,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  } = props || {};
  const [showYears, setShowYears] = useState(false);
  const [showMonths, setShowMonths] = useState(false);

  const toggleShowYears = () => setShowYears(prev => !prev);

  const toggleShowMonths = () => setShowMonths(prev => !prev);

  const handleChangeMonth = index => {
    changeMonth(index);
    setShowMonths(false);
  };

  const handleChangeYear = year => {
    changeYear(year);
    setShowYears(false);
  };

  return (
    <FlexBox align="center" justify="space-between">
      <FlexBox padding="0.625rem">
        <FiChevronLeft
          size="1.5rem"
          cursor="pointer"
          onClick={decreaseMonth}
          opacity={prevMonthButtonDisabled ? 0 : 1}
          pointerEvents={prevMonthButtonDisabled ? "none" : "all"}
        />
      </FlexBox>

      <FlexBox align="center" colGap="0.5rem">
        <Relative>
          <Text weight={500} color={GRAY_700} onClick={toggleShowMonths}>
            {dayjs(monthDate)?.format("MMMM")}
          </Text>

          {showMonths && (
            <DropDown>
              {months?.map((month, i) => (
                <Cell key={month} onClick={() => handleChangeMonth(i)}>
                  {month}
                </Cell>
              ))}
            </DropDown>
          )}
        </Relative>

        <Relative>
          <Text weight={500} color={GRAY_700} onClick={toggleShowYears}>
            {dayjs(monthDate)?.format("YYYY")}
          </Text>

          {showYears && (
            <DropDown>
              {years?.map(year => (
                <Cell key={year} onClick={() => handleChangeYear(year)}>
                  {year}
                </Cell>
              ))}
            </DropDown>
          )}
        </Relative>
      </FlexBox>

      <FlexBox padding="0.625rem">
        <FiChevronRight
          size="1.5rem"
          cursor="pointer"
          onClick={increaseMonth}
          opacity={nextMonthButtonDisabled ? 0 : 1}
          pointerEvents={nextMonthButtonDisabled ? "none" : "all"}
        />
      </FlexBox>
    </FlexBox>
  );
};

const CalendarContainer = ({ className, children, onApply, onCancel }) => (
  <Container className={className}>
    {children}
    <Footer>
      <Button outline onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onApply}>Apply</Button>
    </Footer>
  </Container>
);

const DatePicker = ({
  min,
  max,
  open,
  date,
  setDate,
  toggleCalendar = () => {},
}) => {
  const today = dayjs()?.toDate();
  const [selectedDate, setSelectedDate] = useState(date);

  const onCancel = () => {
    if (!date) setSelectedDate(today);
    toggleCalendar();
  };

  const onApply = () => {
    setDate(selectedDate);
    toggleCalendar();
  };

  return (
    <Wrapper>
      <ReactDatePicker
        open={open}
        value={date}
        maxDate={max}
        show
        selected={selectedDate}
        showPopperArrow={false}
        onInputClick={toggleCalendar}
        onClickOutside={toggleCalendar}
        onChange={date => setSelectedDate(date)}
        customInput={<CalendarInput date={date} />}
        calendarContainer={({ className, children }) => (
          <CalendarContainer
            onApply={onApply}
            onCancel={onCancel}
            className={className}
          >
            {children}
          </CalendarContainer>
        )}
        renderCustomHeader={props => <CalendarHeader {...props} />}
      />
    </Wrapper>
  );
};

export default DatePicker;
