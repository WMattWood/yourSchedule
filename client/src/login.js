import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const Button = styled.button`
  margin-top: 20px;
  height: 24px;
  position: relative;
  top: -20px;
  left: 16px;
  /* width: 100px; */
  /* font-weight: 600; */
  border-radius: 3px;
  /* border: none; */
  box-shadow: 2px 2px;
  transition: 0.1s;
  &:active{
    box-shadow: 0px 0px;
    transition: 0.1s;
  }
`

export default LoginButton;