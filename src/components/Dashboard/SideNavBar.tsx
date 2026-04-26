import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  IconLayoutDashboard,
  IconRadioactive,
  IconChevronDown,
  IconLogout,
  IconLayoutSidebarRightCollapse,
  IconLayoutSidebarLeftCollapse,
  IconClipboardText,
  IconShieldCheck,
  IconChartPie,
  IconX
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
  // { path: '/dashboard/quan-ly-to-chuc', label: 'Quản lý tổ chức', icon: <IconBuildingCommunity size={20} stroke={2} /> },
  {
    label: 'Quản lý hồ sơ & cơ sở',
    icon: <IconRadioactive size={20} stroke={2} />,
    children: [
      { path: '/dashboard/danh-muc-co-so', label: 'Danh mục cơ sở bức xạ' },
      { path: '/dashboard/nguon-thiet-bi', label: 'Nguồn & thiết bị bức xạ' },
      { path: '/dashboard/giay-phep', label: 'Quản lý giấy phép' },
    ]
  },
  {
    label: 'Quy trình nghiệp vụ',
    icon: <IconClipboardText size={20} stroke={2} />,
    children: [
      { path: '/dashboard/thu-tuc', label: 'Thủ tục hành chính' },
      { path: '/dashboard/bao-cao-tong-hop', label: 'Báo cáo định kỳ & đột xuất' },
      { path: '/dashboard/dao-tao-tap-huan', label: 'Đào tạo và tập huấn' },
    ]
  },
  {
    label: 'Kiểm soát và giám sát',
    icon: <IconShieldCheck size={20} stroke={2} />,
    children: [
      { path: '/dashboard/thanh-tra', label: 'Thanh tra và kiểm tra' },
      { path: '/dashboard/su-co', label: 'Sự cố bức xạ và hạt nhân' },
    ]
  },
  {
    label: 'Phân tích và quản trị',
    icon: <IconChartPie size={20} stroke={2} />,
    children: [
      { path: '/dashboard/thong-ke-phan-tich', label: 'Phân tích và thống kê' },
      { path: '/dashboard/danh-muc-dung-chung', label: 'Danh mục dùng chung' },
      { path: '/dashboard/cau-hinh-he-thong', label: 'Cấu hình hệ thống' },
    ]
  },
  // { path: '/dashboard/quan-ly-tai-khoan', label: 'Quản lý tài khoản', icon: <IconUsers size={20} stroke={2} /> },
  // { path: '/dashboard/bao-cao', label: 'Báo cáo & quy trình', icon: <IconFileAnalytics size={20} stroke={2} /> },
  // { path: '/dashboard/thong-bao-va-nhac-viec', label: 'Thông báo & nhắc việc', icon: <IconBellRinging size={20} stroke={2} /> },
  // {
  //   label: 'Hệ thống',
  //   icon: <IconSettings size={20} stroke={2} />,
  //   children: [
  //     { path: '/dashboard/quyen-han', label: 'Quyền hạn' },
  //     { path: '/dashboard/nhat-ky-he-thong', label: 'Nhật ký hệ thống' },
  //   ]
  // },
];

interface SideNavBarProps {
  isMobileOpen?: boolean;
  onClose?: () => void;
}

const SideNavBar: React.FC<SideNavBarProps> = ({ isMobileOpen, onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  // Close sidebar on route change on mobile
  useEffect(() => {
    if (isMobileOpen && onClose) {
      onClose();
    }
  }, [location.pathname]);
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({
    'Quản lý hồ sơ & cơ sở': true,
    'Quy trình nghiệp vụ': true,
    'Kiểm soát và giám sát': true,
    'Phân tích và quản trị': true,
    'Hệ thống': true
  });

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
    <aside className={`side-navbar ${isCollapsed ? 'is-collapsed' : ''} ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="side-navbar-header">
        <div className="brand-logo">
          <div className="brand-icon">
            <img src={HeaderLogo} alt="Header Logo" />
          </div>
          {( !isCollapsed || isMobileOpen) && (
            <Flex direction='column'>
              <span className="brand-text" style={{ fontSize: '14px', fontWeight: '500', color: '#B91C1C' }}>Hệ thống quản lý</span>
              <span style={{ fontSize: '12px', fontWeight: '400', color: '#5D5F5F' }}>An toàn bức xạ</span>
            </Flex>
          )}
        </div>
        
        {/* Mobile Close Button */}
        <button className="mobile-close-btn" onClick={onClose}>
          <IconX size={20} />
        </button>
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
                    {(!isCollapsed || isMobileOpen) && <span className="nav-label">{item.label}</span>}
                    {(!isCollapsed || isMobileOpen) && (
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
                {(!isCollapsed || isMobileOpen) && <span className="nav-label">{item.label}</span>}
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
          {isCollapsed ? <IconLayoutSidebarLeftCollapse size={20} /> : <IconLayoutSidebarRightCollapse size={20} />}
        </button>
      </div>
    </aside>
  );
};

export default SideNavBar;
