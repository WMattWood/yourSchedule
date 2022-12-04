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
  left: 933px;
  font-weight: 600;
  font-size: 16px;
  border-radius: 5px;
  height: 30px;
`
export default LogoutButton;