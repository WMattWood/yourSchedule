import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import RosterPage from './RosterPage';

const Navbar = () => {

  const navigate = useNavigate();

  const linkToCalendar = () => {
    navigate("/calendar");
  };

  const linkToEventDetails = () => {
    navigate("/event/60b58fee-e351-4c95-8bb1-c8b2c1482aa7");
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