import { lazy } from "react";

const SignupForm = lazy(() => import("../components/SignupForm/SignupForm"));
const SigninForm = lazy(() => import("../components/SigninForm/SigninForm"));

const authRoutes = [
  { path: "auth/signup", element: <SignupForm /> },
  { path: "auth/signin", element: <SigninForm /> },
];

export default authRoutes;
