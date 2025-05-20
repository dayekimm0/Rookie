import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logon from "./pages/Logon";
import Mypage from "./pages/Mypage";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Event from "./pages/Event";
import RedirectToStore from "./components/RedirectToStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <RedirectToStore />,
      },
      {
        // index: true,
        path: "play",
        element: <Home />,
      },
      {
        path: "store",
        element: <ProductList />,
      },
      {
        path: "store/:teamCode",
        element: <ProductList />,
      },
      {
        path: "store/:teamCode/:id",
        element: <ProductDetail />,
      },
      {
        path: "event",
        element: <Event />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logon",
        element: <Logon />,
      },
      {
        path: "mypage",
        element: <Mypage />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
    ],
  },
]);

export default router;
