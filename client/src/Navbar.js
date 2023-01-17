import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import LogoutButton from './logout';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext } from 'react';
import { CalendarContext } from './CalendarContext';

const Navbar = () => {


  const { isAuthenticated } = useAuth0()
  const navigate = useNavigate();

  // LINK TO CALENDAR
  const linkToCalendar = () => {
    navigate("/calendar");
  };
  // LINK TO ROSTER
  const linkToRoster = () => {
    navigate("/roster");
  };
  // LINK TO HOME
  const linkToHome = () => {
    navigate("/");
  };
  // LINK TO EVENT PAGE
  const linkToEventDetails = async () => {
    
    // if no events exist yet, we will navigate to a page with no events.
    let defaultEventId = "uneventful"

    const availableEvents = await fetch(`${REACT_APP_URL_BASE}/calendar/allevents`)
        .then(res => res.json() )
        .then(res => res.data)
      
    if ( availableEvents.length  > 0 ) {
      defaultEventId = availableEvents[0]._id 
    } 

    navigate(`/event/${defaultEventId}`);
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
  font-size: 48px;
  margin: 0px;

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