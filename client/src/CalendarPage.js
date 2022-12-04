import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import CalendarModule from "./CalendarModule";
import AddEventModal from "./AddEventModal";

const CalendarPage = () => {

  const { modalVisibility, setModalVisibility} = useContext(CalendarContext);
  const [ errorWindow, setErrorWindow ] = useState(false)
  // console.log("This is what the activeDate looks like", activeDate)

  const errorPopup = () => {
    setErrorWindow(!errorWindow)
  }

  return(
    <>
      {/* <h1>Welcome to my CalendarPage!</h1> */}
      <CalendarModule></CalendarModule>
      { 
        ! errorWindow
        ? null
        : <ErrorDialog open>
            <p>The CallList must have at least 1 person.</p>
            <form method="dialog">
              <button onClick={errorPopup}>OK</button>
            </form>
          </ErrorDialog>
      }
      <ModalHolder>
      { 
        ! modalVisibility 
        ? null
        : <AddEventModal errorPopup={errorPopup}/>
      }
      </ModalHolder>
      <AddEventButton onClick={ () => { setModalVisibility(!modalVisibility) } }>+ Add Event</AddEventButton>
    </>
  )
}

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

const ModalHolder = styled.div`
  position: absolute;
  left: 800px;
  top: 240px;
`
const AddEventButton = styled.button`
  height: 40px;
  width: 140px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 10px;
`

export default CalendarPage