import { useState } from "react";
import GlobalStyles from "./styles/Globalstyles.styles";
import Cart from "./pages/Cart";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <GlobalStyles />
      <Cart />
      <Home />
    </>
  );
}

export default App;
