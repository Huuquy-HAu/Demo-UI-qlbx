import React, { useState } from 'react';
import './TrangNguonThietBi.css';
import {
  IconSearch,
  IconPlus,
  IconFilter,
  IconPrinter,
  IconTool,
  IconCheck,
  IconAlertCircle,
  IconFlag,
  IconCalendarStats,
  IconX,
  IconFileCertificate,
  IconBox,
  IconSettings,
  IconBolt,
  IconAtom2,
  IconRuler2,
  IconExternalLink,
  IconFileUpload,
  IconHistoryToggle,
  IconArrowRight
} from '@tabler/icons-react';
import { 
  Flex, 
  Text, 
  Badge, 
  Drawer, 
  Select, 
  Button, 
  Tabs, 
  Timeline, 
  ActionIcon, 
  Title,
  Modal,
  Table
} from '@mantine/core';

interface Equipment {
  id: number;
  maSeri: string;
  tenThietBi: string;
  model: string;
  loai: 'X-quang' | 'Nguồn phóng xạ' | 'Thiết bị đo';
  coSoSoHuu: string;
  trangThaiKiemDinh: 'Còn hạn' | 'Quá hạn' | 'Sắp hết hạn';
  ngayKiemDinhGanNhat: string;
  ngayHetHan: string;
  trangThaiHoatDong: 'Đang sử dụng' | 'Lưu kho' | 'Thanh lý';
  isAnomaly?: boolean;
  namSX?: number;
  hangSX?: string;
  // X-quang fields
  kV?: number;
  mA?: number;
  congSuat?: string;
  // Source fields
  nuclide?: string;
  hoatDoBanDau?: string;
  ngayDoHoatDo?: string;
}

const mockEquipment: Equipment[] = [
  { 
    id: 1, 
    maSeri: 'XQ-TAMANH-001', 
    tenThietBi: 'Máy X-quang kỹ thuật số cao tần', 
    model: 'Siemens Multix Impact', 
    loai: 'X-quang', 
    coSoSoHuu: 'Bệnh viện Đa khoa Tâm Anh', 
    trangThaiKiemDinh: 'Còn hạn', 
    ngayKiemDinhGanNhat: '15/05/2023', 
    ngayHetHan: '15/05/2024',
    trangThaiHoatDong: 'Đang sử dụng',
    kV: 125,
    mA: 400,
    congSuat: '50 kW',
    namSX: 2021,
    hangSX: 'Siemens Healthineers'
  },
  { 
    id: 2, 
    maSeri: 'NPX-VNL-060', 
    tenThietBi: 'Nguồn phóng xạ Co-60', 
    model: 'Gamma Cell 220', 
    loai: 'Nguồn phóng xạ', 
    coSoSoHuu: 'Viện Năng lượng', 
    trangThaiKiemDinh: 'Sắp hết hạn', 
    ngayKiemDinhGanNhat: '10/01/2023', 
    ngayHetHan: '10/01/2024',
    trangThaiHoatDong: 'Đang sử dụng',
    nuclide: 'Co-60',
    hoatDoBanDau: '5000 Ci',
    ngayDoHoatDo: '01/01/2022',
    namSX: 2020,
    hangSX: 'Best Theratronics'
  },
  { 
    id: 3, 
    maSeri: 'TBD-K-009', 
    tenThietBi: 'Máy đo suất liều tia X, Gamma', 
    model: 'Ludlum 9DP', 
    loai: 'Thiết bị đo', 
    coSoSoHuu: 'Bệnh viện K', 
    trangThaiKiemDinh: 'Quá hạn', 
    ngayKiemDinhGanNhat: '20/12/2022', 
    ngayHetHan: '20/12/2023',
    trangThaiHoatDong: 'Lưu kho',
    namSX: 2019,
    hangSX: 'Ludlum Measurements'
  },
  { 
    id: 4, 
    maSeri: 'XQ-CDC-042', 
    tenThietBi: 'Hệ thống X-quang di động', 
    model: 'GE Optima XR220', 
    loai: 'X-quang', 
    coSoSoHuu: 'TT Kiểm soát Bệnh tật', 
    trangThaiKiemDinh: 'Còn hạn', 
    ngayKiemDinhGanNhat: '12/03/2024', 
    ngayHetHan: '12/03/2025',
    trangThaiHoatDong: 'Đang sử dụng',
    isAnomaly: true,
    namSX: 2023,
    hangSX: 'GE Healthcare'
  },
  { 
    id: 5, 
    maSeri: 'XQ-SN-015', 
    tenThietBi: 'Máy X-quang nhũ ảnh', 
    model: 'Hologic Selenia Dimensions', 
    loai: 'X-quang', 
    coSoSoHuu: 'BV Sản Nhi', 
    trangThaiKiemDinh: 'Còn hạn', 
    ngayKiemDinhGanNhat: '05/08/2023', 
    ngayHetHan: '05/08/2024',
    trangThaiHoatDong: 'Đang sử dụng',
    namSX: 2022,
    hangSX: 'Hologic Inc'
  }
];

