import LoginButton from "./login"
import { useAuth0 } from "@auth0/auth0-react";

const Homepage = () => {

  const { user, isAuthenticated, isLoading } = useAuth0()

  return(
    <>
      <h1>Welcome to my Homepage!</h1>
      <LoginButton/>
      { ! isAuthenticated
        ? null
        : <>{console.log(user)}</>
      }
    </>
    
  )
}

export default Homepage