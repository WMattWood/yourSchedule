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
  position: absolute;
  top: 20px;
  right: 30px;
`
export default LogoutButton;