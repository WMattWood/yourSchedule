import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CallListPosition = ({name, position, id, eventId, event, idx, memberList, setEvent}) => {
  
  
  const [ showAddMember, setShowAddMember ] = useState(false)
  const [ callList, setCallList ] = useState(event.callList)
  
  const clickHandler = () => {
    setShowAddMember(!showAddMember)
  }

  // On change - update this specific callListPosition with a name selected from
  // the addMember dropdown.
  const changeHandler = async (ev) => {
    const chosenName = ev.currentTarget.value
    console.log("This is the name:", chosenName)

    let mostUpToDateList = await fetch(`/calendar/${eventId}`)
                                    .then(res => res.json() )
                                    .then(res => res.data.callList)
    console.log("This is the moseUpToDateList:", mostUpToDateList)

    let modifiedEntry = {...mostUpToDateList[idx], name: chosenName}
    console.log("This is the modified entry:", modifiedEntry)

    mostUpToDateList[idx] = modifiedEntry
    console.log("This is the UPDATED moseUpToDateList:", mostUpToDateList)

    // await setCallList(callList.map( (entry, i) => i === idx ? modifiedEntry : entry ))

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
    <Container key={id} >
      { ! callList
        ? null
        : <CallListPositionWrapper onClick={clickHandler}>
            <InnerText>{`${callList[idx].position}: ${callList[idx].name}`}</InnerText>
          </CallListPositionWrapper>
      }
      { ! showAddMember
        ? null
        : <>
          {
            ! memberList
            ? null
            : <AddMember onChange={changeHandler}>
                <Member value={event.callList[idx].name}>unfilled</Member>
                {memberList.map ( member => <Member value={member.name} key={uuidv4()}>{member.name}</Member> ) }
              </AddMember>
          }
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
  * {
    margin: 5px 0px;
  }
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
  padding-left: 5px;
  top: 5px;
  width: 80px;
  height: 20px;
`

const Member = styled.option`
`

export default CallListPosition