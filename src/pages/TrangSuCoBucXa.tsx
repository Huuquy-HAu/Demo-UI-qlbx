import React, { useState, useRef } from 'react';
import './TrangSuCoBucXa.css';
import {
  IconAlertTriangle,
  IconRadioactive,
  IconFileUpload,
  IconSearch,
  IconChevronRight,
  IconX,
  IconCheck,
  IconPhoneCall,
  IconLoader2,
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
  Divider,
  Progress,
  Textarea
} from '@mantine/core';
import ToastNotification from '../components/Common/ToastNotification';

interface Incident {
  id: string;
  time: string;
  facility: string;
  location: string;
  type: string;
  ines: number;
  status: 'Tiếp nhận' | 'Đang xử lý' | 'Đã kiểm soát' | 'Đã kết thúc';
  severity: 'Thấp' | 'Trung bình' | 'Cao';
}

const mockIncidents: Incident[] = [
  { id: 'SC-2024-001', time: '25/04/2024 08:30', facility: 'Bệnh viện K (Cơ sở 3)', location: 'Phòng xạ trị 2', type: 'Hỏng thiết bị phát tia', ines: 2, status: 'Đang xử lý', severity: 'Trung bình' },
  { id: 'SC-2024-002', time: '24/04/2024 14:15', facility: 'Viện Năng lượng Nguyên tử', location: 'Kho nguồn phóng xạ', type: 'Vượt ngưỡng liều chiếu', ines: 3, status: 'Tiếp nhận', severity: 'Cao' },
  { id: 'SC-2024-003', time: '22/04/2024 10:00', facility: 'Công ty Thép Hòa Phát', location: 'Kho nguồn phóng xạ', type: 'Mất nguồn phóng xạ', ines: 4, status: 'Đã kiểm soát', severity: 'Cao' },
  { id: 'SC-2024-004', time: '20/04/2024 16:45', facility: 'Bệnh viện Bạch Mai', location: 'Khoa Y học hạt nhân', type: 'Rơi nguồn phóng xạ', ines: 2, status: 'Đã kết thúc', severity: 'Trung bình' },
  { id: 'SC-2024-005', time: '18/04/2024 09:20', facility: 'Cảng Hải Phòng', location: 'Bãi container số 4', type: 'Nghi ngờ nguồn vô chủ', ines: 1, status: 'Đã kết thúc', severity: 'Thấp' },
];

