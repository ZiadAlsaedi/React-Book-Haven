import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Navbar from "./Navbar";
import BookInfo from "./BookInfo";
import Favorites from "./Favorites"
import Readed from "./Readed"

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/Home/:id",
      element: <Home/>,
    },
    {
        path: "/Login",
        element: <Login/>,
      },
      {
        path: "/Signup/",
        element: <Signup/>,
      },
      {
        path: "/Navbar/",
        element: <Navbar/>,
      },
      {
        path: "/BookInfo/:rank",
        element: <BookInfo/>,
      },
      {
        path: "/Favorites/",
        element: <Favorites/>,
      },
      {
        path: "/Readed/",
        element: <Readed/>,
      },

  ]);

const Router = () => {
  return (
    <RouterProvider router={router} />
)
}

export default Router