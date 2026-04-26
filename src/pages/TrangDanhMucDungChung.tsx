import React, { useState, useRef } from 'react';
import './TrangDanhMucDungChung.css';
import {
  IconList,
  IconPlus,
  IconSearch,
  IconEdit,
  IconTrash,
  IconCopy,
  IconDownload,
  IconUpload,
  IconBuilding,
  IconUserCheck,
  IconSettings,
  IconRadioactive,
  IconAlertTriangle,
  IconCertificate,
  IconFileText,
  IconLayout2,
  IconPalette
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
  Modal,
  Select,
  Textarea,
  Group
} from '@mantine/core';
import ToastNotification from '../components/Common/ToastNotification';

interface CategoryItem {
  id: string;
  code: string;
  name: string;
  description: string;
  status: 'active' | 'locked';
  color?: string;
}

const TrangDanhMucDungChung: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState('Loại thiết bị');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CategoryItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    description: '',
    status: 'active' as 'active' | 'locked',
    color: '#2563EB'
  });

  // Comprehensive Mock Data Map
  const [allCategoriesData, setAllCategoriesData] = useState<Record<string, CategoryItem[]>>({
    'Đơn vị': [
      { id: 'dv1', code: 'DV-BV', name: 'Bệnh viện Đa khoa', description: 'Cơ sở y tế loại 1', status: 'active', color: '#2563EB' },
      { id: 'dv2', code: 'DV-CN', name: 'Nhà máy Công nghiệp', description: 'Cơ sở sản xuất có nguồn phóng xạ', status: 'active', color: '#16A34A' },
    ],
    'Nhân viên': [
      { id: 'nv1', code: 'NV-AT', name: 'Cán bộ An toàn', description: 'Chứng chỉ an toàn cấp độ 2', status: 'active', color: '#7C3AED' },
      { id: 'nv2', code: 'NV-VH', name: 'Nhân viên Vận hành', description: 'Vận hành thiết bị X-quang', status: 'locked', color: '#DC2626' },
    ],
    'Loại thiết bị': [
      { id: '1', code: 'TB-XQ', name: 'Máy X-quang chẩn đoán', description: 'Thiết bị phát tia X dùng trong y tế', status: 'active', color: '#2563EB' },
      { id: '2', code: 'TB-CT', name: 'Máy CT Scanner', description: 'Thiết bị chụp cắt lớp vi tính', status: 'active', color: '#7C3AED' },
      { id: '5', code: 'TB-ACC', name: 'Máy gia tốc tuyến tính', description: 'Thiết bị gia tốc dùng trong xạ trị', status: 'active', color: '#16A34A' },
    ],
    'Loại nguồn': [
      { id: 'n1', code: 'NQ-CO', name: 'Nguồn Coban-60', description: 'Nguồn phóng xạ năng lượng cao', status: 'active', color: '#EA580C' },
      { id: 'n2', code: 'NQ-CS', name: 'Nguồn Cs-137', description: 'Dùng trong kiểm soát mức chất lỏng', status: 'active', color: '#F59E0B' },
    ],
    'Mức độ rủi ro': [
      { id: 'r1', code: 'R-L1', name: 'Rất cao (Loại 1)', description: 'Mức độ nguy hiểm đặc biệt', status: 'active', color: '#DC2626' },
      { id: 'r2', code: 'R-L5', name: 'Thấp (Loại 5)', description: 'Mức độ ảnh hưởng tối thiểu', status: 'active', color: '#16A34A' },
    ],
    'Loại giấy phép': [
      { id: 'gp1', code: 'GP-SD', name: 'Giấy phép Sử dụng', description: 'Cấp cho việc sử dụng thiết bị/nguồn', status: 'active', color: '#2563EB' },
      { id: 'gp2', code: 'GP-VC', name: 'Giấy phép Vận chuyển', description: 'Cấp cho việc di chuyển nguồn', status: 'active', color: '#0F172A' },
    ],
    'Trạng thái': [
      { id: 'st1', code: 'ST-NEW', name: 'Mới đăng ký', description: 'Hồ sơ vừa được gửi', status: 'active', color: '#3B82F6' },
      { id: 'st2', code: 'ST-APP', name: 'Đã phê duyệt', description: 'Hồ sơ đã được cấp phép', status: 'active', color: '#16A34A' },
    ],
    'Biểu mẫu': [
      { id: 'bm1', code: 'BM-01', name: 'Đơn đề nghị cấp phép', description: 'Mẫu chuẩn nghị định 142', status: 'active', color: '#64748B' },
      { id: 'bm2', code: 'BM-BC', name: 'Báo cáo định kỳ', description: 'Mẫu báo cáo tình hình an toàn', status: 'active', color: '#2563EB' },
    ]
  });

  const currentData = allCategoriesData[activeMenu] || [];
  const filteredData = currentData.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục này khỏi danh mục?')) {
      setAllCategoriesData(prev => ({
        ...prev,
        [activeMenu]: prev[activeMenu].filter(item => item.id !== id)
      }));
      toastRef.current?.show('Đã xóa mục danh mục thành công.', 'success');
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setFormData({ code: '', name: '', description: '', status: 'active', color: '#2563EB' });
    setIsModalOpen(true);
  };

  const openEditModal = (item: CategoryItem) => {
    setEditingItem(item);
    setFormData({ 
      code: item.code, 
      name: item.name, 
      description: item.description, 
      status: item.status, 
      color: item.color || '#2563EB' 
    });
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.code || !formData.name) {
      toastRef.current?.show('Vui lòng nhập đầy đủ Mã và Tên danh mục.', 'error');
      return;
    }

    if (editingItem) {
      // Update
      setAllCategoriesData(prev => ({
        ...prev,
        [activeMenu]: prev[activeMenu].map(item => 
          item.id === editingItem.id ? { ...item, ...formData } : item
        )
      }));
      toastRef.current?.show('Đã cập nhật mục danh mục thành công.', 'success');
    } else {
      // Add
      const newItem: CategoryItem = {
        id: Date.now().toString(),
        ...formData
      };
      setAllCategoriesData(prev => ({
        ...prev,
        [activeMenu]: [...prev[activeMenu], newItem]
      }));
      toastRef.current?.show('Đã thêm mục danh mục mới thành công.', 'success');
    }
    setIsModalOpen(false);
  };

  const handleAction = (action: string) => {
    toastRef.current?.show(`Đang thực hiện thao tác: ${action}`, 'info');
  };

  const handleImport = () => {
    toastRef.current?.show('Hệ thống đang sẵn sàng tiếp nhận tệp dữ liệu.', 'info');
  };

  return (
    <div className="dmuc-page">
      <div className="dmuc-container">
        {/* Left Sub-Sidebar */}
        <aside className="dmuc-sidebar">
          <div className="dmuc-sidebar-title">
            <IconList size={24} color="#ea1e22" />
            <Title order={4}>Danh mục hệ thống</Title>
          </div>

          <div className="dmuc-category-group">
            <div className="dmuc-group-label">Đối tượng</div>
            <div className={`dmuc-menu-item ${activeMenu === 'Đơn vị' ? 'active' : ''}`} onClick={() => setActiveMenu('Đơn vị')}>
              <IconBuilding size={18} /> <span>Đơn vị, cơ sở</span>
            </div>
            <div className={`dmuc-menu-item ${activeMenu === 'Nhân viên' ? 'active' : ''}`} onClick={() => setActiveMenu('Nhân viên')}>
              <IconUserCheck size={18} /> <span>Nhân viên bức xạ</span>
            </div>
          </div>

          <div className="dmuc-category-group">
            <div className="dmuc-group-label">Kỹ thuật</div>
            <div className={`dmuc-menu-item ${activeMenu === 'Loại thiết bị' ? 'active' : ''}`} onClick={() => setActiveMenu('Loại thiết bị')}>
              <IconSettings size={18} /> <span>Loại thiết bị</span>
            </div>
            <div className={`dmuc-menu-item ${activeMenu === 'Loại nguồn' ? 'active' : ''}`} onClick={() => setActiveMenu('Loại nguồn')}>
              <IconRadioactive size={18} /> <span>Loại nguồn phóng xạ</span>
            </div>
            <div className={`dmuc-menu-item ${activeMenu === 'Mức độ rủi ro' ? 'active' : ''}`} onClick={() => setActiveMenu('Mức độ rủi ro')}>
              <IconAlertTriangle size={18} /> <span>Mức độ rủi ro</span>
            </div>
          </div>

          <div className="dmuc-category-group">
            <div className="dmuc-group-label">Hành chính</div>
            <div className={`dmuc-menu-item ${activeMenu === 'Loại giấy phép' ? 'active' : ''}`} onClick={() => setActiveMenu('Loại giấy phép')}>
              <IconCertificate size={18} /> <span>Loại giấy phép</span>
            </div>
            <div className={`dmuc-menu-item ${activeMenu === 'Trạng thái' ? 'active' : ''}`} onClick={() => setActiveMenu('Trạng thái')}>
              <IconFileText size={18} /> <span>Trạng thái hồ sơ</span>
            </div>
            <div className={`dmuc-menu-item ${activeMenu === 'Biểu mẫu' ? 'active' : ''}`} onClick={() => setActiveMenu('Biểu mẫu')}>
              <IconLayout2 size={18} /> <span>Quản lý biểu mẫu</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="dmuc-main">
          <div className="dmuc-card">
            <div className="dmuc-card-header">
              <div className="dmuc-header-top">
                <div className="dmuc-header-title">
                  <Title order={3} mb={4}>{activeMenu}</Title>
                  <Text size="sm" c="dimmed">Quản lý và thiết lập thông tin {activeMenu.toLowerCase()} toàn hệ thống</Text>
                </div>
                <Button className="dtth-btn-primary" leftSection={<IconPlus size={18} />} radius="md" onClick={openAddModal}>
                  Thêm mới {activeMenu}
                </Button>
              </div>

              <div className="dmuc-toolbar">
                <TextInput 
                  placeholder={`Tìm kiếm trong ${activeMenu.toLowerCase()}...`} 
                  leftSection={<IconSearch size={18} />}
                  className="dmuc-search-box"
                  radius="md"
                  variant="filled"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.currentTarget.value)}
                />
                <div className="dmuc-toolbar-actions">
                  <Button variant="subtle" color="blue" leftSection={<IconUpload size={16} />} radius="md" onClick={handleImport}>
                    Nhập dữ liệu
                  </Button>
                  <Button variant="subtle" color="blue" leftSection={<IconDownload size={16} />} radius="md" onClick={() => handleAction('Export Excel')}>
                    Xuất Excel
                  </Button>
                </div>
              </div>
            </div>

            <div className="dmuc-table-container">
              <table className="dmuc-table">
                <thead>
                  <tr>
                    <th style={{ width: '60px' }}>STT</th>
                    <th style={{ width: '120px' }}>Mã danh mục</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>
                    <th style={{ width: '150px' }}>Trạng thái</th>
                    <th style={{ width: '120px', textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={item.id}>
                        <td>{index + 1}</td>
                        <td><Badge variant="light" color="gray" radius="sm">{item.code}</Badge></td>
                        <td>
                          <Flex align="center" gap="xs">
                            <div style={{ width: '12px', height: '12px', borderRadius: '4px', backgroundColor: item.color }}></div>
                            <Text fw={600} size="sm">{item.name}</Text>
                          </Flex>
                        </td>
                        <td><Text size="sm" c="dimmed">{item.description}</Text></td>
                        <td>
                          <Flex align="center" gap="xs">
                            <span className="dmuc-status-dot" style={{ background: item.status === 'active' ? '#16A34A' : '#94A3B8' }}></span>
                            <Text size="sm">{item.status === 'active' ? 'Đang sử dụng' : 'Đã khóa'}</Text>
                          </Flex>
                        </td>
                        <td>
                          <Flex justify="flex-end" gap="xs">
                            <ActionIcon variant="subtle" color="blue" onClick={() => openEditModal(item)}>
                              <IconEdit size={18} />
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="gray" onClick={() => toastRef.current?.show('Đã sao chép mục danh mục.', 'info')}>
                              <IconCopy size={18} />
                            </ActionIcon>
                            <ActionIcon variant="subtle" color="red" onClick={() => handleDelete(item.id)}>
                              <IconTrash size={18} />
                            </ActionIcon>
                          </Flex>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
                        Không có dữ liệu phù hợp với điều kiện tìm kiếm.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={<Title order={4}>{editingItem ? 'Cập nhật mục danh mục' : 'Thêm mới mục danh mục'}</Title>}
        size="700px"
        radius="24px"
        centered
        padding="32px"
      >
        <Stack gap="xl">
          <div className="dmuc-form-grid">
            <TextInput 
              label="Mã danh mục" 
              placeholder="Vd: TB-XQ" 
              required 
              radius="md" 
              value={formData.code}
              onChange={(e) => setFormData({...formData, code: e.currentTarget.value})}
            />
            <TextInput 
              label="Tên danh mục" 
              placeholder="Nhập tên hiển thị" 
              required 
              radius="md" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.currentTarget.value})}
            />
          </div>
          
          <Textarea 
            label="Mô tả chi tiết" 
            placeholder="Nhập mô tả cho mục này..." 
            minRows={3} 
            radius="md" 
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.currentTarget.value})}
          />
          
          <div className="dmuc-form-grid">
            <Select 
              label="Trạng thái" 
              value={formData.status}
              onChange={(val) => setFormData({...formData, status: val as 'active' | 'locked'})}
              data={[
                { value: 'active', label: 'Đang sử dụng' },
                { value: 'locked', label: 'Khóa' },
              ]}
              radius="md"
            />
            <Stack gap={4}>
              <Text size="sm" fw={500}><IconPalette size={14} style={{ marginRight: 4 }} /> Màu đại diện</Text>
              <Group gap="xs">
                {['#2563EB', '#7C3AED', '#EA580C', '#DC2626', '#16A34A', '#0F172A'].map(color => (
                  <div 
                    key={color} 
                    onClick={() => setFormData({...formData, color})}
                    style={{ 
                      width: '28px', 
                      height: '28px', 
                      borderRadius: '50%', 
                      backgroundColor: color, 
                      cursor: 'pointer', 
                      border: '2px solid white', 
                      boxShadow: formData.color === color ? '0 0 0 2px #ea1e22' : '0 0 0 1px #E2E8F0',
                      transform: formData.color === color ? 'scale(1.1)' : 'none',
                      transition: 'all 0.2s'
                    }}
                  ></div>
                ))}
              </Group>
            </Stack>
          </div>

          <Flex justify="flex-end" gap="md" mt="xl">
            <Button variant="subtle" color="gray" radius="md" onClick={() => setIsModalOpen(false)}>Hủy bỏ</Button>
            <Button className="dtth-btn-primary" radius="md" onClick={handleSave}>
              {editingItem ? 'Lưu thay đổi' : 'Thêm mới vào hệ thống'}
            </Button>
          </Flex>
        </Stack>
      </Modal>

      <ToastNotification onRef={(ref) => (toastRef.current = ref)} />
    </div>
  );
};

export default TrangDanhMucDungChung;
