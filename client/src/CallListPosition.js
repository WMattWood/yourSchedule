import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const CallListPosition = ({name, position, id, eventId, callList, event, idx}) => {
  
  const [ memberList, setMemberList ] = useState(null)
  const [ showAddMember, setShowAddMember ] = useState(false)
  const [ modifiedCallList, setModifiedCallList ] = useState(callList)
  
  const clickHandler = () => {
    setShowAddMember(!showAddMember)
  }

  // On change - update this specific callListPosition with a name selected from
  // the addMember dropdown.
  const changeHandler = (ev) => {
    console.log("When you change the thing the changehandler says this is the ev.currentTarget.value", ev.currentTarget.value)
    let modifiedEntry = {...modifiedCallList[idx], name: ev.currentTarget.value}
    
    setModifiedCallList(modifiedCallList.map( (entry, i) => i === idx ? modifiedEntry : entry ))

    // let meep = modifiedCallList.map( (entry, i) => {
    //       if (i === idx) {
    //         return modifiedEntry
    //       } else {
    //         return entry 
    //       }
    //     }
    //   ) 
    // setModifiedCallList(meep)

    fetch(`calendar/${eventId}`, {
      "method": "POST",
      "body": JSON.stringify({
        "data": {...event, callList: modifiedCallList }
      }),
      "headers": {
        "Content-Type": "application/json"
      }
    })
  }

  useEffect( () => { fetch(`/members/allmembers`)
    .then(res => res.json() )
    .then(res => {
      // let listToDisplay = res.data
      // listToDisplay.shift({ name: "unfilled" })
      // setMemberList(listToDisplay)
      setMemberList(res.data)
    })
}, [modifiedCallList] )

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