import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CallListPosition = ({name, position, id, eventId, eventCallList, event, idx, memberList}) => {
  
  
  const [ showAddMember, setShowAddMember ] = useState(false)
  const [ callList, setCallList ] = useState(eventCallList)
  
  const clickHandler = () => {
    setShowAddMember(!showAddMember)
  }

  // On change - update this specific callListPosition with a name selected from
  // the addMember dropdown.
  const changeHandler = async (ev) => {
    console.log("When you change the thing the changehandler says this is the ev.currentTarget.value", ev.currentTarget.value)
    let modifiedEntry = {...callList[idx], name: ev.currentTarget.value}
    console.log("This is the callList:", callList)
    console.log("This is the specific idx", callList[idx])
    console.log("This is the modified entry:", modifiedEntry)

    await setCallList(callList.map( (entry, i) => i === idx ? modifiedEntry : entry ))

    console.log("Look at me I am the calllist now:", callList)

    console.log("event id", eventId)
    fetch(`/calendar/${eventId}`, {
      "method": "PATCH",
      "body": JSON.stringify({
        "data": {...event, callList: callList }
      }),
      "headers": {
        "Content-Type": "application/json"
      }
    })
  }

  return (
    <Container key={id} >
      <CallListPositionWrapper onClick={clickHandler}>
        <InnerText>{`${position}: ${name}`}</InnerText>
      </CallListPositionWrapper>
      { ! showAddMember
        ? null
        : <>
          {
            ! memberList
            ? null
            : <AddMember onChange={changeHandler}>
                {console.log("MemberList:>:", memberList)}
                <Member value={"unfilled"}></Member>
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
  width: 600px;
  * {
    margin: 5px;
  }
`

const CallListPositionWrapper = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 30px;
  width: 380px;
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
`

const AddMember = styled.select`
`

const Member = styled.option`
`

export default CallListPosition