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
    </>
  )
}

export default Homepage