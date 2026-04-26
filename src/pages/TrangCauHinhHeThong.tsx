import React, { useState, useRef } from 'react';
import './TrangCauHinhHeThong.css';
import {
  IconUsers,
  IconShieldLock,
  IconHistory,
  IconDatabase,
  IconSearch,
  IconKey,
  IconLock,
  IconLockOpen,
  IconPlus,
  IconDownload,
  IconRefresh,
  IconSettings,
  IconClock,
  IconDeviceFloppy,
  IconTrash,
  IconChevronRight,
  IconFilter
} from '@tabler/icons-react';
import { 
  Badge, 
  ActionIcon, 
  Title, 
  Text, 
  Flex, 
  TextInput,
  Stack,
  Button,
  Select,
  Checkbox,
  Table,
  Switch,
  Tooltip,
  Modal
} from '@mantine/core';
import ToastNotification from '../components/Common/ToastNotification';

const TrangCauHinhHeThong: React.FC = () => {
  const [activeTab, setActiveTab] = useState('user');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  // --- MOCK DATA STATES ---
  const [userList, setUserList] = useState([
    { id: 1, name: 'Nguyễn Văn An', email: 'an.nv@so-khcn.gov.vn', role: 'Lãnh đạo', dept: 'Ban Giám đốc', status: 'active' },
    { id: 2, name: 'Trần Thị Bình', email: 'binh.tt@so-khcn.gov.vn', role: 'Chuyên viên', dept: 'Phòng An toàn bức xạ', status: 'active' },
    { id: 3, name: 'Lê Công Danh', email: 'danh.lc@so-khcn.gov.vn', role: 'Cán bộ sở', dept: 'Phòng Thanh tra', status: 'locked' },
    { id: 4, name: 'Phạm Minh Hải', email: 'hai.pm@doanhnghiep.vn', role: 'Doanh nghiệp', dept: 'BV Đa khoa tỉnh', status: 'active' },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'Chuyên viên',
    dept: 'Phòng An toàn bức xạ',
    status: 'active' as 'active' | 'locked'
  });

  const handleSaveUser = () => {
    if (!newUser.name || !newUser.email) {
      toastRef.current?.show('Vui lòng nhập đầy đủ thông tin bắt buộc.', 'error');
      return;
    }
    const user = { id: Date.now(), ...newUser };
    setUserList([user, ...userList]);
    setIsUserModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Chuyên viên', dept: 'Phòng An toàn bức xạ', status: 'active' });
    toastRef.current?.show(`Đã khởi tạo tài khoản cho ${newUser.name} thành công.`, 'success');
  };

  const handleToggleStatus = (id: number) => {
    setUserList(userList.map(u => u.id === id ? { ...u, status: u.status === 'active' ? 'locked' : 'active' } : u));
    const user = userList.find(u => u.id === id);
    toastRef.current?.show(user?.status === 'active' ? 'Đã khóa tài khoản khẩn cấp.' : 'Đã kích hoạt lại tài khoản.', 'warning');
  };

  const permissions = [
    { module: 'Hồ sơ Cơ sở', view: true, add: true, edit: true, delete: false, approve: false, export: true },
    { module: 'Nguồn & Thiết bị', view: true, add: true, edit: true, delete: true, approve: false, export: true },
    { module: 'Quản lý Giấy phép', view: true, add: true, edit: true, delete: false, approve: true, export: true },
    { module: 'Thanh tra Kiểm tra', view: true, add: true, edit: true, delete: true, approve: true, export: true },
    { module: 'Sự cố bức xạ', view: true, add: true, edit: true, delete: false, approve: true, export: true },
    { module: 'Báo cáo Thống kê', view: true, add: false, edit: false, delete: false, approve: false, export: true },
  ];

  const auditLogs = [
    { id: 1, time: '2026-04-26 02:15:32', user: 'Nguyễn Văn An', action: 'Đăng nhập hệ thống', ip: '192.168.1.10', status: 'success' },
    { id: 2, time: '2026-04-26 01:45:10', user: 'Trần Thị Bình', action: 'Phê duyệt hồ sơ GP-2026-001', ip: '192.168.1.12', status: 'success' },
    { id: 3, time: '2026-04-25 23:20:05', user: 'Lê Công Danh', action: 'Xóa mục danh mục: Máy X-quang', ip: '10.0.0.45', status: 'warning' },
    { id: 4, time: '2026-04-25 21:10:45', user: 'Hệ thống', action: 'Tự động sao lưu dữ liệu', ip: 'localhost', status: 'success' },
  ];

  const backups = [
    { id: 1, name: 'Full_Backup_20260425.sql', size: '1.2 GB', time: '2026-04-25 00:00:01', type: 'Daily' },
    { id: 2, name: 'Full_Backup_20260424.sql', size: '1.18 GB', time: '2026-04-24 00:00:01', type: 'Daily' },
    { id: 3, name: 'System_Config_Backup.json', size: '450 KB', time: '2026-04-20 15:30:00', type: 'Manual' },
  ];

  const handleAction = (msg: string, type: 'success' | 'info' | 'warning' = 'success') => {
    toastRef.current?.show(msg, type);
  };

  const renderUserManagement = () => (
    <div className="chh-card">
      <div className="chh-card-header">
        <Stack gap={4}>
          <Title order={3}>Quản trị Tài khoản</Title>
          <Text size="sm" c="dimmed">Quản lý cán bộ sở, lãnh đạo và tài khoản doanh nghiệp truy cập hệ thống</Text>
        </Stack>
        <Flex gap="md">
          <TextInput placeholder="Tìm Email, Tên..." leftSection={<IconSearch size={18} />} radius="md" />
          <Button className="dtth-btn-primary" leftSection={<IconPlus size={18} />} radius="md" onClick={() => setIsUserModalOpen(true)}>Thêm cán bộ</Button>
        </Flex>
      </div>

      <Table verticalSpacing="md" className="dmuc-table">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Họ và Tên</Table.Th>
            <Table.Th>Vai trò</Table.Th>
            <Table.Th>Phòng ban</Table.Th>
            <Table.Th>Trạng thái</Table.Th>
            <Table.Th style={{ textAlign: 'right' }}>Thao tác</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {userList.map((user) => (
            <Table.Tr key={user.id}>
              <Table.Td>
                <Stack gap={0}>
                  <Text fw={600} size="sm">{user.name}</Text>
                  <Text size="xs" c="dimmed">{user.email}</Text>
                </Stack>
              </Table.Td>
              <Table.Td>
                <Badge variant="light" color={user.role === 'Lãnh đạo' ? 'red' : 'blue'} radius="sm">{user.role}</Badge>
              </Table.Td>
              <Table.Td><Text size="sm">{user.dept}</Text></Table.Td>
              <Table.Td>
                <Flex align="center" gap={6}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: user.status === 'active' ? '#16A34A' : '#DC2626' }}></div>
                  <Text size="sm">{user.status === 'active' ? 'Hoạt động' : 'Đang khóa'}</Text>
                </Flex>
              </Table.Td>
              <Table.Td>
                <Flex justify="flex-end" gap="xs">
                  <Tooltip label="Reset mật khẩu">
                    <ActionIcon variant="subtle" color="blue" onClick={() => handleAction(`Đã gửi email cấp lại mật khẩu tới ${user.email}`)}>
                      <IconKey size={18} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label={user.status === 'active' ? 'Khóa tài khoản' : 'Mở khóa'}>
                    <ActionIcon variant="subtle" color={user.status === 'active' ? 'red' : 'green'} onClick={() => handleToggleStatus(user.id)}>
                      {user.status === 'active' ? <IconLock size={18} /> : <IconLockOpen size={18} />}
                    </ActionIcon>
                  </Tooltip>
                </Flex>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );

  const renderRBAC = () => (
    <div className="chh-card">
      <div className="chh-card-header">
        <Stack gap={4}>
          <Title order={3}>Phân quyền hệ thống (RBAC)</Title>
          <Text size="sm" c="dimmed">Thiết lập ma trận quyền hạn chi tiết cho vai trò: <b>Chuyên viên sở</b></Text>
        </Stack>
        <Select 
          data={['Lãnh đạo sở', 'Chuyên viên sở', 'Cán bộ thanh tra', 'Doanh nghiệp']}
          defaultValue="Chuyên viên sở"
          radius="md"
          w={200}
        />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="chh-matrix-table">
          <thead>
            <tr>
              <th className="chh-module-cell">Phân hệ / Module</th>
              <th>Xem</th>
              <th>Thêm</th>
              <th>Sửa</th>
              <th>Xóa</th>
              <th>Phê duyệt</th>
              <th>Xuất file</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((p, i) => (
              <tr key={i}>
                <td className="chh-module-cell">{p.module}</td>
                <td><Checkbox defaultChecked={p.view} color="red" /></td>
                <td><Checkbox defaultChecked={p.add} color="red" /></td>
                <td><Checkbox defaultChecked={p.edit} color="red" /></td>
                <td><Checkbox defaultChecked={p.delete} color="red" /></td>
                <td><Checkbox defaultChecked={p.approve} color="red" /></td>
                <td><Checkbox defaultChecked={p.export} color="red" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Flex justify="flex-end" mt="xl">
        <Button className="dtth-btn-primary" leftSection={<IconDeviceFloppy size={18} />} radius="md" onClick={() => handleAction('Đã cập nhật ma trận quyền hạn hệ thống.')}>Lưu cấu hình quyền</Button>
      </Flex>
    </div>
  );

  const renderAuditLog = () => (
    <div className="chh-card">
      <div className="chh-card-header">
        <Stack gap={4}>
          <Title order={3}>Nhật ký hệ thống (Audit Log)</Title>
          <Text size="sm" c="dimmed">Theo dõi toàn bộ lịch sử thao tác của người dùng trên hệ thống</Text>
        </Stack>
        <Flex gap="md">
          <TextInput placeholder="Lọc theo IP, User..." leftSection={<IconFilter size={18} />} radius="md" />
          <Button variant="light" color="gray" leftSection={<IconClock size={18} />} radius="md">7 ngày qua</Button>
        </Flex>
      </div>

      <div className="chh-logs-container">
        {auditLogs.map((log) => (
          <div key={log.id} className="chh-log-item">
            <Flex justify="space-between" align="center">
              <Flex gap="xl" align="center">
                <Text size="sm" fw={700} color="#64748B" w={160}>{log.time}</Text>
                <Stack gap={2}>
                  <Text size="sm" fw={600}>{log.action}</Text>
                  <Flex gap={8} align="center">
                    <Text size="xs" c="dimmed">Thực hiện bởi: <span style={{ color: '#0F172A', fontWeight: 500 }}>{log.user}</span></Text>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#CBD5E1' }}></div>
                    <Text size="xs" c="dimmed">IP: {log.ip}</Text>
                  </Flex>
                </Stack>
              </Flex>
              <Badge variant="dot" color={log.status === 'success' ? 'green' : 'orange'}>
                {log.status === 'success' ? 'Thành công' : 'Cảnh báo'}
              </Badge>
            </Flex>
          </div>
        ))}
      </div>
      <Flex justify="center" mt="xl">
        <Button variant="subtle" color="blue" rightSection={<IconChevronRight size={16} />}>Xem tất cả nhật ký</Button>
      </Flex>
    </div>
  );

  const renderBackup = () => (
    <Stack gap="24px">
      <div className="chh-card">
        <Title order={4} mb="xl">Cấu hình Sao lưu tự động</Title>
        <Flex justify="space-between" align="center" style={{ background: '#F8FAFC', padding: '24px', borderRadius: '20px', border: '1px solid #F1F5F9' }}>
          <Stack gap={4}>
            <Text fw={600}>Tự động sao lưu hàng ngày</Text>
            <Text size="xs" c="dimmed">Hệ thống sẽ nén và lưu trữ toàn bộ Database vào lúc 00:00 mỗi ngày</Text>
          </Stack>
          <Switch size="lg" color="red" defaultChecked />
        </Flex>
        <Flex gap="md" mt="xl">
          <Select label="Tần suất" defaultValue="daily" data={[{value:'daily', label:'Hàng ngày'}, {value:'weekly', label:'Hàng tuần'}]} radius="md" style={{ flex: 1 }} />
          <TextInput label="Thời điểm" defaultValue="00:00" radius="md" style={{ flex: 1 }} />
          <TextInput label="Số bản lưu giữ tối đa" defaultValue="30 bản" radius="md" style={{ flex: 1 }} />
        </Flex>
      </div>

      <div className="chh-card">
        <Flex justify="space-between" align="center" mb="xl">
          <Title order={4}>Danh sách bản sao lưu</Title>
          <Button variant="light" color="blue" leftSection={<IconRefresh size={18} />} radius="md" onClick={() => handleAction('Đang khởi tạo bản sao lưu thủ công...', 'info')}>Sao lưu ngay bây giờ</Button>
        </Flex>

        {backups.map((b) => (
          <div key={b.id} className="chh-backup-item">
            <div className="chh-backup-info">
              <div className="chh-backup-icon">
                <IconDatabase size={24} />
              </div>
              <Stack gap={2}>
                <Text fw={600} size="sm">{b.name}</Text>
                <Text size="xs" c="dimmed">{b.time} • Dung lượng: {b.size} • Loại: {b.type}</Text>
              </Stack>
            </div>
            <Flex gap="xs">
              <Button variant="light" color="blue" size="xs" radius="md" leftSection={<IconDownload size={14} />}>Tải về</Button>
              <Button variant="light" color="red" size="xs" radius="md" leftSection={<IconRefresh size={14} />} onClick={() => {
                if(window.confirm('CẢNH BÁO: Hành động phục hồi dữ liệu sẽ ghi đè lên dữ liệu hiện tại. Bạn có chắc chắn muốn tiếp tục?')) {
                  handleAction('Đang tiến hành phục hồi dữ liệu hệ thống...', 'warning');
                }
              }}>Phục hồi</Button>
              <ActionIcon variant="subtle" color="gray"><IconTrash size={18} /></ActionIcon>
            </Flex>
          </div>
        ))}
      </div>
    </Stack>
  );

  return (
    <div className="chh-page">
      <div className="chh-container">
        {/* Sidebar Navigation */}
        <aside className="chh-sidebar">
          <div className="dmuc-sidebar-title" style={{ marginBottom: 24 }}>
            <IconSettings size={24} color="#ea1e22" />
            <Title order={4}>Cấu hình hệ thống</Title>
          </div>
          
          <div className={`chh-sidebar-item ${activeTab === 'user' ? 'active' : ''}`} onClick={() => setActiveTab('user')}>
            <IconUsers size={20} /> <span>Quản trị Tài khoản</span>
          </div>
          <div className={`chh-sidebar-item ${activeTab === 'rbac' ? 'active' : ''}`} onClick={() => setActiveTab('rbac')}>
            <IconShieldLock size={20} /> <span>Phân quyền (RBAC)</span>
          </div>
          <div className={`chh-sidebar-item ${activeTab === 'log' ? 'active' : ''}`} onClick={() => setActiveTab('log')}>
            <IconHistory size={20} /> <span>Nhật ký hệ thống</span>
          </div>
          <div className={`chh-sidebar-item ${activeTab === 'backup' ? 'active' : ''}`} onClick={() => setActiveTab('backup')}>
            <IconDatabase size={20} /> <span>Sao lưu & Phục hồi</span>
          </div>
        </aside>

        {/* Main Content */}
        <main className="chh-main">
          {activeTab === 'user' && renderUserManagement()}
          {activeTab === 'rbac' && renderRBAC()}
          {activeTab === 'log' && renderAuditLog()}
          {activeTab === 'backup' && renderBackup()}
        </main>
      </div>

      {/* Add User Modal */}
      <Modal
        opened={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title={<Title order={4}>Khởi tạo tài khoản cán bộ mới</Title>}
        size="650px"
        radius="24px"
        centered
        padding="32px"
      >
        <Stack gap="xl">
          <div className="dmuc-form-grid">
            <TextInput 
              label="Họ và Tên" 
              placeholder="Nhập đầy đủ họ tên" 
              required 
              radius="md" 
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.currentTarget.value})}
            />
            <TextInput 
              label="Email công vụ" 
              placeholder="Vd: canbo@so-khcn.gov.vn" 
              required 
              radius="md" 
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.currentTarget.value})}
            />
          </div>

          <div className="dmuc-form-grid">
            <Select 
              label="Vai trò hệ thống" 
              placeholder="Chọn vai trò"
              data={['Lãnh đạo sở', 'Chuyên viên sở', 'Cán bộ thanh tra', 'Doanh nghiệp']}
              radius="md"
              value={newUser.role}
              onChange={(val) => setNewUser({...newUser, role: val || ''})}
            />
            <Select 
              label="Phòng ban" 
              placeholder="Chọn đơn vị"
              data={['Ban Giám đốc', 'Phòng An toàn bức xạ', 'Phòng Thanh tra', 'Phòng Kế hoạch']}
              radius="md"
              value={newUser.dept}
              onChange={(val) => setNewUser({...newUser, dept: val || ''})}
            />
          </div>

          <Flex justify="flex-end" gap="md" mt="xl">
            <Button variant="subtle" color="gray" radius="md" onClick={() => setIsUserModalOpen(false)}>Hủy bỏ</Button>
            <Button className="dtth-btn-primary" radius="md" onClick={handleSaveUser}>Xác nhận khởi tạo</Button>
          </Flex>
        </Stack>
      </Modal>

      <ToastNotification onRef={(ref) => (toastRef.current = ref)} />
    </div>
  );
};

export default TrangCauHinhHeThong;
