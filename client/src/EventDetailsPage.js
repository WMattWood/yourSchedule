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
      <MainTitle>Welcome to my EventDetails !</MainTitle>
      { eventId === "meep"
        ? <h1>No events listed yet.</h1>
        : <PageLeftRight>
            { !event
              ?<Title>Loading events...</Title>
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
                </EventWrapper>
            }
            { !eventListing
              ? null
              : <EventListings>
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
                </EventListings>
            }
          </PageLeftRight>
      
      }
      
    </>
  )
}

const PageLeftRight = styled.div`
  display: flex;
  justify-content: space-between;
`

const MainTitle = styled.h1`
`

const Title = styled.h1`
  width: 100%;
  margin: 0px;
  /* color: white; */
`
const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  * {
    margin: 5px 0px;
  }

  width: 406px;
  padding: 5px;
  height: 70vh;
  border-radius: 5px;
  background-image: radial-gradient(circle, #5c0067 0%, #00d4ff 100%);
  border: 3px solid black;
  /* background-color: #598039; */
`
const BigName = styled.div`
  font-size: 28px;
  font-weight: bold;
  width: 75%;
  margin: 5px 0px;
  border-bottom: 3px solid black;
  padding-bottom: 2px;
`


// MOVED TO EVENTDETAIL
const CallListStatus = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  /* height: 40px; */
  width: 99%;
  background: white;
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px black;
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




const EventListings = styled.div`
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
export default EventDetailsPage