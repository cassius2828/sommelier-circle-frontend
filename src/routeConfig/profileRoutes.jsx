// src/routes/roomRoutes.js
import { lazy } from "react";
import EditProfile from "../components/ProfilePage/EditProfile";

const ProfilePage = lazy(() => import("../components/ProfilePage/ProfilePage"));


const profileRoutes = [{ path: "profiles/:userId", element: <ProfilePage /> },{ path: "profiles/:userId/edit", element: <EditProfile /> }];

export default profileRoutes;
