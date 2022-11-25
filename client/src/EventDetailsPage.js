import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const EventDetailsPage = () => {

  const { eventId } = useParams()
  const [ event, setEvent ] = useState(null)
  const [ eventListing, setEventListing ] = useState(null)
  
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

  const handleIdNav = (id) => {
    navigate(`/event/${id}`)
    navigate(0)
  }


  console.log(eventId)
  return (
    <>
      <Title>Welcome to my EventDetails !</Title>
      <PageLeftRight>
      { !event
        ?<Title>Loading event...</Title>
        : <EventWrapper>
            <BigName>{event.name}</BigName>
            <FieldWrapper>
              <DisplayedField>Event Name: {event.name}</DisplayedField> <EditButton>Edit</EditButton>
            </FieldWrapper>
            <FieldWrapper>
              <DisplayedField>Location: {event.location}</DisplayedField><EditButton>Edit</EditButton>
            </FieldWrapper>
            <FieldWrapper>
              <DisplayedField>Date: {event.date}</DisplayedField><EditButton>Edit</EditButton>
            </FieldWrapper>
            <FieldWrapper>
              <DisplayedField>CallList: TBD</DisplayedField><EditButton>Edit</EditButton>
            </FieldWrapper>
          </EventWrapper>
      }
      { !eventListing
        ?<Title>Loading eventlistings...</Title>
        : <SubListing>
            <BigName>_________________________________</BigName>
            <IdsWrapper>
              { eventListing.map( event =>  {
                                              return (<QuickLinkWrapper key={event._id}>
                                                        <IdTitle>id:</IdTitle>
                                                        <TheIdItself onClick={ () => handleIdNav(event._id) }>{event._id}</TheIdItself>
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
const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  background: grey;
  border-radius: 10px;
`
const BigName = styled.div`
  font-size: 28px;
  font-weight: bold;
`
const DisplayedField = styled.div`
  padding: 4px 12px;
  font-size: 18px;
  font-weight: 200;
  width: 300px;
`
const EditButton = styled.button`
  margin-left: 10px;
  width: auto;
  border-radius: 5px;
`



const PageLeftRight = styled.div`
  display: flex;
  justify-content: space-between;
`

const SubListing = styled.div`
  height: 800px;
  width: 600px;
`
const IdsWrapper = styled.div`
  margin-top: 20px;
`
const QuickLinkWrapper = styled.div`
  display: flex;
  margin-bottom: 8px;
  &:hover {
    cursor: pointer;
    color: goldenrod;
    transition: color 0.1s ;
  }
`
const IdTitle = styled.div`
  font-weight: bold;
  width: 30px;
`
const TheIdItself = styled.a`
  width: 500px;
`

export default EventDetailsPage