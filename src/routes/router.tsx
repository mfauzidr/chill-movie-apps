import { Navigate, type RouteObject } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";
import type { Content } from "../data/content";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

export const createAppRoutes = (
  contents: Content[],
  setContents: Dispatch<SetStateAction<Content[]>>,
): RouteObject[] => [
  {
    path: "/",
    element: <HomePage contents={contents} />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];