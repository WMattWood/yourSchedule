import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './logout';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { CalendarContext } from './CalendarContext';

const Navbar = () => {

  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth0()
  const { monthlyCalendar } = useContext(CalendarContext)

  const linkToCalendar = () => {
    navigate("/calendar");
  };

  const linkToEventDetails = async () => {
    let defaultEventId = "meep"

    // if (monthlyCalendar) {
    //   defaultEventId = monthlyCalendar[0]._id
    // } else {
    //   const availableEvents = await fetch(`/calendar/allevents`)
    //   .then(res => res.json() )
    //   .then(res => res.data)
    
    //   defaultEventId = availableEvents[0]._id 
    // }
    
    const availableEvents = await fetch(`/calendar/allevents`)
        .then(res => res.json() )
        .then(res => res.data)
      
    if ( availableEvents.length  > 0 ) {
      defaultEventId = availableEvents[0]._id 
    } 

    navigate(`/event/${defaultEventId}`);
  };

  const linkToRoster = () => {
    navigate("/roster");
  };

  const linkToHome = () => {
    navigate("/");
  };

  return (
    <>
      <Title onClick={linkToHome}>yourSchedule</Title>
      <NavbarContainer>
        <LeftSide>
          <Link onClick={linkToCalendar}>Calendar</Link>
        </LeftSide>
        <RightSide>
          <Link onClick={linkToRoster}>Roster</Link>
          <Link onClick={linkToEventDetails}>events</Link>
        </RightSide>
        { isAuthenticated 
          ? <LogoutButton/>
          : null
        }
      </NavbarContainer>
    </>
  )
}

const Title = styled.div`
  padding-top: 30px;
  padding-bottom: 10px;
  font-size: 48px;

  &:hover {
    cursor: pointer;
  }
`

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  border-bottom: 4px solid black;
  width: 100%;
  height: 50px;
  /* margin: 0px 5px; */
  * {
    margin: 2px 0px;
  }
`
const LeftSide = styled.div`
  display: flex;
  align-items: end;
  width: 300px;
`
const RightSide = styled.div`
  display: flex;
  align-items: end;
  justify-content: space-between;
  width: 300px;
`
const Link = styled.div`
  font-size: 24px;
  border-bottom: 3px solid black;
  transition: border-bottom 0.2s, color 0.2s;
  &:hover {
    cursor: pointer;
    border-bottom: 3px solid goldenrod;
    color: goldenrod;
    transition: border-bottom 0.1s ;
  }
`

export default Navbar