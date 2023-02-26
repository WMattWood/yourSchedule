import styled from 'styled-components'
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import CalendarModule from "./CalendarModule";
import AddEventModal from "./AddEventModal";

const CalendarPage = () => {
  const { modalVisibility, setModalVisibility} = useContext(CalendarContext);

  return(
    <>
      <PageLeftRight>
        <CalendarModule/>
        { ! modalVisibility 
          ? null
          : <AddEventModal/>
        }
      </PageLeftRight>
      <AddEventButton onClick={ () => { setModalVisibility(!modalVisibility) } }>+ Add Event</AddEventButton>
    </>
  )
}

// Main page divider
const PageLeftRight = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
`
// A button to show/hide the AddEventModal
const AddEventButton = styled.button`
  margin-top: 8px;
  height: 40px;
  width: 140px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 3px;
  /* border: none; */
  box-shadow: 2px 2px;
  transition: 0.1s;
  &:active{
    box-shadow: 0px 0px;
    transition: 0.1s;
  }
`

export default CalendarPage