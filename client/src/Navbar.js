import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth0()
  const navigate = useNavigate();

  // LINK TO CALENDAR
  const linkToCalendar = () => {
    navigate("/calendar");
  };
  // LINK TO ROSTER
  const linkToRoster = () => {
    navigate("/roster");
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
        <Title onClick={linkToCalendar}>yourSchedule</Title>
        <LinkContainer>
          <Link onClick={linkToCalendar}>calendar</Link>
          <Link onClick={linkToRoster}>roster</Link>
          <Link onClick={linkToEventDetails}>events</Link>
        </LinkContainer>
        { isAuthenticated 
          ? <LogoutButton onClick={() => logout({ returnTo: window.location.origin })}>
              Log Out
            </LogoutButton>
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
    text-shadow: 2px 2px goldenrod;
    transition: color 0.1s ;
  }
`

const NavbarContainer = styled.div`
  margin-left: 16px;
  margin-right: 60px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: end;
  border-bottom: 4px solid black;
  width: 100%;
  height: 50px;
  position: relative;

  * {
    margin: 2px 0px;
  }
`

const LinkContainer = styled.div`
  margin-left: 180px;
  display: flex;
  align-items: end;
  justify-content: space-around;
  width: 80%;
`

const Link = styled.div`
  position: relative;
  top: 8px;
  padding-bottom: 0px;
  font-size: 22px;
  border-bottom: 4px solid black;
  border-color: rgba(0,0,0,0);
  transition: 0.1s ease-out;
  
  &:hover {
    cursor: pointer;
    border-color: rgba(0,0,0,1);
    text-shadow: 2px 2px goldenrod;
    transition: 0.3s ;
  }
`

const LogoutButton = styled.button`
  position: relative;
  top: -2px;
  right: 2px;
  width: 100px;
  height: 24px;
  border-radius: 3px;
  box-shadow: 2px 2px;
  transition: 0.1s;
  
  &:active{
    box-shadow: 0px 0px;
    transition: 0.1s;
  }
`

export default Navbar