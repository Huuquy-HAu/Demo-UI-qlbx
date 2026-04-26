import React, { useState } from 'react';
import './TrangThuTucHanhChinh.css';
import {
  IconSearch,
  IconClock,
  IconLoader,
  IconAlertCircle,
  IconCheck,
  IconFileText,
  IconEye,
  IconHistory,
  IconX,
  IconCloudUpload,
  IconDownload,
  IconClipboardCheck,
  IconMessageDots
} from '@tabler/icons-react';
import { 
  Badge, 
  Drawer, 
  Tabs, 
  Button, 
  ActionIcon, 
  Title, 
  Timeline,
  ScrollArea,
  Text,
  Flex,
  Select,
  Textarea
} from '@mantine/core';

interface Procedure {
  id: string;
  facility: string;
  type: 'Cấp mới' | 'Gia hạn' | 'Cấp lại';
  submissionDate: string;
  status: 'Mới nộp' | 'Đang xử lý' | 'Đã trả kết quả' | 'Quá hạn';
  progress: string;
  details: string;
}

const mockProcedures: Procedure[] = [
  { id: 'HS-2024-001', facility: 'Bệnh viện Đa khoa Tâm Anh', type: 'Cấp mới', submissionDate: '20/04/2024', status: 'Mới nộp', progress: 'Chờ tiếp nhận', details: 'Cấp mới giấy phép vận hành thiết bị X-quang chẩn đoán' },
  { id: 'HS-2024-005', facility: 'Viện Năng lượng Nguyên tử', type: 'Gia hạn', submissionDate: '15/04/2024', status: 'Đang xử lý', progress: 'Chờ thẩm định', details: 'Gia hạn giấy phép lưu giữ nguồn phóng xạ' },
  { id: 'HS-2024-012', facility: 'Trung tâm Chiếu xạ Hà Nội', type: 'Cấp mới', submissionDate: '10/04/2024', status: 'Đang xử lý', progress: 'Chờ lãnh đạo ký', details: 'Cấp mới giấy phép sử dụng nguồn phóng xạ kín' },
  { id: 'HS-2024-022', facility: 'Công ty Cổ phần Sữa Việt Nam', type: 'Cấp lại', submissionDate: '01/04/2024', status: 'Quá hạn', progress: 'Chờ bổ sung hồ sơ', details: 'Cấp lại giấy phép do thay đổi thông tin pháp nhân' },
  { id: 'HS-2024-030', facility: 'Bệnh viện K (Cơ sở Tân Triều)', type: 'Gia hạn', submissionDate: '25/03/2024', status: 'Đã trả kết quả', progress: 'Đã cấp giấy phép', details: 'Gia hạn giấy phép vận hành máy gia tốc tuyến tính' },
];

