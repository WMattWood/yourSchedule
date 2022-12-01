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
  /* margin-right: 4px; */
  width: auto;
  border-radius: 5px;
`
const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* height: 40px; */
  width: 99%;
  background: white;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px black;
`
const DisplayedField = styled.div`
  margin: 5px 0px;
  padding: 4px 12px;
  font-size: 18px;
  font-weight: 200;
  width: 300px;
`


export default EventDetail