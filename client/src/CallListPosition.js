import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CallListPosition = ({eventId, event, idx, memberList, setEvent, eventCallList, editCallList, setEditCallList, globalEdit, setGlobalEdit}) => {
  
  const [ localEdit, setLocalEdit ] = useState()
  const [ miniForm, setMiniForm ] = useState({ name: null, position: null })

  const jobs = ["tech", "chef", "lx", "head-lx", "audio", "head-audio", "video"]

  const changePositionHandler = async (ev) => {
    let position = ev.currentTarget.value
    setMiniForm( {...miniForm, position: position})

    // let job = ev.currentTarget.value

    // let mostUpToDateList = await fetch(`/calendar/${eventId}`)
    //                                 .then(res => res.json() )
    //                                 .then(res => res.data.callList)

    // let modifiedEntry = {...mostUpToDateList[idx], position: job}

    // mostUpToDateList[idx] = modifiedEntry

    // fetch(`/calendar/${eventId}`, {
    //   "method": "PATCH",
    //   "body": JSON.stringify({
    //     "data": {...event, callList: mostUpToDateList }
    //   }),
    //   "headers": {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => res.json() )
    //   .then(res => setEvent(res.data) )
    
  }

  const changeNameHandler = async (ev) => {
    let name = ev.currentTarget.value
    setMiniForm( {...miniForm, name: name})
    // let name = ev.currentTarget.value

    // let mostUpToDateList = await fetch(`/calendar/${eventId}`)
    //                                 .then(res => res.json() )
    //                                 .then(res => res.data.callList)

    // let modifiedEntry = {...mostUpToDateList[idx], name: name}

    // mostUpToDateList[idx] = modifiedEntry

    // fetch(`/calendar/${eventId}`, {
    //   "method": "PATCH",
    //   "body": JSON.stringify({
    //     "data": {...event, callList: mostUpToDateList }
    //   }),
    //   "headers": {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(res => res.json() )
    //   .then(res => setEvent(res.data) )
  }

  const clickHandler = () => {
    setLocalEdit(!localEdit)
  }

  // On change - update this specific callListPosition with a name selected from
  // the addMember dropdown.
  const submitHandler = async (ev) => {
    ev.preventDefault()
    submitFormToUpperManagement()
  }

  useState( () => {
    setLocalEdit(globalEdit)
  }, [globalEdit] )

  const submitFormToUpperManagement = async () => {
    let mostUpToDateList = await fetch(`/calendar/${eventId}`)
                                    .then(res => res.json() )
                                    .then(res => res.data.callList)

    let newEntry = mostUpToDateList[idx]

    if ( miniForm.name === null && miniForm.position === null ) {
      setLocalEdit(!localEdit)
      return;
    } else if ( miniForm.name === null ) {
      newEntry = {...newEntry, position: miniForm.position}
    } else if ( miniForm.position === null ) {
      newEntry = {...newEntry, name: miniForm.name}
    } else {
      newEntry = miniForm
    }

    mostUpToDateList[idx] = newEntry

    fetch(`/calendar/${eventId}`, {
      "method": "PATCH",
      "body": JSON.stringify({
        "data": {...event, callList: mostUpToDateList }
      }),
      "headers": {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json() )
      .then(res => setEvent(res.data) )
  }

  return (
    <>
    { ! localEdit
      ? // DISPLAY POSITION
        <Container>
          <CallListPositionWrapper onClick={clickHandler}>
            <InnerText>{`${eventCallList[idx].position}: ${eventCallList[idx].name}`}</InnerText>
          </CallListPositionWrapper>
        </Container>
      : // EDIT THE POSITION
        <Container>
          <CallListPositionWrapper>
            {/* <LittleForm onSubmit={ submitHandler }> */}
            
            <PositionSelect onChange={changePositionHandler} value={miniForm.position}>
              {jobs.map(position => <PositionOption value={position} key={uuidv4()}>{position}</PositionOption>)}
            </PositionSelect>
            
            <NameSelect onChange={changeNameHandler} value={miniForm.name}>
                <NameOption value={"unfilled"}>unfilled</NameOption>
                {memberList.map ( member => <NameOption value={member.name} key={uuidv4()} selected={member.name === eventCallList[idx].name ? "selected" : null}>{member.name}</NameOption> ) }
            </NameSelect>
            <SaveButton onClick={submitHandler} className={"float-right"} >Save</SaveButton>

            {/* </LittleForm> */}
          </CallListPositionWrapper>
        </Container>
    }
    </>
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
`
const PositionOption = styled.option`
`
const NameSelect = styled.select`
  margin-left: 5px;
  width: 100px;
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