const TrangThuTucHanhChinh: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedHS, setSelectedHS] = useState<Procedure | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState<string | null>(null);

  const filteredHS = mockProcedures.filter(hs => {
    const matchesSearch = hs.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hs.facility.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'new' && hs.status === 'Mới nộp') ||
                      (activeTab === 'processing' && (hs.status === 'Đang xử lý' || hs.status === 'Quá hạn')) ||
                      (activeTab === 'completed' && hs.status === 'Đã trả kết quả');
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Mới nộp': return <Badge color="blue" variant="light" fw={600}>Chờ tiếp nhận</Badge>;
      case 'Đang xử lý': return <Badge color="orange" variant="light" fw={600}>Đang xử lý</Badge>;
      case 'Đã trả kết quả': return <Badge color="green" variant="light" fw={600}>Đã hoàn thành</Badge>;
      case 'Quá hạn': return <Badge color="red" variant="filled" fw={600}>Quá hạn (SLA)</Badge>;
      default: return null;
    }
  };

  return (
    <div className="tthc-page">
      <div className="tthc-container">
        {/* Header */}
        <div className="tthc-header">
          <div className="tthc-title-area">
            <span>Quy trình nghiệp vụ</span>
            <h1 className="tthc-title">Thủ tục hành chính</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="tthc-stats-grid">
          <div className="tthc-stat-card">
            <div className="tthc-stat-row-1">
              <div className="tthc-stat-header">
                <div className="tthc-stat-icon pending"><IconLoader size={20} /></div>
                <h3 className="tthc-stat-title">CHỜ TIẾP NHẬN</h3>
              </div>
            </div>
            <div className="tthc-stat-value">12</div>
            <div className="tthc-stat-desc">Hồ sơ mới nộp từ doanh nghiệp</div>
          </div>

          <div className="tthc-stat-card">
            <div className="tthc-stat-row-1">
              <div className="tthc-stat-header">
                <div className="tthc-stat-icon appraising"><IconClock size={20} /></div>
                <h3 className="tthc-stat-title">ĐANG THẨM ĐỊNH</h3>
              </div>
            </div>
            <div className="tthc-stat-value">28</div>
            <div className="tthc-stat-desc">Đang trong quá trình xử lý nghiệp vụ</div>
          </div>

          <div className="tthc-stat-card">
            <div className="tthc-stat-row-1">
              <div className="tthc-stat-header">
                <div className="tthc-stat-icon overdue"><IconAlertCircle size={20} /></div>
                <h3 className="tthc-stat-title">QUÁ HẠN XỬ LÝ</h3>
              </div>
            </div>
            <div className="tthc-stat-value">04</div>
            <div className="tthc-stat-desc">Cần ưu tiên xử lý ngay (SLA)</div>
          </div>
        </div>

        {/* Filters */}
        <div className="tthc-filter-section">
          <Tabs value={activeTab} onChange={setActiveTab} classNames={{ list: 'tthc-tabs-list', tab: 'tthc-tabs-tab' }}>
            <Tabs.List>
              <Tabs.Tab value="new">Mới nộp (12)</Tabs.Tab>
              <Tabs.Tab value="processing">Đang xử lý (32)</Tabs.Tab>
              <Tabs.Tab value="completed">Đã trả kết quả</Tabs.Tab>
              <Tabs.Tab value="all">Tất cả hồ sơ</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <div className="tthc-filter-row">
            <div className="tthc-search-box">
              <IconSearch size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm mã hồ sơ, tên doanh nghiệp..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="tthc-table-card">
          <table className="tthc-table">
            <thead>
              <tr>
                <th style={{ width: '140px' }}>Mã hồ sơ</th>
                <th>Đơn vị nộp (Cơ sở)</th>
                <th>Loại thủ tục</th>
                <th style={{ width: '150px' }}>Ngày nộp</th>
                <th style={{ width: '180px' }}>Tiến độ xử lý</th>
                <th style={{ width: '150px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredHS.map((hs) => (
                <tr key={hs.id} className="tthc-row" onClick={() => { setSelectedHS(hs); setIsDrawerOpen(true); }}>
                  <td><span className="tthc-id-badge">{hs.id}</span></td>
                  <td>
                    <span className="tthc-facility-name">{hs.facility}</span>
                  </td>
                  <td><span className="tthc-procedure-type">{hs.type}</span></td>
                  <td>{hs.submissionDate}</td>
                  <td>
                    <Flex direction="column" gap={4}>
                      {getStatusBadge(hs.status)}
                      <Text size="xs" c="dimmed">{hs.progress}</Text>
                    </Flex>
                  </td>
                  <td>
                    {hs.status === 'Mới nộp' ? (
                      <Button variant="light" color="blue" radius="md" size="compact-sm">Tiếp nhận</Button>
                    ) : (
                      <Button variant="light" color="gray" radius="md" size="compact-sm">Xử lý</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Workspace Drawer */}
        <Drawer
          opened={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          position="right"
          size="800px"
          withCloseButton={false}
          styles={{ content: { backgroundColor: '#F8FAFC' } }}
          className="tthc-workspace-tabs"
        >
          {selectedHS && (
            <div className="tthc-drawer">
              <div className="tthc-drawer-header">
                <Flex justify="space-between" align="center" mb="xl">
                  <Badge color="blue.4" variant="filled" radius="sm">{selectedHS.id}</Badge>
                  <ActionIcon variant="transparent" color="white" onClick={() => setIsDrawerOpen(false)}><IconX size={24} /></ActionIcon>
                </Flex>
                <Title order={3} c="white" mb="xs">Xử lý Hồ sơ Thủ tục</Title>
                <Text c="rgba(255,255,255,0.7)" size="sm">{selectedHS.facility}</Text>
              </div>

              <div className="tthc-drawer-content">
                <Tabs defaultValue="attachments">
                  <Tabs.List>
                    <Tabs.Tab value="attachments" leftSection={<IconFileText size={16} />}>Hồ sơ đính kèm</Tabs.Tab>
                    <Tabs.Tab value="processing" leftSection={<IconClipboardCheck size={16} />}>Xử lý nghiệp vụ</Tabs.Tab>
                    <Tabs.Tab value="history" leftSection={<IconHistory size={16} />}>Lịch sử & Tiến độ</Tabs.Tab>
                  </Tabs.List>

                  <ScrollArea h="calc(100vh - 200px)" p="xl">
                    <Tabs.Panel value="attachments">
                      <div className="tthc-form-section">
                        <div className="tthc-section-title">Danh sách tệp tin đính kèm</div>
                        <div className="tthc-attachment-list">
                          {[
                            { name: 'Đơn đề nghị cấp giấy phép.pdf', size: '1.2 MB' },
                            { name: 'Bản khai an toàn thiết bị X-quang.pdf', size: '2.5 MB' },
                            { name: 'Chứng chỉ nhân viên bức xạ.jpg', size: '800 KB' },
                            { name: 'Sơ đồ vị trí lắp đặt.pdf', size: '3.1 MB' },
                          ].map((file, idx) => (
                            <div key={idx} className="tthc-attachment-item">
                              <div className="tthc-file-icon"><IconFileText size={20} /></div>
                              <div style={{ flex: 1 }}>
                                <Text fw={700} size="sm">{file.name}</Text>
                                <Text size="xs" c="dimmed">{file.size}</Text>
                              </div>
                              <Flex gap={8}>
                                <ActionIcon 
                                  variant="subtle" 
                                  color="blue" 
                                  onClick={() => { setPreviewFile(file.name); setIsPreviewOpen(true); }}
                                >
                                  <IconEye size={18} />
                                </ActionIcon>
                                <ActionIcon variant="subtle" color="gray"><IconDownload size={18} /></ActionIcon>
                              </Flex>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="processing">
                      <div className="tthc-form-section">
                        <div className="tthc-section-title">Cập nhật kết quả thẩm định</div>
                        <Flex direction="column" gap="md">
                          <Select 
                            label="Trạng thái kết quả"
                            placeholder="Chọn trạng thái"
                            data={['Đạt - Chuyển phê duyệt', 'Bổ sung hồ sơ', 'Không đạt - Từ chối']}
                            variant="filled"
                          />
                          <Textarea 
                            label="Nhận xét thẩm định"
                            placeholder="Nhập nội dung nhận xét chi tiết cho cơ sở..."
                            minRows={4}
                            variant="filled"
                          />
                          <div style={{ marginTop: '12px' }}>
                            <button className="tthc-btn-submit">Lưu kết quả & Chuyển phê duyệt</button>
                          </div>
                        </Flex>
                      </div>

                      <div className="tthc-form-section">
                        <div className="tthc-section-title">Trao đổi nội bộ</div>
                        <Flex align="center" gap="sm">
                          <IconMessageDots color="#94A3B8" />
                          <Text size="sm" c="dimmed">Chưa có nội dung trao đổi cho hồ sơ này.</Text>
                        </Flex>
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="history">
                      <div className="tthc-form-section">
                        <div className="tthc-section-title">Timeline xử lý hồ sơ</div>
                        <Timeline active={1} bulletSize={24} lineWidth={2}>
                          <Timeline.Item bullet={<IconCloudUpload size={12} />} title="Doanh nghiệp nộp hồ sơ">
                            <Text c="dimmed" size="xs">Nộp qua cổng DVC trực tuyến</Text>
                            <Text size="xs" mt={4} fw={700}>20/04/2024 09:15</Text>
                          </Timeline.Item>
                          <Timeline.Item bullet={<IconCheck size={12} />} title="Tiếp nhận hồ sơ">
                            <Text c="dimmed" size="xs">Cán bộ tiếp nhận: Nguyễn Thị Lan</Text>
                            <Text size="xs" mt={4} fw={700}>21/04/2024 14:30</Text>
                          </Timeline.Item>
                          <Timeline.Item bullet={<IconLoader size={12} />} title="Đang thẩm định">
                            <Text c="dimmed" size="xs">Chuyên viên xử lý: Trần Minh Anh</Text>
                            <Text size="xs" mt={4} fw={700}>Đang thực hiện</Text>
                          </Timeline.Item>
                        </Timeline>
                      </div>
                    </Tabs.Panel>
                  </ScrollArea>
                </Tabs>
              </div>
            </div>
          )}
        </Drawer>

        {/* File Preview Overlay */}
        {isPreviewOpen && (
          <div className="tthc-preview-overlay">
            <div className="tthc-preview-content">
              <div className="tthc-preview-header">
                <Flex align="center" gap="md">
                  <IconFileText color="#B91C1C" />
                  <Text fw={700}>{previewFile}</Text>
                </Flex>
                <ActionIcon variant="subtle" color="gray" onClick={() => setIsPreviewOpen(false)}>
                  <IconX size={24} />
                </ActionIcon>
              </div>
              <div className="tthc-preview-body">
                {/* Simulated PDF Preview */}
                <div style={{ color: 'white', textAlign: 'center', opacity: 0.5 }}>
                  <IconFileText size={80} stroke={1} />
                  <Text size="lg" mt="md">ĐANG TẢI BẢN XEM TRƯỚC...</Text>
                  <Text size="sm">(Simulated Preview for {previewFile})</Text>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrangThuTucHanhChinh;
