import { lazy } from "react";
import EditProfile from "../components/ProfilePage/EditProfile";
import ChangePassword from "../components/ProfilePage/ChangePassword";

const ProfilePage = lazy(() => import("../components/ProfilePage/ProfilePage"));

const profileRoutes = [
  { path: "profiles/:userId", element: <ProfilePage /> },
  { path: "profiles/:userId/edit", element: <EditProfile /> },
  { path: "profiles/:userId/update-password", element: <ChangePassword /> },
];

export default profileRoutes;
