import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};

const Button = styled.button`
  margin-top: 20px;
  font-weight: 600;
  border-radius: 5px;
`

export default LoginButton;