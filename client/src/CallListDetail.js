import styled from 'styled-components'
import { useState, useRef } from 'react'
import CallListPosition from './CallListPosition'
import { v4 as uuidv4 } from 'uuid'

const CallListDetail = ({event, memberList, setEvent, globalEdit, setGlobalEdit}) => {

  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // I think these useRefs are used for the DeleteModal popup
  const theIndex = useRef(null)
  const thePhrase = useRef(null)

  // This delete handler has to be here because this is where the pop up is...
  // ...and I think because there can only be one pop up window?  But there are
  // lots of CallListPositions vs. AddEventModal where we just had the one.
  const selectForDeleteHandler = (phrase, index) => {
    console.log("beep")
    setShowDeleteModal(true)
    thePhrase.current = phrase
    theIndex.current = index
  }

  // Popup closer
  const handleClose = () => {
    setShowDeleteModal(false)
    setShowDeleteButton(false)
  }

  // Popup Delete Confirmation
  const handleOK = (idx) => {
    deleteHandler(idx)
    setShowDeleteModal(false)
    setShowDeleteButton(false)
  }

  // Adds a new position to the CallList
  const addHandler = () => {
    fetch(`${REACT_APP_URL_BASE}/callList/add/${event._id}`, {
      "method": "PATCH",
      "body": JSON.stringify({
      }),
        "headers": {
          "Content-Type": "application/json"
        }
    })
      .then(res => res.json())
      .then(res => setEvent(res.data))

  }

  // Deletes a position from the CallList
  const deleteHandler = (idx) => {
    fetch(`${REACT_APP_URL_BASE}/callList/delete/${event._id}`, {
      "method": "PATCH",
      "body": JSON.stringify({
        "index": idx
      }),
        "headers": {
          "Content-Type": "application/json"
        }
    })
      .then(res => res.json())
      .then(res => setEvent(res.data))

  } 

  // JSX RETURN
  return (
    <>
      <CallListTitle>CallList:</CallListTitle>
      <CallListWrapper>
        <CallListContainer>
          { event.callList.map( ( position, idx ) => <CallListPosition  event={event}
                                                                        memberList={memberList}
                                                                        setEvent={setEvent}
                                                                        showDeleteButton={showDeleteButton}
                                                                        setShowDeleteButton={setShowDeleteButton}
                                                                        selectForDeleteHandler={selectForDeleteHandler}
                                                                        idx={idx}
                                                                        key={uuidv4()}
                                                                        /> ) }
        <SpaceHolderDiv/>
        </CallListContainer>
      </CallListWrapper>
      <ButtonsWrapper>
        <BigButton onClick={addHandler}>+ Add Position </BigButton>
        <BigButton onClick={()=>setShowDeleteButton(!showDeleteButton)}>- Delete Position </BigButton>
      </ButtonsWrapper>
      { ! showDeleteModal 
        ? null
        : <ConfirmDialog>
           <ConfirmText>Are you sure you want to delete this position?</ConfirmText>
           <ConfirmText>{thePhrase.current}</ConfirmText>
            <form method="dialog">
              <DialogButton onClick={() => handleOK(theIndex.current)}>OK</DialogButton>
              <DialogButton onClick={handleClose}>Cancel</DialogButton>
            </form>
          </ConfirmDialog>
      }
    </>
  )
}

// CONTAINER
const CallListTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  width: 75%;
  margin: 12px 0px 0px 0px;
  padding: 0px;
  border-bottom: 3px solid black;
  margin-bottom: 5px;
`
const CallListWrapper = styled.div`
margin: 0px;
  background-color: white;
  border-radius: 5px;
  height: 100%; 
  width: 400px;
  overflow: hidden;
  background-image: radial-gradient(circle, #5c0067 0%, #00d4ff 100%);
  border: 3px solid black;
`
const CallListContainer = styled.ul`
  margin: 0px 5px;
  margin-bottom: 40px;
  padding-left: 0px;
  height: 100%; 
  width: 540px;
  overflow-x: hidden; 
  overflow-y: scroll;
  padding-right: 17px; /* Increase/decrease this value for cross-browser compatibility */
  box-sizing: content-box;
`
const SpaceHolderDiv = styled.div`
  height: 50px;
`

// BUTTONS
const ButtonsWrapper = styled.div`
  display: flex;
`
const BigButton = styled.button`
  height: 40px;
  width: 180px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 10px;
  margin: 5px 0px;
`

// DELETE POSITION STUFF
const ConfirmDialog = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  background-color: #d3d3d3;
  border: 3px solid black;
  z-index: 3;
`
const ConfirmText = styled.p`
  margin: 5px 10px;
`
const DialogButton = styled.button`
`

export default CallListDetail