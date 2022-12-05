import styled from 'styled-components'
import { useState, useRef } from 'react'
import CallListPosition from './CallListPosition'
import { v4 as uuidv4 } from 'uuid'

const CallListDetail = ({event, memberList, setEvent, globalEdit, setGlobalEdit}) => {

  const [showDeleteButton, setShowDeleteButton] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const theIndex = useRef(null)
  const thePhrase = useRef(null)

  const selectForDeleteHandler = (phrase, index) => {
    console.log("beep")
    setShowDeleteModal(true)
    thePhrase.current = phrase
    theIndex.current = index
  }

  const handleClose = () => {
    setShowDeleteModal(false)
    setShowDeleteButton(false)
  }

  const handleOK = (idx) => {
    deleteHandler(idx)
    setShowDeleteModal(false)
    setShowDeleteButton(false)
  }

  const deleteHandler = (idx) => {
    fetch(`/callList/delete/${event._id}`, {
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

  return (
    <>
      <CallListTitle>CallList:</CallListTitle>
      <CallListWrapper>
        <CallList>
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
        </CallList>
      </CallListWrapper>
      <DeleteButton onClick={()=>setShowDeleteButton(!showDeleteButton)}>- Delete Position </DeleteButton>
      { ! showDeleteModal 
        ? null
        : <ConfirmDialog>
           <p>Are you sure you want to delete this position?</p>
           <p>{thePhrase.current}</p>
            <form method="dialog">
              <DialogButton onClick={() => handleOK(theIndex.current)}>OK</DialogButton>
              <DialogButton onClick={handleClose}>Cancel</DialogButton>
            </form>
          </ConfirmDialog>
      }
    </>
  )
}

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

const CallList = styled.ul`
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

const DeleteButton = styled.button`
  height: 40px;
  width: 180px;
  font-size: 20px;
  font-weight: 600;
  border-radius: 10px;
  margin: 5px 0px;
`
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

const DialogButton = styled.button`
`

export default CallListDetail