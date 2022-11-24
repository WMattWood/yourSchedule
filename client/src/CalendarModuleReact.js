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
        {/* <TodayButton
            onClick={() => {
              setSelectedDate(new Date());
              setActiveDate(new Date());
            }}
            > Today </TodayButton> */}
        <NavIcon>
          <AiOutlineLeft onClick={() => setActiveDate(subMonths(activeDate, 1))}  />
        </NavIcon>
        <NavIcon>
          <AiOutlineRight onClick={() => setActiveDate(addMonths(activeDate, 1))} />
        </NavIcon>
        <MonthTitle> {format(activeDate, "MMMM yyyy")} </MonthTitle>
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
          className={`${isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"} 
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
const MonthTitle = styled.h2 `
  margin-left: 24px;
  font-size: 24px;
`
const NavIcon = styled.div`
  width: 20px;
  height: 20px;
  padding: 8px;
  cursor: pointer;

  &:hover {
    border-radius: 50%;
    background: #efefee;
  }
`


const WeekContainer = styled.div `
  display: grid;
  width: 700px;
  grid-template-columns: repeat(7, 100px);
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
  /* box-sizing: border-box;
  border: 2px solid red; */
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

  &:hover {
    background-color: #9e9e9e;
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