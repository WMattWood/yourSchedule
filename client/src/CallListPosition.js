import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CallListPosition = ({event, memberList, setEvent, idx}) => {

  const [ showEditor, setShowEditor ] = useState(event.callList[idx].editMode)
  const [ updatedEntry, setUpdatedEntry ] = useState( { name: event.callList[idx].name,
                                                        position: event.callList[idx].position,
                                                        editMode: event.callList[idx].editMode
                                                      })

  const jobs = ["tech", "chef", "lx", "head-lx", "audio", "head-audio", "video"]

  // const toggleEditor = () => {
  //   setShowEditor(!showEditor)
  // }

  const dbUpdateEditModeFalse = () => {
    console.log("This is what we're updating, should be false", updatedEntry)
    let target = {...updatedEntry, editMode: false } 
    fetch(`/callList/${event._id}`, {
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

  const dbUpdateEditModeTrue = () => {
    console.log("This is what we're updating, should be true", updatedEntry)
    let target = {...updatedEntry, editMode: true } 
    fetch(`/callList/${event._id}`, {
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

  const setStateHookShouldSupportCALLBACKS = (updatedValue, fieldName) => {
    let target = {...updatedEntry, [fieldName]: updatedValue }
    console.log("This is what we're updating, setStateHookShouldSupportCALLBACKS", target)
    fetch(`/callList/${event._id}`, {
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

  const clickHandler = () => {
    setUpdatedEntry( {...updatedEntry, editMode: true })
    dbUpdateEditModeTrue()
    setShowEditor(true)
  }

  const saveClickHandler = () => {
    setUpdatedEntry( {...updatedEntry, editMode: false })
    dbUpdateEditModeFalse()
    setShowEditor(false)
  }

  const handleChange = (ev, fieldName) => {
    let updatedValue = ev.currentTarget.value
    setUpdatedEntry( {...updatedEntry, [fieldName]: updatedValue } )
    setStateHookShouldSupportCALLBACKS( updatedValue, fieldName )
  }

  return (
    <Container>
      { ! showEditor
        ? // DISPLAY POSITION
          <CallListPositionWrapper onClick={clickHandler}>
            <InnerText>{`${updatedEntry.position}: ${updatedEntry.name}`}</InnerText>
          </CallListPositionWrapper>
        : // EDIT THE POSITION
          <>
            <CallListPositionWrapper>
              <PositionSelect onChange={ (ev)=> handleChange(ev, "position") } value={updatedEntry.position}>
                {jobs.map(position => <PositionOption value={position} key={uuidv4()}>{position}</PositionOption>)}
              </PositionSelect>
              <NameSelect onChange={ (ev)=> handleChange(ev, "name") } value={updatedEntry.name}>
                  <NameOption value={"unfilled"}>unfilled</NameOption>
                  { ! memberList
                    ? null
                    : memberList.map ( member => <NameOption value={member.name} key={uuidv4()}>{member.name}</NameOption> ) 
                  }
              </NameSelect>
              <SaveButton onClick={saveClickHandler} className={"float-right"} >Save</SaveButton>
            </CallListPositionWrapper>
          </>
      }
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: start;
  height: 30px;
  width: 400px;
  margin: 5px 0px;
`

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

const LittleForm = styled.form`
`
const PositionSelect = styled.select`
  margin-left: 10px;
  width: 60px;
`
const PositionOption = styled.option`
`
const NameSelect = styled.select`
  margin-left: 5px;
  width: 160px;
`
const NameOption = styled.option`
`
const SaveButton = styled.button`
  
  margin: 5px 4px 5px 0px;
  width: auto;
  border-radius: 5px;

  &.float-right{
    margin-left: auto;
  }
`

export default CallListPosition