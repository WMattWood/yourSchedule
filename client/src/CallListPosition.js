import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CallListPosition = ({eventId, event, idx, memberList, setEvent, eventCallList, editCallList, setEditCallList}) => {
  
  const [ showAddMember, setShowAddMember ] = useState(false)
  const jobs = ["tech", "chef", "lx", "head-lx", "audio", "head-audio", "video"]


  const changeJobHandler = async (ev) => {
    let job = ev.currentTarget.value

    let mostUpToDateList = await fetch(`/calendar/${eventId}`)
                                    .then(res => res.json() )
                                    .then(res => res.data.callList)

    let modifiedEntry = {...mostUpToDateList[idx], position: job}

    mostUpToDateList[idx] = modifiedEntry

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

  const changeNameHandler = async (ev) => {
    let name = ev.currentTarget.value

    let mostUpToDateList = await fetch(`/calendar/${eventId}`)
                                    .then(res => res.json() )
                                    .then(res => res.data.callList)

    let modifiedEntry = {...mostUpToDateList[idx], name: name}

    mostUpToDateList[idx] = modifiedEntry

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

  const clickHandler = () => {
    setShowAddMember(!showAddMember)
  }

  const saveClickHandler = () => {
    setEditCallList(!editCallList)
  }

  // On change - update this specific callListPosition with a name selected from
  // the addMember dropdown.
  const changeHandler = async (ev) => {
    let name = ev.currentTarget.value

    let mostUpToDateList = await fetch(`/calendar/${eventId}`)
                                    .then(res => res.json() )
                                    .then(res => res.data.callList)

    let modifiedEntry = {...mostUpToDateList[idx], name: name}

    mostUpToDateList[idx] = modifiedEntry

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

    setShowAddMember(!showAddMember)
  }

  return (
    <>
    { ! editCallList
      ? <Container>
          <CallListPositionWrapper onClick={clickHandler}>
            <InnerText>{`${eventCallList[idx].position}: ${eventCallList[idx].name}`}</InnerText>
          </CallListPositionWrapper>
          { ! showAddMember
            ? null
            : <>
              {
                ! memberList
                ? null
                : <AddMember onChange={changeHandler}>
                    <Member value={"unfilled"}>unfilled</Member>
                    {memberList.map ( member => <Member value={member.name} key={uuidv4()} selected={member.name === eventCallList[idx].name ? "selected" : null}>{member.name}</Member> ) }
                  </AddMember>
              }
              </>
          }
          
        </Container>
      : <Container>
          <CallListPositionWrapper>
            <JobSelect onChange={changeJobHandler}>
              {jobs.map(jobber => <JobOption value={jobber} key={uuidv4()} selected={jobber === eventCallList[idx].position ? "selected" : null}>{jobber}</JobOption>)}
              {/* <JobOption>tech</JobOption>
              <JobOption>chef</JobOption>
              <JobOption>lx</JobOption>
              <JobOption>head-lx</JobOption>
              <JobOption>audio</JobOption>
              <JobOption>head-audio</JobOption>
              <JobOption>video</JobOption> */}
            </JobSelect>
            <NameSelect onChange={changeNameHandler}>
                <NameOption value={"unfilled"}>unfilled</NameOption>
                {memberList.map ( member => <NameOption value={member.name} key={uuidv4()} selected={member.name === eventCallList[idx].name ? "selected" : null}>{member.name}</NameOption> ) }
            </NameSelect>
            <SaveButton onClick={saveClickHandler} className={"float-right"}>Save</SaveButton>
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

const AddMember = styled.select`
  position: relative;
  margin-left: 10px;
  top: 5px;
  width: 80px;
  height: 20px;
`

const Member = styled.option`
`

const JobSelect = styled.select`
  margin-left: 10px;
`
const JobOption = styled.option`
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