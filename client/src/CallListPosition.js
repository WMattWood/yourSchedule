import styled from 'styled-components'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CallListPosition = ({event, memberList, setEvent, idx, showDeleteButton, setShowDeleteButton, selectForDeleteHandler}) => {

  const [ showEditor, setShowEditor ] = useState(event.callList[idx].editMode)
  const [ updatedEntry, setUpdatedEntry ] = useState( { name: event.callList[idx].name,
                                                        position: event.callList[idx].position,
                                                        editMode: event.callList[idx].editMode
                                                      })

  // JOB CATEGORIES                       
  const jobs = ["tech", "chef", "lx", "head-lx", "audio", "head-audio", "video"]

  // HANDLER #1 
  // sets database, modifies EVENT STATE
  // sets EDITMODE => false
  const dbUpdateEditModeFalse = () => {
    console.log("This is what we're updating, should be false", updatedEntry)
    let target = {...updatedEntry, editMode: false } 
    fetch(`${REACT_APP_URL_BASE}/callList/${event._id}`, {
      "method": "PATCH",
      "body": JSON.stringify({
        "index": idx,
        "updatedEntry": target
      }),
        "headers": {
          "Content-Type": "application/json"
        }
    })
      .then(res => res.json())
      .then(res => setEvent(res.data))
  }

  // HANDLER #2
  // sets database, does not modify EVENT STATE
  // sets EDITMODE => true
  const dbUpdateEditModeTrue = () => {
    // console.log("This is what we're updating, should be true", updatedEntry)
    let target = {...updatedEntry, editMode: true } 
    fetch(`${REACT_APP_URL_BASE}/callList/${event._id}`, {
      "method": "PATCH",
      "body": JSON.stringify({
        "index": idx,
        "updatedEntry": target
      }),
        "headers": {
          "Content-Type": "application/json"
        }
    })
    // .then(res => res.json())
    // .then(res => setEvent(res.data))
  }

  // HANDLER #3 
  // sets database, does not modify EVENT STATE
  const setStateHookShouldSupportCALLBACKS = (updatedValue, fieldName) => {
    let target = {...updatedEntry, [fieldName]: updatedValue }
    // console.log("This is what we're updating, setStateHookShouldSupportCALLBACKS", target)
    fetch(`${REACT_APP_URL_BASE}/callList/${event._id}`, {
      "method": "PATCH",
      "body": JSON.stringify({
        "index": idx,
        "updatedEntry": target
      }),
        "headers": {
          "Content-Type": "application/json"
        }
    })
  }

  // Runs the delete handler from parent component CallListDetail
  // This is cleaner to have it here because it's a long ass invocation.
  const deleteHandlerSpecial = () => {
    selectForDeleteHandler(`${updatedEntry.position}: ${updatedEntry.name}`, idx)
  }

  // Does stuff when you click on it.
  const clickHandler = () => {
    setUpdatedEntry( {...updatedEntry, editMode: true })
    dbUpdateEditModeTrue()
    setShowEditor(true)
  }

  // Does stuff when you click save button.
  const saveClickHandler = () => {
    setUpdatedEntry( {...updatedEntry, editMode: false })
    dbUpdateEditModeFalse()
    setShowEditor(false)
  }

  // Does stuff whenever you change a field.
  const handleChange = (ev, fieldName) => {
    let updatedValue = ev.currentTarget.value
    setUpdatedEntry( {...updatedEntry, [fieldName]: updatedValue } )
    setStateHookShouldSupportCALLBACKS( updatedValue, fieldName )
  }

  // JSX RETURN
  return (
    <Container>
      { ! showEditor
        ? // DISPLAY POSITION
          <>
            <CallListPositionWrapper onClick={clickHandler}>
              <InnerText>{`${updatedEntry.position}: ${updatedEntry.name}`}</InnerText>
            </CallListPositionWrapper>
            { showDeleteButton ? <Delete onClick={deleteHandlerSpecial}>Delete</Delete> : null  }
          </>
        : // EDIT THE POSITION
          <>
            <CallListPositionWrapper>
              <PositionSelect onChange={ (ev)=> handleChange(ev, "position") } value={updatedEntry.position}>
                {jobs.map(position => <SelectOption value={position} key={uuidv4()}>{position}</SelectOption>)}
              </PositionSelect>
              <NameSelect onChange={ (ev)=> handleChange(ev, "name") } value={updatedEntry.name}>
                  <SelectOption value={"unfilled"}>unfilled</SelectOption>
                  { ! memberList
                    ? null
                    : memberList.map ( member => <SelectOption value={member.name} key={uuidv4()}>{member.name}</SelectOption> ) 
                  }
              </NameSelect>
              <SaveButton onClick={saveClickHandler} className={"float-right"} >Save</SaveButton>
            </CallListPositionWrapper>
            { showDeleteButton ? <Delete onClick={deleteHandlerSpecial}>Delete</Delete> : null }
          </>
      }
    </Container>
  )
}

// CONTAINER
const Container = styled.div`
  display: flex;
  justify-content: start;
  height: 30px;
  width: 400px;
  margin: 5px 0px;
`

// WRAPPER - CAN WE JUST MAKE ONE OF THESE INSTEAD OF TWO?
const CallListPositionWrapper = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 30px;
  width: 290px;
  list-style: none;
  background-color: #395980;
  border-radius: 10px;

  &:hover{
    cursor: pointer;
    background-color: #B0BDCC;
    color: white;
  }
`
const InnerText = styled.div`
  padding-left: 10px;
  font-weight: 600;
`

// EDIT MODE STUFF
const PositionSelect = styled.select`
  margin-left: 10px;
  width: 60px;
`
const NameSelect = styled.select`
  margin-left: 5px;
  width: 160px;
`
const SelectOption = styled.option`
`
const SaveButton = styled.button`
  margin: 5px 4px 5px 0px;
  width: auto;
  border-radius: 5px;
  &.float-right{
    margin-left: auto;
  }
`

// INDIVIDUAL DELETE BUTTON
const Delete = styled.button`
  height: 20px;
  border-radius: 5px;
  width: 80px;
  margin-left: 10px;
  position: relative;
  top: 5px;
`

export default CallListPosition