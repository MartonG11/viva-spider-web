import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Settings = lazy(() => import("../pages/Settings"));

export const publicRoutes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
];

export const privateRoutes: RouteObject[] = [
  { path: "/", element: <Dashboard /> },
  { path: "/settings", element: <Settings /> },
];
