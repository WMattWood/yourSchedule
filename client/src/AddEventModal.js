import styled from 'styled-components'
import { useState } from 'react'


const AddEventModal = () => {

  const [ formData, setFormData ] = useState( { name: "", 
                                                location: "",
                                                date: "" 
                                              })

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

  return (
    <>
      <EventForm onSubmit={ (ev) => { submitHandler(ev) } }>
        <label forHTML="name">Event Name</label>
        <EventDataInput type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={(ev) => inputHandler(ev, "name" )} required ></EventDataInput>
        <label forHTML="location">Event Location</label>
        <EventDataInput type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={(ev) => inputHandler(ev, "location" )} required ></EventDataInput>
        <label forHTML="date">Event Date</label>
        <EventDataInput type="text" 
                        name="date" 
                        value={formData.date} 
                        onChange={(ev) => inputHandler(ev, "date" )} required ></EventDataInput>
        {/* <input type="select" name="day" value={formData.day} onChange={(ev) => setFormData({...formData, day: ev.currentTarget.value })} required ></input>
        <input type="select" name="month" value={formData.month} onChange={(ev) => setFormData({...formData, month: ev.currentTarget.value })} required ></input>
        <input type="select" name="year" value={formData.year} onChange={(ev) => setFormData({...formData, year: ev.currentTarget.value })} required ></input> */}
        <EventDataSubmit type="submit">SUBMIT</EventDataSubmit>
      </EventForm>
    </>
  )
}

const EventForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 300px;
  width: 260px;
  * {
    margin: 5px;
    border-radius: 5px;
  }

  box-sizing: border-box;
  border: 2px solid grey;
  border-radius: 5px;
`

const EventDataInput = styled.input`
  font-size: 16px;
  width: 200px;
  height: 22px;
  border-radius: 5px;
`

const EventDataSubmit = styled.button`
  width: 200px;
  height: 60px;
`
export default AddEventModal