const TrangNguonThietBi: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string | null>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [facilityFilter, setFacilityFilter] = useState<string | null>(null);
  const [selectedEquip, setSelectedEquip] = useState<Equipment | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const filteredData = mockEquipment.filter(item => {
    const matchesSearch = item.tenThietBi.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.maSeri.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.coSoSoHuu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'xray' && item.loai === 'X-quang') ||
                      (activeTab === 'source' && item.loai === 'Nguồn phóng xạ') ||
                      (activeTab === 'measure' && item.loai === 'Thiết bị đo');
    const matchesFacility = !facilityFilter || item.coSoSoHuu === facilityFilter;
    
    return matchesSearch && matchesTab && matchesFacility;
  });

  const handleExport = () => {
    alert('Đang khởi tạo tệp báo cáo danh mục thiết bị... Vui lòng đợi trong giây lát.');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Còn hạn': return <Badge color="green" variant="light" radius="sm" fw={500} style={{ textTransform: 'none', fontSize: '12px' }}>Còn hạn</Badge>;
      case 'Quá hạn': return <Badge color="red" variant="filled" radius="sm" fw={500} style={{ textTransform: 'none', fontSize: '12px' }}>Quá hạn</Badge>;
      case 'Sắp hết hạn': return <Badge color="yellow" variant="filled" radius="sm" fw={500} style={{ textTransform: 'none', fontSize: '12px' }}>Sắp hết hạn</Badge>;
      default: return <Badge color="gray" variant="light" radius="sm" fw={500} style={{ textTransform: 'none', fontSize: '12px' }}>Chưa xác định</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'X-quang': return <IconBolt size={20} />;
      case 'Nguồn phóng xạ': return <IconAtom2 size={20} />;
      case 'Thiết bị đo': return <IconRuler2 size={20} />;
      default: return <IconBox size={20} />;
    }
  };

  return (
    <div className="tntb-page">
      <div className="tntb-container">
        
        {/* Header Area */}
        <div className="tntb-header">
          <div className="tntb-header-left">
            <span>Hệ thống quản lý an toàn bức xạ</span>
            <h1 className="tntb-title">Nguồn & Thiết bị bức xạ</h1>
            <Text size="sm" c="dimmed" fw={400}>Giám sát danh mục thiết bị và nguồn phóng xạ trên toàn địa bàn</Text>
          </div>

          <div className="tntb-smart-alerts">
            <div className="alert-card warning">
              <div className="alert-icon">
                <IconAlertCircle size={22} />
              </div>
              <div className="alert-info">
                <span>Quá hạn kiểm định</span>
                <span>12</span>
              </div>
            </div>
            <div className="alert-card info">
              <div className="alert-icon">
                <IconFlag size={22} />
              </div>
              <div className="alert-info">
                <span>Tăng bất thường</span>
                <span>03</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="tntb-filter-section">
          <Tabs value={activeTab} onChange={setActiveTab} classNames={{ list: 'tntb-tabs-list', tab: 'tntb-tabs-tab' }}>
            <Tabs.List>
              <Tabs.Tab value="all">Tất cả thiết bị</Tabs.Tab>
              <Tabs.Tab value="xray">Thiết bị X-quang</Tabs.Tab>
              <Tabs.Tab value="source">Nguồn phóng xạ</Tabs.Tab>
              <Tabs.Tab value="measure">Thiết bị đo</Tabs.Tab>
            </Tabs.List>
          </Tabs>

          <div className="tntb-filter-row">
            <div className="tntb-search-box">
              <IconSearch size={18} />
              <input 
                type="text" 
                placeholder="Tìm kiếm theo Seri, tên thiết bị hoặc cơ sở sở hữu..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="tntb-facility-select">
              <Select 
                placeholder="Lọc theo Cơ sở sở hữu" 
                data={['Bệnh viện Đa khoa Tâm Anh', 'Viện Năng lượng', 'Bệnh viện K', 'TT Kiểm soát Bệnh tật', 'BV Sản Nhi']}
                variant="filled"
                size="md"
                radius="md"
                value={facilityFilter}
                onChange={(val) => setFacilityFilter(val)}
                clearable
                styles={{ 
                  input: { 
                    backgroundColor: '#F8FAFC', 
                    border: '1px solid #E2E8F0', 
                    height: '48px',
                    fontSize: '14px'
                  },
                  root: {
                    height: '48px'
                  }
                }}
              />
            </div>
            <button className="tntb-filter-btn" title="Bộ lọc nâng cao">
              <IconFilter size={20} />
            </button>
            <div className="tntb-header-actions">
              <button className="tntb-btn tntb-btn-outline" onClick={handleExport}>
                <IconPrinter size={18} />
                <span>Xuất báo cáo</span>
              </button>
              <button className="tntb-btn tntb-btn-primary" onClick={() => setIsAddModalOpen(true)}>
                <IconPlus size={18} />
                <span>Thêm thiết bị</span>
              </button>
            </div>
          </div>
        </div>

        {/* Master Table */}
        <div className="tntb-table-card">
          <div className="tntb-table-wrapper">
            <table className="tntb-table">
              <thead>
                <tr>
                  <th style={{ width: '160px' }}>Mã Seri</th>
                  <th>Tên thiết bị & Model</th>
                  <th>Cơ sở sở hữu</th>
                  <th style={{ width: '180px' }}>Kiểm định</th>
                  <th style={{ width: '160px' }}>Ngày kiểm định</th>
                  <th style={{ width: '100px' }}></th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((equip) => (
                  <tr key={equip.id} className="tntb-row" onClick={() => { setSelectedEquip(equip); setIsDrawerOpen(true); }}>
                    <td><span className="tntb-seri-code">{equip.maSeri}</span></td>
                    <td>
                      <div className="tntb-name-cell">
                        <div className={`tntb-icon-box loai-${equip.loai}`}>
                          {getTypeIcon(equip.loai)}
                        </div>
                        <div>
                          <Text fw={700} size="sm" c="gray.9">{equip.tenThietBi}</Text>
                          <Text size="xs" c="dimmed">{equip.model}</Text>
                        </div>
                      </div>
                    </td>
                    <td>
                      <Text size="sm" fw={500} c="gray.7">{equip.coSoSoHuu}</Text>
                    </td>
                    <td>{getStatusBadge(equip.trangThaiKiemDinh)}</td>
                    <td>
                      <Flex align="center" gap={6}>
                        <IconCalendarStats size={14} color="#94A3B8" />
                        <Text size="sm" fw={600} c="gray.7">{equip.ngayKiemDinhGanNhat}</Text>
                      </Flex>
                    </td>
                    <td>
                      <ActionIcon variant="subtle" color="gray">
                        <IconExternalLink size={18} />
                      </ActionIcon>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Drawer */}
        <Drawer
          opened={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          position="right"
          size="720px"
          withCloseButton={false}
          styles={{ content: { backgroundColor: '#F8FAFC' } }}
        >
          {selectedEquip && (
            <div className="tntb-drawer">
              {/* Header */}
              <div className={`tntb-drawer-header type-${selectedEquip.loai}`}>
                <div className="tntb-header-nav">
                  <Badge variant="filled" color="blue.4" radius="sm">{selectedEquip.maSeri}</Badge>
                  <ActionIcon variant="transparent" color="white" onClick={() => setIsDrawerOpen(false)}><IconX size={24} /></ActionIcon>
                </div>
                <Title order={3} c="white" mt="md">{selectedEquip.tenThietBi}</Title>
                <Text c="rgba(255,255,255,0.8)" size="sm" fw={500}>{selectedEquip.model} • {selectedEquip.coSoSoHuu}</Text>
                
                <div className="tntb-header-actions">
                  <Button variant="white" color="dark" radius="md" size="sm" leftSection={<IconTool size={16} />}>Sửa thông tin</Button>
                  <Button variant="filled" color="yellow" radius="md" size="sm" leftSection={<IconFileUpload size={16} />}>Cập nhật kiểm định</Button>
                </div>
              </div>

              <div className="tntb-drawer-content">
                <Tabs defaultValue="specs" classNames={{ root: 'tntb-drawer-tabs', tab: 'tntb-tab-item' }}>
                  <Tabs.List>
                    <Tabs.Tab value="specs" leftSection={<IconSettings size={14} />}>THÔNG SỐ KỸ THUẬT</Tabs.Tab>
                    <Tabs.Tab value="inspection" leftSection={<IconFileCertificate size={14} />}>KIỂM ĐỊNH</Tabs.Tab>
                    <Tabs.Tab value="history" leftSection={<IconHistoryToggle size={14} />}>LỊCH SỬ</Tabs.Tab>
                  </Tabs.List>

                  <div className="tntb-panel-content">
                    <Tabs.Panel value="specs">
                      <div className="tntb-specs-grid">
                        <div className="spec-card">
                          <label>Năm sản xuất</label>
                          <Text fw={700}>{selectedEquip.namSX}</Text>
                        </div>
                        <div className="spec-card">
                          <label>Hãng sản xuất</label>
                          <Text fw={700}>{selectedEquip.hangSX}</Text>
                        </div>
                        
                        <div className="spec-card full-width">
                          <Title order={6} className="tntb-sub-title" mb="sm">Chi tiết kỹ thuật</Title>
                          <Table variant="vertical" withTableBorder={false}>
                            <Table.Tbody>
                              <Table.Tr>
                                <Table.Th w={160} fz="xs" c="dimmed">Loại thiết bị</Table.Th>
                                <Table.Td fz="sm" fw={600}>{selectedEquip.loai}</Table.Td>
                              </Table.Tr>
                              {selectedEquip.loai === 'X-quang' ? (
                                <>
                                  <Table.Tr>
                                    <Table.Th fz="xs" c="dimmed">Điện áp cực đại</Table.Th>
                                    <Table.Td fz="sm" fw={600}>150 kV</Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Th fz="xs" c="dimmed">Dòng điện cực đại</Table.Th>
                                    <Table.Td fz="sm" fw={600}>500 mA</Table.Td>
                                  </Table.Tr>
                                </>
                              ) : (
                                <>
                                  <Table.Tr>
                                    <Table.Th fz="xs" c="dimmed">Đồng vị</Table.Th>
                                    <Table.Td fz="sm" fw={600}>Co-60</Table.Td>
                                  </Table.Tr>
                                  <Table.Tr>
                                    <Table.Th fz="xs" c="dimmed">Hoạt độ</Table.Th>
                                    <Table.Td fz="sm" fw={600}>5000 Ci</Table.Td>
                                  </Table.Tr>
                                </>
                              )}
                            </Table.Tbody>
                          </Table>
                        </div>

                        <div className="spec-card full-width tntb-license-link">
                          <Flex align="center" gap={16}>
                            <div className="tntb-icon-box loai-X-quang">
                              <IconFileCertificate size={24} />
                            </div>
                            <div style={{ flex: 1 }}>
                              <Text fw={700} size="sm">Giấy phép sử dụng liên quan</Text>
                              <Text size="xs" c="dimmed">GP số 123/GP-ATBX - Còn hạn đến 20/12/2025</Text>
                            </div>
                            <IconArrowRight size={18} color="#94A3B8" />
                          </Flex>
                        </div>
                      </div>
                    </Tabs.Panel>

                    <Tabs.Panel value="inspection">
                      <div className="tntb-inspection-content">
                        <Title order={6} className="tntb-sub-title">Hồ sơ kiểm định gần nhất</Title>
                        <Timeline active={0} bulletSize={24} lineWidth={2} mt="xl">
                          <Timeline.Item bullet={<IconCheck size={12} />} title="Kiểm định đạt yêu cầu">
                            <Text c="dimmed" size="xs">Đơn vị thực hiện: Trung tâm Kỹ thuật Tiêu chuẩn Đo lường Chất lượng 1</Text>
                            <Text size="xs" mt={4} fw={700}>20/05/2023</Text>
                          </Timeline.Item>
                          <Timeline.Item bullet={<IconHistoryToggle size={12} />} title="Đang chờ kiểm định định kỳ">
                            <Text c="dimmed" size="xs">Dự kiến thực hiện vào tháng 05/2024</Text>
                          </Timeline.Item>
                        </Timeline>
                      </div>
                    </Tabs.Panel>
                  </div>
                </Tabs>
              </div>
            </div>
          )}
        </Drawer>
      </div>
      {/* Add New Modal */}
      <Modal
        opened={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title={<Text fw={600} size="lg" c="gray.9">Thêm mới Thiết bị / Nguồn bức xạ</Text>}
        size="lg"
        radius="lg"
        centered
        padding="xl"
      >
        <div className="tntb-modal-body">
          <div className="tntb-form-grid">
            <div className="tntb-form-group">
              <label>Tên thiết bị <span className="required">*</span></label>
              <input type="text" placeholder="Ví dụ: Máy X-quang cao tần" />
            </div>
            <div className="tntb-form-group">
              <label>Mã Seri <span className="required">*</span></label>
              <input type="text" placeholder="Nhập số seri sản xuất" />
            </div>
            <div className="tntb-form-group">
              <label>Loại thiết bị</label>
              <Select 
                data={['X-quang', 'Nguồn phóng xạ', 'Thiết bị đo']} 
                defaultValue="X-quang"
                radius="md"
                size="md"
              />
            </div>
            <div className="tntb-form-group">
              <label>Cơ sở sở hữu</label>
              <Select 
                data={['Bệnh viện Đa khoa Tâm Anh', 'Bệnh viện K', 'Viện Năng lượng']} 
                placeholder="Chọn cơ sở"
                radius="md"
                size="md"
              />
            </div>
            <div className="tntb-form-group">
              <label>Năm sản xuất</label>
              <input type="number" placeholder="2023" />
            </div>
            <div className="tntb-form-group">
              <label>Hãng sản xuất</label>
              <input type="text" placeholder="Siemens, GE, Philips..." />
            </div>
          </div>
          <div className="tntb-modal-footer">
            <Button variant="subtle" color="gray" radius="md" onClick={() => setIsAddModalOpen(false)}>Hủy bỏ</Button>
            <Button color="red" radius="md" onClick={() => { alert('Đã thêm thiết bị mới thành công!'); setIsAddModalOpen(false); }}>Lưu thông tin</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TrangNguonThietBi;
