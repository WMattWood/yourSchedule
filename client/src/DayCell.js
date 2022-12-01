import styled from "styled-components"
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { useNavigate, useParams } from "react-router-dom";

const DayCell = ({numberMarker, selectedStatus, eventArray}) => {

  const { setModalVisibility, activeDate, setActiveDate, formData, setFormData  } = useContext(CalendarContext)
  const navigate = useNavigate()

  const clickHandler = () => {
    // onClick - make modal visible and set the modal's date to match the currently displayed calendar date
    // but only do this if you click on a box that actually has a numberMarker.
    //..... also makes the current active date into that selected day
    setModalVisibility(true)
    if ( parseInt(numberMarker) ) {
      // setFormData( { ...formData, 
      //                   dateYear: activeDate.getFullYear(), 
      //                   dateMonth: activeDate.getMonth(), 
      //                   dateDay: numberMarker 
      //               }) 
      setActiveDate( new Date(activeDate.getFullYear(), activeDate.getMonth(), numberMarker ) ) 
    }
  }

  const handleNav = (ev, actualEvent) => {
    ev.stopPropagation()
    navigate(`/event/${actualEvent._id}`)
  }

  return (
    <Container onClick={clickHandler} className={selectedStatus}>
      <DayCellWrapper>
        <NumCircle>{numberMarker}</NumCircle>
        <EventsBox>
          { // map through eventArray which is any events that were found on the current day
            ! eventArray
            ? null
            : eventArray.map( event => {
                // You can modify how many chars are displayed with the splitPoint variable
                const splitPoint = 12
                // Set a 10 character name to display on the EventBand
                let parsedName = event.name 
                if (parsedName.length > splitPoint ) {
                  parsedName = parsedName.slice(0, splitPoint) + "..."
                }

                let eventStatus = ""
                if (event.callList.every(el => el.name !== 'unfilled' )){
                  eventStatus = "eventFull"
                } else {
                  eventStatus = "eventPending"
                }

                return (
                  <EventBand className={eventStatus} onClick={ (ev) => handleNav(ev, event)}>
                    <BandSpan>{parsedName}</BandSpan>
                  </EventBand>
                )
              }) 
          }
          {/* <EventBand className={eventStatus}></EventBand>
          <EventBand className={eventStatus}></EventBand>
          <EventBand className={eventStatus}></EventBand> */}
        </EventsBox>
      </DayCellWrapper>
    </Container>
  )
}


const Container = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;
  height: 100px;
  width: 100px;
  box-sizing: border-box;
  border: 2px solid white;
  background-color: white;
  transition: border 1.6s ease-out, background-color 1.6s ease-out;

  &:hover {
  border: 2px solid #59CBE8;
  background-color: #D0EBF1;
  transition: border 0.2s, background-color 0.2s;
  }

  &.selected {
    background-color: #F5D2D4 !important;
    transition: background-color 0.2s;
  }
`

const DayCellWrapper = styled.div`
  /* display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start; */
  padding-left: 2px;
  position: relative;
  box-sizing: content-box;
  height: 96px;
  width: 96px;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
`

const NumCircle = styled.div`
  position: absolute;
  top: 9px;
  left: 3px;
  /* height: 30px; */
  /* width: 30px; */
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

// EVENT BANDS - Green for filled, Purple for unfilled
const EventsBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 30px;
  height: 70%;
  width: 100%;
`
const BandSpan = styled.div`
  font-size: 12px;
  padding-left: 3px;
`
const EventBand = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  top: 0px;
  width: 96%;
  height: 30%;
  margin-bottom: 2%;
  /* opacity: 0.6; */
  visibility: visible;
  cursor: pointer;

  &.noevent {
    display: none;
    visibility: hidden;
    transition: visibility 1s linear;
  }
  transition: visibility 1s linear;
  &.eventPending {
    background-color: #C09CBE;
    transition: background-color 1s linear;
  }

  &.eventFull {
    background-color: #9CC09E;
    transition: background-color 1s linear;
  }

  transition: background-color 1s linear;
`

export default DayCell