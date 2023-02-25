import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from "react";
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { format, subMonths, addMonths } from "date-fns";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import DayCell from './DayCell'

const CalendarModule = () => {

  // The activeDate is used to determine which square on the calendar shows as highlighted
  // It also determines which day will display in the AddEventModal's date selection input
  // The monthlyEventListings determines what calendar month is displayed in the CalendarModule
  // It also determines which month/year will display in the AddEventModal's date selection 
  // input.
  // Because these pieces of state are required by DayCell, CalendarModule and AddEventModal
  // they are stored in the CalendarContext to allow unified access to that information. 
  const { activeDate, setActiveDate, monthlyEventListings, setMonthlyEventListings } = useContext(CalendarContext)

  // DAYS/MONTHS/YEARS
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const years = []
  for ( let i = 2000; i <= 2038; i++ ) {
    years.push(i)
  }

  // CALENDAR LOGIC
  const getCalendar = (year, month) => {
    // set first day of month and days in current month
    const firstDayOfTheMonth = (new Date(year, month)).getDay()
    const daysInMonth = 32 - (new Date(year, month, 32)).getDate()
    const arrayOfWeeks = []

    // initialize "currentDate" count
    let currentDate = 1

    for (let weekRow = 0; weekRow < 6; weekRow++) {
      const week = []
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
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
        const actualEvents = monthlyEventListings.filter( event => event.dateDay === currentDate )
        
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
    return <CalendarGrid>{arrayOfWeeks}</CalendarGrid>
  }

  // Jump To Specific Month
  const jump = () => {
    const selectYear = document.getElementById("year")
    const selectMonth = document.getElementById("month")
    setActiveDate(new Date(selectYear.value, selectMonth.value))
  }

  // Jump To Today's Date
  const jumpToday = () => {
    setActiveDate( new Date() )
  }

  // Set the event listings for this month based on the currently 
  // focused date. THIS COULD BE THE SPOT WE NEED TO REFACTOR IF
  // WE WANT TO HAVE THE EVENTS DISPLAY AFTER WE NAV TO NEW MONTH
  // Set Monthly Event Listings
  useEffect( () => {
    fetch(`${process.env.REACT_APP_URL_BASE}/calendar/${activeDate.getFullYear()}/${activeDate.getMonth()}`)
      .then( res => res.json() )
      .then( res => setMonthlyEventListings(res.data) )
  }, [activeDate, setMonthlyEventListings] )

  /// JSX RETURN
  return (
    <section>
      
      {/* Render Calendar Header */}
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

        <JumpSectionForm>
            <JumpLabel htmlFor="month"> Jump To:{" "} </JumpLabel>
            <MonthSelect
                name="month"
                id="month"
                value={activeDate.getMonth()} 
                onChange={ () => jump() } > 
                {months.map( (month, idx) => <MonthOption value={idx} key={uuidv4()}>{month}</MonthOption>)}
            </MonthSelect>
            <label htmlFor="year" />
            <YearSelect
                name="year"
                id="year"
                value={activeDate.getFullYear()} 
                onChange={ () => jump() } > 
                {years.map( (year) => <YearOption value={year} key={uuidv4()}>{year}</YearOption>)}
            </YearSelect>
          </JumpSectionForm>
      </HeaderWrapper>
      
      {/* Render Days of the Week */}
      <CalendarGrid>
        { daysOfTheWeek.map( day => <WeekDayTitle key={uuidv4()}>{day}</WeekDayTitle> ) }
      </CalendarGrid>

      {/* Render Actual Calendar Grid */}
      {getCalendar( activeDate.getFullYear(), activeDate.getMonth() )}

    </section>
  );
};

const CalendarGrid = styled.div `
  display: grid;
  width: 700px;
  grid-template-columns: repeat(7, 100px);
  border-top: 1px solid var(--calendar-outline);
` 
const TodayButton = styled.button`
  position: relative;
  left: -3px;
  top: -3px;
  font-size: 16px;
  width: 60px;
  height: 24px;
  border-radius: 3px;
  /* border: none; */
  box-shadow: 2px 2px;
  transition: 0.1s;
  &:active{
    box-shadow: 0px 0px;
    transition: 0.1s;
  }
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
  color: var(--text-secondary);
`

const HeaderWrapper = styled.div `
  display: flex;
  align-items: center;
  height: 50px;
`
const MonthTitle = styled.h2 `
  width: 220px;
  margin-left: 16px;
  font-size: 24px;
`
const NavWrapper = styled.div`
  margin-left: 12px;
  display: flex;
`
const NavIcon = styled.div`
  width: 20px;
  height: 20px;
  padding: 8px;
  position: relative;
  font-size: 18px;
  top: 2px;
  cursor: pointer;

  &:hover {
    border-radius: 50%;
    background: #efefee;
  }
`
const JumpSectionForm = styled.form`
`
const JumpLabel = styled.label`
  position: relative;
  font-size: 18px;
  top: 2px;
`
const MonthSelect = styled.select`
  margin-left: 10px;
  font-size: 16px;
  width: 60px;
  height: 22px;
  border-radius: 5px;
`
const MonthOption = styled.option`
`
const YearSelect = styled.select`
  margin-left: 10px;
  font-size: 16px;
  width: 60px;
  height: 22px;
  border-radius: 5px;
`
const YearOption = styled.option`
` 

export default CalendarModule;