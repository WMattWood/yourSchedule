import styled from "styled-components";
import LoginButton from "./login"
import { useAuth0 } from "@auth0/auth0-react";

const Homepage = () => {
  const { isAuthenticated } = useAuth0()

  // The homepage is literally just a login button!  
  // Users should only be routed here if they have not yet logged in.

  return(
    <>
      { !isAuthenticated
        ? <LoginButton/>
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
  position: relative;
  top: 60px;
  left: 60px;
  background:var(--modal);
`

export default Homepage