import { createBrowserRouter, RouterProvider } from "react-router";
import './App.css';
import Root from "./Root";
import HomePage from "./pages/HomePage";
import SoilChat from "./pages/SoilChat";
import Users from "./pages/Users";
import ProtectedRoute from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import BookChat from "./pages/BookChat";
import Soils from "./pages/Soils";
import Books from "./pages/Books";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: "/soil-chat",
            element: <SoilChat />,
            // loader: "",
            // action: "",
          },
          {
            path: "/book-chat",
            element: <BookChat />,
          },
          {
            path: "/soils",
            element: <Soils />
          },
          {
            path: "/books",
            element: <Books />,
          }
        ],
      },
      // Admin-only route
      {
        path: "/users",
        element: <ProtectedRoute allowedRoles={["admin"]} />,
        children: [
          {
            index: true,
            element: <Users />
          }
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;