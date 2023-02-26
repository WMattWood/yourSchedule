import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import Homepage from "./Homepage"
import CalendarPage from "./CalendarPage"
import RosterPage from "./RosterPage";
import EventPage from "./EventPage";
import SignUpPage from "./signup/SignUpPage";
import GlobalStyle from "./GlobalStyles";
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  // Authentication is managed by Auth0
  const { isAuthenticated } = useAuth0()

  return (
    <BrowserRouter>
    <GlobalStyle />
      <PageWindow>
        <Navbar />
        <Routes>
          !isAuthenticated
          ? <Route path="*" element={<Homepage />} />
          : <>
              <Route path="/" element={<Homepage />} />
              <Route path="/calendar" element={<CalendarPage/>} />
              <Route path="/event/:eventId" element={<EventPage/>} />
              <Route path="/roster" element={<RosterPage/>} />
              <Route path="/signup" element={<SignUpPage/>} />
            </>
        </Routes>
      </PageWindow>
    </BrowserRouter>
  );
}

const PageWindow = styled.div`
  width: 1000px;
  margin: 20px 30px;
`

export default App;
