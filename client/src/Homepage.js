import LoginButton from "./login"

const Homepage = () => {

  console.log("Greetings. Env is... ", `${process.env.REACT_APP_URL_BASE}`)
  
  // The homepage is literally just a login button!  
  // Users should only be routed here if they have not yet logged in.
  
  return(
    <LoginButton/>
  )
}

export default Homepage