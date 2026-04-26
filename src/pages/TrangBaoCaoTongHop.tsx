import React, { useState } from 'react';
import './TrangBaoCaoTongHop.css';
import {
  IconSearch,
  IconFilter,
  IconCalendar,
  IconEye,
  IconDownload,
  IconX,
  IconCheck,
  IconChartBar,
  IconFileExport,
  IconFileText,
  IconAlertCircle
} from '@tabler/icons-react';
import { 
  ActionIcon, 
  Title, 
  Text, 
  Flex,
  Checkbox,
  Textarea,
  Select,
  Progress,
  Divider,
  Stack,
  Radio,
  Group
} from '@mantine/core';

interface Report {
  id: string;
  facility: string;
  type: 'Định kỳ' | 'Đột xuất';
  submissionDate: string;
  status: 'Chờ duyệt' | 'Đã duyệt' | 'Yêu cầu bổ sung' | 'Quá hạn';
  period: string;
}

const mockReports: Report[] = [
  { id: 'BC-2024-001', facility: 'Bệnh viện Đa khoa Tâm Anh', type: 'Định kỳ', submissionDate: '20/04/2024', status: 'Chờ duyệt', period: 'Quý 1/2024' },
  { id: 'BC-2024-005', facility: 'Viện Năng lượng Nguyên tử', type: 'Đột xuất', submissionDate: '15/04/2024', status: 'Đã duyệt', period: 'Sự cố thiết bị X-quang' },
  { id: 'BC-2024-012', facility: 'Trung tâm Chi chiếu xạ Hà Nội', type: 'Định kỳ', submissionDate: '10/04/2024', status: 'Yêu cầu bổ sung', period: 'Năm 2023' },
  { id: 'BC-2024-022', facility: 'Công ty Cổ phần Sữa Việt Nam', type: 'Định kỳ', submissionDate: '01/04/2024', status: 'Quá hạn', period: 'Quý 1/2024' },
  { id: 'BC-2024-030', facility: 'Bệnh viện K (Cơ sở Tân Triều)', type: 'Đột xuất', submissionDate: '25/03/2024', status: 'Đã duyệt', period: 'Thay đổi nhân sự RPO' },
];

