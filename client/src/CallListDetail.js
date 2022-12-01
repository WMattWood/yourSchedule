import styled from 'styled-components'
import CallListPosition from './CallListPosition'
import { v4 as uuidv4 } from 'uuid'

const CallListDetail = ({event, memberList, setEvent}) => {

  return (
    <>
      <CallListTitle>CallList:</CallListTitle>
      <CallListWrapper>
        <CallList>
          { event.callList.map( ( position, idx ) => <CallListPosition name={position.name} 
                                                              position={position.position}
                                                              id={position._id}
                                                              eventId={event._id}
                                                              eventCallList={event.callList}
                                                              memberList={memberList}
                                                              event={event}
                                                              setEvent={setEvent}
                                                              idx={idx}
                                                              key={uuidv4()}/>) }
        <SpaceHolderDiv/>
        </CallList>
      </CallListWrapper>
    </>
  )
}

const CallListTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  width: 75%;
  margin: 12px 0px 0px 0px;
  padding: 0px;
  /* margin: 5px 0px; */
  border-bottom: 3px solid black;
  margin-bottom: 5px;
`

const CallListWrapper = styled.div`
margin: 0px;
  background-color: white;
  border-radius: 5px;
  height: 100%; 
  width: 400px;
  overflow: hidden;
  background-image: radial-gradient(circle, #5c0067 0%, #00d4ff 100%);
  border: 3px solid black;
`

const CallList = styled.ul`
  margin: 0px 5px;
  margin-bottom: 40px;
  padding-left: 0px;
  height: 100%; 
  width: 540px;
  overflow-x: hidden; 
  overflow-y: scroll;
  padding-right: 17px; /* Increase/decrease this value for cross-browser compatibility */
  box-sizing: content-box;
`

const SpaceHolderDiv = styled.div`
  height: 50px;
`

export default CallListDetail