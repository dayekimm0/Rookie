import GlobalStyles from "./styles/Globalstyles.styles";
import { Outlet } from "react-router-dom";
import Home from "./pages/Home";

function Root() {
  return (
    <>
      <GlobalStyles />
      <Outlet />
      <Home />
    </>
  );
}

export default Root;
