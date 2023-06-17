import styled from 'styled-components'
import { useState, useEffect } from 'react'

// A GENERIC DISPLAY/EDIT FIELD FOR EVENT DETAILS (NAME, LOCATION, COMPANY)
const EventDetail = ({fieldName, fieldProperty, event}) => {

  // Toggle for showing and hiding edit view
  const [ showEditor, setShowEditor] = useState(false)

  // UPDATED LOCAL STATE
  // This state is used to display whatever the most up to date/modified state is.
  // This is also what gets delivered to the database on saveClick
  const [ updatedProperty, setUpdatedProperty ] = useState(event[fieldProperty])

  // Toggles DISPLAY/EDITOR mode
  const toggleEditor = () => {
    setShowEditor(!showEditor)
  }

  useEffect( () => {
    setUpdatedProperty(event[fieldProperty])
  }, [event])

  // Submits data to the database
  const saveClickHandler = () => {
    fetch(`${process.env.REACT_APP_URL_BASE}/calendar/${event._id}`, {
        "method": "PATCH",
        "body": JSON.stringify({
          "data": { ...event, [fieldProperty]: updatedProperty }
        }),
        "headers": {
          "Content-Type": "application/json"
        }
      }
    )
    toggleEditor()
  }

  // Updates the updatedProperty state whenever the field is changed.
  const handleChange = (ev) => {
    let text = ev.currentTarget.value
    setUpdatedProperty(text)
  }
  
  return (
    <FieldWrapper>
      { ! showEditor 
        ? <>
            {/* {console.log("event[fieldProperty]", event[fieldProperty])} */}
            {/* {console.log("updatedProperty", updatedProperty)} */}
            <DisplayedField>{`${fieldName}: ${updatedProperty}`}</DisplayedField>
            <EditButton onClick={toggleEditor}>Edit</EditButton>
          </>
        : <>
            <DisplayedField>{`${fieldName}:`}</DisplayedField>
            <EditMenuWrapper>
              <TextInput value={updatedProperty} onChange={ (ev) => handleChange (ev) }></TextInput>
              <EditButtonsWrapper>
                <SaveButton onClick={saveClickHandler}>Save</SaveButton>
                <CloseButton onClick={toggleEditor}>Close</CloseButton>
              </EditButtonsWrapper>
            </EditMenuWrapper>
          </>
      }
    </FieldWrapper>
  )
}

// CONTAINER
const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 99%;
  background: white;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px black;
  margin: 5px 0px;
`

// DISPLAY
const DisplayedField = styled.div`
  margin: 5px 0px;
  padding: 4px 12px;
  font-size: 18px;
  font-weight: 200;
  width: 300px;
`

// EDIT MODE STUFF
const EditMenuWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
const EditButtonsWrapper = styled.div`
  display: flex;
`
const TextInput = styled.input`
  margin: 5px 12px 5px 0px;
  width: auto;
`
const EditButton = styled.button`
  margin: 5px 20px;
  width: auto;
  border-radius: 5px;
`
const SaveButton = styled.button`
  margin: 5px 4px 5px 0px;
  width: auto;
  border-radius: 5px;
`
const CloseButton = styled.button`
  margin: 5px 4px;
  width: auto;
  border-radius: 5px;
`

export default EventDetail