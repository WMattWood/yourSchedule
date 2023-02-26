import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import CallListDetail from './CallListDetail'
import EventDetail from './EventDetail'
import DateDetails from './DateDetails'

const EventPage = () => {

  const { eventId } = useParams()
  const [ event, setEvent ] = useState(null)
  const [ eventListing, setEventListing ] = useState(null)
  const [ memberList, setMemberList ] = useState(null)
  // const [ globalEdit, setGlobalEdit ] = useState(false)
  const navigate = useNavigate()

  // Set the current event
  useEffect( () => {
    fetch(`${process.env.REACT_APP_URL_BASE}/calendar/${eventId}`)
      .then( res => res.json() )
      .then( res => setEvent(res.data))
  }, [eventId] )

  // Set the event listing on the right hand side of the page
  useEffect( () => {
    fetch(`${process.env.REACT_APP_URL_BASE}/calendar/allEvents`)
      .then( res => res.json() )
      .then( res => setEventListing(res.data))
  }, [eventId] )

  // Set the members list which will display as options for each CallListPosition
  useEffect( () => { 
    fetch(`${process.env.REACT_APP_URL_BASE}/members/allmembers`)
      .then(res => res.json() )
      .then(res => {
        setMemberList(res.data)
      })
  }, [eventId] )

  const handleIdNav = (id) => {
    navigate(`/event/${id}`)
  }

  const isCallListFull = () => {
    return event.callList.every( el => el.name !== "unfilled" )
  }

  return (
    <>
      { eventId === "uneventful"
        ? <h1>No events listed yet.</h1>
        : <PageLeftRight>
            { !event
              ? <EventTitle>Loading events...</EventTitle>
              : <LeftWrapper>
                <EventTitle>{event.name}</EventTitle>
                <EventWrapper>
                  <EventDetail event={event} fieldName={"Event Name"} fieldProperty={"name"}></EventDetail>
                  <EventDetail event={event} fieldName={"Location"} fieldProperty={"location"}></EventDetail>
                  <EventDetail event={event} fieldName={"Client"} fieldProperty={"client"}></EventDetail>
                  <DateDetails event={event}></DateDetails>
                  <CallListStatus>
                    <Status>Event Status:</Status>
                    { isCallListFull() //event.callListFull
                      ? <Full>FILLED</Full> 
                      : <NotFull>NOT FILLED</NotFull> 
                    }
                    {/* { ! globalEdit 
                      ? <EditCallListButton onClick={()=>setGlobalEdit(true)}>Edit CallList</EditCallListButton>
                      : <SaveCallListButton onClick={()=>setGlobalEdit(false)}>Save CallList</SaveCallListButton>
                    } */}
                  </CallListStatus>

                  <CallListDetail event={event} 
                                  memberList={memberList} 
                                  setEvent={setEvent} 
                                  />
                </EventWrapper>
              </LeftWrapper>
            }
            { !eventListing
              ? null
              : <EventListings>
                  <EventTitle>Upcoming Events...</EventTitle>
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

// PAGE DIVISIONS
const PageLeftRight = styled.div`
  display: flex;
  justify-content: space-between;
`
const LeftWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const EventTitle = styled.h1`
  /* border-bottom: 3px solid black; */
  margin-top: 0px;
  padding-bottom: 2px;
`
const EventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 406px;
  padding: 5px;
  height: 70vh;
  border-radius: 5px;
  background-image: radial-gradient(circle, var(--bright-color1) 0%, var(--bright-color2) 100%);
  border: 3px solid black;
`

// CALL LIST STATUS DISPLAY
const CallListStatus = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  width: 99%;
  background: var(--blankspace);
  border-radius: 5px;
  box-shadow: 1px 1px 2px 1px black;
  margin: 5px 0px;
`
const Status = styled.div`
  margin: 5px 0px;
  padding: 4px 12px;
  font-size: 18px;
  font-weight: 200;
`
const Full = styled.div`
  text-shadow: 0 0 2px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
  letter-spacing: 2px;
  font-size: 20px;
  font-weight: 600;
  width: 300px;
  color: var(--green);
`
const NotFull = styled.div`
  text-shadow: 0 0 2px black, 0 0 1px black, 0 0 1px black, 0 0 1px black;
  letter-spacing: 2px;
  font-size: 20px;
  font-weight: 600;
  width: 300px;
  color: var(--red);
`
// EVENT LISTINGS SIDE BAR
const EventListings = styled.div`
  height: 800px;
  width: 40%;
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
    text-shadow: 2px 2px goldenrod;
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

export default EventPage