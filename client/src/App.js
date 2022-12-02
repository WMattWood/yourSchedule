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
  // ~~~~ Structure of the App:
  // "HEADER/NAVBAR"
  // "Path: HOME"
  // "Path: ABOUT US PAGE"
  // "Path: SPECIFIC ITEM PAGE"
  // "Path: CART PAGE"
  // "Path: CONFIRMATION PAGE"
  // "FOOTER"
  // ~~~~

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
        {/* <Route path="/items/id/:itemId" element={<ItemPage/>} /> */}
        {/* <Route path="/cart" element={<DisplayCart/>} /> */}
        {/* <Route path="/confirmation" element={<Confirmation/>} /> */}
      
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

// GlobalStyles???
// const App = styled.div`
//   font-family: sans-serif;
//   text-align: center;
//   color: #212121;
// `

export default App;
