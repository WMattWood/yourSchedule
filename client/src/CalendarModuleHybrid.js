import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
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

  let selectYear = document.getElementById("year")
  let selectMonth = document.getElementById("month")
  // Jump To Specific Month
  const jump = () => {
    // currentYear = parseInt(selectYear.value);
    // currentMonth = parseInt(selectMonth.value);
    console.log(selectYear.value)
    console.log(selectMonth.value)
    setActiveDate(new Date(selectYear.value, selectMonth.value))
  }
    

  let today = new Date();
  let currentMonth = today.getMonth();
  let currentYear = today.getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let years = []
  for ( let i = 2000; i <= 2038; i++ ) {
    years.push(i)
  }
 
  // Generate Header
  const getHeader = () => {
    return (
      <HeaderWrapper>
        {/* <TodayButton
            onClick={() => {
              setSelectedDate(new Date());
              setActiveDate(new Date());
            }}
            > Today </TodayButton> */}
        <NavWrapper>
          <NavIcon>
            <AiOutlineLeft onClick={() => setActiveDate(subMonths(activeDate, 1))}  />
          </NavIcon>
          <NavIcon>
            <AiOutlineRight onClick={() => setActiveDate(addMonths(activeDate, 1))} />
          </NavIcon>
        </NavWrapper>
        <MonthTitle> {format(activeDate, "MMMM yyyy")} </MonthTitle>

        <JumpSectionForm className="form-inline">
            <JumpLabel className="lead mr-2 ml-2" htmlFor="month"> Jump To:{" "} </JumpLabel>
            <MonthSelect
                className="form-control col-sm-4"
                name="month"
                id="month"
                onChange={ () => jump() }
                > {months.map( (month, idx) => <MonthOption value={idx}>{month}</MonthOption>)}
            </MonthSelect>
            <label htmlFor="year" />
            <YearSelect
                className="form-control col-sm-4"
                name="year"
                id="year"
                onChange={ () => jump() }
                > {years.map( (year) => <YearOption value={year}>{year}</YearOption>)}
            </YearSelect>
          </JumpSectionForm>
      </HeaderWrapper>
    );
  };

  // Generate Weekday Names Header
  const getWeekDayNames = () => {
    return (
      <CalendarGrid>
        { daysOfTheWeek.map( day => <WeekDay key={uuidv4()}>{day}</WeekDay> ) }
      </CalendarGrid>
    )
  }

  // const getOneWeek = (date, selectedDate, activeDate) => {
  //   let currentDate = date
  //   const week = []
  //   for (let day = 0; day < 7; day++) {
  //     const cloneDate = currentDate;
      
  //     week.push(
  //       <Day
  //         className={`${isSameMonth(currentDate, activeDate) ? "" : "inactiveDay"} 
  //                     ${isSameDay(currentDate, selectedDate) ? "selectedDay" : ""}
  //                     ${isSameDay(currentDate, new Date()) ? "today" : ""}`
  //                   }
  //         onClick={ () => setSelectedDate(cloneDate) }
  //       >
  //         {format(currentDate, "d")}
  //       </Day>
  //     );
  //     currentDate = addDays(currentDate, 1);
  //   }
  //   return <>{week}</>;
  // };

  // const getDates = () => {
  //   const startOfTheSelectedMonth = startOfMonth(activeDate);
  //   const endOfTheSelectedMonth = endOfMonth(activeDate);
  //   const startDate = startOfWeek(startOfTheSelectedMonth);
  //   const endDate = endOfWeek(endOfTheSelectedMonth);

  //   let currentDate = startDate;

  //   const arrayOfWeeks = [];

  //   while (currentDate <= endDate) {
  //     arrayOfWeeks.push(
  //       getOneWeek(currentDate, selectedDate, activeDate)
  //     );
  //     currentDate = addDays(currentDate, 7);
  //   }

  //   return <CalendarGrid>{arrayOfWeeks}</CalendarGrid>;
  // };

  const getCalendar = (year, month) => {

    let firstDayOfTheMonth = (new Date(year, month)).getDay()
    let daysInMonth = 32 - (new Date(year, month, 32)).getDate()
    
   
  
    let currentDate = 1
    let arrayOfWeeks = []
    for (let weekRow = 0; weekRow < 6; weekRow++) {
      let week = []
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
  
        let blankSquare = <Day></Day>
        let dateSquare = <Day>{currentDate}</Day>
        let todaySquare = <Day className="today">{currentDate} Today</Day>
        let isToday = ( currentDate === today.getDate() && 
                        year === today.getFullYear() && 
                        month === today.getMonth() ) 
  
        if ( weekRow === 0 && dayOfWeek < firstDayOfTheMonth) {
          week.push(blankSquare);
        }
        else if (currentDate > daysInMonth) {
          break;
        }
        else {
          isToday ? week.push(todaySquare) : week.push(dateSquare)
          currentDate++;
        }
      }
      arrayOfWeeks.push(week)
    }
    return <CalendarGrid>{arrayOfWeeks}</CalendarGrid>
  }

  /// JSX RETURN
  return (
    <section>
      {getHeader()}
      {getWeekDayNames()}
      {/* {getDates()} */}
      {getCalendar(currentYear, currentMonth)}
    </section>
  );
};



// const changeMonth styled. `
//   margin: 0px 20px;
// `




const CalendarGrid = styled.div `
  display: grid;
  width: 700px;
  grid-template-columns: repeat(7, 100px);
  border-top: 1px solid #dfdfdf;
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

  /* .inactiveDay {
    color: #9e9e9e;
  } */

  &.today {
    background: #D3D3D3; 
    border-radius: 50%;
    /* box-sizing: border-box;
    border: 2px solid red; */
  }

  /* .selectedDay {
    color: white;
    background: #3366ff;
    border-radius: 50%;
  } */

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

const HeaderWrapper = styled.div `
  display: flex;
  align-items: center;
`
const MonthTitle = styled.h2 `
  width: 220px;
  margin-left: 24px;
  font-size: 24px;
`
const NavWrapper = styled.div`
  display: flex
  /* margin-left: 10px; */
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
const JumpSectionForm = styled.form`
`
const JumpLabel = styled.label`
`
const MonthSelect = styled.select`
  margin-left: 10px;
`
const MonthOption = styled.option`
`
const YearSelect = styled.select`
  margin-left: 10px;
`
const YearOption = styled.option`
` 

export default CalendarModuleReact;