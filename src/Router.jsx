import { createBrowserRouter } from "react-router-dom";
import Root from "./Root";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logon from "./pages/Logon";
import Mypage from "./pages/Mypage";
import MyShopping from "./components/Mypage/MyShopping";
import MyVideo from "./components/Mypage/MyVideo";
import MyAllVideo from "./components/Mypage/MyAllVideo";
import MyPlay from "./components/Mypage/MyPlay";
import MyClip from "./components/Mypage/MyClip";
import MySetting from "./components/Mypage/MySetting";
import Payment from "./pages/Payment";
import Cart from "./pages/Cart";
import ProductList from "./pages/ProductList";
import ProductDetail from "./pages/ProductDetail";
import Event from "./pages/Event";
import Play from "./pages/Play";
import PlayAll from "./pages/PlayAll";
import PlayDetail from "./pages/PlayDetail";
import SearchResultPage from "./pages/SearchResultPage";
import TeamHome from "./pages/TeamHome";
import InfluencerPlayContent from "./pages/InfluencerPlayContent";
import InfluencerProductList from "./pages/InfluencerProductList";
import TeamplayAll from "./pages/TeamplayAll";

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
        path: "playall",
        element: <PlayAll />,
      },
      {
        path: "play/search",
        element: <SearchResultPage />,
      },
      {
        path: "play/:videoId",
        element: <PlayDetail />,
      },
      {
        path: "store",
        element: <ProductList />,
      },
      {
        path: "store/rookie",
        element: <InfluencerProductList />,
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
        path: "teamhome",
        element: <TeamHome />,
      },
      {
        path: "teamhome/:teamCode",
        element: <TeamHome />,
      },
      {
        path: "teamplayall",
        element: <TeamplayAll />,
      },
      {
        path: "influencer/:teamCode/:name",
        element: <InfluencerPlayContent />,
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
                index: true,
                element: <MyAllVideo />,
              },
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
