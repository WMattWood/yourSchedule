import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const Button = styled.button`
  /* position: absolute; */
  margin-top: 20px;
  margin-left: 10px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  height: 30px;
`

export default LoginButton;