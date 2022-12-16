import styled from "styled-components";
import { useState } from "react"

const Signup = () => {

  const [ formData, setFormData ] = useState({})

  const inputHandler = (ev, fieldName) => {
    target = ev.currentTarget.value
    setFormData({...formData, [fieldName]: target})
  }

  return (
    <Signupform>
      <Question>
        < InputForm type="" 
                    name="name"
                    id="name" 
                    value={formData.name} 
                    onChange={(ev) => inputHandler(ev, "name" )} required ></InputForm>
        < InputForm type="" 
                    name="name"
                    id="name" 
                    value={formData.name} 
                    onChange={(ev) => inputHandler(ev, "name" )} required ></InputForm>
        < InputForm type="" 
                    name="name"
                    id="name" 
                    value={formData.name} 
                    onChange={(ev) => inputHandler(ev, "name" )} required ></InputForm>
        < InputForm type="" 
                    name="name"
                    id="name" 
                    value={formData.name} 
                    onChange={(ev) => inputHandler(ev, "name" )} required ></InputForm>
      </Question>
      <SubmitButton></SubmitButton>
    </Signupform>
  )
}


export default Signup;