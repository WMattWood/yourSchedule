import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import CallListPosition from './CallListPosition'
import EventDetail from './EventDetail'
import DateDetails from './DateDetails'

const EventDetailsPage = () => {

  const { eventId } = useParams()
  const [ event, setEvent ] = useState(null)
  const [ eventListing, setEventListing ] = useState(null)
  const [ memberList, setMemberList ] = useState(null)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const navigate = useNavigate()

  useEffect( () => {
    fetch(`/calendar/${eventId}`)
      .then( res => res.json() )
      .then( res => setEvent(res.data))
  }, [] )

  useEffect( () => {
    fetch(`/calendar/allEvents`)
      .then( res => res.json() )
      .then( res => setEventListing(res.data))
  }, [] )

  useEffect( () => { 
    fetch(`/members/allmembers`)
      .then(res => res.json() )
      .then(res => {
        setMemberList(res.data)
      })
  }, [] )

  const handleIdNav = (id) => {
    navigate(`/event/${id}`)
    navigate(0)
  }

  return (
    <>
      <Title>Welcome to my EventDetails !</Title>
      <PageLeftRight>
      { !event
        ?<Title>Loading event...</Title>
        : <EventWrapper>
            <BigName>{event.name}</BigName>
            <EventDetail event={event} fieldName={"Event Name"} fieldProperty={"name"}></EventDetail>
            <EventDetail event={event} fieldName={"Location"} fieldProperty={"location"}></EventDetail>
            <EventDetail event={event} fieldName={"Client"} fieldProperty={"client"}></EventDetail>
            {/* <EventDetail event={event} fieldName={"CallList"} fieldProperty={"name"}></EventDetail> */}
            <DateDetails event={event}></DateDetails>

            <CallListStatus>
              <Status>Event Status:</Status>
              { event.callListFull
                ? <Full>FILLED</Full> 
                : <NotFull>{console.log("the event:", event)}NOT FILLED</NotFull> 
              }
            </CallListStatus>


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
          </EventWrapper>
      }
      { !eventListing
        ?<Title>Loading eventlistings...</Title>
        : <SubListing>
            <BigName>Upcoming Events...</BigName>
            <IdsWrapper>
              { eventListing.map( event =>  {
                                              return (<QuickLinkWrapper key={event._id}>
                                                        <SubHeadingWrapper>
                                                          <IdTitle>{`${event.name} @ `}</IdTitle>
                                                          <TheIdItself onClick={ () => handleIdNav(event._id) }>{event.location}</TheIdItself>
                                                        </SubHeadingWrapper>
                                                        <SubHeadingWrapper>
                                                          <IdTitle>id:</IdTitle>
                                                          <TheIdItself onClick={ () => handleIdNav(event._id) }>{event._id}</TheIdItself>
                                                        </SubHeadingWrapper>
                                                      </QuickLinkWrapper>
                                              )
                                            }
                                )
              } 
            </IdsWrapper>
          </SubListing>
      }
      </PageLeftRight>
    </>
  )
}

const PageLeftRight = styled.div`
  display: flex;
  justify-content: space-between;
`

const Title = styled.h1`
  /* color: white; */
`
const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  * {
    margin: 5px 0px;
  }

  width: 400px;
  height: 100vh;
  border-radius: 5px;
  /* background-color: #598039; */
`
const BigName = styled.div`
  font-size: 28px;
  font-weight: bold;
  width: 75%;
  margin: 5px 0px;
  border-bottom: 2px solid black;
  padding-bottom: 2px;
`


// MOVED TO EVENTDETAIL
const CallListStatus = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  background: grey;
  border-radius: 10px;
`
// const CallListStatus = styled.div`
//   display: flex;
//   align-items: center;
//   padding: 4px 12px;
//   font-size: 18px;
//   font-weight: 200;
//   width: 300px;
// `
const Status = styled.div`
  padding: 4px 12px;
  font-size: 18px;
  font-weight: 200;
  /* width: 300px; */
`
const Full = styled.div`
  /* text-shadow: 1px 1px 2px black; */
  text-shadow: 0 0 2px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
  /* text-decoration-line: underline; */
  /* text-decoration-style: double; */
  letter-spacing: 2px;
  font-size: 20px;
  font-weight: 600;
  width: 300px;
  color: #1bde23;
`
const NotFull = styled.div`
  /* text-shadow: 1px 1px 2px black; */
  text-shadow: 0 0 2px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
  /* text-decoration-line: underline; */
  /* text-decoration-style: double; */
  letter-spacing: 2px;
  font-size: 20px;
  font-weight: 600;
  width: 300px;
  color: red;
`
// const EditButton = styled.button`
//   margin-left: 10px;
//   width: auto;
//   border-radius: 5px;
// `
// const SaveButton = styled.button`
//   display: none;
//   margin-left: 10px;
//   width: auto;
//   border-radius: 5px;
// `




const SubListing = styled.div`
  height: 800px;
  width: 450px;
`
const IdsWrapper = styled.div`
  margin-top: 20px;
`
const QuickLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  &:hover {
    cursor: pointer;
    color: goldenrod;
    transition: color 0.1s ;
  }
`
const SubHeadingWrapper = styled.div`
  display: flex;
  margin-bottom: 2px;
`
const IdTitle = styled.div`
  font-weight: bold;
  white-space: nowrap;
  width: auto;
`
const TheIdItself = styled.a`
  width: 400px;
`

const CallListWrapper = styled.div`
  background-color: white;
  height: 200px; 
  width: 400px;
  overflow: hidden;
`

const CallList = styled.ul`
  margin: 5px;
  margin-bottom: 40px;
  padding-left: 0px;
  height: 200px; 
  width: 540px;
  overflow-x: hidden; 
  overflow-y: scroll;
  padding-right: 17px; /* Increase/decrease this value for cross-browser compatibility */
  box-sizing: content-box;
`

const SpaceHolderDiv = styled.div`
  height: 50px;
`
export default EventDetailsPage