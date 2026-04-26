import React, { useState } from 'react';
import './TrangQuanLyGiayPhep.css';
import {
  IconSearch,
  IconPlus,
  IconFilter,
  IconDownload,
  IconHistory,
  IconDeviceDesktop,
  IconUsers,
  IconSignature,
  IconAlertCircle,
  IconCheck,
  IconX,
  IconRefresh,
  IconTrash,
  IconCloudUpload,
  IconChevronRight,
  IconFileText
} from '@tabler/icons-react';
import { 
  Flex, 
  Text, 
  Badge, 
  Drawer, 
  Tabs, 
  Button, 
  ActionIcon, 
  Title, 
  Timeline,
  ScrollArea,
  Select
} from '@mantine/core';

interface License {
  id: string;
  licenseNumber: string;
  owner: string;
  workType: string;
  issueDate: string;
  expiryDate: string;
  status: 'Đang hiệu lực' | 'Sắp hết hạn' | 'Đã hết hạn' | 'Đã thu hồi';
  decisionNo: string;
  signDate: string;
  signer: string;
  isDigitalSigned: boolean;
}

const mockLicenses: License[] = [
  { 
    id: '1', 
    licenseNumber: '124/GP-ATBX', 
    owner: 'Bệnh viện Đa khoa Tâm Anh', 
    workType: 'Vận hành thiết bị X-quang chẩn đoán y tế',
    issueDate: '10/01/2023', 
    expiryDate: '10/01/2026', 
    status: 'Đang hiệu lực',
    decisionNo: '456/QĐ-KHCN',
    signDate: '05/01/2023',
    signer: 'Nguyễn Văn A',
    isDigitalSigned: true
  },
  { 
    id: '2', 
    licenseNumber: '89/GP-ATBX', 
    owner: 'Trung tâm Chiếu xạ Hà Nội', 
    workType: 'Sử dụng nguồn phóng xạ kín',
    issueDate: '15/03/2021', 
    expiryDate: '15/03/2024', 
    status: 'Sắp hết hạn',
    decisionNo: '123/QĐ-UBND',
    signDate: '10/03/2021',
    signer: 'Trần Thị B',
    isDigitalSigned: true
  },
  { 
    id: '3', 
    licenseNumber: '210/GP-ATBX', 
    owner: 'Viện Năng lượng Nguyên tử', 
    workType: 'Lưu giữ nguồn phóng xạ',
    issueDate: '20/05/2020', 
    expiryDate: '20/05/2023', 
    status: 'Đã hết hạn',
    decisionNo: '789/QĐ-KHCN',
    signDate: '15/05/2020',
    signer: 'Lê Văn C',
    isDigitalSigned: false
  },
  { 
    id: '4', 
    licenseNumber: '45/GP-ATBX', 
    owner: 'Công ty Cổ phần Sữa Việt Nam', 
    workType: 'Sử dụng nguồn phóng xạ',
    issueDate: '12/12/2022', 
    expiryDate: '12/12/2025', 
    status: 'Đang hiệu lực',
    decisionNo: '234/QĐ-Sở',
    signDate: '08/12/2022',
    signer: 'Phạm Văn D',
    isDigitalSigned: true
  },
  { 
    id: '5', 
    licenseNumber: '056/GP-TH', 
    owner: 'Phòng khám Đa khoa Quốc tế', 
    workType: 'Vận hành máy X-quang di động',
    issueDate: '01/01/2022', 
    expiryDate: '01/01/2024', 
    status: 'Đã thu hồi',
    decisionNo: '012/QĐ-XLVP',
    signDate: '25/12/2021',
    signer: 'Hoàng Văn E',
    isDigitalSigned: true
  },
];