const TrangSuCoBucXa: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  const getStatusContent = (status: string) => {
    switch (status) {
      case 'Đang xử lý': return <span className="scbx-status processing"><IconLoader2 size={16} className="spinning" /> Đang xử lý</span>;
      case 'Đã kiểm soát': return <span className="scbx-status controlled"><IconCheck size={16} /> Đã kiểm soát</span>;
      case 'Tiếp nhận': return <span className="scbx-status new"><IconPhoneCall size={16} /> Đang tiếp nhận</span>;
      default: return <span className="scbx-status"><IconCheck size={16} /> Đã kết thúc</span>;
    }
  };

  return (
    <div className="scbx-page">
      <div className="scbx-container">
        {/* Header */}
        <div className="scbx-header">
          <div className="scbx-title-area">
            <span>Kiểm soát & Giám sát</span>
            <h1 className="scbx-title">Sự cố bức xạ và hạt nhân</h1>
          </div>
          <button className="dtth-btn-primary" onClick={() => setIsReportModalOpen(true)}>
            <IconPlus size={20} />
            <span>Khai báo sự cố khẩn cấp</span>
          </button>
        </div>

        {/* Alert Widgets */}
        <div className="scbx-stats-grid">
          <div className="scbx-stat-card alert">
            <Text className="scbx-stat-label">SỰ CỐ ĐANG XỬ LÝ</Text>
            <Text className="scbx-stat-value red">02</Text>
          </div>
          <div className="scbx-stat-card">
            <Text className="scbx-stat-label">MỨC ĐỘ CAO (INES 3+)</Text>
            <Text className="scbx-stat-value orange">01</Text>
          </div>
          <div className="scbx-stat-card">
            <Text className="scbx-stat-label">PHẢN ỨNG TRUNG BÌNH</Text>
            <Text className="scbx-stat-value">24<span style={{ fontSize: '14px', fontWeight: 500 }}>phút</span></Text>
          </div>
          <div className="scbx-stat-card" style={{ background: '#F8FAFC' }}>
            <Flex justify="space-between" align="center">
              <Stack gap={4}>
                <Text className="scbx-stat-label">TỶ LỆ KIỂM SOÁT</Text>
                <Text className="scbx-stat-value">92.5%</Text>
              </Stack>
              <Progress value={92.5} color="green" size="lg" radius="xl" w="100px" />
            </Flex>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="scbx-filter-bar">
          <TextInput 
            label="Tìm kiếm sự cố"
            placeholder="Mã sự cố, cơ sở, địa điểm..."
            leftSection={<IconSearch size={18} />}
            variant="filled"
            radius="md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select 
            label="Phân loại"
            placeholder="Tất cả phân loại"
            data={['Rơi nguồn', 'Hỏng thiết bị', 'Vượt ngưỡng liều', 'Mất nguồn']}
            variant="filled"
            radius="md"
          />
          <Select 
            label="Mức độ (INES)"
            placeholder="Mọi mức độ"
            data={['INES 1', 'INES 2', 'INES 3', 'INES 4']}
            variant="filled"
            radius="md"
          />
          <Select 
            label="Trạng thái"
            placeholder="Tất cả trạng thái"
            data={['Tiếp nhận', 'Đang xử lý', 'Đã kiểm soát', 'Đã kết thúc']}
            variant="filled"
            radius="md"
          />
        </div>

        {/* Incident Table */}
        <div className="scbx-table-card">
          <Table className="scbx-table">
            <thead>
              <tr>
                <th>Mã sự cố</th>
                <th>Thời điểm / Cơ sở</th>
                <th>Phân loại</th>
                <th>Mức độ (INES)</th>
                <th>Trạng thái xử lý</th>
                <th style={{ textAlign: 'center' }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {mockIncidents.map((sc) => (
                <tr key={sc.id} className={sc.severity === 'Cao' ? 'scbx-row-critical' : ''}>
                  <td><Text fw={700} size="sm">{sc.id}</Text></td>
                  <td>
                    <Text size="sm" fw={600}>{sc.facility}</Text>
                    <Text size="xs" c="dimmed">{sc.time}</Text>
                  </td>
                  <td><Badge variant="light" color="gray" radius="sm">{sc.type}</Badge></td>
                  <td>
                    <Badge color={sc.ines >= 3 ? 'red' : 'orange'} variant="filled" radius="xl">
                      INES {sc.ines}
                    </Badge>
                  </td>
                  <td>{getStatusContent(sc.status)}</td>
                  <td>
                    <Flex justify="center" gap="xs">
                      <ActionIcon 
                        variant="light" 
                        color="red" 
                        onClick={() => { setSelectedIncident(sc); setIsModalOpen(true); }}
                      >
                        <IconChevronRight size={18} />
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
          size="1100px"
          radius="24px"
          centered
          padding={0}
          classNames={{
            body: 'scbx-no-scrollbar',
            content: 'scbx-no-scrollbar'
          }}
        >
          {selectedIncident && (
            <div className="dtth-modal-content">
              <div className="dtth-modal-header">
                <Flex align="center" gap="md">
                  <ActionIcon variant="light" color="red" radius="xl" size="lg">
                    <IconAlertTriangle size={20} />
                  </ActionIcon>
                  <Title order={4}>Hồ sơ xử lý sự cố: {selectedIncident.id}</Title>
                </Flex>
                <ActionIcon variant="subtle" color="gray" onClick={() => setIsModalOpen(false)}>
                  <IconX size={24} />
                </ActionIcon>
              </div>
              <div className="dtth-modal-body scbx-no-scrollbar" style={{ padding: '0', overflowY: 'auto' }}>
                <Flex style={{ height: '80vh' }}>
                  {/* Left: Timeline & Logs */}
                  <div className="scbx-no-scrollbar" style={{ flex: 1, padding: '32px', borderRight: '1px solid #F1F5F9', overflowY: 'auto' }}>
                    <Title order={5} mb="xl">Nhật ký ứng phó</Title>
                    <div className="scbx-timeline">
                      <div className="scbx-timeline-item">
                        <div className="scbx-timeline-dot active"></div>
                        <div className="scbx-timeline-time">08:30 (Hiện tại)</div>
                        <div className="scbx-timeline-content">
                          <Text fw={700} size="sm">Đội ứng phó tại hiện trường</Text>
                          <Text size="xs" c="dimmed">Đang tiến hành khoanh vùng khu vực nguy hiểm và đo suất liều môi trường.</Text>
                        </div>
                      </div>
                      <div className="scbx-timeline-item">
                        <div className="scbx-timeline-dot"></div>
                        <div className="scbx-timeline-time">08:15</div>
                        <div className="scbx-timeline-content">
                          <Text fw={700} size="sm">Tiếp nhận thông tin chi tiết</Text>
                          <Text size="xs" c="dimmed">Cán bộ ATBX cơ sở báo cáo hỏng hệ thống khóa an toàn tại phòng xạ trị.</Text>
                        </div>
                      </div>
                      <div className="scbx-timeline-item">
                        <div className="scbx-timeline-dot"></div>
                        <div className="scbx-timeline-time">08:05</div>
                        <div className="scbx-timeline-content">
                          <Text fw={700} size="sm">Kích hoạt hệ thống báo động</Text>
                          <Text size="xs" c="dimmed">Thông báo khẩn cấp gửi đến các cơ quan ban ngành liên quan.</Text>
                        </div>
                      </div>
                    </div>

                    <Divider my="xl" label="Số liệu đo đạc" labelPosition="center" />
                    <Stack gap="md">
                      <Flex justify="space-between" align="center" className="ttkt-info-box" p="sm">
                        <Text size="sm">Suất liều tại tâm (µSv/h)</Text>
                        <Text fw={700} color="red">125.4</Text>
                      </Flex>
                      <Flex justify="space-between" align="center" className="ttkt-info-box" p="sm">
                        <Text size="sm">Khoảng cách an toàn (m)</Text>
                        <Text fw={700}>15.0</Text>
                      </Flex>
                    </Stack>
                  </div>

                  {/* Right: Map & Context */}
                  <div style={{ width: '450px', padding: '32px', background: '#F8FAFC' }}>
                    <Title order={5} mb="xl">Vị trí & Hiện trường</Title>
                    <div className="scbx-map-container">
                      <div className="scbx-map-overlay"></div>
                      <div className="scbx-map-marker" style={{ left: '60%', top: '45%' }}></div>
                    </div>
                    <Text size="xs" c="dimmed" mt="xs" ta="center">Vị trí: {selectedIncident.facility} - {selectedIncident.location}</Text>
                    
                    <Stack mt="xl" gap="md">
                      <Text size="sm" fw={700}>Bằng chứng hiện trường:</Text>
                      <Flex gap="sm">
                        <div style={{ width: '80px', height: '80px', background: '#E2E8F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconFileUpload size={24} color="gray" />
                        </div>
                        <div style={{ width: '80px', height: '80px', background: '#E2E8F0', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <IconFileUpload size={24} color="gray" />
                        </div>
                      </Flex>
                    </Stack>

                    <Stack mt="xl" gap="xs">
                      <Text size="sm" fw={700}>Nhân sự liên quan (03 người):</Text>
                      <Text size="xs">• Nguyễn Văn A (Nhân viên vận hành)</Text>
                      <Text size="xs">• Trần Thị B (Cán bộ ATBX)</Text>
                    </Stack>
                  </div>
                </Flex>
              </div>
              <div className="scbx-fixed-footer">
                <button className="dtth-btn-secondary" onClick={() => setIsModalOpen(false)}>Đóng hồ sơ</button>
                <button className="dtth-btn-secondary" style={{ color: '#B91C1C' }}>
                  <IconPhoneCall size={18} /> Gọi hỗ trợ khẩn cấp
                </button>
                <button 
                  className="dtth-btn-primary" 
                  onClick={() => {
                    toastRef.current?.show('Báo cáo đã được gửi lên cấp thẩm quyền cao nhất.', 'success');
                  }}
                >
                  Gửi báo cáo cấp trên
                </button>
              </div>
            </div>
          )}
        </Modal>

        {/* Report Modal */}
        <Modal
          opened={isReportModalOpen}
          onClose={() => setIsReportModalOpen(false)}
          withCloseButton={false}
          size="700px"
          radius="24px"
          centered
          padding={0}
          classNames={{
            body: 'scbx-no-scrollbar',
            content: 'scbx-no-scrollbar'
          }}
        >
          <div className="dtth-modal-content">
            <div className="dtth-modal-header" style={{ background: '#FEF2F2' }}>
              <Flex align="center" gap="md">
                <ActionIcon variant="filled" color="red" radius="xl" size="lg">
                  <IconRadioactive size={20} />
                </ActionIcon>
                <Title order={4} c="red.9">Khai báo sự cố khẩn cấp</Title>
              </Flex>
              <ActionIcon variant="subtle" color="gray" onClick={() => setIsReportModalOpen(false)}>
                <IconX size={24} />
              </ActionIcon>
            </div>
            <div className="dtth-modal-body">
              <Stack gap="lg">
                <Select 
                  label="Tên cơ sở bức xạ" 
                  placeholder="Chọn cơ sở từ danh mục..." 
                  data={['Bệnh viện K', 'Bệnh viện Bạch Mai', 'Viện Năng lượng', 'Công ty Thép HP']}
                  variant="filled"
                  radius="md"
                />
                <Flex gap="md">
                  <Select 
                    label="Loại sự cố" 
                    placeholder="Chọn loại..." 
                    data={['Mất nguồn', 'Rơi nguồn', 'Hỏng thiết bị', 'Khác']}
                    variant="filled"
                    radius="md"
                    style={{ flex: 1 }}
                  />
                  <Select 
                    label="Mức độ dự kiến" 
                    placeholder="Thanh INES..." 
                    data={['INES 1', 'INES 2', 'INES 3', 'INES 4']}
                    variant="filled"
                    radius="md"
                    style={{ flex: 1 }}
                  />
                </Flex>
                <Textarea 
                  label="Mô tả hiện trạng"
                  placeholder="Mô tả tóm tắt diễn biến và các biện pháp đã thực hiện tại chỗ..."
                  minRows={4}
                  variant="filled"
                  radius="md"
                />
                <div style={{ border: '2px dashed #E2E8F0', padding: '32px', borderRadius: '16px', background: '#F8FAFC' }}>
                  <Stack align="center" gap="xs">
                    <IconFileUpload size={40} color="gray" />
                    <Text size="sm" fw={600}>Tải lên hình ảnh/bằng chứng hiện trường</Text>
                    <Text size="xs" c="dimmed">Kéo thả file hoặc nhấn để chọn (Tối đa 20MB)</Text>
                  </Stack>
                </div>
              </Stack>
            </div>
            <div className="dtth-modal-footer">
              <button className="dtth-btn-secondary" onClick={() => setIsReportModalOpen(false)}>Hủy bỏ</button>
              <button 
                className="dtth-btn-primary" 
                onClick={() => {
                  toastRef.current?.show('Thông tin sự cố đã được ghi nhận. Đội ứng phó đã nhận được thông báo.', 'warning');
                  setIsReportModalOpen(false);
                }}
              >
                Gửi thông báo khẩn cấp
              </button>
            </div>
          </div>
        </Modal>

        <ToastNotification onRef={(ref) => (toastRef.current = ref)} />

      </div>
    </div>
  );
};

export default TrangSuCoBucXa;
