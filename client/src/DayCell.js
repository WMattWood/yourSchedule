import styled from "styled-components"
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";

const DayCell = (props) => {

  const { modalVisibility, setModalVisibility, activeDate, setActiveDate, formData, setFormData  } = useContext(CalendarContext)

  const clickHandler = () => {
    setModalVisibility(true)


    if ( parseInt(props.num) ) {
      setFormData( {...formData, dateYear: activeDate.getFullYear(), dateMonth: activeDate.getMonth(), dateDay: props.num }) 
    }

  }

  return (
    <Container onClick={clickHandler} className={props.isThisSquareToday}>
      <DayCellWrapper>
        <NumCircle>{props.num}</NumCircle>
        <EventBand className={props.eventStatus}></EventBand>
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

  &:hover {
    border: 2px solid #59CBE8;
    background-color: #D0EBF1;
    transition: border 0.2s, background-color 0.2s;
  }
  border: 2px solid white;
  background-color: white;
  transition: border 1.6s ease-out, background-color 1.6s ease-out;

  &.today {
    background-color: #F5D2D4 !important;
    transition: background-color 0.2s;
    /* border-radius: 50%; */
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
  /* margin: 12px; */
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  /* &.today {
    background: #D3D3D3; 
    border-radius: 50%;
  } */

  /* &:hover {
    background-color: #9e9e9e;
  } */
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