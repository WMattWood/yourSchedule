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
      <CalendarModuleHybrid toggleModal={toggleModal}></CalendarModuleHybrid>
      <ModalHolder>
      { 
        ! visible 
        ? null
        : <AddEventModal/>
      }
      </ModalHolder>
      <AddEventButton onClick={toggleModal}>+ Add Event</AddEventButton>
    </>
  )
}

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