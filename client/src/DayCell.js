import styled from "styled-components"
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import { useNavigate} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid'

const DayCell = ({numberMarker, selectedStatus, eventArray}) => {

  const { setModalVisibility, activeDate, setActiveDate } = useContext(CalendarContext)
  const navigate = useNavigate()

  const formattedEventName = ( eventName ) => {
    // You can modify how many chars are displayed with the splitPoint variable
    const splitPoint = 12
    return eventName.length > splitPoint 
    ? eventName.slice(0, splitPoint) + "..." 
    : eventName
  }

  const determineEventStatus = ( callList ) => {
    return callList.every(el => el.name !== 'unfilled' ) 
    ? "eventFull"  
    : "eventPending"
  }

  const clickHandler = () => {
    // onClick - make modal visible and set the modal's date to match the currently displayed calendar date
    // but only do this if you click on a box that actually has a numberMarker.
    //..... also makes the current active date into that selected day
    setModalVisibility(true)
    if ( parseInt(numberMarker) ) {
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
            // display an EventBand for each event in the array (up to 3) and set the event
            // status to either "eventFull" or "eventPending"
            ! eventArray
            ? null
            : eventArray.map( event => {
                return (
                  <EventBand className={determineEventStatus(event.callList)} onClick={ (ev) => handleNav(ev, event)} key={uuidv4()}>
                    <BandSpan>{formattedEventName(event.name)}</BandSpan>
                  </EventBand>
                )
              }) 
          }
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
  border: 2px solid var(--border-blank);
  background-color: var(--blankspace);
  transition: border 1.6s ease-out, background-color 1.6s ease-out;

  &:hover {
  border: 2px solid var(--daycell-border);
  background-color: var(--daycell-fill);
  transition: border 0.2s, background-color 0.2s;
  }

  &.selected {
    background-color: var(--daycell-fill) !important;
    transition: background-color 0.2s;
  }
`

const DayCellWrapper = styled.div`
  padding-left: 2px;
  position: relative;
  box-sizing: content-box;
  height: 96px;
  width: 96px;
  border-right: 1px solid var(--calendar-outline);
  border-bottom: 1px solid var(--calendar-outline);
`

const NumCircle = styled.div`
  position: absolute;
  top: 9px;
  left: 3px;
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
  visibility: visible;
  cursor: pointer;

  &.noevent {
    display: none;
    visibility: hidden;
    transition: visibility 1s linear;
  }
  transition: visibility 1s linear;
  &.eventPending {
    background-color: var(--day-incomplete);
    transition: background-color 1s linear;
  }

  &.eventFull {
    background-color: var(--day-completed);
    transition: background-color 1s linear;
  }

  transition: background-color 1s linear;
`

export default DayCell