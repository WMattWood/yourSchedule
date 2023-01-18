import LoginButton from "./login"
import { useEffect } from "react"

const Homepage = () => {

  console.log("Env is... ", `${process.env.REACT_APP_URL_BASE}`)
  const endpoint = `${process.env.REACT_APP_URL_BASE}/members/allmembers`
  console.log("Endpoint is...", endpoint)

  useEffect( () => {
    fetch(`${process.env.REACT_APP_URL_BASE}/members/allmembers`)
      .then( res => {
        console.log("All Members Response: ", res)
        return res.json() 
      })
      .then( res => {
        console.log("All Members Response pt 2?: ", res)
      })
  }, [] )

  // The homepage is literally just a login button!  
  // Users should only be routed here if they have not yet logged in.
  
  return(
    <LoginButton/>
  )
}

export default Homepage