const TrangBaoCaoTongHop: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | null>('all');
  const [statusFilter, setStatusFilter] = useState<string | null>('all');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAggregateModalOpen, setIsAggregateModalOpen] = useState(false);
  const [aggregateStep, setAggregateStep] = useState(0);

  const filteredReports = mockReports.filter(r => {
    const matchesSearch = r.facility.toLowerCase().includes(searchTerm.toLowerCase()) || r.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || r.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Chờ duyệt': return <span className="bcth-badge pending">Chờ duyệt</span>;
      case 'Đã duyệt': return <span className="bcth-badge approved">Đã duyệt</span>;
      case 'Yêu cầu bổ sung': return <span className="bcth-badge supplement">Yêu cầu bổ sung</span>;
      case 'Quá hạn': return <span className="bcth-badge overdue">Quá hạn</span>;
      default: return null;
    }
  };

  const getTypeBadge = (type: string) => {
    return type === 'Định kỳ' 
      ? <span className="bcth-badge periodic">Định kỳ</span> 
      : <span className="bcth-badge occasional">Đột xuất</span>;
  };

  return (
    <div className="bcth-page">
      <div className="bcth-container">
        {/* Header */}
        <div className="bcth-header">
          <div className="bcth-title-area">
            <span>Quy trình nghiệp vụ</span>
            <h1 className="bcth-title">Báo cáo định kỳ & Đột xuất</h1>
          </div>
          <div className="bcth-actions">
            <button className="bcth-btn-export" onClick={() => setIsExportModalOpen(true)}>
              <IconFileExport size={18} />
              <span>Xuất dữ liệu Excel</span>
            </button>
            <button className="bcth-btn-aggregate" onClick={() => { setIsAggregateModalOpen(true); setAggregateStep(0); }}>
              <IconChartBar size={18} />
              <span>Tổng hợp số liệu hệ thống</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bcth-filter-bar">
          <div className="bcth-filter-item">
            <IconSearch size={18} className="bcth-filter-icon" />
            <input 
              type="text" 
              className="bcth-filter-input" 
              placeholder="Tìm kiếm mã hồ sơ, đơn vị..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bcth-filter-item">
            <IconFilter size={18} className="bcth-filter-icon" />
            <Select 
              placeholder="Loại báo cáo"
              data={[
                { value: 'all', label: 'Tất cả loại báo cáo' },
                { value: 'Định kỳ', label: 'Báo cáo định kỳ' },
                { value: 'Đột xuất', label: 'Báo cáo đột xuất' },
              ]}
              value={typeFilter}
              onChange={(val) => setTypeFilter(val)}
              variant="unstyled"
              classNames={{ input: 'bcth-filter-select' }}
              styles={{ input: { paddingLeft: '44px' } }}
            />
          </div>
          <div className="bcth-filter-item">
            <IconAlertCircle size={18} className="bcth-filter-icon" />
            <Select 
              placeholder="Trạng thái xử lý"
              data={[
                { value: 'all', label: 'Tất cả trạng thái' },
                { value: 'Chờ duyệt', label: 'Đang chờ duyệt' },
                { value: 'Đã duyệt', label: 'Đã phê duyệt' },
                { value: 'Yêu cầu bổ sung', label: 'Cần bổ sung' },
                { value: 'Quá hạn', label: 'Đã quá hạn' },
              ]}
              value={statusFilter}
              onChange={(val) => setStatusFilter(val)}
              variant="unstyled"
              classNames={{ input: 'bcth-filter-select' }}
              styles={{ input: { paddingLeft: '44px' } }}
            />
          </div>
          <div className="bcth-filter-item">
            <IconCalendar size={18} className="bcth-filter-icon" />
            <Select 
              placeholder="Kỳ báo cáo"
              data={[
                { value: '2024Q1', label: 'Quý 1/2024' },
                { value: '2023Y', label: 'Năm 2023' },
              ]}
              variant="unstyled"
              classNames={{ input: 'bcth-filter-select' }}
              styles={{ input: { paddingLeft: '44px' } }}
            />
          </div>
        </div>

        {/* Data Table */}
        <div className="bcth-table-card">
          <table className="bcth-table">
            <thead>
              <tr>
                <th style={{ width: '120px' }}>Mã hồ sơ</th>
                <th>Tên đơn vị gửi</th>
                <th>Loại báo cáo</th>
                <th style={{ width: '180px' }}>Ngày gửi</th>
                <th style={{ width: '180px' }}>Trạng thái</th>
                <th style={{ width: '120px', textAlign: 'center' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredReports.map((r) => (
                <tr key={r.id} className="bcth-row">
                  <td><span className="bcth-id-text">{r.id}</span></td>
                  <td>
                    <span className="bcth-facility-name">{r.facility}</span>
                    <Text size="xs" c="dimmed">{r.period}</Text>
                  </td>
                  <td>{getTypeBadge(r.type)}</td>
                  <td>{r.submissionDate}</td>
                  <td>{getStatusBadge(r.status)}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Flex justify="center" gap="xs">
                      <ActionIcon 
                        variant="subtle" 
                        color="blue" 
                        onClick={() => { setSelectedReport(r); setIsModalOpen(true); }}
                      >
                        <IconEye size={18} />
                      </ActionIcon>
                      <ActionIcon variant="subtle" color="gray">
                        <IconDownload size={18} />
                      </ActionIcon>
                    </Flex>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail & Action Modal */}
        {isModalOpen && selectedReport && (
          <div className="bcth-modal-overlay">
            <div className="bcth-modal-content">
              <div className="bcth-modal-header">
                <Flex align="center" gap="md">
                  <ActionIcon variant="light" color="red" radius="xl" size="lg">
                    <IconFileText size={20} />
                  </ActionIcon>
                  <div>
                    <Title order={4}>{selectedReport.id}</Title>
                    <Text size="xs" c="dimmed">Tiếp nhận báo cáo từ {selectedReport.facility}</Text>
                  </div>
                </Flex>
                <ActionIcon variant="subtle" color="gray" onClick={() => setIsModalOpen(false)}>
                  <IconX size={24} />
                </ActionIcon>
              </div>

              <div className="bcth-modal-body">
                <div className="bcth-detail-section">
                  <div className="bcth-section-title">Kiểm tra dữ liệu đầu vào</div>
                  <div className="bcth-check-list">
                    <div className="bcth-check-item">
                      <Checkbox label="Số liệu thống kê nguồn/thiết bị chính xác" defaultChecked />
                    </div>
                    <div className="bcth-check-item">
                      <Checkbox label="Danh sách nhân sự vận hành cập nhật" defaultChecked />
                    </div>
                    <div className="bcth-check-item">
                      <Checkbox label="Bản scan báo cáo có chữ ký/dấu đỏ" defaultChecked />
                    </div>
                    <div className="bcth-check-item">
                      <Checkbox label="Thông tin cơ sở đúng với giấy phép" />
                    </div>
                  </div>
                </div>

                <div className="bcth-detail-section">
                  <div className="bcth-section-title">Nội dung báo cáo chi tiết</div>
                  <div style={{ padding: '24px', background: '#F8FAFC', borderRadius: '16px', border: '1px dashed #E2E8F0' }}>
                    <Flex direction="column" gap="sm" align="center">
                      <IconFileText size={48} color="#94A3B8" stroke={1} />
                      <Text size="sm" fw={600} c="dimmed">Click để xem bản Preview báo cáo (PDF/Excel)</Text>
                    </Flex>
                  </div>
                </div>

                <div className="bcth-detail-section">
                  <div className="bcth-section-title">Nhận xét & Phản hồi</div>
                  <Textarea 
                    placeholder="Nhập nội dung yêu cầu bổ sung hoặc nhận xét phê duyệt..."
                    minRows={3}
                    variant="filled"
                  />
                </div>
              </div>

              <div className="bcth-modal-footer">
                <button className="bcth-btn-reject" onClick={() => setIsModalOpen(false)}>Từ chối</button>
                <button className="bcth-btn-supplement" onClick={() => setIsModalOpen(false)}>Yêu cầu bổ sung</button>
                <button className="bcth-btn-approve" onClick={() => setIsModalOpen(false)}>Phê duyệt báo cáo</button>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal */}
        {isExportModalOpen && (
          <div className="bcth-modal-overlay">
            <div className="bcth-modal-content" style={{ maxWidth: '500px' }}>
              <div className="bcth-modal-header">
                <Flex align="center" gap="md">
                  <ActionIcon variant="light" color="blue" radius="xl" size="lg">
                    <IconFileExport size={20} />
                  </ActionIcon>
                  <Title order={4}>Xuất dữ liệu báo cáo</Title>
                </Flex>
                <ActionIcon variant="subtle" color="gray" onClick={() => setIsExportModalOpen(false)}>
                  <IconX size={24} />
                </ActionIcon>
              </div>
              <div className="bcth-modal-body">
                <Stack gap="xl">
                  <Select 
                    label="Kỳ báo cáo cần xuất"
                    placeholder="Chọn kỳ báo cáo"
                    data={['Quý 1/2024', 'Quý 4/2023', 'Năm 2023', 'Tất cả các kỳ']}
                    defaultValue="Quý 1/2024"
                    variant="filled"
                  />
                  <div>
                    <Text size="sm" fw={600} mb="xs">Định dạng tệp tin</Text>
                    <Radio.Group defaultValue="xlsx">
                      <Group gap="xl">
                        <Radio value="xlsx" label="Excel (.xlsx)" color="red" />
                        <Radio value="csv" label="CSV (.csv)" color="red" />
                        <Radio value="pdf" label="PDF (.pdf)" color="red" />
                      </Group>
                    </Radio.Group>
                  </div>
                  <Checkbox 
                    label="Bao gồm các báo cáo chưa phê duyệt" 
                    defaultChecked 
                    color="red"
                  />
                </Stack>
              </div>
              <div className="bcth-modal-footer">
                <button className="bcth-btn-export" style={{ border: 'none', background: '#F1F5F9' }} onClick={() => setIsExportModalOpen(false)}>Hủy bỏ</button>
                <button className="bcth-btn-aggregate" style={{ padding: '12px 32px' }} onClick={() => setIsExportModalOpen(false)}>Bắt đầu xuất file</button>
              </div>
            </div>
          </div>
        )}

        {/* Aggregate Modal */}
        {isAggregateModalOpen && (
          <div className="bcth-modal-overlay">
            <div className="bcth-modal-content" style={{ maxWidth: '600px' }}>
              <div className="bcth-modal-header">
                <Flex align="center" gap="md">
                  <ActionIcon variant="light" color="red" radius="xl" size="lg">
                    <IconChartBar size={20} />
                  </ActionIcon>
                  <Title order={4}>Tổng hợp số liệu hệ thống</Title>
                </Flex>
                <ActionIcon variant="subtle" color="gray" onClick={() => setIsAggregateModalOpen(false)}>
                  <IconX size={24} />
                </ActionIcon>
              </div>
              <div className="bcth-modal-body">
                {aggregateStep === 0 ? (
                  <Stack gap="xl">
                    <Text size="sm" c="dimmed">Hệ thống sẽ thực hiện quét toàn bộ báo cáo trong kỳ để trích xuất số liệu thống kê về nguồn và thiết bị bức xạ.</Text>
                    <div style={{ background: '#F8FAFC', padding: '20px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                      <Flex justify="space-between" mb="xs">
                        <Text size="sm" fw={600}>Hồ sơ chờ tổng hợp:</Text>
                        <Text size="sm" fw={700} color="red">142 hồ sơ</Text>
                      </Flex>
                      <Flex justify="space-between" mb="xs">
                        <Text size="sm" fw={600}>Kỳ báo cáo:</Text>
                        <Text size="sm" fw={700}>Quý 1/2024</Text>
                      </Flex>
                      <Divider my="sm" variant="dashed" />
                      <Text size="xs" c="dimmed">Dữ liệu sẽ được tự động cập nhật vào Dashboard điều hành sau khi hoàn tất.</Text>
                    </div>
                  </Stack>
                ) : (
                  <Stack gap="xl" align="center" py="xl">
                    <Text fw={700} size="lg">Đang tổng hợp dữ liệu...</Text>
                    <Progress value={aggregateStep} animated color="red" size="xl" w="100%" radius="xl" />
                    <Text size="xs" c="dimmed">Vui lòng không đóng cửa sổ này cho đến khi hoàn tất ({aggregateStep}%)</Text>
                    
                    {aggregateStep === 100 && (
                      <Flex direction="column" align="center" gap="xs" mt="md" style={{ animation: 'fadeIn 0.5s ease-out' }}>
                        <ActionIcon color="green" radius="xl" size="xl" variant="filled">
                          <IconCheck size={28} />
                        </ActionIcon>
                        <Text fw={700} color="green">Tổng hợp thành công!</Text>
                        <Text size="sm" c="dimmed">Đã cập nhật số liệu cho 1,240 nguồn và 850 thiết bị.</Text>
                      </Flex>
                    )}
                  </Stack>
                )}
              </div>
              <div className="bcth-modal-footer">
                <button className="bcth-btn-export" style={{ border: 'none', background: '#F1F5F9' }} onClick={() => setIsAggregateModalOpen(false)}>Đóng</button>
                {aggregateStep < 100 && (
                  <button 
                    className="bcth-btn-aggregate" 
                    style={{ padding: '12px 32px' }} 
                    onClick={() => {
                      let p = 0;
                      const interval = setInterval(() => {
                        p += 10;
                        setAggregateStep(p);
                        if (p >= 100) clearInterval(interval);
                      }, 200);
                    }}
                  >
                    Bắt đầu tổng hợp
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrangBaoCaoTongHop;
