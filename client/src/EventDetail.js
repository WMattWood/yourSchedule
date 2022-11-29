import styled from 'styled-components'
import { useState } from 'react'

const EventDetail = ({fieldName, fieldProperty, event}) => {

  const [ showEditor, setShowEditor] = useState(false)
  const [ updatedProperty, setUpdatedProperty ] = useState(event[fieldProperty])

  const toggleEditor = () => {
    setShowEditor(!showEditor)
  }

  const saveClickHandler = () => {
    fetch(`/calendar/${event._id}`, {
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

  const handleChange = (ev) => {
    let text = ev.currentTarget.value
    setUpdatedProperty(text)
  }
  

  return (
    <FieldWrapper>
      { ! showEditor 
        ? <>
            <DisplayedField>{`${fieldName}: ${updatedProperty}`}</DisplayedField>
            <EditButton onClick={toggleEditor}>Edit</EditButton>
          </>
        : <>
            <DisplayedField>{fieldName}</DisplayedField>
            <TextInput value={updatedProperty} onChange={ (ev) => handleChange (ev) }></TextInput>
            <SaveButton onClick={saveClickHandler}>Save</SaveButton>
            <CloseButton onClick={toggleEditor}>Close</CloseButton>
          </>
      }
    </FieldWrapper>
  )
}

const TextInput = styled.input`
  width: 200px;
`
const EditButton = styled.button`
  margin-left: 10px;
  width: auto;
  border-radius: 5px;
`
const SaveButton = styled.button`
  margin-left: 10px;
  width: auto;
  border-radius: 5px;
`
const CloseButton = styled.button`
  margin-left: 10px;
  width: auto;
  border-radius: 5px;
`
const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  background: grey;
  border-radius: 5px;
`
const DisplayedField = styled.div`
  padding: 4px 12px;
  font-size: 18px;
  font-weight: 200;
  width: 300px;
`


export default EventDetail