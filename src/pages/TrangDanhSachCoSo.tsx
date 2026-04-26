import React, { useState, useEffect } from 'react';
import './TrangDanhSachCoSo.css';
import {
  IconSearch,
  IconPlus,
  IconChevronDown,
  IconMapPin,
  IconBuildingFactory,
  IconFilter,
  IconDownload,
  IconPrinter,
  IconEdit,
  IconCheck,
  IconX,
  IconAlertTriangle,
  IconCertificate,
  IconFileText,
  IconUsers,
  IconRadioactive,
  IconHistory,
  IconBell,
  IconChartBar,
  IconExternalLink,
  IconMail,
  IconFileCertificate,
  IconClipboardCheck
} from '@tabler/icons-react';
import { Flex, Text, Badge, Tooltip, Drawer, Modal, Select, Button, Group, Tabs, Avatar, Timeline, ActionIcon, Divider, ScrollArea, Table, Title } from '@mantine/core';

interface Facility {
  id: number;
  tenCoSo: string;
  maSo: string;
  diaChi: string;
  loaiHinh: string;
  trangThai: 'Hoạt động' | 'Ngừng' | 'Đình chỉ';
  nguoiDaiDien?: string;
  dienThoai?: string;
  email?: string;
  ngayCapPhep?: string;
}

const mockFacilities: Facility[] = [
  { id: 1, tenCoSo: 'Bệnh viện Đa khoa Tâm Anh', maSo: 'BX-2023-0891', diaChi: '108 Hoàng Như Tiếp, Long Biên, Hà Nội', loaiHinh: 'Y tế / Chẩn đoán', trangThai: 'Hoạt động', nguoiDaiDien: 'TS.BS Nguyễn Quang Phục', dienThoai: '024 3872 3872', email: 'info@tamanh.vn', ngayCapPhep: '15/05/2023' },
  { id: 2, tenCoSo: 'Viện Năng lượng Nguyên tử Việt Nam', maSo: 'BX-2023-0452', diaChi: '59 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội', loaiHinh: 'Nghiên cứu / Đào tạo', trangThai: 'Hoạt động', nguoiDaiDien: 'TS. Trần Chí Thành', dienThoai: '024 3942 0468', email: 'vinatom@vnn.vn', ngayCapPhep: '10/02/2023' },
  { id: 3, tenCoSo: 'Trung tâm Chi chiếu xạ Hà Nội', maSo: 'BX-2023-1102', diaChi: 'Km 12, Đường 32, Minh Khai, Bắc Từ Liêm, Hà Nội', loaiHinh: 'Công nghiệp / Chi chiếu xạ', trangThai: 'Đình chỉ', nguoiDaiDien: 'ThS. Đặng Quang Thiệu', dienThoai: '024 3765 5281', email: 'hic@hn.vnn.vn', ngayCapPhep: '25/08/2023' },
  { id: 4, tenCoSo: 'Bệnh viện K (Cơ sở Tân Triều)', maSo: 'BX-2024-0015', diaChi: '30 Cầu Bươu, Thanh Trì, Hà Nội', loaiHinh: 'Y tế / Xạ trị', trangThai: 'Hoạt động', nguoiDaiDien: 'GS.TS Lê Văn Quảng', dienThoai: '090 469 0886', email: 'benhvienk@gmail.com', ngayCapPhep: '05/01/2024' },
  { id: 5, tenCoSo: 'Nhà máy Nhiệt điện Cẩm Phả', maSo: 'BX-2023-0722', diaChi: 'TP Cẩm Phả, Quảng Ninh', loaiHinh: 'Công nghiệp / NDT', trangThai: 'Ngừng', nguoiDaiDien: 'Ông Nguyễn Văn A', dienThoai: '0203 3xxx xxxx', email: 'cp_thermal@power.vn', ngayCapPhep: '12/07/2023' },
];

