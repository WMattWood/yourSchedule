import styled from "styled-components"
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";

const DayCell = ({numberMarker, selectedStatus, eventStatus}) => {

  const { setModalVisibility, activeDate, setActiveDate, formData, setFormData  } = useContext(CalendarContext)

  const clickHandler = () => {
    // onClick - make modal visible and set the modal's date to match the currently displayed calendar date
    // but only do this if you click on a box that actually has a numberMarker.
    //..... also makes the current active date into that selected day
    setModalVisibility(true)
    if ( parseInt(numberMarker) ) {
      setFormData( { ...formData, 
                        dateYear: activeDate.getFullYear(), 
                        dateMonth: activeDate.getMonth(), 
                        dateDay: numberMarker 
                    }) 
      setActiveDate( new Date(activeDate.getFullYear(), activeDate.getMonth(), numberMarker ) ) 
    }
  }

  return (
    <Container onClick={clickHandler} className={selectedStatus}>
      <DayCellWrapper>
        <NumCircle>{numberMarker}</NumCircle>
        <EventBand className={eventStatus}></EventBand>
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
  cursor: pointer;
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
  display: flex;
  align-items: start;
  justify-content: start;
  box-sizing: content-box;
  height: 96px;
  width: 96px;
  border-right: 1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
`

const NumCircle = styled.div`
  position: relative;
  top: 12px;
  left: 12px;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const EventBand = styled.div`
  position: relative;
  top: 0px;
  width: 100%;
  height: 30px;
  opacity: 0.6;
  &.noevent {
    /* display: none; */
    visibility: hidden;
  }

  &.eventPending {
    color: red;
  }

  &.eventFull {
    color: green;
  }
`

export default DayCell