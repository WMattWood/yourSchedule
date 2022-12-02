import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import CallListDetail from './CallListDetail'
import EventDetail from './EventDetail'
import DateDetails from './DateDetails'

const EventDetailsPage = () => {

  const { eventId } = useParams()
  const [ event, setEvent ] = useState(null)
  const [ eventListing, setEventListing ] = useState(null)
  const [ memberList, setMemberList ] = useState(null)
  const [ editCallList, setEditCallList ] = useState(false)

  const [ globalEdit, setGlobalEdit ] = useState(false)

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
      <MainTitle>Welcome to my EventDetails!</MainTitle>
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
                    { ! globalEdit 
                      ? <EditCallListButton onClick={ ()=>{setGlobalEdit(!globalEdit)}}>Edit CallList</EditCallListButton>
                      : <SaveCallListButton onClick={ ()=>{setGlobalEdit(!globalEdit)}}>Save CallList</SaveCallListButton>
                    }
                  </CallListStatus>

                  <CallListDetail event={event} 
                                  memberList={memberList} 
                                  setEvent={setEvent} 
                                  editCallList={editCallList} 
                                  setEditCallList={setEditCallList}
                                  globalEdit={globalEdit}
                                  setGlobalEdit={setGlobalEdit}
                                  />
                  


                </EventWrapper>
            }
            { !eventListing
              ? null
              : <EventListings>
                  <BigName>Upcoming Events...</BigName>
                  <IdsWrapper>
                    { eventListing.map( event =>  {
                                                    return (<QuickLinkWrapper key={event._id} onClick={ () => handleIdNav(event._id) }>
                                                              <SubHeadingWrapper>
                                                                <IdTitle>{`${event.name} @ `}</IdTitle>
                                                                <TheIdItself >{event.location}</TheIdItself>
                                                              </SubHeadingWrapper>
                                                              <SubHeadingWrapper>
                                                                <IdTitle>id:</IdTitle>
                                                                <TheIdItself >{event._id}</TheIdItself>
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
  /* * {
    margin: 5px 0px;
  } */

  width: 406px;
  padding: 5px;
  height: 70vh;
  border-radius: 5px;
  background-image: radial-gradient(circle, #5c0067 0%, #00d4ff 100%);
  border: 3px solid black;
  /* background-color: #598039; */
`

const EventDetailWrapper = styled.div`
  /* margin: 5px 0px; */
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
  margin: 5px 0px;
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
  margin: 5px 0px;
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
  padding: 8px;
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

const EditCallListButton = styled.button`
  width: 90px;
  height: 26px;
  border-radius: 5px;
  margin: 6px 5px;
`

const SaveCallListButton = styled.button`
  width: 120px;
  height: 26px;
  border-radius: 5px;
  margin: 6px 5px;
  font-weight: 600;
  background-color: #395980;
  border-radius: 10px;

  /* &:hover{
    cursor: pointer;
    background-color: #B0BDCC;
    color: white;
  } */
`


export default EventDetailsPage