import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </Button>
  );
};

const Button = styled.button`
  position: relative;
  top: -2px;
  right: 2px;
  width: 100px;
  height: 24px;
  border-radius: 3px;
  box-shadow: 2px 2px;
  transition: 0.1s;
  
  &:active{
    box-shadow: 0px 0px;
    transition: 0.1s;
  }
`
export default LogoutButton;