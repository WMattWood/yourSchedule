import styled from 'styled-components'
import { useState } from 'react'
import CalendarModuleHybrid from "./CalendarModuleHybrid";
import AddEventModal from "./AddEventModal";

const CalendarPage = () => {

  const [ modalVisibility, setModalVisibility ] = useState(false)
  const [ activeDate, setActiveDate ] = useState(new Date());
  console.log("This is what the activeDate looks like", activeDate)
  
  const toggleModal = () => { setModalVisibility(!modalVisibility) }

  return(
    <>
      <h1>Welcome to my CalendarPage!</h1>
      <CalendarModuleHybrid toggleModal={toggleModal} 
                            activeDate={activeDate} 
                            setActiveDate={setActiveDate} 
                            modalVisibility={modalVisibility} 
                            setModalVisibility={setModalVisibility}></CalendarModuleHybrid>
      <ModalHolder>
      { 
        ! modalVisibility 
        ? null
        : <AddEventModal toggleModal={toggleModal} activeDate={activeDate} setActiveDate={setActiveDate}/>
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