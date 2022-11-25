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
  * {
    width: 240px;
  }
`
const BigName = styled.div`
  font-size: 28px;
  font-weight: bold;
`
const DisplayedField = styled.div`
  /* position: relative;
  top: 2px; */
  padding: 4px 12px;
  font-size: 18px;
  font-weight: 200;
`
const EditButton = styled.button`
  margin-left: 20px;
  width: auto;
`

export default EventDetailsPage