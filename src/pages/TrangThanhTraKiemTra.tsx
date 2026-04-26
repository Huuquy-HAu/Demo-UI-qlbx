import React, { useState, useRef } from 'react';
import './TrangThanhTraKiemTra.css';
import ToastNotification from '../components/Common/ToastNotification';
import {
  IconSearch,
  IconShieldCheck,
  IconAlertTriangle,
  IconGavel,
  IconClipboardCheck,
  IconEye,
  IconX,
  IconFileText,
  IconPlus
} from '@tabler/icons-react';
import { 
  Badge, 
  ActionIcon, 
  Title, 
  Text, 
  Flex, 
  Select, 
  TextInput,
  Table,
  Modal,
  Stack,
  Divider
} from '@mantine/core';

interface Inspection {
  id: string;
  facility: string;
  date: string;
  type: 'Định kỳ' | 'Đột xuất' | 'Chuyên đề';
  lead: string;
  result: 'Đạt' | 'Vi phạm' | 'Đang xử lý' | 'Đã xử phạt';
  fine?: string;
}

const mockInspections: Inspection[] = [
  { id: 'TT-2024-001', facility: 'Bệnh viện Trung ương Quân đội 108', date: '10/04/2024', type: 'Định kỳ', lead: 'Nguyễn Văn Hùng', result: 'Đạt' },
  { id: 'TT-2024-002', facility: 'Công ty CP Thép Hòa Phát', date: '12/04/2024', type: 'Đột xuất', lead: 'Trần Minh Tuấn', result: 'Vi phạm', fine: '20.000.000 VNĐ' },
  { id: 'TT-2024-003', facility: 'Phòng khám Đa khoa Quốc tế', date: '15/04/2024', type: 'Chuyên đề', lead: 'Lê Quang Huy', result: 'Đang xử lý' },
  { id: 'TT-2024-004', facility: 'Trung tâm Chiếu xạ Hà Nội', date: '18/04/2024', type: 'Định kỳ', lead: 'Phạm Minh Đức', result: 'Đã xử phạt', fine: '50.000.000 VNĐ' },
  { id: 'TT-2024-005', facility: 'Công ty TNHH Samsung Electronics', date: '20/04/2024', type: 'Đột xuất', lead: 'Hoàng Kim Liên', result: 'Đạt' },
];

