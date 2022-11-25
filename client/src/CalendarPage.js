import styled from 'styled-components'
import { useState } from 'react'
import CalendarModuleHybrid from "./CalendarModuleHybrid";
import AddEventModal from "./AddEventModal";

const CalendarPage = () => {

  const [ visible, setVisible ] = useState(false)

  const toggleModal = () => { setVisible(!visible) }

  return(
    <>
      <h1>Welcome to my CalendarPage!</h1>
      <CalendarModuleHybrid></CalendarModuleHybrid>
      <ModalHolder>
      { 
        ! visible 
        ? null
        : <AddEventModal/>
      }
      </ModalHolder>
      <button onClick={toggleModal}>Beep.</button>
    </>
  )
}

const ModalHolder = styled.div`
  position: absolute;
  left: 800px;
  top: 240px;
`

export default CalendarPage