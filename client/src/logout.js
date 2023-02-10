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
  margin-left: 40px;
  position: relative;
  top: -2px;
  width: 80px;
  height: 24px;
  border-radius: 5px;
`
export default LogoutButton;