const TrangThanhTraKiemTra: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [inspections, setInspections] = useState<Inspection[]>(mockInspections);
  const [selectedInspection, setSelectedInspection] = useState<Inspection | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  const [newPlan, setNewPlan] = useState({
    facility: '',
    type: 'Định kỳ',
    lead: '',
    date: ''
  });

  const handleCreatePlan = () => {
    if (!newPlan.facility || !newPlan.date || !newPlan.lead) {
      toastRef.current?.show('Vui lòng nhập đầy đủ thông tin kế hoạch', 'error');
      return;
    }

    const newItem: Inspection = {
      id: `TT-2024-${inspections.length + 100}`,
      facility: newPlan.facility,
      date: new Date(newPlan.date).toLocaleDateString('vi-VN'),
      type: newPlan.type as any,
      lead: newPlan.lead,
      result: 'Đang xử lý'
    };

    setInspections([newItem, ...inspections]);
    setIsNewPlanModalOpen(false);
    setNewPlan({ facility: '', type: 'Định kỳ', lead: '', date: '' });
    toastRef.current?.show('Lập kế hoạch thanh tra thành công!', 'success');
  };

  const filteredInspections = inspections.filter(item => {
    const matchesSearch = item.facility.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = !statusFilter || statusFilter === 'all' || item.result === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'Đạt': return <Badge color="green" variant="light" radius="sm">Đạt yêu cầu</Badge>;
      case 'Vi phạm': return <Badge color="orange" variant="light" radius="sm">Có vi phạm</Badge>;
      case 'Đang xử lý': return <Badge color="blue" variant="light" radius="sm">Đang xử lý</Badge>;
      case 'Đã xử phạt': return <Badge color="red" variant="light" radius="sm">Đã xử phạt</Badge>;
      default: return <Badge color="gray" variant="light" radius="sm">{result}</Badge>;
    }
  };

  return (
    <div className="ttkt-page">
      <div className="ttkt-container">
        {/* Header */}
        <div className="ttkt-header">
          <div className="ttkt-title-area">
            <span>Kiểm soát & Giám sát</span>
            <h1 className="ttkt-title">Thanh tra và Kiểm tra</h1>
          </div>
          <button className="dtth-btn-primary" onClick={() => setIsNewPlanModalOpen(true)}>
            <IconPlus size={20} />
            <span>Lập kế hoạch thanh tra</span>
          </button>
        </div>

        {/* Bento Stats */}
        <div className="ttkt-stats-grid">
          <div className="ttkt-stat-card">
            <ActionIcon variant="light" color="blue" radius="lg" size="xl">
              <IconShieldCheck size={24} />
            </ActionIcon>
            <div>
              <Text className="ttkt-stat-label">TỔNG ĐỢT THANH TRA</Text>
              <Text className="ttkt-stat-value">124</Text>
            </div>
          </div>
          <div className="ttkt-stat-card">
            <ActionIcon variant="light" color="orange" radius="lg" size="xl">
              <IconAlertTriangle size={24} />
            </ActionIcon>
            <div>
              <Text className="ttkt-stat-label">SỐ VỤ VI PHẠM</Text>
              <Text className="ttkt-stat-value">18</Text>
            </div>
          </div>
          <div className="ttkt-stat-card">
            <ActionIcon variant="light" color="red" radius="lg" size="xl">
              <IconGavel size={24} />
            </ActionIcon>
            <div>
              <Text className="ttkt-stat-label">TỔNG TIỀN XỬ PHẠT</Text>
              <Text className="ttkt-stat-value">450.0M</Text>
            </div>
          </div>
          <div className="ttkt-stat-card">
            <ActionIcon variant="light" color="green" radius="lg" size="xl">
              <IconClipboardCheck size={24} />
            </ActionIcon>
            <div>
              <Text className="ttkt-stat-label">TỶ LỆ CHẤP HÀNH</Text>
              <Text className="ttkt-stat-value">85.5%</Text>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="ttkt-filter-bar">
          <TextInput 
            label="Tìm kiếm cơ sở"
            placeholder="Nhập tên cơ sở hoặc mã thanh tra..."
            leftSection={<IconSearch size={18} />}
            variant="filled"
            radius="md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select 
            label="Hình thức"
            placeholder="Tất cả hình thức"
            data={[
              { value: 'all', label: 'Tất cả hình thức' },
              { value: 'Định kỳ', label: 'Định kỳ' },
              { value: 'Đột xuất', label: 'Đột xuất' },
              { value: 'Chuyên đề', label: 'Chuyên đề' }
            ]}
            variant="filled"
            radius="md"
            value={typeFilter}
            onChange={setTypeFilter}
          />
          <Select 
            label="Trạng thái"
            placeholder="Tất cả trạng thái"
            data={[
              { value: 'all', label: 'Tất cả trạng thái' },
              { value: 'Đạt', label: 'Đạt yêu cầu' },
              { value: 'Vi phạm', label: 'Có vi phạm' },
              { value: 'Đang xử lý', label: 'Đang xử lý' },
              { value: 'Đã xử phạt', label: 'Đã xử phạt' }
            ]}
            variant="filled"
            radius="md"
            value={statusFilter}
            onChange={setStatusFilter}
          />
          <Select 
            label="Kỳ báo cáo"
            placeholder="Chọn năm"
            data={['2024', '2023', '2022']}
            defaultValue="2024"
            variant="filled"
            radius="md"
          />
        </div>

        {/* Data Table */}
        <div className="ttkt-table-card">
          <Table className="ttkt-table">
            <thead>
              <tr>
                <th>Mã thanh tra</th>
                <th>Cơ sở được kiểm tra</th>
                <th>Thời gian</th>
                <th>Hình thức</th>
                <th>Trưởng đoàn</th>
                <th>Kết luận</th>
                <th style={{ textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredInspections.map((item) => (
                <tr key={item.id}>
                  <td><Text fw={700} size="sm">{item.id}</Text></td>
                  <td><Text size="sm" fw={500}>{item.facility}</Text></td>
                  <td>{item.date}</td>
                  <td>
                    <Badge variant="dot" color={item.type === 'Định kỳ' ? 'blue' : 'orange'} radius="sm">
                      {item.type}
                    </Badge>
                  </td>
                  <td>{item.lead}</td>
                  <td>{getResultBadge(item.result)}</td>
                  <td>
                    <Flex justify="center" gap="xs">
                      <ActionIcon variant="light" color="blue" onClick={() => { setSelectedInspection(item); setIsModalOpen(true); }} title="Xem chi tiết">
                        <IconEye size={18} />
                      </ActionIcon>
                      <ActionIcon variant="light" color="red" onClick={() => toastRef.current?.show('Đã gửi yêu cầu cập nhật kết quả thanh tra', 'info')} title="Cập nhật kết quả">
                        <IconFileText size={18} />
                      </ActionIcon>
                    </Flex>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>

        {/* Detail Modal */}
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          withCloseButton={false}
          radius="24px"
          centered
          padding={0}
          size="600px"
        >
          {selectedInspection && (
            <div className="ttkt-modal-content">
              <div className="ttkt-modal-header">
                <Flex align="center" gap="md">
                  <ActionIcon variant="light" color="blue" radius="xl" size="lg">
                    <IconShieldCheck size={20} />
                  </ActionIcon>
                  <Title order={4}>Chi tiết đợt thanh tra</Title>
                </Flex>
                <ActionIcon variant="subtle" color="gray" onClick={() => setIsModalOpen(false)}>
                  <IconX size={24} />
                </ActionIcon>
              </div>
              <div className="ttkt-modal-body">
                <Stack gap="xl">
                  <div className="ttkt-info-box">
                    <Text size="xs" c="dimmed" fw={700} mb={4} style={{ letterSpacing: '0.05em' }}>{selectedInspection.id}</Text>
                    <Title order={4} mb="lg">{selectedInspection.facility}</Title>
                    
                    <Divider mb="lg" variant="dashed" />
                    
                    <Flex direction="column" gap="md">
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">Hình thức thanh tra:</Text>
                        <Text size="sm" fw={700}>{selectedInspection.type}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">Ngày thực hiện:</Text>
                        <Text size="sm" fw={700}>{selectedInspection.date}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">Trưởng đoàn:</Text>
                        <Text size="sm" fw={700}>{selectedInspection.lead}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">Kết luận cuối cùng:</Text>
                        {getResultBadge(selectedInspection.result)}
                      </Flex>
                      {selectedInspection.fine && (
                        <Flex justify="space-between">
                          <Text size="sm" c="dimmed">Mức xử phạt:</Text>
                          <Text size="sm" fw={700} color="red">{selectedInspection.fine}</Text>
                        </Flex>
                      )}
                    </Flex>
                  </div>
                  
                  <div>
                    <Text size="sm" fw={600} mb="xs">Nội dung biên bản tóm tắt:</Text>
                    <Text size="sm" c="dimmed">
                      Đoàn thanh tra đã tiến hành kiểm tra thực tế hệ thống an toàn bức xạ, hồ sơ nhân sự và các thiết bị đo liều. 
                      {selectedInspection.result === 'Đạt' 
                        ? ' Cơ sở tuân thủ tốt các quy định hiện hành.' 
                        : ' Phát hiện một số thiếu sót trong việc lưu trữ nhật ký vận hành và đào tạo định kỳ cho nhân viên.'}
                    </Text>
                  </div>
                </Stack>
              </div>
              <div className="ttkt-modal-footer">
                <button className="dtth-btn-secondary" style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>Đóng</button>
                <button 
                  className="dtth-btn-primary" 
                  style={{ border: 'none', padding: '12px 32px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }}
                  onClick={() => {
                    toastRef.current?.show('Đang khởi tạo tệp tin PDF...', 'info');
                    setTimeout(() => toastRef.current?.show('Xuất biên bản PDF thành công!', 'success'), 1500);
                  }}
                >
                  Xuất biên bản (PDF)
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* New Plan Modal */}
        <Modal
          opened={isNewPlanModalOpen}
          onClose={() => setIsNewPlanModalOpen(false)}
          withCloseButton={false}
          size="600px"
          radius="24px"
          centered
          padding={0}
        >
          <div className="ttkt-modal-content">
            <div className="ttkt-modal-header">
              <Flex align="center" gap="md">
                <ActionIcon variant="light" color="red" radius="xl" size="lg">
                  <IconPlus size={20} />
                </ActionIcon>
                <Title order={4}>Lập kế hoạch thanh tra mới</Title>
              </Flex>
              <ActionIcon variant="subtle" color="gray" onClick={() => setIsNewPlanModalOpen(false)}>
                <IconX size={24} />
              </ActionIcon>
            </div>
            <div className="ttkt-modal-body">
              <Stack gap="lg">
                <TextInput 
                  label="Cơ sở được kiểm tra" 
                  placeholder="Nhập tên doanh nghiệp, bệnh viện..." 
                  variant="filled"
                  value={newPlan.facility}
                  onChange={(e) => setNewPlan({...newPlan, facility: e.target.value})}
                />
                <Select 
                  label="Hình thức thanh tra" 
                  placeholder="Chọn hình thức" 
                  data={['Định kỳ', 'Đột xuất', 'Chuyên đề']} 
                  variant="filled"
                  value={newPlan.type}
                  onChange={(val) => setNewPlan({...newPlan, type: val || 'Định kỳ'})}
                />
                <Flex gap="md">
                  <TextInput 
                    label="Ngày dự kiến" 
                    type="date" 
                    style={{ flex: 1 }} 
                    variant="filled" 
                    value={newPlan.date}
                    onChange={(e) => setNewPlan({...newPlan, date: e.target.value})}
                  />
                  <TextInput 
                    label="Trưởng đoàn" 
                    placeholder="Nhập tên cán bộ"
                    style={{ flex: 1 }} 
                    variant="filled" 
                    value={newPlan.lead}
                    onChange={(e) => setNewPlan({...newPlan, lead: e.target.value})}
                  />
                </Flex>
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px' }}>
                  <Text size="xs" c="dimmed">Kế hoạch sau khi tạo sẽ được thông báo đến cơ sở và các thành viên trong đoàn thanh tra.</Text>
                </div>
              </Stack>
            </div>
            <div className="ttkt-modal-footer">
              <button className="dtth-btn-secondary" style={{ background: '#F1F5F9', color: '#475569', border: 'none', padding: '12px 24px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }} onClick={() => setIsNewPlanModalOpen(false)}>Hủy bỏ</button>
              <button className="dtth-btn-primary" style={{ border: 'none', padding: '12px 32px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer' }} onClick={handleCreatePlan}>Tạo kế hoạch</button>
            </div>
          </div>
        </Modal>

        <ToastNotification onRef={(ref) => (toastRef.current = ref)} />

      </div>
    </div>
  );
};

export default TrangThanhTraKiemTra;
