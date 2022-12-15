import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import CalendarModule from "./CalendarModule";
import AddEventModal from "./AddEventModal";

const CalendarPage = () => {

  const { modalVisibility, setModalVisibility} = useContext(CalendarContext);
  const [ errorWindow, setErrorWindow ] = useState(false)

  const errorPopup = () => {
    setErrorWindow(!errorWindow)
  }

  return(
    <>
      <PageLeftRight>
        <CalendarModule/>
        { ! errorWindow
          ? null
          : <ErrorDialog open>
              <p>The CallList must have at least 1 person.</p>
              <form method="dialog">
                <button onClick={errorPopup}>OK</button>
              </form>
            </ErrorDialog>
        }
        { ! modalVisibility 
          ? null
          : <AddEventModal errorPopup={errorPopup}/>
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

// An error popup which displays if a user tries to submit with a CallList of 0. 
const ErrorDialog = styled.dialog`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #d3d3d3;
  border: 3px solid black;
  z-index: 2;
`

const AddEventButton = styled.button`
  height: 40px;
  width: 140px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 10px;
`

export default CalendarPage