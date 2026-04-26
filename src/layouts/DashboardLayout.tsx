import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import SideNavBar from '../components/Dashboard/SideNavBar';
import TopNavBar from '../components/Dashboard/TopNavBar';
import './DashboardLayout.css';

const DashboardLayout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userInfoStr = localStorage.getItem('user_info');
  
  if (!userInfoStr) {
    return <Navigate to="/dang-nhap" replace />;
  }

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="dashboard-layout">
      {/* SideNavBar Component - Fixed left menu */}
      <SideNavBar isMobileOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
      
      {/* Mobile Overlay - Clicking this closes the menu */}
      {isMobileMenuOpen && (
        <div className="mobile-sidebar-overlay" onClick={closeMobileMenu} />
      )}
      
      {/* Main Canvas - Right flex content */}
      <div className="dashboard-main">
        {/* TopNavBar Component - Absolute/Sticky top */}
        <TopNavBar onMenuToggle={toggleMobileMenu} />
        
        {/* Scrollable Page Content */}
        <div className="dashboard-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
