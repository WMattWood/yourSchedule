import styled from 'styled-components'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const DateDetails = ({event}) => {

  const [ showEditor, setShowEditor] = useState(false)
  const [ updatedDay, setUpdatedDay ] = useState(event.dateDay)
  const [ updatedMonth, setUpdatedMonth ] = useState(event.dateMonth)
  const [ updatedYear, setUpdatedYear ] = useState(event.dateYear)

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
  let daysInCurrentMonth = 32 - (new Date(updatedYear, updatedMonth, 32)).getDate()
  for ( let i = 1; i <= daysInCurrentMonth; i++ ) {
    days.push(i)
  }
  // STAFF NUMBERS
  var staffArray = [];
  for ( let i = 1; i <= 16; i++) {
    staffArray.push(i);
  }

  const toggleEditor = () => {
    setShowEditor(!showEditor)
  }

  const saveClickHandler = () => {
    fetch(`/calendar/${event._id}`, {
        "method": "PATCH",
        "body": JSON.stringify({
          "data": { ...event, 
                      dateDay: parseInt(updatedDay),
                      dateMonth: parseInt(updatedMonth),
                      dateYear: parseInt(updatedYear) }
        }),
        "headers": {
          "Content-Type": "application/json"
        }
      }
    )

    toggleEditor()
  }

  const handleDayChange = (ev) => {
    let date = ev.currentTarget.value
    setUpdatedDay(date)
  }

  const handleMonthChange = (ev) => {
    let date = ev.currentTarget.value
    setUpdatedMonth(date)
  }

  const handleYearChange = (ev) => {
    let date = ev.currentTarget.value
    setUpdatedYear(date)
  }
  
  // const handleDate = (ev, field) => {
  //   setFormData({...formData, [field]: ev.currentTarget.value })
  //   setActiveDate(new Date(selectYear.value, selectMonth.value, selectDay.value))
  // }

  return (
    <FieldWrapper>
      { ! showEditor 
        ? <>
            <DisplayedField>Date: {`${months[updatedMonth]} ${updatedDay}, ${updatedYear}`}</DisplayedField>
            <EditButton onClick={toggleEditor}>Edit</EditButton>
          </>
        : <>
            <DisplayedField>Date: {`${months[updatedMonth]} ${updatedDay}, ${updatedYear}`}</DisplayedField>
            {/* <TextInput value={updatedProperty} onChange={ (ev) => handleChange (ev) }></TextInput> */}

            <DropdownMenus>
              <DropDown>
                <label forhtml="month">month</label>
                <EventDateSelect  type="select" 
                                  name="month"
                                  id="modalMonth"  
                                  value={updatedMonth} 
                                  onChange={ (ev) => handleMonthChange(ev) } 
                                  required 
                                  >{months.map( (month, idx) => <MonthOption value={idx} key={uuidv4()}>{month}</MonthOption>)}</EventDateSelect>
              </DropDown>
              <DropDown>
                <label forhtml="day">day</label>
                <EventDateSelect  type="select" 
                                  name="day"
                                  id="modalDay" 
                                  value={updatedDay}
                                  onChange={ (ev) => handleDayChange(ev) }  
                                  required 
                                  >{days.map( (day) => <DayOption value={day} key={uuidv4()}>{day}</DayOption>)}</EventDateSelect>
              </DropDown>
              <DropDown>
                <label forhtml="year">year</label>
                <EventDateSelect  type="select" 
                                  name="year"
                                  id="modalYear" 
                                  value={updatedYear} 
                                  onChange={ (ev) => handleYearChange(ev) }  
                                  required 
                                  >{years.map( (year) => <YearOption value={year} key={uuidv4()}>{year}</YearOption>)}</EventDateSelect>
              </DropDown>
            </DropdownMenus>
          
            <SaveButton onClick={saveClickHandler}>Save</SaveButton>
            <CloseButton onClick={toggleEditor}>Close</CloseButton>
          </>
      }
    </FieldWrapper>
  )
}

// const TextInput = styled.input`
//   width: 200px;
// `
const EditButton = styled.button`
  margin-left: 20px;
  width: auto;
  border-radius: 5px;
`
const SaveButton = styled.button`
  /* margin-left: 10px; */
  margin: 5px 0px;
  width: auto;
  border-radius: 5px;
`
const CloseButton = styled.button`
  /* margin-left: 10px; */
  margin: 5px 4px;
  width: auto;
  border-radius: 5px;
`
const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  /* height: 40px; */
  width: 99%;
  background: white;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px black;
  margin: 5px 0px;
`
const DisplayedField = styled.div`
  margin: 5px 0px;
  padding: 4px 12px;
  font-size: 18px;
  font-weight: 200;
  width: 300px;
`

// FORM DROPDOWN MENUS
const DropdownMenus = styled.div`
  width: 100%;
  margin: 5px 5px 5px 0px;
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

export default DateDetails