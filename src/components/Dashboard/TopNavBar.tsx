import { Avatar, ActionIcon, Menu, Text, Flex, Popover, Indicator, Stack, ScrollArea, Badge } from '@mantine/core';
import { IconBell, IconLogout, IconUser, IconSearch, IconCircleCheck, IconAlertTriangle, IconCalendarStats, IconCircleX, IconMenu2 } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import './TopNavBar.css';

interface TopNavBarProps {
  onMenuToggle?: () => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ onMenuToggle }) => {
  const navigate = useNavigate();
  const userInfoStr = localStorage.getItem('user_info');
  const userInfo = userInfoStr ? JSON.parse(userInfoStr) : { name: 'User' };

  const notifications = [
    { id: 1, title: 'Hồ sơ mới', msg: 'BV Đa khoa tỉnh vừa gửi hồ sơ cấp phép mới.', time: '5 phút trước', type: 'new', icon: <IconCircleCheck size={18} color="#16A34A" /> },
    { id: 2, title: 'Cảnh báo hết hạn', msg: '3 nguồn phóng xạ tại NM Xi măng Hạ Long sắp hết hạn.', time: '2 giờ trước', type: 'warning', icon: <IconAlertTriangle size={18} color="#EA580C" /> },
    { id: 3, title: 'Lịch thanh tra', msg: 'Đoàn kiểm tra số 1 sẽ làm việc tại Cơ sở X vào ngày mai.', time: '1 ngày trước', type: 'info', icon: <IconCalendarStats size={18} color="#2563EB" /> },
    { id: 4, title: 'Sự cố mới', msg: 'Phát hiện rò rỉ tại khu vực lưu kho nguồn phóng xạ Y.', time: '2 ngày trước', type: 'danger', icon: <IconCircleX size={18} color="#DC2626" /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user_info');
    navigate('/dang-nhap');
  };

  return (
    <header className="top-navbar">
      <div className="top-navbar-left-wrapper">
        <button className="dashboard-menu-toggle" onClick={onMenuToggle}>
          <IconMenu2 size={24} />
        </button>
        <Flex align="center" gap={10} className="tnb-title-section">
          <Text size="xl" fw={700} style={{ color: '#DA251D', fontFamily: 'Inter' }} className="tnb-main-title">
            Hệ thống quản lý an toàn bức xạ
          </Text>
          <Text size="11px" fw={400} style={{ color: '#5D5F5F', fontFamily: 'Inter', background: '#F3F3F5', padding: '8px 16px', borderRadius: '4px' }} className="tnb-subtitle">
            TỈNH QUẢNG NINH
          </Text>
        </Flex>
      </div>

      <div className="top-navbar-right">
        <div className="tnb-search-wrapper">
          <IconSearch size={18} className="tnb-search-icon" />
          <input type="text" placeholder="Tìm kiếm thông tin..." className="tnb-search-input" />
        </div>

        <Popover width={360} position="bottom-end" shadow="xl" radius="lg" withArrow>
          <Popover.Target>
            <Indicator color="red" size={8} offset={4} withBorder processing>
              <ActionIcon variant="subtle" color="gray" size="lg" radius="md" className="notification-btn">
                <IconBell size={20} />
              </ActionIcon>
            </Indicator>
          </Popover.Target>
          <Popover.Dropdown p={0}>
            <div className="tnb-noti-header">
              <Text fw={700} size="sm">Thông báo hệ thống</Text>
              <Badge variant="light" color="red" radius="xs">4 mới</Badge>
            </div>
            <ScrollArea.Autosize mah={400} type="hover">
              <Stack gap={0}>
                {notifications.map((noti) => (
                  <div key={noti.id} className="tnb-noti-item">
                    <div className="tnb-noti-icon">{noti.icon}</div>
                    <Stack gap={2} style={{ flex: 1 }}>
                      <Text size="sm" fw={600} color="#1E293B">{noti.title}</Text>
                      <Text size="xs" c="dimmed" lineClamp={2}>{noti.msg}</Text>
                      <Text size="10px" c="dimmed" mt={4}>{noti.time}</Text>
                    </Stack>
                  </div>
                ))}
              </Stack>
            </ScrollArea.Autosize>
            <div className="tnb-noti-footer">
              <Text size="xs" color="blue" style={{ cursor: 'pointer', fontWeight: 600 }}>Xem tất cả thông báo</Text>
            </div>
          </Popover.Dropdown>
        </Popover>

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
