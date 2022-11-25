import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { v4 as uuidv4 } from 'uuid'


const AddEventModal = () => {

  const { setModalVisibility, 
          activeDate, 
          setActiveDate, 
          formData, setFormData 
        } = useContext(CalendarContext)

  const closeModal = () => { setModalVisibility(false) }

  // let today = new Date();
  // let currentMonth = activeDate.getMonth();
  // let currentYear = activeDate.getFullYear();                                            
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  let years = []
  for ( let i = 2000; i <= 2038; i++ ) {
    years.push(`${i}`)
  }
  let days = []
  let daysInCurrentMonth = 32 - (new Date(formData.dateYear, formData.dateMonth, 32)).getDate()
  for ( let i = 1; i <= daysInCurrentMonth; i++ ) {
    days.push(`${i}`)
  }
  
  const submitHandler = (ev) => {
    ev.preventDefault();
    console.log(formData)
    fetch('/calendar/insert', {
      "method": "POST",
      "body": JSON.stringify({
        data: formData
      }),
      "headers": {
        "Content-Type": "application/json"
      }
    })
  }

  const inputHandler = (ev, field) => {
    setFormData({...formData, [field]: ev.currentTarget.value })
  }

  ///// the below setActiveDate function call and "select" variables
  ///// can be used to make it so choosing a date here in the modal
  ///// automatically jumps the calendar to that date.  (DO USERS LIKE THIS?)

  ///// CHOICE MADE
  ///// the code below ONLY lets the eventModal change the active day... the 
  ///// active year and month can only be changed using the calendar header
  ///// navigation buttons.
  
  let selectDay = document.getElementById("modalDay")
  // let selectYear = document.getElementById("modalYear")
  // let selectMonth = document.getElementById("modalMonth")
  const selectHandler = (ev, field) => {
    setFormData({...formData, [field]: ev.currentTarget.value })
    // setActiveDate(new Date(selectYear.value, selectMonth.value, selectDay.value))
    setActiveDate(new Date(activeDate.getFullYear(), activeDate.getMonth(), selectDay.value))
  }

  return (
    <>
      <EventForm onSubmit={ (ev) => { submitHandler(ev) } }>
        <XButton onClick={ closeModal }>X</XButton>
        <AllFields>
          <label forhtml="name">Event Name</label>
          <EventDataInput type="text" 
                          name="name" 
                          value={formData.name} 
                          onChange={(ev) => inputHandler(ev, "name" )} required ></EventDataInput>
          <label forhtml="location">Event Location</label>
          <EventDataInput type="text" 
                          name="location" 
                          value={formData.location} 
                          onChange={(ev) => inputHandler(ev, "location" )} required ></EventDataInput>
          <label forhtml="date">Event Date</label>
          <EventDataInput type="text" 
                          name="date" 
                          value={formData.date} 
                          onChange={(ev) => inputHandler(ev, "date" )} required ></EventDataInput>
          <DropdownMenus>
            <DropDown>
              <label forhtml="month">month</label>
              <EventDateSelect  type="select" 
                                name="month"
                                id="modalMonth"  
                                value={formData.dateMonth} 
                                onChange={ (ev) => selectHandler(ev, "dateMonth") } 
                                required 
                                >{months.map( (month, idx) => <MonthOption value={idx} key={uuidv4()}>{month}</MonthOption>)}</EventDateSelect>
            </DropDown>
            <DropDown>
              <label forhtml="day">day</label>
              <EventDateSelect  type="select" 
                                name="day"
                                id="modalDay" 
                                value={formData.dateDay}
                                onChange={ (ev) => selectHandler(ev, "dateDay") }  
                                required 
                                >{days.map( (day) => <DayOption value={day} key={uuidv4()}>{day}</DayOption>)}</EventDateSelect>
            </DropDown>
            <DropDown>
              <label forhtml="year">year</label>
              <EventDateSelect  type="select" 
                                name="year"
                                id="modalYear" 
                                value={formData.dateYear} 
                                onChange={ (ev) => selectHandler(ev, "dateYear") }  
                                required 
                                >{years.map( (year) => <YearOption value={year} key={uuidv4()}>{year}</YearOption>)}</EventDateSelect>
            </DropDown>
          </DropdownMenus>
        </AllFields>
        <EventDataSubmit type="submit">SUBMIT</EventDataSubmit>
      </EventForm>
    </>
  )
}

// FORM X BUTTON
const XButton = styled.div`
  height: 8px;
  width: 8px;
  position: relative;
  top: 5px;
  right: 5px;

  &:hover {
    cursor: pointer;
  }
`

// FORM CONTAINER
const EventForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 360px;
  width: 260px;
  * {
    font-weight: 600;
    margin: 4px;
    border-radius: 5px;
  }
  background-color: #ADADAD;
  box-sizing: border-box;
  border: 2px solid black;
  border-radius: 10px;
`

// FORM FIELDS
const AllFields = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12px;
`
const EventDataInput = styled.input`
  font-size: 16px;
  width: 200px;
  height: 22px;
  border-radius: 5px;
`

// FORM DROPDOWN MENUS
const DropdownMenus = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  * {
    font-weight: 200;
  }
`
const DropDown = styled.div`
  display: flex;
  flex-direction: column;
`
const EventDateSelect = styled.select`
  font-size: 16px;
  width: 60px;
  height: 22px;
  border-radius: 5px;
`
const MonthOption = styled.option`
`
const DayOption = styled.option`
`
const YearOption = styled.option`
` 

// FORM SUBMIT BUTTON
const EventDataSubmit = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 20px;
`
export default AddEventModal