import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logon from "./pages/Logon";
import Mypage from "./pages/Mypage";
import MyShopping from "./components/Mypage/MyShopping";
import MyVideo from "./components/Mypage/Myvideo";
import MyPlay from "./components/Mypage/MyPlay";
import MyClip from "./components/Mypage/MyClip";
import MySetting from "./components/Mypage/MySetting";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Event from "./pages/Event";
import Play from "./pages/Play";
import PlayDetail from "./pages/PlayDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "play",
        element: <Play />,
      },
      {
        path: "play/:id",
        element: <PlayDetail />,
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
        children: [
          {
            index: true,
            element: <MyShopping />,
          },
          {
            path: "myvideo",
            element: <MyVideo />,
            children: [
              {
                path: "myplay",
                element: <MyPlay />,
              },
              {
                path: "myclip",
                element: <MyClip />,
              },
            ],
          },
          {
            path: "mysetting",
            element: <MySetting />,
          },
        ],
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