const TrangQuanLyGiayPhep: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLicense, setSelectedLicense] = useState<License | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  
  const [newLicense, setNewLicense] = useState({
    licenseNo: '',
    facility: '',
    workType: '',
    issueDate: '',
    expiryDate: '',
    type: 'Cấp mới'
  });

  const filteredLicenses = mockLicenses.filter(l => {
    const matchesSearch = l.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         l.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'active' && l.status === 'Đang hiệu lực') ||
                      (activeTab === 'expiring' && l.status === 'Sắp hết hạn') ||
                      (activeTab === 'expired' && l.status === 'Đã hết hạn') ||
                      (activeTab === 'revoked' && l.status === 'Đã thu hồi');
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Đang hiệu lực': return <Badge color="green" variant="light" fw={500} style={{ textTransform: 'none' }}>Đang hiệu lực</Badge>;
      case 'Sắp hết hạn': return <Badge color="yellow" variant="filled" fw={500} style={{ textTransform: 'none' }}>Sắp hết hạn</Badge>;
      case 'Đã hết hạn': return <Badge color="red" variant="filled" fw={500} style={{ textTransform: 'none' }}>Đã hết hạn</Badge>;
      case 'Đã thu hồi': return <Badge color="gray" variant="light" fw={500} style={{ textTransform: 'none' }}>Đã thu hồi</Badge>;
      default: return null;
    }
  };

  return (
    <div className="qlgp-page">
      <div className="qlgp-container">
        {/* Header */}
        <div className="qlgp-header">
          <div className="qlgp-title-area">
            <span>Hệ thống quản lý an toàn bức xạ</span>
            <h1 className="qlgp-title">Quản lý Giấy phép</h1>
          </div>
          <div className="qlgp-actions">
            <button className="qlgp-btn qlgp-btn-outline" onClick={() => setIsUploadModalOpen(true)}>
              <IconCloudUpload size={18} />
              <span>Tải lên hồ sơ</span>
            </button>
            <button className="qlgp-btn qlgp-btn-primary" onClick={() => setIsAddModalOpen(true)}>
              <IconPlus size={18} />
              <span>Cấp mới Giấy phép</span>
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="qlgp-stats-grid">
          <div className="qlgp-stat-card">
            <div className="qlgp-stat-row-1">
              <div className="qlgp-stat-header">
                <div className="qlgp-stat-icon active"><IconCheck size={20} /></div>
                <h3 className="qlgp-stat-title">ĐANG HIỆU LỰC</h3>
              </div>
            </div>
            <div className="qlgp-stat-row-2">
              <div className="qlgp-stat-value">128</div>
            </div>
            <div className="qlgp-stat-row-3">
              <div className="qlgp-stat-desc">Hồ sơ hoạt động đúng quy định</div>
            </div>
          </div>

          <div className="qlgp-stat-card">
            <div className="qlgp-stat-row-1">
              <div className="qlgp-stat-header">
                <div className="qlgp-stat-icon warning"><IconAlertCircle size={20} /></div>
                <h3 className="qlgp-stat-title">SẮP HẾT HẠN</h3>
              </div>
            </div>
            <div className="qlgp-stat-row-2">
              <div className="qlgp-stat-value">12</div>
            </div>
            <div className="qlgp-stat-row-3">
              <div className="qlgp-stat-desc">Cần gia hạn trong 30 ngày tới</div>
            </div>
          </div>

          <div className="qlgp-stat-card">
            <div className="qlgp-stat-row-1">
              <div className="qlgp-stat-header">
                <div className="qlgp-stat-icon danger"><IconX size={20} /></div>
                <h3 className="qlgp-stat-title">ĐÃ HẾT HẠN</h3>
              </div>
            </div>
            <div className="qlgp-stat-row-2">
              <div className="qlgp-stat-value">05</div>
            </div>
            <div className="qlgp-stat-row-3">
              <div className="qlgp-stat-desc">Vi phạm thời gian hiệu lực</div>
            </div>
          </div>

          <div className="qlgp-stat-card">
            <div className="qlgp-stat-row-1">
              <div className="qlgp-stat-header">
                <div className="qlgp-stat-icon revoked"><IconTrash size={20} /></div>
                <h3 className="qlgp-stat-title">ĐÃ THU HỒI</h3>
              </div>
            </div>
            <div className="qlgp-stat-row-2">
              <div className="qlgp-stat-value">03</div>
            </div>
            <div className="qlgp-stat-row-3">
              <div className="qlgp-stat-desc">Hồ sơ đã bị đình chỉ hoạt động</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="qlgp-filter-section">
          <Tabs value={activeTab} onChange={setActiveTab} classNames={{ list: 'qlgp-tabs-list', tab: 'qlgp-tabs-tab' }}>
            <Tabs.List>
              <Tabs.Tab value="active">Đang hiệu lực</Tabs.Tab>
              <Tabs.Tab value="expiring">Sắp hết hạn</Tabs.Tab>
              <Tabs.Tab value="expired">Đã hết hạn</Tabs.Tab>
              <Tabs.Tab value="revoked">Đã thu hồi</Tabs.Tab>
              <Tabs.Tab value="all">Tất cả hồ sơ</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <div className="qlgp-filter-row">
            <div className="qlgp-search-box">
              <IconSearch size={20} />
              <input 
                type="text" 
                placeholder="Tìm kiếm số giấy phép, đơn vị được cấp..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" color="gray" radius="md" h={48} leftSection={<IconFilter size={18} />}>Bộ lọc nâng cao</Button>
          </div>
        </div>

        {/* Table */}
        <div className="qlgp-table-card">
          <table className="qlgp-table">
            <thead>
              <tr>
                <th style={{ width: '180px' }}>Số giấy phép</th>
                <th>Cơ sở được cấp</th>
                <th>Loại hình công việc</th>
                <th style={{ width: '150px' }}>Ngày cấp</th>
                <th style={{ width: '150px' }}>Ngày hết hạn</th>
                <th style={{ width: '150px' }}>Trạng thái</th>
                <th style={{ width: '80px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredLicenses.map((l) => (
                <tr key={l.id} className="qlgp-row" onClick={() => { setSelectedLicense(l); setIsDrawerOpen(true); }}>
                  <td><span className="qlgp-license-no">{l.licenseNumber}</span></td>
                  <td>
                    <span className="qlgp-owner-name">{l.owner}</span>
                  </td>
                  <td><span className="qlgp-work-type">{l.workType}</span></td>
                  <td><span className="qlgp-date-text">{l.issueDate}</span></td>
                  <td>
                    <span className={`qlgp-date-text ${l.status === 'Đã hết hạn' ? 'danger' : ''}`}>
                      {l.expiryDate}
                    </span>
                  </td>
                  <td>{getStatusBadge(l.status)}</td>
                  <td>
                    <ActionIcon variant="subtle" color="red">
                      <IconDownload size={20} />
                    </ActionIcon>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail Drawer */}
        <Drawer
          opened={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          position="right"
          size="720px"
          withCloseButton={false}
          styles={{ content: { backgroundColor: '#F8FAFC' } }}
          className="qlgp-drawer-tabs"
        >
          {selectedLicense && (
            <div className="qlgp-drawer">
              <div className="qlgp-drawer-header">
                <Flex justify="space-between" align="center" mb="xl">
                  <Badge color="red.4" variant="filled" radius="sm">{selectedLicense.licenseNumber}</Badge>
                  <ActionIcon variant="transparent" color="white" onClick={() => setIsDrawerOpen(false)}><IconX size={24} /></ActionIcon>
                </Flex>
                <Title order={3} c="white" mb="xs">Chi tiết Giấy phép Bức xạ</Title>
                <Text c="rgba(255,255,255,0.7)" size="sm">{selectedLicense.owner}</Text>
                
                <Flex gap="md" mt="xl">
                  <Button variant="white" color="dark" radius="md" size="sm" leftSection={<IconRefresh size={16} />}>Gia hạn giấy phép</Button>
                  <Button variant="filled" color="red" radius="md" size="sm" leftSection={<IconTrash size={16} />}>Thu hồi</Button>
                </Flex>
              </div>

              <div className="qlgp-drawer-content">
                <Tabs defaultValue="info" classNames={{ list: 'qlgp-tabs-list' }}>
                  <Tabs.List>
                    <Tabs.Tab value="info" leftSection={<IconFileText size={16} />}>Thông tin</Tabs.Tab>
                    <Tabs.Tab value="mapping" leftSection={<IconDeviceDesktop size={16} />}>Thiết bị</Tabs.Tab>
                    <Tabs.Tab value="personnel" leftSection={<IconUsers size={16} />}>Nhân sự</Tabs.Tab>
                    <Tabs.Tab value="history" leftSection={<IconHistory size={16} />}>Lịch sử</Tabs.Tab>
                  </Tabs.List>

                  <ScrollArea h="calc(100vh - 280px)" p="xl">
                    <Tabs.Panel value="info">
                      <div className="qlgp-info-section">
                        <div className="qlgp-info-title">Thông tin pháp lý</div>
                        <div className="qlgp-info-grid">
                          <div className="qlgp-info-item">
                            <label>Số quyết định</label>
                            <span>{selectedLicense.decisionNo}</span>
                          </div>
                          <div className="qlgp-info-item">
                            <label>Ngày ký quyết định</label>
                            <span>{selectedLicense.signDate}</span>
                          </div>
                          <div className="qlgp-info-item">
                            <label>Người ký</label>
                            <span>{selectedLicense.signer}</span>
                          </div>
                          <div className="qlgp-info-item">
                            <label>Thời hạn hiệu lực</label>
                            <span>36 tháng</span>
                          </div>
                          <div className="qlgp-info-item full-width">
                            <label>Phạm vi hoạt động</label>
                            <span>{selectedLicense.workType}</span>
                          </div>
                        </div>
                      </div>

                      {selectedLicense.isDigitalSigned && (
                        <div className="qlgp-sig-box">
                          <div className="qlgp-sig-icon"><IconSignature size={28} /></div>
                          <div>
                            <Text fw={700} size="sm" c="blue.9">Đã xác thực chữ ký số</Text>
                            <Text size="xs" c="blue.7">Ký bởi: Lãnh đạo Sở Khoa học và Công nghệ</Text>
                            <Text size="xs" c="blue.7">Thời gian: {selectedLicense.signDate} 09:30:00</Text>
                          </div>
                        </div>
                      )}
                    </Tabs.Panel>

                    <Tabs.Panel value="mapping">
                      <div className="qlgp-info-section">
                        <div className="qlgp-info-title">Thiết bị & Nguồn được cấp phép</div>
                        <div className="qlgp-mapping-list">
                          {[1, 2].map((i) => (
                            <div key={i} className="qlgp-mapping-card">
                              <div className="qlgp-mapping-icon"><IconDeviceDesktop size={20} /></div>
                              <div style={{ flex: 1 }}>
                                <Text fw={700} size="sm">Máy X-quang kỹ thuật số cao tần</Text>
                                <Text size="xs" c="dimmed">Model: Siemens Multix Impact • SN: XQ-{i}23</Text>
                              </div>
                              <IconChevronRight size={18} color="#94A3B8" />
                            </div>
                          ))}
                        </div>
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="personnel">
                      <div className="qlgp-info-section">
                        <div className="qlgp-info-title">Nhân sự vận hành liên quan</div>
                        <div className="qlgp-mapping-list">
                          <div className="qlgp-mapping-card">
                            <div className="qlgp-mapping-icon"><IconUsers size={20} /></div>
                            <div style={{ flex: 1 }}>
                              <Text fw={700} size="sm">ThS. Nguyễn Văn Quyết</Text>
                              <Text size="xs" c="dimmed">Vai trò: Người phụ trách an toàn (RPO)</Text>
                            </div>
                          </div>
                          <div className="qlgp-mapping-card">
                            <div className="qlgp-mapping-icon"><IconUsers size={20} /></div>
                            <div style={{ flex: 1 }}>
                              <Text fw={700} size="sm">KS. Trần Minh Anh</Text>
                              <Text size="xs" c="dimmed">Vai trò: Nhân viên bức xạ</Text>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="history">
                      <div className="qlgp-info-section">
                        <div className="qlgp-info-title">Lịch sử biến động hồ sơ</div>
                        <Timeline active={1} bulletSize={24} lineWidth={2}>
                          <Timeline.Item bullet={<IconCheck size={12} />} title="Cấp mới Giấy phép">
                            <Text c="dimmed" size="xs">Cán bộ thụ lý: Lê Thị Lan</Text>
                            <Text size="xs" mt={4} fw={700}>{selectedLicense.issueDate}</Text>
                          </Timeline.Item>
                          <Timeline.Item bullet={<IconHistory size={12} />} title="Đang thụ lý hồ sơ gia hạn">
                            <Text c="dimmed" size="xs">Cơ sở đã nộp hồ sơ gia hạn trực tuyến qua cổng DVC</Text>
                            <Text size="xs" mt={4} fw={700}>20/12/2023</Text>
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

        {/* Modal: Cấp mới Giấy phép */}
        {isAddModalOpen && (
          <div className="qlgp-modal-overlay">
            <div className="qlgp-modal-content">
              <div className="qlgp-modal-header">
                <h2 className="qlgp-modal-title">Cấp mới Giấy phép Bức xạ</h2>
                <button className="qlgp-modal-close" onClick={() => setIsAddModalOpen(false)}>
                  <IconX size={20} />
                </button>
              </div>

              <div className="qlgp-modal-body">
                <div className="qlgp-form-group">
                  <label className="qlgp-form-label">Hình thức cấp</label>
                  <div className="qlgp-segmented-control">
                    <div 
                      className={`qlgp-segment-item ${newLicense.type === 'Cấp mới' ? 'active' : ''}`}
                      onClick={() => setNewLicense({...newLicense, type: 'Cấp mới'})}
                    >
                      Cấp mới
                    </div>
                    <div 
                      className={`qlgp-segment-item ${newLicense.type === 'Gia hạn' ? 'active' : ''}`}
                      onClick={() => setNewLicense({...newLicense, type: 'Gia hạn'})}
                    >
                      Gia hạn
                    </div>
                  </div>
                </div>

                <div className="qlgp-form-grid">
                  <div className="qlgp-form-group">
                    <label className="qlgp-form-label">Số giấy phép <span style={{ color: '#EF4444' }}>*</span></label>
                    <input 
                      type="text" 
                      className="qlgp-form-input" 
                      placeholder="VD: 124/GP-ATBX"
                      value={newLicense.licenseNo}
                      onChange={(e) => setNewLicense({...newLicense, licenseNo: e.target.value})}
                    />
                  </div>
                  <div className="qlgp-form-group">
                    <label className="qlgp-form-label">Cơ sở được cấp <span style={{ color: '#EF4444' }}>*</span></label>
                    <Select 
                      placeholder="Chọn cơ sở sở hữu"
                      data={['Bệnh viện Đa khoa Tâm Anh', 'Bệnh viện K', 'Viện Năng lượng']}
                      value={newLicense.facility}
                      onChange={(val) => setNewLicense({...newLicense, facility: val || ''})}
                      variant="filled"
                      comboboxProps={{ zIndex: 1100 }}
                      styles={{ input: { height: '48px', borderRadius: '12px', background: '#F8FAFC', border: '1.5px solid #e2e8f0' } }}
                    />
                  </div>
                </div>

                <div className="qlgp-form-group">
                  <label className="qlgp-form-label">Loại hình công việc</label>
                  <input 
                    type="text" 
                    className="qlgp-form-input" 
                    placeholder="VD: Vận hành thiết bị X-quang..."
                    value={newLicense.workType}
                    onChange={(e) => setNewLicense({...newLicense, workType: e.target.value})}
                  />
                </div>

                <div className="qlgp-form-grid">
                  <div className="qlgp-form-group">
                    <label className="qlgp-form-label">Ngày cấp</label>
                    <input 
                      type="date" 
                      className="qlgp-form-input" 
                      value={newLicense.issueDate}
                      onChange={(e) => setNewLicense({...newLicense, issueDate: e.target.value})}
                    />
                  </div>
                  <div className="qlgp-form-group">
                    <label className="qlgp-form-label">Ngày hết hạn</label>
                    <input 
                      type="date" 
                      className="qlgp-form-input" 
                      value={newLicense.expiryDate}
                      onChange={(e) => setNewLicense({...newLicense, expiryDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="qlgp-form-group">
                  <label className="qlgp-form-label">Hồ sơ đính kèm (Bản scan)</label>
                  <div className="qlgp-upload-area" onClick={() => setUploadedFile('giay_phep_scan_v1.pdf')}>
                    <div className="qlgp-upload-icon">
                      <IconCloudUpload size={24} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <span className="qlgp-upload-title">{uploadedFile || 'Chọn tệp scan hoặc kéo thả vào đây'}</span>
                      <span className="qlgp-upload-subtitle">Hỗ trợ PDF, JPG, PNG (Tối đa 20MB)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="qlgp-modal-footer">
                <button className="qlgp-btn-cancel" onClick={() => setIsAddModalOpen(false)}>Hủy bỏ</button>
                <button 
                  className="qlgp-btn-submit" 
                  onClick={() => setIsAddModalOpen(false)}
                  disabled={!newLicense.licenseNo || !newLicense.facility}
                >
                  Xác nhận cấp phép
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal: Tải lên hồ sơ */}
        {isUploadModalOpen && (
          <div className="qlgp-modal-overlay">
            <div className="qlgp-modal-content">
              <div className="qlgp-modal-header">
                <h2 className="qlgp-modal-title">Tải lên hồ sơ Giấy phép</h2>
                <button className="qlgp-modal-close" onClick={() => setIsUploadModalOpen(false)}>
                  <IconX size={20} />
                </button>
              </div>

              <div className="qlgp-modal-body">
                <div className="qlgp-upload-area" style={{ padding: '60px 24px' }} onClick={() => setUploadedFile('document_upload_1.pdf')}>
                  <div className="qlgp-upload-icon" style={{ width: '64px', height: '64px' }}>
                    <IconCloudUpload size={32} />
                  </div>
                  <div style={{ textAlign: 'center', marginTop: '16px' }}>
                    <span className="qlgp-upload-title" style={{ fontSize: '16px' }}>{uploadedFile || 'Click để chọn tệp hồ sơ'}</span>
                    <Text size="sm" c="dimmed">Kéo thả tệp PDF hoặc ảnh chụp bản gốc vào đây để lưu trữ</Text>
                  </div>
                </div>
                
                <div className="qlgp-form-group">
                  <label className="qlgp-form-label">Ghi chú hồ sơ</label>
                  <textarea 
                    className="qlgp-form-input" 
                    style={{ height: '100px', padding: '12px', resize: 'none' }}
                    placeholder="Nhập ghi chú cho đợt tải lên này (nếu có)..."
                  />
                </div>
              </div>

              <div className="qlgp-modal-footer">
                <button className="qlgp-btn-cancel" onClick={() => setIsUploadModalOpen(false)}>Hủy</button>
                <button className="qlgp-btn-submit" onClick={() => setIsUploadModalOpen(false)}>Tải lên ngay</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrangQuanLyGiayPhep;
