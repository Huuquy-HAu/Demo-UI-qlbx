import React, { useState, useRef } from 'react';
import './TrangDaoTaoTapHuan.css';
import ToastNotification from '../components/Common/ToastNotification';
import {
  IconCalendar,
  IconPlus,
  IconUsers,
  IconCertificate,
  IconBook,
  IconDownload,
  IconSearch,
  IconChevronLeft,
  IconChevronRight,
  IconQrcode,
  IconFileText,
  IconDotsVertical,
  IconX,
  IconAlertCircle
} from '@tabler/icons-react';
import { 
  Badge, 
  Tabs, 
  Button, 
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

interface Student {
  id: string;
  name: string;
  facility: string;
  score: number | null;
  status: 'Đi học' | 'Vắng' | 'Đạt' | 'Chưa đạt' | 'Chờ thi';
}

const mockStudents: Student[] = [
  { id: 'HV-001', name: 'Nguyễn Văn An', facility: 'Bệnh viện Đa khoa Tâm Anh', score: 8.5, status: 'Đạt' },
  { id: 'HV-002', name: 'Trần Thị Bình', facility: 'Viện Năng lượng Nguyên tử', score: 9.0, status: 'Đạt' },
  { id: 'HV-003', name: 'Lê Văn Cường', facility: 'Trung tâm Chiếu xạ Hà Nội', score: 4.5, status: 'Chưa đạt' },
  { id: 'HV-004', name: 'Phạm Minh Đức', facility: 'Bệnh viện K', score: null, status: 'Chờ thi' },
  { id: 'HV-005', name: 'Hoàng Kim Liên', facility: 'Công ty Sữa Vinamilk', score: 7.5, status: 'Đạt' },
];

interface TrainingPlan {
  id: string;
  name: string;
  target: string;
  date: string;
  count: number;
  status: 'Mới tạo' | 'Đang thực hiện' | 'Đã hoàn thành';
  day: number; // For calendar simulation
}

const mockPlans: TrainingPlan[] = [
  { id: 'PLAN-001', name: 'Lớp ATBX cơ bản cho nhân viên y tế', target: 'Nhân viên bức xạ', date: '2024-04-10', count: 45, status: 'Đang thực hiện', day: 10 },
  { id: 'PLAN-002', name: 'Thi sát hạch cấp chứng chỉ RPO', target: 'Người phụ trách an toàn (RPO)', date: '2024-04-15', count: 20, status: 'Đang thực hiện', day: 15 },
  { id: 'PLAN-003', name: 'Tập huấn RPO miền Bắc 2024', target: 'Người phụ trách an toàn (RPO)', date: '2024-04-22', count: 30, status: 'Mới tạo', day: 22 },
];

const TrangDaoTaoTapHuan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('plans');
  const [plans, setPlans] = useState<TrainingPlan[]>(mockPlans);
  const [isNewPlanModalOpen, setIsNewPlanModalOpen] = useState(false);
  const [isViewPlanModalOpen, setIsViewPlanModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<TrainingPlan | null>(null);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  const [newPlan, setNewPlan] = useState({
    name: '',
    target: 'Nhân viên bức xạ',
    date: '',
    count: 0
  });

  const handleCreatePlan = () => {
    if (!newPlan.name || !newPlan.date) {
      toastRef.current?.show('Vui lòng nhập đầy đủ thông tin', 'error');
      return;
    }

    const dayNum = new Date(newPlan.date).getDate();
    const plan: TrainingPlan = {
      id: `PLAN-2024-${plans.length + 1}`,
      name: newPlan.name,
      target: newPlan.target,
      date: newPlan.date,
      count: newPlan.count,
      status: 'Mới tạo',
      day: dayNum
    };

    setPlans([plan, ...plans]);
    setIsNewPlanModalOpen(false);
    setNewPlan({ name: '', target: 'Nhân viên bức xạ', date: '', count: 0 });
    toastRef.current?.show('Lập kế hoạch đào tạo thành công!', 'success');
  };

  return (
    <div className="dtth-page">
      <div className="dtth-container">
        {/* Header */}
        <div className="dtth-header">
          <div className="dtth-title-area">
            <span>Quy trình nghiệp vụ</span>
            <h1 className="dtth-title">Đào tạo & Tập huấn</h1>
          </div>
          <Button 
            leftSection={<IconPlus size={20} />} 
            radius="md" 
            size="md"
            className="dtth-btn-primary" 
            onClick={() => setIsNewPlanModalOpen(true)}
          >
            Lập kế hoạch mới
          </Button>
        </div>

        {/* Stats */}
        <div className="dtth-stats-grid">
          <div className="dtth-stat-card">
            <Text className="dtth-stat-label">TỔNG KHÓA HỌC/NĂM</Text>
            <Text className="dtth-stat-value">24</Text>
          </div>
          <div className="dtth-stat-card">
            <Text className="dtth-stat-label">HỌC VIÊN ĐÃ ĐÀO TẠO</Text>
            <Text className="dtth-stat-value">1,250</Text>
          </div>
          <div className="dtth-stat-card">
            <Text className="dtth-stat-label">CHỨNG CHỈ ĐÃ CẤP</Text>
            <Text className="dtth-stat-value">1,180</Text>
          </div>
          <div className="dtth-stat-card">
            <Text className="dtth-stat-label">TỶ LỆ ĐẠT (PASS RATE)</Text>
            <Text className="dtth-stat-value">94.4%</Text>
          </div>
        </div>

        <Tabs value={activeTab} onChange={setActiveTab} classNames={{ list: 'dtth-tabs-list', tab: 'dtth-tabs-tab' }}>
          <Tabs.List>
            <Tabs.Tab value="plans" leftSection={<IconCalendar size={18} />}>Kế hoạch & Lịch</Tabs.Tab>
            <Tabs.Tab value="classes" leftSection={<IconUsers size={18} />}>Quản lý Lớp học</Tabs.Tab>
            <Tabs.Tab value="outcomes" leftSection={<IconCertificate size={18} />}>Kết quả & Chứng chỉ</Tabs.Tab>
            <Tabs.Tab value="docs" leftSection={<IconBook size={18} />}>Kho Tài liệu</Tabs.Tab>
          </Tabs.List>

          {/* Tab 1: Kế hoạch & Lịch */}
          <Tabs.Panel value="plans">
            <div className="dtth-calendar-card">
              <div className="dtth-calendar-header">
                <Title order={4}>Lịch đào tạo tháng 04/2024</Title>
                <Flex gap="sm">
                  <ActionIcon variant="light" color="gray"><IconChevronLeft size={20} /></ActionIcon>
                  <ActionIcon variant="light" color="gray"><IconChevronRight size={20} /></ActionIcon>
                </Flex>
              </div>
              <div className="dtth-calendar-grid">
                {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN'].map(day => (
                  <div key={day} className="dtth-calendar-day-label">{day}</div>
                ))}
                {Array.from({ length: 35 }).map((_, i) => {
                  const dayNum = (i - 2); // Simple mock offset
                  const dayPlans = plans.filter(p => p.day === dayNum);
                  return (
                    <div key={i} className="dtth-calendar-day">
                      <Text size="xs" fw={700} c={dayNum > 0 && dayNum <= 30 ? 'dark' : 'dimmed'}>
                        {dayNum > 0 && dayNum <= 30 ? dayNum : ''}
                      </Text>
                      {dayPlans.map(p => (
                        <div 
                          key={p.id} 
                          className={`dtth-event-tag ${p.name.includes('Thi') ? 'exam' : 'training'}`}
                          onClick={() => { setSelectedPlan(p); setIsViewPlanModalOpen(true); }}
                          style={{ cursor: 'pointer' }}
                        >
                          {p.name.split(' ').slice(0, 3).join(' ')}...
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
          </Tabs.Panel>

          {/* Tab 2: Lớp học */}
          <Tabs.Panel value="classes">
            <div className="dtth-table-card">
              <div style={{ padding: '24px', background: 'white', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #F1F5F9' }}>
                <Flex gap="md">
                  <TextInput leftSection={<IconSearch size={16} />} placeholder="Tìm tên lớp, giảng viên..." style={{ width: '300px' }} radius="md" />
                  <Button variant="light" color="blue" radius="md">Import danh sách Excel</Button>
                </Flex>
              </div>
              <Table className="dtth-table">
                <thead>
                  <tr>
                    <th>Mã lớp</th>
                    <th>Tên khóa đào tạo</th>
                    <th>Giảng viên</th>
                    <th>Số học viên</th>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><Text fw={700} size="sm">CLASS-24-01</Text></td>
                    <td>An toàn bức xạ cho nhân viên y tế (X-quang)</td>
                    <td>TS. Nguyễn Minh Đức</td>
                    <td>45 học viên</td>
                    <td>10/04 - 12/04</td>
                    <td><Badge color="green" variant="light" radius="sm">Đang diễn ra</Badge></td>
                    <td><ActionIcon variant="subtle" color="gray"><IconDotsVertical size={18} /></ActionIcon></td>
                  </tr>
                  <tr>
                    <td><Text fw={700} size="sm">CLASS-24-02</Text></td>
                    <td>Đào tạo người phụ trách an toàn (RPO)</td>
                    <td>ThS. Lê Quang Huy</td>
                    <td>25 học viên</td>
                    <td>22/04 - 25/04</td>
                    <td><Badge color="blue" variant="light" radius="sm">Mới tạo</Badge></td>
                    <td><ActionIcon variant="subtle" color="gray"><IconDotsVertical size={18} /></ActionIcon></td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Tabs.Panel>

          {/* Tab 3: Kết quả & Chứng chỉ */}
          <Tabs.Panel value="outcomes">
            <div className="dtth-table-card">
              <Table className="dtth-table">
                <thead>
                  <tr>
                    <th>Học viên</th>
                    <th>Đơn vị công tác</th>
                    <th>Điểm thi</th>
                    <th>Trạng thái</th>
                    <th style={{ textAlign: 'center' }}>Chứng chỉ</th>
                  </tr>
                </thead>
                <tbody>
                  {mockStudents.map(s => (
                    <tr key={s.id}>
                      <td>
                        <Text fw={700} size="sm">{s.name}</Text>
                        <Text size="xs" c="dimmed">{s.id}</Text>
                      </td>
                      <td>{s.facility}</td>
                      <td><Text fw={700}>{s.score ?? '--'}</Text></td>
                      <td>
                        <Badge color={s.status === 'Đạt' ? 'green' : s.status === 'Chưa đạt' ? 'red' : 'blue'} variant="light" radius="sm">
                          {s.status}
                        </Badge>
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        {s.status === 'Đạt' ? (
                          <Button 
                            variant="subtle" 
                            color="red" 
                            size="compact-xs" 
                            leftSection={<IconCertificate size={14} />}
                            onClick={() => { setSelectedStudent(s); setIsCertModalOpen(true); }}
                          >
                            Xem chứng chỉ
                          </Button>
                        ) : (
                          <Text size="xs" c="dimmed">Chưa đủ điều kiện</Text>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Tabs.Panel>

          {/* Tab 4: Kho tài liệu */}
          <Tabs.Panel value="docs">
            <div className="dtth-doc-grid">
              {[
                { name: 'Giáo trình ATBX Y tế.pdf', type: 'Giáo trình', size: '15 MB' },
                { name: 'Thông tư 13/2018/TT-BKHCN.pdf', type: 'Văn bản', size: '2.1 MB' },
                { name: 'Slide bài giảng - Buổi 1.pptx', type: 'Bài giảng', size: '8.5 MB' },
                { name: 'Hướng dẫn xử lý sự cố.pdf', type: 'Tài liệu', size: '4.2 MB' },
              ].map((doc, i) => (
                <div key={i} className="dtth-doc-card">
                  <div className="dtth-doc-icon"><IconFileText size={24} /></div>
                  <div style={{ flex: 1 }}>
                    <Text fw={700} size="sm">{doc.name}</Text>
                    <Text size="xs" c="dimmed">{doc.type} • {doc.size}</Text>
                  </div>
                  <ActionIcon variant="subtle" color="gray"><IconDownload size={20} /></ActionIcon>
                </div>
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>

        <ToastNotification onRef={(ref) => (toastRef.current = ref)} />

        {/* View Plan Modal */}
        <Modal
          opened={isViewPlanModalOpen}
          onClose={() => setIsViewPlanModalOpen(false)}
          withCloseButton={false}
          radius="24px"
          centered
          padding={0}
          size="550px"
        >
          {selectedPlan && (
            <div className="dtth-modal-content" style={{ maxWidth: '100%' }}>
              <div className="dtth-modal-header">
                <Flex align="center" gap="md">
                  <ActionIcon variant="light" color="red" radius="xl" size="lg">
                    <IconCalendar size={20} />
                  </ActionIcon>
                  <Title order={4}>Chi tiết kế hoạch đào tạo</Title>
                </Flex>
                <ActionIcon variant="subtle" color="gray" onClick={() => setIsViewPlanModalOpen(false)}>
                  <IconX size={24} />
                </ActionIcon>
              </div>
              <div className="dtth-modal-body">
                <Stack gap="xl">
                  <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                    <Text size="xs" c="dimmed" fw={700} mb={4} style={{ letterSpacing: '0.05em' }}>{selectedPlan.id}</Text>
                    <Title order={4} mb="lg">{selectedPlan.name}</Title>
                    
                    <Divider mb="lg" variant="dashed" />
                    
                    <Flex direction="column" gap="md">
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">Đối tượng đào tạo:</Text>
                        <Text size="sm" fw={700}>{selectedPlan.target}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">Thời gian dự kiến:</Text>
                        <Text size="sm" fw={700}>{new Date(selectedPlan.date).toLocaleDateString('vi-VN')}</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">Quy mô lớp học:</Text>
                        <Text size="sm" fw={700}>{selectedPlan.count} học viên</Text>
                      </Flex>
                      <Flex justify="space-between">
                        <Text size="sm" c="dimmed">Trạng thái hiện tại:</Text>
                        <Badge color={selectedPlan.status === 'Mới tạo' ? 'blue' : 'green'} variant="light" radius="sm">
                          {selectedPlan.status}
                        </Badge>
                      </Flex>
                    </Flex>
                  </div>
                  
                  <div style={{ padding: '16px', background: '#FFF7ED', borderRadius: '12px', border: '1px solid #FFEDD5' }}>
                    <Flex gap="sm" align="flex-start">
                      <ActionIcon variant="transparent" color="orange" size="sm"><IconAlertCircle size={16} /></ActionIcon>
                      <Text size="xs" c="orange.9" fw={500}>Kế hoạch này cần được phê duyệt trước khi tiến hành khởi tạo lớp học thực tế.</Text>
                    </Flex>
                  </div>
                </Stack>
              </div>
              <div className="dtth-modal-footer">
                <button className="dtth-btn-secondary" onClick={() => setIsViewPlanModalOpen(false)}>Đóng</button>
                <button className="dtth-btn-primary" onClick={() => { setIsViewPlanModalOpen(false); setActiveTab('classes'); }}>Quản lý lớp học</button>
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
          <div className="dtth-modal-content" style={{ maxWidth: '100%' }}>
            <div className="dtth-modal-header">
              <Flex align="center" gap="md">
                <ActionIcon variant="light" color="red" radius="xl" size="lg">
                  <IconPlus size={20} />
                </ActionIcon>
                <Title order={4}>Lập kế hoạch đào tạo mới</Title>
              </Flex>
              <ActionIcon variant="subtle" color="gray" onClick={() => setIsNewPlanModalOpen(false)}>
                <IconX size={24} />
              </ActionIcon>
            </div>
            <div className="dtth-modal-body">
              <Stack gap="lg">
                <TextInput 
                  label="Tên khóa tập huấn" 
                  placeholder="VD: Khóa tập huấn RPO miền Bắc 2024" 
                  variant="filled"
                  value={newPlan.name}
                  onChange={(e) => setNewPlan({...newPlan, name: e.target.value})}
                  styles={{ label: { marginBottom: '8px', fontSize: '13px', fontWeight: 600 } }}
                />
                <Select 
                  label="Đối tượng đào tạo" 
                  placeholder="Chọn đối tượng" 
                  data={['Nhân viên bức xạ', 'Người phụ trách an toàn (RPO)', 'Cán bộ quản lý']} 
                  variant="filled"
                  value={newPlan.target}
                  onChange={(val) => setNewPlan({...newPlan, target: val || ''})}
                  styles={{ label: { marginBottom: '8px', fontSize: '13px', fontWeight: 600 } }}
                />
                <Flex gap="md">
                  <TextInput 
                    label="Thời gian dự kiến" 
                    type="date" 
                    style={{ flex: 1 }} 
                    variant="filled" 
                    value={newPlan.date}
                    onChange={(e) => setNewPlan({...newPlan, date: e.target.value})}
                    styles={{ label: { marginBottom: '8px', fontSize: '13px', fontWeight: 600 } }}
                  />
                  <TextInput 
                    label="Số lượng học viên" 
                    type="number" 
                    style={{ flex: 1 }} 
                    variant="filled" 
                    value={newPlan.count}
                    onChange={(e) => setNewPlan({...newPlan, count: parseInt(e.target.value) || 0})}
                    styles={{ label: { marginBottom: '8px', fontSize: '13px', fontWeight: 600 } }}
                  />
                </Flex>
                
                <Divider my="sm" variant="dashed" />
                
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '12px' }}>
                  <Text size="xs" c="dimmed">Lưu ý: Sau khi tạo, kế hoạch sẽ hiển thị trên lịch đào tạo toàn hệ thống để các đơn vị có thể theo dõi và đăng ký.</Text>
                </div>
              </Stack>
            </div>
            <div className="dtth-modal-footer">
              <button className="dtth-btn-secondary" onClick={() => setIsNewPlanModalOpen(false)}>Hủy bỏ</button>
              <button className="dtth-btn-primary" onClick={handleCreatePlan}>Tạo kế hoạch</button>
            </div>
          </div>
        </Modal>

        {/* Certificate Modal */}
        <Modal
          opened={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
          size="1000px"
          title={<Text fw={700}>Bản xem trước Chứng chỉ Đào tạo</Text>}
          centered
          padding="xl"
          radius="xl"
        >
          {selectedStudent && (
            <Stack gap="xl">
              <div className="dtth-cert-preview">
                <div className="dtth-cert-header">Cộng hòa xã hội chủ nghĩa Việt Nam<br/>Độc lập - Tự do - Hạnh phúc</div>
                <div className="dtth-cert-title">GIẤY CHỨNG NHẬN</div>
                <Text size="xl">Chứng nhận học viên:</Text>
                <div className="dtth-cert-name">{selectedStudent.name}</div>
                <Text size="lg" px="50px">Đã hoàn thành khóa đào tạo <strong>"An toàn bức xạ cho nhân viên y tế"</strong> tổ chức từ ngày 10/04/2024 đến ngày 12/04/2024 và đạt kết quả <strong>Xếp loại Giỏi ({selectedStudent.score})</strong>.</Text>
                
                <div className="dtth-qr-code">
                  <IconQrcode size={64} stroke={1} />
                </div>
              </div>
              <Flex justify="flex-end" gap="md">
                <Button variant="light" color="gray" onClick={() => setIsCertModalOpen(false)}>Đóng</Button>
                <Button color="red" leftSection={<IconDownload size={18} />}>Tải xuống bản PDF</Button>
              </Flex>
            </Stack>
          )}
        </Modal>

      </div>
    </div>
  );
};

export default TrangDaoTaoTapHuan;
