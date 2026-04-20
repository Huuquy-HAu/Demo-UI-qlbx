import React from 'react';
import { Avatar, ActionIcon, Menu, Text, Flex } from '@mantine/core';
import { IconBell, IconLogout, IconUser, IconSearch } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import './TopNavBar.css';

const TopNavBar: React.FC = () => {
  const navigate = useNavigate();
  const userInfoStr = localStorage.getItem('user_info');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : { name: 'User' };

  const handleLogout = () => {
    localStorage.removeItem('user_info');
    navigate('/dang-nhap');
  };

  return (
    <header className="top-navbar">
      <Flex align="center" gap={10}>
        <Text size="xl" fw={700} style={{ color: '#DA251D', fontFamily: 'Inter' }}>
          Hệ thống quản lý an toàn bức xạ
        </Text>
        <Text size="11px" fw={400} style={{ color: '#5D5F5F', fontFamily: 'Inter', background: '#F3F3F5', padding: '8px 16px', borderRadius: '4px' }}>
          TỈNH QUẢNG NINH
        </Text>
      </Flex>

      <div className="top-navbar-right">
        <div className="tnb-search-wrapper">
          <IconSearch size={18} className="tnb-search-icon" />
          <input type="text" placeholder="Tìm kiếm thông tin..." className="tnb-search-input" />
        </div>

        <ActionIcon variant="subtle" color="gray" size="lg" radius="md" className="notification-btn">
          <IconBell size={20} />
          <span className="notification-badge"></span>
        </ActionIcon>

        <div className="user-profile-section">
          <div className="user-info">
            <span className="user-name">{userInfo.name}</span>
            <span className="user-role">{userInfo.role}</span>
          </div>

          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <div className="avatar-wrapper">
                <Avatar radius="xl" color="red" src={null} alt="User Avatar">
                  {userInfo.name.charAt(0)}
                </Avatar>
              </div>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>Tài khoản</Menu.Label>
              <Menu.Item leftSection={<IconUser size={14} />}>Hồ sơ cá nhân</Menu.Item>
              <Menu.Divider />
              <Menu.Item color="red" leftSection={<IconLogout size={14} />} onClick={handleLogout}>
                Đăng xuất
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default TopNavBar;
