import styled from 'styled-components'
import CallListPosition from './CallListPosition'
import { v4 as uuidv4 } from 'uuid'

const EditCallListDetail = ({event, memberList, setEvent}) => {

  const changeJobHandler = () => {
    
  }

  const changeNameHandler = () => {
    
  }

  return (
    <>
      <CallListTitle>CallList:</CallListTitle>
      <CallListWrapper>
        <CallList>
          { event.callList.map( ( listing, idx ) => {
              return (
                <LineItem>
                  <JobSelect value={listing.position} onChange={changeJobHandler}>
                    <JobOption>tech</JobOption>
                    <JobOption>chef</JobOption>
                    <JobOption>lx</JobOption>
                    <JobOption>head-lx</JobOption>
                    <JobOption>audio</JobOption>
                    <JobOption>head-audio</JobOption>
                    <JobOption>video</JobOption>
                  </JobSelect>
                  <NameSelect value={listing.name} onChange={changeNameHandler}>
                      <NameOption value={event.callList[idx].name}>unfilled</NameOption>
                      {memberList.map ( member => <NameOption value={member.name} key={uuidv4()}>{member.name}</NameOption> ) }
                  </NameSelect>
              </LineItem>
              )
            }
          )
        }
        <SpaceHolderDiv/>
        </CallList>
      </CallListWrapper>
    </>
  )
}

const CallListTitle = styled.div`
  font-size: 28px;
  font-weight: bold;
  width: 75%;
  margin: 12px 0px 0px 0px;
  padding: 0px;
  /* margin: 5px 0px; */
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
const LineItem = styled.li`
  display: flex;
  justify-content: start;
  align-items: center;
  height: 30px;
  width: 290px;
  list-style: none;
  background-color: white;
  border-radius: 5px;

  &:hover{
    cursor: pointer;
    background-color: #B0BDCC;
    color: white;
  }
`
const SpaceHolderDiv = styled.div`
  height: 50px;
`

const JobSelect = styled.select`
`
const JobOption = styled.option`
`
const NameSelect = styled.select`
`
const NameOption = styled.option`
`

export default EditCallListDetail