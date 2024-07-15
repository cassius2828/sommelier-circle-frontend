// src/routes/roomRoutes.js
import { lazy } from "react";

const ProfilePage = lazy(() => import("../components/ProfilePage/ProfilePage"));


const profileRoutes = [{ path: "profiles/:userId", element: <ProfilePage /> }];

export default profileRoutes;
