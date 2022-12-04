import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { format, subMonths, addMonths } from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import DayCell from './DayCell'

const CalendarModule = () => {
  
  const { activeDate, setActiveDate, monthlyCalendar, setMonthlyCalendar } = useContext(CalendarContext)

  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [monthlyCalendar, setMonthlyCalendar] = useState([])

  useEffect( () => {
    selectYear = document.getElementById("year")
    selectMonth = document.getElementById("month")
  }, [])

  let selectYear = document.getElementById("year")
  let selectMonth = document.getElementById("month")

  let today = new Date();
  let currentMonth = activeDate.getMonth();
  let currentYear = activeDate.getFullYear();
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  let years = []
  for ( let i = 2000; i <= 2038; i++ ) {
    years.push(i)
  }
 
  // Jump To Specific Month
  const jump = () => {
    console.log(selectYear.value)
    console.log(selectMonth.value)
    setActiveDate(new Date(selectYear.value, selectMonth.value))
  }

  const jumpToday = () => {
    setActiveDate( new Date() )
  }

  // Generate Header
  const getHeader = () => {

    return (
      <HeaderWrapper>
        <TodayButton onClick={ () => jumpToday() }>Today</TodayButton>
        <NavWrapper>
          <NavIcon onClick={() => setActiveDate(subMonths(activeDate, 1))}>
            <AiOutlineLeft />
          </NavIcon>
          <NavIcon onClick={() => setActiveDate(addMonths(activeDate, 1))}>
            <AiOutlineRight />
          </NavIcon>
        </NavWrapper>
        <MonthTitle> {format(activeDate, "MMMM yyyy")} </MonthTitle>

        <JumpSectionForm className="form-inline">
            <JumpLabel className="lead mr-2 ml-2" htmlFor="month"> Jump To:{" "} </JumpLabel>
            <MonthSelect
                className="form-control col-sm-4"
                name="month"
                id="month"
                value={activeDate.getMonth()} 
                onChange={ () => jump() }
                > {months.map( (month, idx) => <MonthOption value={idx} key={uuidv4()}>{month}</MonthOption>)}
            </MonthSelect>
            <label htmlFor="year" />
            <YearSelect
                className="form-control col-sm-4"
                name="year"
                id="year"
                value={activeDate.getFullYear()} 
                onChange={ () => jump() }
                > {years.map( (year) => <YearOption value={year} key={uuidv4()}>{year}</YearOption>)}
            </YearSelect>
          </JumpSectionForm>
      </HeaderWrapper>
    );
  };

  // Generate WeekdayTitles
  const getWeekDayNames = () => {
    return (
      <CalendarGrid>
        { daysOfTheWeek.map( day => <WeekDayTitle key={uuidv4()}>{day}</WeekDayTitle> ) }
      </CalendarGrid>
    )
  }

  // Generate Calendar Grid
  const getCalendar = (year, month) => {
    // set first day of month and days in current month
    let firstDayOfTheMonth = (new Date(year, month)).getDay()
    let daysInMonth = 32 - (new Date(year, month, 32)).getDate()
    // initialize "currentDate" count
    let currentDate = 1
    let arrayOfWeeks = []
    for (let weekRow = 0; weekRow < 6; weekRow++) {
      let week = []
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        // setting up different versions of DayCell component
        // __________________________
        // if there are events on the currentDate, an array of those events is
        // sent into the DayCell component where the eventStatus property is set to 
        // either eventPending or eventFull based on test logic for whether all positions
        // in the callList are set to !unfilled
        // this property gets used to set the EVENT BAND that displays on each cell
        // _________________________
        // if the currentDate iterator is equal to the Calendar State "activeDate" then a "selected"
        // status is applied to the  component which render a red background for the cell
        const blankSquare = <DayCell key={uuidv4()} numberMarker={""}></DayCell>
        const isToday = ( activeDate.getDate() === currentDate ) 
        const actualEvents = monthlyCalendar.filter( event => event.dateDay === currentDate )
        
        if ( weekRow === 0 && dayOfWeek < firstDayOfTheMonth) {
          week.push(blankSquare);
        } else if (currentDate > daysInMonth) {
          break;
        } else {
          week.push( <DayCell key={uuidv4()}
                            numberMarker={ currentDate }
                            selectedStatus={ isToday ? "selected" : null}
                            eventArray={actualEvents}
                            /> )
          currentDate++;
        }
      }
      arrayOfWeeks.push(week)
    }
    // console.log(arrayOfWeeks)
    return <CalendarGrid>{arrayOfWeeks}</CalendarGrid>
  }

  // Set the calendar for this month, so we can scan through it and see
  // if a given DayCell needs to have an event on it.
  useEffect( () => {
    fetch(`/calendar/${activeDate.getFullYear()}/${activeDate.getMonth()}`)
      .then( res => res.json() )
      .then( res => setMonthlyCalendar(res.data) )
  }, [activeDate] )

  /// JSX RETURN
  return (
    <section>
      {/* {console.log(monthlyCalendar)} */}
      {getHeader()}
      {getWeekDayNames()}
      { monthlyCalendar
        ? <>
          {getCalendar(currentYear, currentMonth)}
          </>
        : null
      }
    </section>
  );
};

const CalendarGrid = styled.div `
  display: grid;
  width: 700px;
  grid-template-columns: repeat(7, 100px);
  border-top: 1px solid #dfdfdf;
` 
const TodayButton = styled.button`
`

const WeekDayTitle = styled.div`
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
  height: 50px;
`
const MonthTitle = styled.h2 `
  width: 220px;
  margin-left: 24px;
  font-size: 24px;
`
const NavWrapper = styled.div`
  display: flex
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

export default CalendarModule;