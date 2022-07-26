import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import useSetAdmin from '../../customHooks/useSetAdmin';
import auth from "../../firebase.config";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [isAdmin] = useSetAdmin(user);
  return (
    <div className="drawer drawer-mobile">
      <input id="dashboard-sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <h4 className="text-2xl font-bold text-purple-500">
          Welcome to your Dashboard
        </h4>
        <Outlet />
      </div>
      <div className="drawer-side">
        <label htmlFor="dashboard-sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
          <li className="text-black">
            <Link to="/dashboard">My Appointments</Link>
          </li>
          <li className="text-black">
            <Link to="/dashboard/review">My Review</Link>
          </li>
          <li className="text-black">
            <Link to="/dashboard/history">My History</Link>
          </li>
          {isAdmin && (
            <>
              <li className="text-black">
                <Link to="/dashboard/users">All User</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
