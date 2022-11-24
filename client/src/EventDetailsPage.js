import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const EventDetailsPage = () => {

  const { eventId } = useParams()
  const [ event, setEvent ] = useState(null)
  
  useEffect( () => {
    fetch(`/calendar/${eventId}`)
      .then( res => res.json() )
      .then( res => setEvent(res.data))
  }, [] )

  console.log(eventId)
  return (
    <>
      <Title>Welcome to my EventDetails !</Title>
      { !event
        ?<Title>Loading event...</Title>
        : <EventWrapper>
            <FieldWrapper>
              <Name>{event.name}</Name> {/* <EditButton>Edit</EditButton> */}
            </FieldWrapper>
            <FieldWrapper>
              <Location>Location: {event.location}</Location><EditButton>Edit</EditButton>
            </FieldWrapper>
            <FieldWrapper>
              <Date>Date: {event.date}</Date><EditButton>Edit</EditButton>
            </FieldWrapper>
            <FieldWrapper>
              <CallList>CallList: TBD</CallList><EditButton>Edit</EditButton>
            </FieldWrapper>
          </EventWrapper>}
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
    margin: 5px;
  }

  width: 400px;
  height: 100vh;
  border-radius: 5px;
  /* background-color: #598039; */
`
const FieldWrapper = styled.div`
  display: flex;
  * {
    width: 160px;
  }
`
const Name = styled.div`
  font-size: 28px;
  font-weight: bold;
`
const Location = styled.div`
`
const Date = styled.div`
`
const CallList = styled.div`
`
const EditButton = styled.button`
  width: auto;
`

export default EventDetailsPage