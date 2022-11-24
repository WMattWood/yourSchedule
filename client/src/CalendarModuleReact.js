import styled from 'styled-components'
import React, { useState } from "react";
import {
  format,
  startOfWeek,
  addDays,
  startOfMonth,
  endOfMonth,
  endOfWeek,
  isSameMonth,
  isSameDay,
  subMonths,
  addMonths
} from "date-fns";

import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const CalendarModuleReact = () => {
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeDate, setActiveDate] = useState(new Date());

  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
 

  const getHeader = () => {
    return (
      <HeaderWrapper>
        <TodayButton
            className="todayButton"
            onClick={() => {
              setSelectedDate(new Date());
              setActiveDate(new Date());
            }}
            > Today </TodayButton>
        <LeftNavIcon
            className="navIcon"
            onClick={() => setActiveDate(subMonths(activeDate, 1))}
            />
        <RightNavIcon
            className="navIcon"
            onClick={() => setActiveDate(addMonths(activeDate, 1))}
            />
        <MonthTitle>{format(activeDate, "MMMM yyyy")}</MonthTitle>
      </HeaderWrapper>
    );
  };


  // Generate Weekday Names Header
  const getWeekDayNames = () => {
    return (
      <WeekContainer>
        { daysOfTheWeek.map( day => <WeekDay>{day}</WeekDay> ) }
      </WeekContainer>
    )
  }


  const generateDatesForCurrentWeek = (date, selectedDate, activeDate) => {
    let currentDate = date
    const week = []
    for (let day = 0; day < 7; day++) {
      const cloneDate = currentDate;
      
      week.push(
        <Day
          className={`day ${ isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"} 
                          ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
                          ${isSameDay(currentDate, new Date()) ? "today" : ""}`
                    }
          onClick={ () => setSelectedDate(cloneDate) }
        >
          {format(currentDate, "d")}
        </Day>
      );
      currentDate = addDays(currentDate, 1);
    }
    return <>{week}</>;
  };

  const getDates = () => {
    const startOfTheSelectedMonth = startOfMonth(activeDate);
    const endOfTheSelectedMonth = endOfMonth(activeDate);
    const startDate = startOfWeek(startOfTheSelectedMonth);
    const endDate = endOfWeek(endOfTheSelectedMonth);

    let currentDate = startDate;

    const allWeeks = [];

    while (currentDate <= endDate) {
      allWeeks.push(
        generateDatesForCurrentWeek(currentDate, selectedDate, activeDate)
      );
      currentDate = addDays(currentDate, 7);
    }

    return <WeekContainer>{allWeeks}</WeekContainer>;
  };

  return (
    <section>
      {getHeader()}
      {getWeekDayNames()}
      {getDates()}
    </section>
  );
};



// const changeMonth styled. `
//   margin: 0px 20px;
// `

const HeaderWrapper = styled.div `
  display: flex;
  align-items: center;
`
const TodayButton = styled.div `
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-right: 8px;

  &:hover {
    background: #efefef;
  }
`
const LeftNavIcon = styled(AiOutlineLeft) `
  width: 20px;
  height: 20px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    border-radius: 50%;
    background: #efefee;
  }
`
const RightNavIcon = styled(AiOutlineRight) `
  width: 20px;
  height: 20px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    border-radius: 50%;
    background: #efefee;
  }
`
const MonthTitle = styled.h2 `
  margin-left: 24px;
  font-size: 24px;
`

const WeekContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`
const Day = styled.div `
  margin: 12px;
  height: 30px;
  width: 30px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  .inactiveDay {
    color: #9e9e9e;
  }

  .today {
    background: #efefee;
    border-radius: 50%;
  }

  .selectedDay {
    color: white;
    background: #3366ff;
    border-radius: 50%;
  }
`

const WeekDay = styled.div`
  margin: 12px;
  height: 30px;
  width: 30px;
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: #9e9e9e;
`

export default CalendarModuleReact;