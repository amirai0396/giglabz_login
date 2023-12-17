import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { logoutUser } from "../actions";
import "./Dashboard.css";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleButtonClick = () => {
    setSidebarOpen(!sidebarOpen);
  };
  useEffect(() => {
    if (!user) {
      history.push("/login");
    }
  }, [user, history]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="dashboard">
      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <button onClick={handleButtonClick} className="toggle-button">
          {sidebarOpen ? "×" : "☰"}
        </button>
     
        <nav className="sidebar-nav">
          <Link to="/dashboard">Home</Link>
          <Link to="/dashboard">About</Link>
          <Link to="/dashboard">Contact</Link>
       
        </nav>
      </div>
      <div className="main-content">
        <div>Welcome to the dashboard <span className="username">{user && user.name}</span> </div>
        <Link to="/login" onClick={handleLogout}>
            Logout
          </Link>
      </div>
    </div>
  );
};

export default Dashboard;
