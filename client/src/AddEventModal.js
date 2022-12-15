import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { v4 as uuidv4 } from 'uuid'

const AddEventModal = () => {

  // DAYS
  let days = []
  let daysInCurrentMonth = 32 - (new Date(formData.dateYear, formData.dateMonth, 32)).getDate()
  for ( let i = 1; i <= daysInCurrentMonth; i++ ) {
    days.push(i)
  }
  
  // YEARS
  let years = []
  for ( let i = 2000; i <= 2038; i++ ) {
    years.push(i)
  }

  // MONTHS
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // STAFF NUMBERS
  var staffArray = [];
  for ( let i = 0; i <= 16; i++) {
    staffArray.push(i);
  }

  const { setModalVisibility,
          monthlyCalendar,
          setMonthlyCalendar, 
          activeDate, 
          setActiveDate, 
          formData, 
          setFormData,
        } = useContext(CalendarContext)

  const [ errorWindow, setErrorWindow ] = useState(false)

  const closeModal = () => { setModalVisibility(false) }

  const errorPopup = () => {
    setErrorWindow(!errorWindow)
  }
                     
  const submitHandler = async (ev) => {
    ev.preventDefault();

    // error handling
    if (formData.callList.length < 1) {
      errorPopup()
      return;
    }

    let newCalendarEvent = await fetch('/calendar/insert', {
      "method": "POST",
      "body": JSON.stringify({
        data: formData
      }),
      "headers": {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json() )
      .then(res => res.data )

    document.getElementById("name").value = ""
    document.getElementById("location").value = ""
    document.getElementById("client").value = ""
    //re-initialize formData state variable
    setFormData({ name: "", 
                  location: "",
                  client: "",
                  dateMonth: activeDate.getMonth(),
                  dateDay: activeDate.getDate(),
                  dateYear: activeDate.getFullYear(),
                  callList: [],
                  callListFull: false
                })

    // force the calendar to re-render after adding a new event
    let newMonthlyCalendar = [...monthlyCalendar, newCalendarEvent]
    setMonthlyCalendar(newMonthlyCalendar)
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
      newCallList.push({ name: "unfilled", position: "tech", editMode: false })
      x++;
    }

    setFormData({...formData, callList: newCallList})
  }

  return (
    <ModalHolder>
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

      { ! errorWindow
        ? null
        : <ErrorDialog open>
            <p>The CallList must have at least 1 person.</p>
            <form method="dialog">
              <button onClick={errorPopup}>OK</button>
            </form>
          </ErrorDialog>
      }

    </ModalHolder>
  )
}

// FRAME
const ModalHolder = styled.div`
  margin-left: 45px;
`

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
  height: 500px;
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
  cursor: pointer;
`

// ERROR POPUP 
const ErrorDialog = styled.dialog`
  position: absolute;
  top: 50%;
  left: 25%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #d3d3d3;
  border: 3px solid black;
  z-index: 2;
`
export default AddEventModal