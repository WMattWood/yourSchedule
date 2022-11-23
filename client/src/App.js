import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Homepage"
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
        {/* <Route path="/about" element={<AboutPage/>} />
        <Route path="/items/id/:itemId" element={<ItemPage/>} />
        <Route path="/cart" element={<DisplayCart/>} />
        <Route path="/confirmation" element={<Confirmation/>} /> */}
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
