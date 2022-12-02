import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CallListPosition = ({event, idx, memberList, setEvent, editMode, globalEdit, setGlobalEdit}) => {

  const [ showEditor, setShowEditor ] = useState(event.callList[idx].editMode)
  const [ updatedEntry, setUpdatedEntry ] = useState( { name: event.callList[idx].name,
                                                        position: event.callList[idx].position,
                                                        editMode: event.callList[idx].editMode
                                                      })

  const jobs = ["tech", "chef", "lx", "head-lx", "audio", "head-audio", "video"]

  const toggleEditor = () => {
    setShowEditor(!showEditor)
  }

  const updateCallList = () => {
    fetch(`/callList/${event._id}`, {
      "method": "PATCH",
      "body": JSON.stringify({
        "index": idx,
        "updatedEntry": updatedEntry
      }),
        "headers": {
          "Content-Type": "application/json"
        }
    })
  }

  const saveClickHandler = () => {
    updateCallList()
    toggleEditor()
  }

  const handleChange = (ev, fieldName) => {
    let updatedValue = ev.currentTarget.value
    setUpdatedEntry( {...updatedEntry, [fieldName]: updatedValue })
  }

  useEffect( () => {
    if ( ! globalEdit ) { 
      console.log("beep")
      updateCallList() 
    }
    setShowEditor(globalEdit)
  }, [globalEdit])

  useEffect( () => {
    if (event.callList.every( entry => !entry.editMode )) { setGlobalEdit(false) }
  }, [])
  // const changePositionHandler = async (ev) => {
  //   // let position = ev.currentTarget.value
  //   // setMiniForm( {...miniForm, position: position})

  //   let job = ev.currentTarget.value

  //   let mostUpToDateList = await fetch(`/calendar/${event._id}`)
  //                                   .then(res => res.json() )
  //                                   .then(res => res.data.callList)

  //   let modifiedEntry = {...mostUpToDateList[idx], position: job}

  //   mostUpToDateList[idx] = modifiedEntry

  //   fetch(`/calendar/${event._id}`, {
  //     "method": "PATCH",
  //     "body": JSON.stringify({
  //       "data": {...event, callList: mostUpToDateList }
  //     }),
  //     "headers": {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json() )
  //     .then(res => setEvent(res.data) )
    
  // }

  // const changeNameHandler = async (ev) => {
  //   // let name = ev.currentTarget.value
  //   // setMiniForm( {...miniForm, name: name})

  //   let name = ev.currentTarget.value

  //   let mostUpToDateList = await fetch(`/calendar/${event._id}`)
  //                                   .then(res => res.json() )
  //                                   .then(res => res.data.callList)

  //   let modifiedEntry = {...mostUpToDateList[idx], name: name}

  //   mostUpToDateList[idx] = modifiedEntry

  //   fetch(`/calendar/${event._id}`, {
  //     "method": "PATCH",
  //     "body": JSON.stringify({
  //       "data": {...event, callList: mostUpToDateList }
  //     }),
  //     "headers": {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json() )
  //     .then(res => setEvent(res.data) )
  // }

  // const clickHandler = async () => {
  //   // setLocalEdit(!localEdit)
  //   let mostUpToDateList = await fetch(`/calendar/${event._id}`)
  //                                   .then(res => res.json() )
  //                                   .then(res => res.data.callList)

  //   let newEntry = mostUpToDateList[idx]
  //   newEntry.editMode = true

  //   mostUpToDateList[idx] = newEntry

  //   fetch(`/calendar/${event._id}`, {
  //     "method": "PATCH",
  //     "body": JSON.stringify({
  //       "data": {...event, callList: mostUpToDateList }
  //     }),
  //     "headers": {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json() )
  //     .then(res => setEvent(res.data) )

  // }

  // // On change - update this specific callListPosition with a name selected from
  // // the addMember dropdown.
  // const submitHandler = async (ev) => {
  //   ev.preventDefault()
  //   submitFormToUpperManagement()
  // }

  // const submitFormToUpperManagement = async () => {

  //   let mostUpToDateList = await fetch(`/calendar/${event._id}`)
  //                                   .then(res => res.json() )
  //                                   .then(res => res.data.callList)

  //   let newEntry = mostUpToDateList[idx]
  //   newEntry.editMode = false

  //   mostUpToDateList[idx] = newEntry

  //   // if ( miniForm.name === null && miniForm.position === null ) {
  //   //   setLocalEdit(!localEdit)
  //   //   return;
  //   // } else if ( miniForm.name === null ) {
  //   //   newEntry = {...newEntry, position: miniForm.position}
  //   // } else if ( miniForm.position === null ) {
  //   //   newEntry = {...newEntry, name: miniForm.name}
  //   // } else {
  //   //   newEntry = miniForm
  //   // }

  //   //   newEntry.editMode = false
  //   // mostUpToDateList[idx] = newEntry

  //   fetch(`/calendar/${event._id}`, {
  //     "method": "PATCH",
  //     "body": JSON.stringify({
  //       "data": {...event, callList: mostUpToDateList }
  //     }),
  //     "headers": {
  //       "Content-Type": "application/json"
  //     }
  //   })
  //     .then(res => res.json() )
  //     .then(res => setEvent(res.data) )
  // }

  return (
    <Container>
      { ! showEditor
        ? // DISPLAY POSITION
          <CallListPositionWrapper onClick={toggleEditor}>
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