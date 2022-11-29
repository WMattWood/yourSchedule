import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { v4 as uuidv4 } from 'uuid'

const AddEventModal = () => {

  const { setModalVisibility, 
          activeDate, 
          setActiveDate, 
          formData, 
          setFormData,
        } = useContext(CalendarContext)

  const closeModal = () => { setModalVisibility(false) }

  // I think we don't need this because it already happens in the CalendarContext
  // useEffect( () => {
  //   setFormData({ ...formData,
  //                 dateMonth: activeDate.getMonth(),
  //                 dateDay: activeDate.getDate(),
  //                 dateYear: activeDate.getFullYear()
  //             })
  // }, [activeDate])
                     
  // Generating Iterables
  // MONTHS
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  // YEARS
  let years = []
  for ( let i = 2000; i <= 2038; i++ ) {
    years.push(i)
  }
  // DAYS
  let days = []
  let daysInCurrentMonth = 32 - (new Date(formData.dateYear, formData.dateMonth, 32)).getDate()
  for ( let i = 1; i <= daysInCurrentMonth; i++ ) {
    days.push(i)
  }
  // STAFF NUMBERS
  var staffArray = [];
  for ( let i = 1; i <= 16; i++) {
    staffArray.push(i);
  }

  const submitHandler = (ev) => {
    ev.preventDefault();
    fetch('/calendar/insert', {
      "method": "POST",
      "body": JSON.stringify({
        data: formData
      }),
      "headers": {
        "Content-Type": "application/json"
      }
    })

    document.getElementById("name").value = ""
    document.getElementById("location").value = ""
    document.getElementById("client").value = ""
    setFormData({ name: "", 
                  location: "",
                  client: "",
                  dateMonth: activeDate.getMonth(),
                  dateDay: activeDate.getDate(),
                  dateYear: activeDate.getFullYear(),
                  callList: []
                })

    // // lazy hack to force the calendar to re-render after adding a new event
    // setActiveDate(activeDate)
  }

  const inputHandler = (ev, field) => {
    setFormData({...formData, [field]: ev.currentTarget.value })
  }
  
  // Selecting date options here updates the CalendarContext state as well as
  // updating the formData object which gets submitted onSubmit by the form
  // selectDay,Year,Month draw their values from the current element value of 
  // each select input "dropdown"
  // THIS CAN PROBABLY BE REFINED TO REMOVE THE USE OF GETELEMENTBYID
  let selectDay = document.getElementById("modalDay")
  let selectYear = document.getElementById("modalYear")
  let selectMonth = document.getElementById("modalMonth")
  const dateHandler = (ev, field) => {
    setFormData({...formData, [field]: ev.currentTarget.value })
    setActiveDate(new Date(selectYear.value, selectMonth.value, selectDay.value))
  }

  // This handler generates a list of empty "position" items
  const callListHandler = (ev) => {
    let number = ev.currentTarget.value
    let x = 0
    let newCallList = []
    while (x < number) {
      newCallList.push({ name: "unfilled", position: "tech" })
      x++;
    }

    setFormData({...formData, callList: newCallList})
  }

  return (
    <>
      <EventForm onSubmit={ (ev) => { submitHandler(ev) } }>
        <XButton onClick={ closeModal }>X</XButton>
        <AllFields>
          <label forhtml="name">Event Name</label>
          <EventDataInput type="text" 
                          name="name"
                          id="name" 
                          value={formData.name} 
                          onChange={(ev) => inputHandler(ev, "name" )} required ></EventDataInput>
          <label forhtml="location">Event Location</label>
          <EventDataInput type="text" 
                          name="location" 
                          id="location" 
                          value={formData.location} 
                          onChange={(ev) => inputHandler(ev, "location" )} required ></EventDataInput>
          <label forhtml="client">Name of Client</label>
          <EventDataInput type="text" 
                          name="client" 
                          id="client"
                          value={formData.client} 
                          onChange={(ev) => inputHandler(ev, "client" )} required ></EventDataInput>
          <DropdownMenus>
            <DropDown>
              <label forhtml="month">month</label>
              <EventDateSelect  type="select" 
                                name="month"
                                id="modalMonth"  
                                value={formData.dateMonth} 
                                onChange={ (ev) => dateHandler(ev, "dateMonth") } 
                                required 
                                >{months.map( (month, idx) => <MonthOption value={idx} key={uuidv4()}>{month}</MonthOption>)}</EventDateSelect>
            </DropDown>
            <DropDown>
              <label forhtml="day">day</label>
              <EventDateSelect  type="select" 
                                name="day"
                                id="modalDay" 
                                value={formData.dateDay}
                                onChange={ (ev) => dateHandler(ev, "dateDay") }  
                                required 
                                >{days.map( (day) => <DayOption value={day} key={uuidv4()}>{day}</DayOption>)}</EventDateSelect>
            </DropDown>
            <DropDown>
              <label forhtml="year">year</label>
              <EventDateSelect  type="select" 
                                name="year"
                                id="modalYear" 
                                value={formData.dateYear} 
                                onChange={ (ev) => dateHandler(ev, "dateYear") }  
                                required 
                                >{years.map( (year) => <YearOption value={year} key={uuidv4()}>{year}</YearOption>)}</EventDateSelect>
            </DropDown>
          </DropdownMenus>
          <CallListDropDownMenu>
            <CallListDropDown>
              <label forhtml="year">CallList</label>
              <CallListSelect  type="select" 
                                name="callList"
                                id="callList" 
                                value={formData.callList.length} 
                                onChange={ (ev) => callListHandler(ev) }  
                                required 
                                >{staffArray.map( (number, idx) => <CallListOption value={number} key={uuidv4()}>{number}</CallListOption>)}</CallListSelect>
            </CallListDropDown>
          </CallListDropDownMenu>
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
  height: 600px;
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

// CALLLIST DROPDOWN MENU
const CallListDropDownMenu = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  * {
    font-weight: 200;
  }
`
const CallListDropDown = styled.div`
  display: flex;
  flex-direction: column;
`
const CallListSelect = styled.select`
  font-size: 16px;
  width: 60px;
  height: 22px;
  border-radius: 5px;
`
const CallListOption = styled.option`
` 

// FORM SUBMIT BUTTON
const EventDataSubmit = styled.button`
  width: 200px;
  height: 60px;
  margin-top: 20px;
`
export default AddEventModal