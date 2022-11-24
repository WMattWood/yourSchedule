import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import Homepage from "./Homepage"
import CalendarPage from "./CalendarPage"
import RosterPage from "./RosterPage";
import EventDetailsPage from "./EventDetailsPage";


function App() {

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
    {/* <GlobalStyle /> */}
      {/* <Header /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/calendar" element={<CalendarPage/>} />
        <Route path="/event/:eventId" element={<EventDetailsPage/>} />
        <Route path="/roster" element={<RosterPage/>} />
        {/* <Route path="/items/id/:itemId" element={<ItemPage/>} /> */}
        {/* <Route path="/cart" element={<DisplayCart/>} /> */}
        {/* <Route path="/confirmation" element={<Confirmation/>} /> */}
      </Routes>
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
