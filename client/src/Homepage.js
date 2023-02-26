import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const Homepage = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0()

  return(
    <>
      { !isAuthenticated
        ? <LoginButton onClick={() => loginWithRedirect()}>Log In</LoginButton>
        : null
      }
      <DemoBanner>
        Welcome to the demo of yourSchedule!  This app is currently hosted on a
        free tier, and might take 30 seconds for the back end server to spin up.  
        This means that it might take a moment for the events to become visible.  
        <p>Feel free to look around, and if you have any questions you can contact 
        me through my Github or LinkedIn @<a href="https://github.com/WMattWood"><b>WMattWood</b></a></p> 
      </DemoBanner>
    </>
  )
}

const DemoBanner = styled.div`
  font-family: var(--font-mono);
  font-size: 24;
  padding: 20px;
  border: 2px solid black;
  box-shadow: 4px 4px black;
  width: 400px;
  height: 200px;
  position: absolute;
  top: 160px;
  left: 100px;
  background:var(--modal);
`

const LoginButton = styled.button`
  margin-top: 20px;
  height: 24px;
  position: relative;
  top: -20px;
  left: 16px;
  border-radius: 3px;
  box-shadow: 2px 2px;
  transition: 0.1s;
  
  &:active{
    box-shadow: 0px 0px;
    transition: 0.1s;
  }
`

export default Homepage