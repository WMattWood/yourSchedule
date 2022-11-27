import styled from 'styled-components'
import { useState } from 'react'
import { useContext } from "react";
import { CalendarContext } from "./CalendarContext";
import CalendarModuleHybrid from "./CalendarModuleHybrid";
import AddEventModal from "./AddEventModal";

const CalendarPage = () => {

  const { modalVisibility, setModalVisibility} = useContext(CalendarContext);
  // console.log("This is what the activeDate looks like", activeDate)

  return(
    <>
      <h1>Welcome to my CalendarPage!</h1>
      <CalendarModuleHybrid></CalendarModuleHybrid>
      <ModalHolder>
      { 
        ! modalVisibility 
        ? null
        : <AddEventModal/>
      }
      </ModalHolder>
      <AddEventButton onClick={ () => { setModalVisibility(!modalVisibility) } }>+ Add Event</AddEventButton>
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