const TrangDanhSachCoSo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<Facility[]>(mockFacilities);
  const [filteredData, setFilteredData] = useState<Facility[]>(mockFacilities);
  
  // Drawer & Modal States
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Facility Form State
  const [newFacility, setNewFacility] = useState({
    tenCoSo: '',
    maSo: '',
    diaChi: '',
    loaiHinh: '',
    trangThai: 'Hoạt động' as any
  });

  // Filter Logic
  useEffect(() => {
    const filtered = data.filter(item => 
      item.tenCoSo.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.maSo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, data]);

  const handlePrint = () => {
    window.print();
  };

  const handleExport = () => {
    alert('Đang xuất file Excel... Hệ thống sẽ tự động tải về trong giây lát.');
  };

  const handleAddFacility = () => {
    const id = data.length + 1;
    const item: Facility = { 
      id, 
      ...newFacility, 
      maSo: newFacility.maSo || `BX-2024-${Math.floor(1000 + Math.random() * 9000)}` 
    };
    setData([item, ...data]);
    setIsAddModalOpen(false);
    setNewFacility({ tenCoSo: '', maSo: '', diaChi: '', loaiHinh: '', trangThai: 'Hoạt động' });
  };

  const handleRowClick = (facility: Facility) => {
    setSelectedFacility(facility);
    setIsDrawerOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Hoạt động': return <IconCheck size={12} />;
      case 'Ngừng': return <IconX size={12} />;
      case 'Đình chỉ': return <IconAlertTriangle size={12} />;
      default: return null;
    }
  };

  return (
    <div className="tdscs-page">
      <div className="tdscs-container">
        {/* Header */}
        <div className="tdscs-header">
          <div className="tdscs-header-left">
            <Text size="xs" c="dimmed" fw={600} mb={4} style={{ letterSpacing: '1px' }}>HỆ THỐNG QUẢN LÝ AN TOÀN BỨC XẠ</Text>
            <h1 className="tdscs-title">Danh mục cơ sở bức xạ</h1>
            <Text size="sm" c="dimmed">Quản lý và theo dõi hồ sơ pháp lý của các cơ sở trên địa bàn</Text>
          </div>
          <div className="tdscs-header-actions">
            <button className="tdscs-btn tdscs-btn-outline" onClick={handlePrint}>
              <IconPrinter size={18} />
              <span>In danh sách</span>
            </button>
            <button className="tdscs-btn tdscs-btn-outline" onClick={handleExport}>
              <IconDownload size={18} />
              <span>Xuất Excel</span>
            </button>
            <button className="tdscs-btn tdscs-btn-primary" onClick={() => setIsAddModalOpen(true)}>
              <IconPlus size={18} />
              <span>Thêm mới cơ sở</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="tdscs-filter-bar">
          <div className="tdscs-search-wrapper">
            <div className="tdscs-search-box">
              <IconSearch size={16} className="tdscs-search-icon" />
              <input 
                type="text" 
                placeholder="Tìm kiếm theo tên hoặc mã số cơ sở..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="tdscs-dropdown-group">
            <Select 
              placeholder="Loại hình cơ sở" 
              data={['Y tế', 'Công nghiệp', 'Nghiên cứu']}
              classNames={{ input: 'tdscs-select-input' }}
              rightSection={<IconChevronDown size={14} />}
            />
            <Select 
              placeholder="Trạng thái" 
              data={['Hoạt động', 'Ngừng', 'Đình chỉ']}
              classNames={{ input: 'tdscs-select-input' }}
              rightSection={<IconChevronDown size={14} />}
            />
            <Select 
              placeholder="Địa bàn" 
              data={['Hạ Long', 'Cẩm Phả', 'Uông Bí', 'Móng Cái']}
              classNames={{ input: 'tdscs-select-input' }}
              rightSection={<IconChevronDown size={14} />}
            />
            <button className="tdscs-btn-filter">
              <IconFilter size={18} />
            </button>
          </div>
        </div>

        {/* Table Content */}
        <div className="tdscs-table-card">
          <div className="tdscs-table-wrapper">
            <table className="tdscs-table">
              <thead>
                <tr>
                  <th style={{ width: '30%' }}>TÊN CƠ SỞ</th>
                  <th style={{ width: '15%' }}>MÃ SỐ</th>
                  <th style={{ width: '25%' }}>ĐỊA CHỈ</th>
                  <th style={{ width: '15%' }}>LOẠI HÌNH</th>
                  <th style={{ width: '15%' }}>TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((facility) => (
                  <tr key={facility.id} onClick={() => handleRowClick(facility)}>
                    <td>
                      <div className="tdscs-name-cell">
                        <div className="tdscs-icon-box">
                          <IconBuildingFactory size={16} />
                        </div>
                        <Text fw={600} size="sm">{facility.tenCoSo}</Text>
                      </div>
                    </td>
                    <td><code className="tdscs-code">{facility.maSo}</code></td>
                    <td>
                      <Flex align="center" gap={6}>
                        <IconMapPin size={14} color="#94A3B8" />
                        <span className="tdscs-text-truncate">{facility.diaChi}</span>
                      </Flex>
                    </td>
                    <td><Text size="xs" c="dimmed" fw={500}>{facility.loaiHinh}</Text></td>
                    <td>
                      <div className={`tdscs-badge tdscs-status-${facility.trangThai === 'Hoạt động' ? 'active' : facility.trangThai === 'Ngừng' ? 'stopped' : 'suspended'}`}>
                        {getStatusIcon(facility.trangThai)}
                        <span>{facility.trangThai}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="tdscs-pagination">
            <Text size="xs" c="dimmed" fw={500}>Hiển thị {filteredData.length} trên 1,245 cơ sở</Text>
            <div className="tdscs-page-controls">
              <button className="tdscs-page-btn active">1</button>
              <button className="tdscs-page-btn">2</button>
              <button className="tdscs-page-btn">3</button>
              <span className="tdscs-page-dots">...</span>
              <button className="tdscs-page-btn">156</button>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Drawer - 360 Degree View */}
      <Drawer
        opened={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        position="right"
        size="720px"
        title={null}
        padding={0}
      >
        {selectedFacility && (
          <div className="tdscs-d360-container">
            {/* Header section with gradient */}
            <div className="tdscs-d360-header">
              <div className="tdscs-d360-header-top">
                <Badge variant="filled" color={selectedFacility.trangThai === 'Hoạt động' ? 'green' : 'red'} size="sm">
                  {selectedFacility.trangThai}
                </Badge>
                <Group gap={8}>
                  <Tooltip label="Chấm điểm rủi ro">
                    <ActionIcon variant="light" color="yellow" size="lg" radius="md">
                      <IconChartBar size={20} />
                    </ActionIcon>
                  </Tooltip>
                  <Tooltip label="Gửi thông báo">
                    <ActionIcon variant="light" color="blue" size="lg" radius="md">
                      <IconBell size={20} />
                    </ActionIcon>
                  </Tooltip>
                  <ActionIcon variant="light" color="gray" size="lg" radius="md" onClick={() => setIsDrawerOpen(false)}>
                    <IconX size={20} />
                  </ActionIcon>
                </Group>
              </div>

              <div className="tdscs-d360-profile">
                <div className="tdscs-d360-avatar">
                  <IconBuildingFactory size={32} />
                </div>
                <div className="tdscs-d360-title-area">
                  <Text c="white" fw={800} size="xl" className="tdscs-d360-name">{selectedFacility.tenCoSo}</Text>
                  <Text c="rgba(255,255,255,0.7)" size="sm" fw={500}>{selectedFacility.maSo} • {selectedFacility.loaiHinh}</Text>
                </div>
              </div>

              <div className="tdscs-d360-actions">
                <Button variant="white" color="dark" leftSection={<IconEdit size={16} />} radius="md" fw={700}>
                  Chỉnh sửa hồ sơ
                </Button>
                <Button variant="filled" color="blue" leftSection={<IconMail size={16} />} radius="md" fw={700}>
                  Gửi thông báo
                </Button>
                <div className="tdscs-risk-score-chip">
                  <div className="risk-label">Điểm rủi ro:</div>
                  <div className="risk-value">Thấp (12/100)</div>
                </div>
              </div>
            </div>

            {/* Content with Tabs */}
            <div className="tdscs-d360-content">
              <Tabs defaultValue="general" classNames={{ root: 'tdscs-tabs-root', list: 'tdscs-tabs-list', tab: 'tdscs-tabs-tab' }}>
                <Tabs.List>
                  <Tabs.Tab value="general" leftSection={<IconFileText size={16} />}>Thông tin chung</Tabs.Tab>
                  <Tabs.Tab value="personnel" leftSection={<IconUsers size={16} />}>Nhân sự & CC</Tabs.Tab>
                  <Tabs.Tab value="equipment" leftSection={<IconRadioactive size={16} />}>Thiết bị & Nguồn</Tabs.Tab>
                  <Tabs.Tab value="licenses" leftSection={<IconCertificate size={16} />}>Giấy phép</Tabs.Tab>
                  <Tabs.Tab value="history" leftSection={<IconHistory size={16} />}>Lịch sử báo cáo</Tabs.Tab>
                </Tabs.List>

                <ScrollArea h="calc(100vh - 280px)" offsetScrollbars p="xl">
                  <Tabs.Panel value="general">
                    <div className="tdscs-tab-content">
                      <div className="tdscs-info-section">
                        <Title order={5} mb="md" className="tdscs-sub-title">THÔNG TIN PHÁP LÝ</Title>
                        <div className="tdscs-info-card-grid">
                          <div className="tdscs-info-card">
                            <label>Mã số thuế</label>
                            <Text fw={700}>0102345678</Text>
                          </div>
                          <div className="tdscs-info-card">
                            <label>Người đại diện PL</label>
                            <Text fw={700}>{selectedFacility.nguoiDaiDien || 'TS.BS Nguyễn Quang Phục'}</Text>
                          </div>
                          <div className="tdscs-info-card full-width">
                            <label>Địa chỉ trụ sở</label>
                            <Text fw={700}>{selectedFacility.diaChi}</Text>
                          </div>
                          <div className="tdscs-info-card">
                            <label>Điện thoại</label>
                            <Text fw={700}>{selectedFacility.dienThoai || '024 3872 3872'}</Text>
                          </div>
                          <div className="tdscs-info-card">
                            <label>Email liên hệ</label>
                            <Text fw={700}>{selectedFacility.email || 'info@tamanh.vn'}</Text>
                          </div>
                        </div>
                      </div>

                      <Divider my="xl" label="Lịch sử thay đổi trạng thái" labelPosition="center" />

                      <div className="tdscs-info-section">
                        <Timeline active={1} bulletSize={24} lineWidth={2}>
                          <Timeline.Item bullet={<IconCheck size={12} />} title="Hoạt động trở lại">
                            <Text c="dimmed" size="xs">Cơ sở đã khắc phục các tồn tại và hoạt động bình thường</Text>
                            <Text size="xs" mt={4}>15/05/2023 - 09:30</Text>
                          </Timeline.Item>
                          <Timeline.Item bullet={<IconAlertTriangle size={12} />} title="Tạm ngừng hoạt động">
                            <Text c="dimmed" size="xs">Tạm ngừng để bảo trì hệ thống thiết bị xạ trị</Text>
                            <Text size="xs" mt={4}>10/01/2023 - 14:00</Text>
                          </Timeline.Item>
                        </Timeline>
                      </div>
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="personnel">
                    <div className="tdscs-tab-content">
                      <Title order={5} mb="md" className="tdscs-sub-title">NHÂN SỰ AN TOÀN BỨC XẠ</Title>
                      <Table verticalSpacing="sm" className="tdscs-inner-table">
                        <thead>
                          <tr>
                            <th>Nhân sự</th>
                            <th>Vai trò</th>
                            <th>Chứng chỉ</th>
                            <th>Hết hạn</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <Group gap="sm">
                                <Avatar color="blue" radius="xl">PV</Avatar>
                                <div>
                                  <Text size="sm" fw={700}>Phạm Văn Việt</Text>
                                  <Text size="xs" color="dimmed">ID: NS-0012</Text>
                                </div>
                              </Group>
                            </td>
                            <td><Badge color="blue" variant="light">Phụ trách AT (RPO)</Badge></td>
                            <td><IconFileCertificate size={20} color="#B91C1C" /></td>
                            <td><Text size="xs">20/12/2025</Text></td>
                          </tr>
                          <tr>
                            <td>
                              <Group gap="sm">
                                <Avatar color="cyan" radius="xl">LA</Avatar>
                                <div>
                                  <Text size="sm" fw={700}>Lê Thị Lan Anh</Text>
                                  <Text size="xs" color="dimmed">ID: NS-0045</Text>
                                </div>
                              </Group>
                            </td>
                            <td><Badge color="gray" variant="light">Nhân viên BX</Badge></td>
                            <td><IconFileCertificate size={20} color="#B91C1C" /></td>
                            <td><Text size="xs">15/06/2024</Text></td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="equipment">
                    <div className="tdscs-tab-content">
                      <Title order={5} mb="md" className="tdscs-sub-title">DANH MỤC THIẾT BỊ & NGUỒN</Title>
                      <Table verticalSpacing="sm" className="tdscs-inner-table">
                        <thead>
                          <tr>
                            <th>Tên thiết bị</th>
                            <th>Model/Số sê-ri</th>
                            <th>Trạng thái</th>
                            <th>Kiểm định</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><Text size="sm" fw={600}>Máy X-quang kỹ thuật số</Text></td>
                            <td><Text size="xs">Siemens Multix Impact / SN-9821</Text></td>
                            <td><Badge color="green" size="xs">Đang sử dụng</Badge></td>
                            <td><Text size="xs" color="blue">Còn hạn (12/2024)</Text></td>
                          </tr>
                          <tr>
                            <td><Text size="sm" fw={600}>Nguồn phóng xạ Co-60</Text></td>
                            <td><Text size="xs">Cobalt-60 / ID: SRC-102</Text></td>
                            <td><Badge color="green" size="xs">An toàn</Badge></td>
                            <td><Text size="xs" color="blue">15/10/2024</Text></td>
                          </tr>
                        </tbody>
                      </Table>
                      <Divider my="xl" label="Biến động thiết bị" labelPosition="center" />
                      <Text size="xs" c="dimmed" fs="italic">Ghi chú: Cơ sở vừa bổ sung 01 máy đo liều xạ cá nhân vào tháng 03/2024.</Text>
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="licenses">
                    <div className="tdscs-tab-content">
                      <Title order={5} mb="md" className="tdscs-sub-title">GIẤY PHÉP ĐÃ CẤP</Title>
                      <div className="tdscs-license-list">
                        {[1, 2].map((i) => (
                          <div key={i} className="tdscs-license-item">
                            <div className="tdscs-license-icon">
                              <IconFileCertificate size={24} />
                            </div>
                            <div className="tdscs-license-info">
                              <Text fw={700} size="sm">Giấy phép tiến hành công việc bức xạ #{i === 1 ? '124/GP-ATBX' : '089/GP-ATBX'}</Text>
                              <Text size="xs" color="dimmed">Cấp ngày: {i === 1 ? '20/12/2023' : '15/01/2022'} • Hết hạn: {i === 1 ? '20/12/2026' : '15/01/2023'}</Text>
                              <Badge mt={4} size="xs" color={i === 1 ? 'green' : 'gray'}>{i === 1 ? 'Đang hiệu lực' : 'Hết hạn'}</Badge>
                            </div>
                            <div className="tdscs-license-actions">
                              <Button variant="light" size="compact-xs" leftSection={<IconExternalLink size={14} />}>Xem bản scan</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tabs.Panel>

                  <Tabs.Panel value="history">
                    <div className="tdscs-tab-content">
                      <Title order={5} mb="md" className="tdscs-sub-title">DÒNG THỜI GIAN BÁO CÁO</Title>
                      <Timeline active={0} bulletSize={32} lineWidth={2}>
                        <Timeline.Item bullet={<IconClipboardCheck size={18} />} title="Báo cáo quý I / 2024">
                          <Badge color="green" size="xs">Đã phê duyệt</Badge>
                          <Text size="xs" mt={4}>Ngày gửi: 05/04/2024 • Người duyệt: Admin</Text>
                        </Timeline.Item>
                        <Timeline.Item bullet={<IconClipboardCheck size={18} />} title="Báo cáo thường niên 2023">
                          <Badge color="green" size="xs">Đã phê duyệt</Badge>
                          <Text size="xs" mt={4}>Ngày gửi: 15/01/2024 • Người duyệt: Admin</Text>
                        </Timeline.Item>
                        <Timeline.Item bullet={<IconFileText size={18} />} title="Báo cáo quý IV / 2023">
                          <Badge color="gray" size="xs">Đã lưu trữ</Badge>
                          <Text size="xs" mt={4}>Ngày gửi: 02/10/2023</Text>
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

      {/* Add Modal */}
      <Modal 
        opened={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        withCloseButton={false}
        padding={0}
        centered
        size="720px"
        radius="16px"
        className="tdscs-modal"
      >
        <div className="tdscs-custom-modal">
          <div className="tdscs-modal-header">
            <div className="tdscs-modal-header-icon">
              <IconPlus size={24} />
            </div>
            <div className="tdscs-modal-header-content">
              <h2 className="tdscs-modal-title">Thêm mới cơ sở bức xạ</h2>
              <p className="tdscs-modal-subtitle">Hồ sơ này sẽ được lưu vào danh mục quản lý của tỉnh</p>
            </div>
            <button className="tdscs-modal-close" onClick={() => setIsAddModalOpen(false)}>
              <IconX size={24} />
            </button>
          </div>

          <div className="tdscs-modal-body">
            <div className="tdscs-form-section">
              <div className="tdscs-section-header">
                <IconBuildingFactory size={16} />
                <span>THÔNG TIN CƠ BẢN</span>
              </div>
              <div className="tdscs-form-grid">
                <div className="tdscs-form-group full-width">
                  <label>Tên cơ sở bức xạ <span className="required">*</span></label>
                  <input 
                    type="text" 
                    placeholder="VD: Bệnh viện Đa khoa Tỉnh Quảng Ninh" 
                    value={newFacility.tenCoSo}
                    onChange={(e) => setNewFacility({...newFacility, tenCoSo: e.target.value})}
                  />
                </div>
                <div className="tdscs-form-group">
                  <label>Mã số quản lý</label>
                  <input 
                    type="text" 
                    placeholder="Tự động phát sinh" 
                    value={newFacility.maSo}
                    onChange={(e) => setNewFacility({...newFacility, maSo: e.target.value})}
                  />
                </div>
                <div className="tdscs-form-group">
                  <label>Trạng thái</label>
                  <select 
                    value={newFacility.trangThai}
                    onChange={(e) => setNewFacility({...newFacility, trangThai: e.target.value as any})}
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Ngừng">Ngừng hoạt động</option>
                    <option value="Đình chỉ">Đình chỉ</option>
                  </select>
                </div>
                <div className="tdscs-form-group full-width">
                  <label>Địa chỉ chi tiết <span className="required">*</span></label>
                  <input 
                    type="text" 
                    placeholder="Địa chỉ, Phường/Xã, Quận/Huyện..." 
                    value={newFacility.diaChi}
                    onChange={(e) => setNewFacility({...newFacility, diaChi: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="tdscs-form-section">
              <div className="tdscs-section-header">
                <IconCertificate size={16} />
                <span>PHÂN LOẠI & LĨNH VỰC</span>
              </div>
              <div className="tdscs-form-grid">
                <div className="tdscs-form-group">
                  <label>Loại hình cơ sở</label>
                  <select 
                    value={newFacility.loaiHinh}
                    onChange={(e) => setNewFacility({...newFacility, loaiHinh: e.target.value})}
                  >
                    <option value="">-- Chọn loại hình --</option>
                    <option value="Y tế / Chẩn đoán">Y tế / Chẩn đoán</option>
                    <option value="Y tế / Xạ trị">Y tế / Xạ trị</option>
                    <option value="Công nghiệp">Công nghiệp</option>
                    <option value="Nghiên cứu">Nghiên cứu</option>
                  </select>
                </div>
                <div className="tdscs-form-group">
                  <label>Người đại diện</label>
                  <input type="text" placeholder="Họ và tên..." />
                </div>
              </div>
            </div>
          </div>

          <div className="tdscs-modal-footer">
            <button className="tdscs-btn tdscs-btn-text" onClick={() => setIsAddModalOpen(false)}>Hủy bỏ</button>
            <button className="tdscs-btn tdscs-btn-primary" onClick={handleAddFacility}>
              <IconCheck size={18} />
              <span>Xác nhận thêm mới</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TrangDanhSachCoSo;
