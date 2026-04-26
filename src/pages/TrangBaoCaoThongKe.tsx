import React, { useState, useRef } from 'react';
import './TrangBaoCaoThongKe.css';
import {
  IconTrendingUp,
  IconTrendingDown,
  IconDownload,
  IconMail,
  IconCalendarStats,
  IconDeviceAnalytics,
  IconFileExport,
  IconDeviceFloppy,
  IconSearch,
  IconRefresh
} from '@tabler/icons-react';
import { 
  Badge, 
  ActionIcon, 
  Title, 
  Text, 
  Flex, 
  Select, 
  TextInput,
  Stack,
  MultiSelect,
  Switch,
  Button
} from '@mantine/core';
import ToastNotification from '../components/Common/ToastNotification';

const TrangBaoCaoThongKe: React.FC = () => {
  const [isScheduled, setIsScheduled] = useState(false);
  const [isExporting, setIsExporting] = useState<string | null>(null);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  // Mock data states for demo "wow" factor
  const [statsData, setStatsData] = useState({
    facilities: '1,248',
    sources: '3,520',
    expiring: '42',
    incidents: '08'
  });

  const handleExport = (format: string) => {
    setIsExporting(format);
    toastRef.current?.show(`Đang trích xuất dữ liệu và đóng gói tệp ${format}...`, 'info');
    
    setTimeout(() => {
      toastRef.current?.show(`Đã tạo tệp báo cáo thành công. Đang tải xuống...`, 'success');
      setIsExporting(null);
    }, 2000);
  };

  const applyTemplate = (name: string) => {
    toastRef.current?.show(`Đang áp dụng mẫu tra cứu: ${name}...`, 'info');
    setTimeout(() => {
      // Simulate data change
      if (name === 'Báo cáo Y tế') {
        setStatsData({ facilities: '840', sources: '2,100', expiring: '15', incidents: '03' });
      } else {
        setStatsData({ facilities: '1,248', sources: '3,520', expiring: '42', incidents: '08' });
      }
      toastRef.current?.show(`Đã cập nhật số liệu theo mẫu ${name}.`, 'success');
    }, 1000);
  };

  return (
    <div className="ptqt-page">
      <div className="ptqt-container">
        {/* Header */}
        <div className="ptqt-header">
          <div className="ptqt-title-area">
            <span>Phân tích & Quản trị</span>
            <h1 className="ptqt-title">Báo cáo Thống kê thông minh</h1>
          </div>
          <div className="ptqt-export-group">
            <button 
              className={`ptqt-btn-outline ${isExporting === 'Excel' ? 'loading' : ''}`} 
              onClick={() => handleExport('Excel')}
              disabled={!!isExporting}
            >
              <IconDownload size={18} />
              <span>Excel</span>
            </button>
            <button 
              className={`ptqt-btn-outline ${isExporting === 'PDF' ? 'loading' : ''}`} 
              onClick={() => handleExport('PDF')}
              disabled={!!isExporting}
            >
              <IconDownload size={18} />
              <span>PDF</span>
            </button>
            <button 
              className="dtth-btn-primary" 
              onClick={() => handleExport('Word')}
              disabled={!!isExporting}
            >
              <IconFileExport size={18} />
              <span>Xuất mẫu Word (Hành chính)</span>
            </button>
          </div>
        </div>

        {/* Executive Dashboard */}
        <div className="ptqt-dashboard-grid">
          {/* Stats Cards */}
          <div className="ptqt-card ptqt-stat-card">
            <Text className="ptqt-stat-label">TỔNG CƠ SỞ BỨC XẠ</Text>
            <Text className="ptqt-stat-value">{statsData.facilities}</Text>
            <div className="ptqt-stat-trend ptqt-trend-up">
              <IconTrendingUp size={16} />
              <span>+12% so với năm ngoái</span>
            </div>
          </div>
          <div className="ptqt-card ptqt-stat-card">
            <Text className="ptqt-stat-label">NGUỒN PHÓNG XẠ HOẠT ĐỘNG</Text>
            <Text className="ptqt-stat-value">{statsData.sources}</Text>
            <div className="ptqt-stat-trend ptqt-trend-up">
              <IconTrendingUp size={16} />
              <span>+5.4% tháng này</span>
            </div>
          </div>
          <div className="ptqt-card ptqt-stat-card">
            <Text className="ptqt-stat-label">GIẤY PHÉP SẮP HẾT HẠN</Text>
            <Text className="ptqt-stat-value">{statsData.expiring}</Text>
            <div className="ptqt-stat-trend ptqt-trend-down">
              <IconTrendingDown size={16} />
              <span>Cần xử lý gấp (60 ngày)</span>
            </div>
          </div>
          <div className="ptqt-card ptqt-stat-card">
            <Text className="ptqt-stat-label">TỔNG SỰ CỐ TRONG NĂM</Text>
            <Text className="ptqt-stat-value">{statsData.incidents}</Text>
            <div className="ptqt-stat-trend ptqt-trend-down">
              <IconTrendingDown size={16} />
              <span>Giảm 25% so với 2023</span>
            </div>
          </div>

          {/* Trend Chart (Mock) */}
          <div className="ptqt-card ptqt-chart-large">
            <div className="ptqt-chart-header">
              <Title order={5} className="ptqt-chart-title">Biến động hồ sơ cấp phép 2024</Title>
              <ActionIcon variant="subtle" color="gray"><IconRefresh size={18} /></ActionIcon>
            </div>
            <div style={{ flex: 1, height: '240px', display: 'flex', alignItems: 'flex-end', gap: '16px', padding: '0 10px 10px' }}>
              {/* Refined Mock Bar Chart with Visible Colors */}
              {[40, 65, 45, 95, 60, 85, 110, 75, 90, 105, 125, 115].map((h, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ 
                    width: '100%', 
                    height: `${(h/130)*100}%`, 
                    background: i === 10 ? 'linear-gradient(to top, #ea1e22, #b40006)' : 'linear-gradient(to top, #E2E8F0, #F1F5F9)', 
                    borderRadius: '6px 6px 0 0', 
                    transition: 'height 1s ease',
                    border: '1px solid #E2E8F0',
                    borderBottom: 'none'
                  }}></div>
                  <Text size="10px" fw={600} color="#64748B">T{i+1}</Text>
                </div>
              ))}
            </div>
          </div>

          {/* Distribution Chart (Mock) */}
          <div className="ptqt-card ptqt-chart-small">
            <div className="ptqt-chart-header">
              <Title order={5} className="ptqt-chart-title">Cơ cấu cơ sở</Title>
            </div>
            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
              <div style={{ width: '180px', height: '180px', borderRadius: '50%', border: '25px solid #F1F5F9', borderTopColor: '#ea1e22', borderRightColor: '#FACC15', borderBottomColor: '#2563EB', transform: 'rotate(45deg)' }}></div>
              <div style={{ position: 'absolute', textAlign: 'center' }}>
                <Text fw={800} size="xl">74%</Text>
                <Text size="10px" c="dimmed">Y TẾ</Text>
              </div>
            </div>
            <Stack gap={8} mt="xl">
              <Flex justify="space-between" align="center"><Text size="xs">Y tế (Bệnh viện)</Text><Badge color="red" variant="dot">74%</Badge></Flex>
              <Flex justify="space-between" align="center"><Text size="xs">Công nghiệp</Text><Badge color="yellow" variant="dot">18%</Badge></Flex>
              <Flex justify="space-between" align="center"><Text size="xs">Nghiên cứu</Text><Badge color="blue" variant="dot">8%</Badge></Flex>
            </Stack>
          </div>
        </div>

        {/* Advanced Query Builder */}
        <div className="ptqt-filter-section">
          <Flex justify="space-between" align="center" mb="xl">
            <Title order={4}>Bộ lọc & Tra cứu nâng cao</Title>
            <Button variant="light" color="blue" leftSection={<IconDeviceFloppy size={16} />} radius="md" onClick={() => toastRef.current?.show('Đã lưu mẫu tra cứu vào danh sách ưa thích.', 'success')}>
              Lưu mẫu tra cứu
            </Button>
          </Flex>
          <div className="ptqt-filter-grid">
            <Select 
              label="Mẫu tra cứu ưa thích" 
              placeholder="Chọn mẫu có sẵn" 
              data={['Báo cáo Tổng thể', 'Báo cáo Y tế', 'Báo cáo Công nghiệp', 'Báo cáo theo Địa phương']}
              variant="filled"
              radius="md"
              onChange={(val) => val && applyTemplate(val)}
            />
            <MultiSelect 
              label="Địa phương (Quận/Huyện)" 
              placeholder="Tất cả địa phương" 
              data={['Ba Đình', 'Hoàn Kiếm', 'Hai Bà Trưng', 'Đống Đa', 'Cầu Giấy']}
              variant="filled"
              radius="md"
            />
            <Select 
              label="Loại hình doanh nghiệp" 
              placeholder="Tất cả loại hình" 
              data={['Nhà nước', 'Tư nhân', 'Liên doanh', '100% vốn nước ngoài']}
              variant="filled"
              radius="md"
            />
            <Select 
              label="Mức độ rủi ro nguồn" 
              placeholder="Tất cả mức độ" 
              data={['Rất cao (Loại 1)', 'Cao (Loại 2)', 'Trung bình (Loại 3)', 'Thấp (Loại 4-5)']}
              variant="filled"
              radius="md"
            />
            <TextInput 
              label="Khoảng thời gian" 
              type="date" 
              variant="filled"
              radius="md"
            />
          </div>
          <Flex justify="flex-end" gap="md">
            <Button variant="subtle" color="gray" radius="md">Xóa bộ lọc</Button>
            <Button className="dtth-btn-primary" leftSection={<IconSearch size={18} />} radius="md">Thực hiện tra cứu</Button>
          </Flex>
        </div>

        {/* Smart Reports Area */}
        <div className="ptqt-report-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {/* Forecasting & Comparison */}
          <div className="ptqt-card">
            <Flex align="center" gap="sm" mb="lg">
              <IconDeviceAnalytics size={20} color="#2563EB" />
              <Title order={5} className="ptqt-chart-title">Dự báo & Cảnh báo sớm</Title>
            </Flex>
            <div style={{ background: '#EFF6FF', padding: '24px', borderRadius: '20px', border: '1px solid #DBEAFE', height: '100%', display: 'flex', alignItems: 'center' }}>
              <Flex gap="md" align="flex-start">
                <div style={{ padding: '12px', background: 'white', borderRadius: '12px', boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)' }}>
                  <IconCalendarStats size={28} color="#2563EB" />
                </div>
                <div>
                  <Text fw={700} size="md" color="blue.9" mb={4}>Tháng cao điểm gia hạn</Text>
                  <Text size="sm" c="blue.8" style={{ lineHeight: '1.6' }}>Dựa trên dữ liệu 3 năm qua, dự báo tháng 10/2024 sẽ có hơn 120 hồ sơ gia hạn (Tăng 40%). Đề xuất cán bộ chủ động rà soát trước 30 ngày để đảm bảo SLA.</Text>
                </div>
              </Flex>
            </div>
          </div>

          <Stack gap="24px">
            <div className="ptqt-card" style={{ flex: 1 }}>
              <Flex align="center" gap="sm" mb="lg">
                <IconDeviceAnalytics size={20} color="#2563EB" />
                <Title order={5} className="ptqt-chart-title">Dự báo & Cảnh báo sớm</Title>
              </Flex>
              <div style={{ background: '#EFF6FF', padding: '20px', borderRadius: '16px', border: '1px solid #DBEAFE' }}>
                <Flex gap="md" align="flex-start">
                  <IconCalendarStats size={24} color="#2563EB" />
                  <div>
                    <Text fw={700} size="sm" color="blue.9">Tháng cao điểm gia hạn</Text>
                    <Text size="xs" c="blue.8">Dựa trên dữ liệu 3 năm qua, dự báo tháng 10/2024 sẽ có hơn 120 hồ sơ gia hạn (Tăng 40%). Cần chủ động sắp xếp cán bộ thẩm định.</Text>
                  </div>
                </Flex>
              </div>
            </div>

            <div className="ptqt-card" style={{ flex: 1 }}>
              <Title order={5} className="ptqt-chart-title" mb="lg">So sánh chỉ số (YTD)</Title>
              <div className="ptqt-compare-list">
                <div className="ptqt-compare-item">
                  <Text size="sm">Cấp mới giấy phép</Text>
                  <Flex align="center" gap={4} className="ptqt-trend-up">
                    <IconTrendingUp size={16} />
                    <Text fw={700}>+18.2%</Text>
                  </Flex>
                </div>
                <div className="ptqt-compare-item">
                  <Text size="sm">Sự cố bức xạ</Text>
                  <Flex align="center" gap={4} className="ptqt-trend-down">
                    <IconTrendingDown size={16} />
                    <Text fw={700}>-12.5%</Text>
                  </Flex>
                </div>
                <div className="ptqt-compare-item">
                  <Text size="sm">Thu hồi nguồn</Text>
                  <Flex align="center" gap={4} className="ptqt-trend-up">
                    <IconTrendingUp size={16} />
                    <Text fw={700}>+5.0%</Text>
                  </Flex>
                </div>
              </div>
            </div>

            <div className="ptqt-card" style={{ background: '#F8FAFC' }}>
              <Flex justify="space-between" align="center">
                <Flex align="center" gap="sm">
                  <IconMail size={20} color="#64748B" />
                  <div>
                    <Text fw={600} size="sm">Hẹn giờ báo cáo Email</Text>
                    <Text size="xs" c="dimmed">Tự động gửi báo cáo vào 08:00 thứ Hai</Text>
                  </div>
                </Flex>
                <Switch 
                  checked={isScheduled} 
                  onChange={(e) => {
                    setIsScheduled(e.currentTarget.checked);
                    toastRef.current?.show(e.currentTarget.checked ? 'Đã kích hoạt chế độ báo cáo tự động qua Email.' : 'Đã tắt chế độ báo cáo tự động.', 'info');
                  }} 
                  color="red"
                />
              </Flex>
            </div>
          </Stack>
        </div>

        <ToastNotification onRef={(ref) => (toastRef.current = ref)} />
      </div>
    </div>
  );
};

export default TrangBaoCaoThongKe;
