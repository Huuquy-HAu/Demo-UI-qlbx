import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconRadioactive,
  IconBuildingCommunity,
  IconUsers,
  IconFileAnalytics,
  IconCertificate,
  IconBellRinging,
  IconSettings,
  IconChevronDown,
  IconLogout,
  IconLayoutSidebarRightCollapse,
  IconLayoutSidebarLeftCollapse
} from '@tabler/icons-react';
import './SideNavBar.css';
import { HeaderLogo } from '../../assets/img';
import { Flex } from '@mantine/core';

interface MenuItem {
  path?: string;
  label: string;
  icon: React.ReactNode;
  children?: { path: string; label: string }[];
}

const menuItems: MenuItem[] = [
  { path: '/dashboard', label: 'Tổng quan', icon: <IconLayoutDashboard size={20} stroke={2} /> },
  { path: '/dashboard/quan-ly-to-chuc', label: 'Quản lý tổ chức', icon: <IconBuildingCommunity size={20} stroke={2} /> },
  { path: '/dashboard/quan-ly-co-so', label: 'Cơ sở bức xạ', icon: <IconRadioactive size={20} stroke={2} /> },
  { path: '/dashboard/quan-ly-tai-khoan', label: 'Quản lý tài khoản', icon: <IconUsers size={20} stroke={2} /> },
  { path: '/dashboard/bao-cao', label: 'Báo cáo & quy trình', icon: <IconFileAnalytics size={20} stroke={2} /> },
  { path: '/dashboard/giay-phep', label: 'Giấy phép & chứng chỉ', icon: <IconCertificate size={20} stroke={2} /> },
  { path: '/dashboard/thong-bao-va-nhac-viec', label: 'Thông báo & nhắc việc', icon: <IconBellRinging size={20} stroke={2} /> },
  {
    label: 'Hệ thống',
    icon: <IconSettings size={20} stroke={2} />,
    children: [
      { path: '/dashboard/quyen-han', label: 'Quyền hạn' },
      { path: '/dashboard/nhat-ky-he-thong', label: 'Nhật ký hệ thống' },
    ]
  },
];

const SideNavBar: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({ 'Hệ thống': true });

  const toggleSubMenu = (label: string) => {
    if (isCollapsed) {
      setIsCollapsed(false);
      setOpenSubMenus({ [label]: true });
      return;
    }
    setOpenSubMenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/dang-nhap';
  };

  return (
    <aside className={`side-navbar ${isCollapsed ? 'is-collapsed' : ''}`}>
      <div className="side-navbar-header">
        <div className="brand-logo">
          <div className="brand-icon">
            <img src={HeaderLogo} alt="Header Logo" />
          </div>
          {!isCollapsed && (
            <Flex direction='column'>
              <span className="brand-text" style={{ fontSize: '14px', fontWeight: '600', color: '#B91C1C' }}>HỆ THỐNG QUẢN LÝ</span>
              <span style={{ fontSize: '12px', fontWeight: '400', color: '#5D5F5F' }}>An Toàn Bức Xạ</span>
            </Flex>
          )}
        </div>
      </div>

      <div className="side-navbar-main">
        <nav className="nav-menu">
          {menuItems.map((item) => {
            const isExpandable = !!item.children;
            const isOpen = openSubMenus[item.label];

            if (isExpandable) {
              return (
                <div key={item.label} className={`nav-group ${isOpen ? 'is-open' : ''}`}>
                  <button
                    className="nav-link nav-link--expandable"
                    onClick={() => toggleSubMenu(item.label)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    {!isCollapsed && <span className="nav-label">{item.label}</span>}
                    {!isCollapsed && (
                      <span className={`chevron-icon ${isOpen ? 'rotate' : ''}`}>
                        <IconChevronDown size={16} />
                      </span>
                    )}
                  </button>
                  {isOpen && (
                    <div className="sub-menu">
                      {item.children?.map((child) => (
                        <NavLink
                          key={child.path}
                          to={child.path}
                          className={({ isActive }) => `sub-nav-link ${isActive ? 'active' : ''}`}
                        >
                          <span className="sub-nav-label">{child.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <NavLink
                key={item.path}
                to={item.path!}
                end={item.path === '/dashboard'}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                title={isCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!isCollapsed && <span className="nav-label">{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="side-navbar-footer">
        <button 
          className="nav-link logout-btn" 
          onClick={handleLogout}
          title={isCollapsed ? 'Đăng xuất' : ''}
        >
          <span className="nav-icon"><IconLogout size={20} stroke={2} /></span>
          {!isCollapsed && <span className="nav-label">Đăng xuất</span>}
        </button>
        
        <button 
          className="collapse-toggle-btn" 
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Mở rộng' : 'Thu gọn'}
        >
          {isCollapsed ? (
            <IconLayoutSidebarLeftCollapse size={20} />
          ) : (
            <IconLayoutSidebarRightCollapse size={20} />
          )}
        </button>
      </div>
    </aside>
  );
};

export default SideNavBar;
