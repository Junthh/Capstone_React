
import { Route } from "react-router-dom";
import HomePage from "../pages/HomeTemplate/HomePage";
import MovieDetailsPage from "../pages/HomeTemplate/MovieDetailsPage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import LoginPage from "../pages/HomeTemplate/LoginPage";
import RegisterPage from "../pages/HomeTemplate/RegisterPage";
import TicketRoomPage from "../pages/HomeTemplate/TicketRoomPage";
import HomeTemplate from "../pages/HomeTemplate";
import AdminTemplate from "../pages/AdminTemplate"
import Dashboard from "../pages/AdminTemplate/Dashboard";
import MovieManagement from "../pages/AdminTemplate/MovieManagement";
import AddMovie from "../pages/AdminTemplate/AddMovie";
import AuthenPage from "../pages/AdminTemplate/AuthenPage";


const routes = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      {
        path: "",
        element: HomePage,
      },
      {
        path: "about",
        element: "",
      },
      {
        path: "list-movie",
        element: ListMoviePage,
      },
      {
        path: "news",
        element: "",
      },
      {
        path: "login",
        element: LoginPage,
      },
      {
        path: "register",
        element: RegisterPage,
      },
      {
        path: "movie-detail/:movieId",
        element: MovieDetailsPage,
      },
      {
        path: "ticket-room/:maLichChieu",
        element: TicketRoomPage,
      },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested: [
      {
        path: "dashboard",
        element: Dashboard,
      },
      {
        path: "movies-management",
        element: MovieManagement,
      },
      {
        path: "movies-management/add-movie",
        element: AddMovie,
      }
    ],
  },
  {
    path: "authen",
    element: AuthenPage,
  },
];

export const genarateRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
