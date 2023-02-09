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

    const availableEvents = await fetch(`${process.env.REACT_APP_URL_BASE}/calendar/allevents`)
        .then(res => res.json() )
        .then(res => res.data)
      
    if ( availableEvents.length  > 0 ) {
      defaultEventId = availableEvents[0]._id 
    } 

    navigate(`/event/${defaultEventId}`);
  };

  return (
    <>
      <NavbarContainer>
        <Title onClick={linkToHome}>yourSchedule</Title>
        <LinkContainer>
          <Link onClick={linkToCalendar}>Calendar</Link>
          <Link onClick={linkToRoster}>Roster</Link>
          <Link onClick={linkToEventDetails}>events</Link>
        </LinkContainer>
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
  border-right: 200px;
  position: relative;
  right: 15px;
  top: 7px;
  &:hover {
    cursor: pointer;
  }
`

const NavbarContainer = styled.div`
  margin-left: 16px;
  margin-right: 60px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  border-bottom: 4px solid black;
  width: 100%;
  height: 50px;
  position: relative;

  /* &:after {
    content: "";
    background: black;
    position: absolute;
    left: 0;
    bottom: -4px;
    height: 4px;
    width: 406px;
  } */
  * {
    margin: 2px 0px;
  }
`

const LinkContainer = styled.div`
  /* margin-left: 60px; */
  display: flex;
  align-items: end;
  justify-content: space-around;
  width: 80%;
`

const Link = styled.div`
  position: relative;
  top: 8px;
  padding-bottom: 0px;
  font-size: 24px;
  border-bottom: 4px solid black;
  border-color: rgba(0,0,0,0);
  /* transition: border-bottom 0.2s, color 0.2s; */
  transition: 0.1s ease-out;
  &:hover {
    cursor: pointer;
    /* border-bottom: 4px solid black; */
    border-color: rgba(0,0,0,1);
    /* text-shadow: 1px 1px black; */
    /* transition: 0.3s; */
  }
`

export default Navbar