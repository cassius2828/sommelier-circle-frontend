/* eslint-disable react/prop-types */
// src/components/Dashboard.jsx

import useAuthContext from "../../context/auth/useAuthContext";

const Dashboard = () => {
  const { user } = useAuthContext();
  return (
    <main className="bg-theme-dn text-gray-100 p-8 min-h-screen">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.username}</h1>
      <p className="text-xl">
        This is the dashboard page where you, and only you, can see a dashboard
        of all of your things.
      </p>
    </main>
  );
};

export default Dashboard;
