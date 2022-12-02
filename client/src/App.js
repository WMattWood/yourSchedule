import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import Homepage from "./Homepage"
import CalendarPage from "./CalendarPage"
import RosterPage from "./RosterPage";
import EventPage from "./EventPage";
import GlobalStyle from "./GlobalStyles";
import Navbar from "./Navbar";
import { useAuth0 } from "@auth0/auth0-react";

function App() {

  const { user, isAuthenticated, isLoading } = useAuth0()

  return (
    <BrowserRouter>
    <GlobalStyle />
      <Navbar />
      
      { !isAuthenticated
        ? <Routes>
            <Route path="*" element={<Homepage />} />
          </Routes>
        : <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/calendar" element={<CalendarPage/>} />
            <Route path="/event/:eventId" element={<EventPage/>} />
            <Route path="/roster" element={<RosterPage/>} />
          </Routes>
      }
    </BrowserRouter>
  );
}

export default App;
