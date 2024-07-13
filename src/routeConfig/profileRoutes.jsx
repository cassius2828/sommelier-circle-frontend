// src/routes/roomRoutes.js
import { lazy } from "react";

const ProfilePage = lazy(() => import("../components/ProfilePage/ProfilePage"));


const profileRoutes = [{ path: "profile/:userId", element: <ProfilePage /> }];

export default profileRoutes;
