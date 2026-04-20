import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SideNavBar from '../components/Dashboard/SideNavBar';
import TopNavBar from '../components/Dashboard/TopNavBar';
import './DashboardLayout.css';

const DashboardLayout: React.FC = () => {
  const userInfoStr = localStorage.getItem('user_info');
  
  if (!userInfoStr) {
    return <Navigate to="/dang-nhap" replace />;
  }

  return (
    <div className="dashboard-layout">
      {/* SideNavBar Component - Fixed left menu */}
      <SideNavBar />
      
      {/* Main Canvas - Right flex content */}
      <div className="dashboard-main">
        {/* TopNavBar Component - Absolute/Sticky top */}
        <TopNavBar />
        
        {/* Scrollable Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
