import React, { useState } from 'react';
import {
  IconSearch,
  IconFilter,
  IconDownload,
  IconCheck,
  IconX,
  IconServer,
  IconPlug,
  IconClock,
  IconDatabaseExport,
  IconCircleCheck
} from '@tabler/icons-react';
import './TrangNhatKyHeThong.css';

const MOCK_LOGS = [
  { id: 1, time: '2026-04-21 08:30:15', user: 'Admin System', action: 'LOGIN', target: 'Hệ thống', ip: '118.69.102.50', status: 'success' },
  { id: 2, time: '2026-04-21 08:45:00', user: 'admin@benhvien.com', action: 'UPDATE', target: 'Cơ sở: BV Tỉnh', ip: '14.161.45.123', status: 'success' },
  { id: 3, time: '2026-04-21 09:12:33', user: 'System', action: 'CRON_JOB', target: 'Báo cáo hàng ngày', ip: '127.0.0.1', status: 'failed' },
  { id: 4, time: '2026-04-21 10:05:40', user: 'canbodt@sotnmt.gov.vn', action: 'APPROVE', target: 'Giấy phép GP-2026-010', ip: '113.161.50.2', status: 'success' },
  { id: 5, time: '2026-04-21 10:15:22', user: 'Admin System', action: 'DELETE', target: 'Mẫu Role (Viewer)', ip: '118.69.102.50', status: 'success' },
];

const TrangNhatKyHeThong: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const renderStatus = (status: string) => {
    if (status === 'success') {
      return <span className="badge badge-success"><IconCheck size={12} /> Thành công</span>;
    }
    return <span className="badge badge-error"><IconX size={12} /> Thất bại</span>;
  };

  const renderActionLabel = (action: string) => {
    switch (action) {
      case 'LOGIN': return <span className="action-tag action-info">LOGIN</span>;
      case 'UPDATE': return <span className="action-tag action-warning">UPDATE</span>;
      case 'DELETE': return <span className="action-tag action-danger">DELETE</span>;
      case 'APPROVE': return <span className="action-tag action-success">APPROVE</span>;
      case 'CRON_JOB': return <span className="action-tag action-default">CRON_JOB</span>;
      default: return <span className="action-tag action-default">{action}</span>;
    }
  };

  return (
    <div className="nhat-ky-container">
      {/* Page Header */}
      <div className="page-header-nhatky">
        <h1 className="main-title">Nhật ký Hệ thống</h1>
        <p className="sub-description">
          Theo dõi tất cả các hoạt động, truy cập và thay đổi cấu hình trên toàn bộ nền tảng quản lý.
        </p>
      </div>

      {/* Bento Grid Layout (12 cols) */}
      <div className="nk-bento-grid">

        {/* Main Column (Span 8) */}
        <div className="nk-main-column span-8">

          {/* Sub Bento: Search & Filter */}
          <div className="nk-bento-card nk-filter-card">
            <div className="nk-search-box-large">
              <IconSearch className="nk-icon-left" size={18} />
              <input
                type="text"
                placeholder="Tìm kiếm theo Người dùng, Hành động, Target..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="nk-filter-actions">
              <button className="nk-btn-outline">
                <IconFilter size={16} /> Lọc dữ liệu
              </button>
              <button className="nk-btn-outline">
                <IconDownload size={16} /> Xuất Logs
              </button>
            </div>
          </div>

          {/* Sub Bento: Logs Table */}
          <div className="nk-bento-card nk-log-table-card">
            <h3 className="nk-card-title">Lịch sử Hoạt động (Audit Log)</h3>
            <div className="nk-table-responsive">
              <table className="nk-log-matrix">
                <thead>
                  <tr>
                    <th>Thời gian</th>
                    <th>Tài khoản</th>
                    <th>Xác thực IP</th>
                    <th>Hành động</th>
                    <th>Đối tượng</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_LOGS.map(log => (
                    <tr key={log.id}>
                      <td className="nk-log-time">{log.time}</td>
                      <td className="nk-log-user">{log.user}</td>
                      <td className="nk-log-ip">{log.ip}</td>
                      <td>{renderActionLabel(log.action)}</td>
                      <td className="nk-log-target">{log.target}</td>
                      <td>{renderStatus(log.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Side Column (Span 4) */}
        <div className="nk-side-column span-4">

          {/* Sub Bento 1: API Status (Cổng LGSP) */}
          <div className="nk-bento-card nk-stat-card">
            <div className="nk-stat-card-header">
              <h4>Cổng LGSP</h4>
              <div className="nk-status-badge">
                <span className="nk-status-dot-mini"></span>
                Đã kết nối
              </div>
            </div>

            <div className="nk-stat-sub-section">
              {/* Row 1: Latency */}
              <div className="nk-stat-sub-row">
                <div className="nk-stat-info-left">
                  <span className="nk-stat-label-light">Độ trễ</span>
                  <span className="nk-stat-val-bold">24ms</span>
                </div>
                <div className="nk-mini-chart-wrapper">
                  <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 25C10 22 15 10 25 15C35 20 45 5 55 10C65 15 70 8 80 5" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M0 25C10 22 15 10 25 15C35 20 45 5 55 10C65 15 70 8 80 5V30H0V25Z" fill="url(#paint0_linear)" />
                    <defs>
                      <linearGradient id="paint0_linear" x1="40" y1="5" x2="40" y2="30" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10b981" stopOpacity="0.2" />
                        <stop offset="1" stopColor="#10b981" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Row 2: Uptime */}
              <div className="nk-stat-sub-row">
                <div className="nk-stat-info-left">
                  <span className="nk-stat-label-light">Thời gian hoạt động (30D)</span>
                  <span className="nk-stat-val-bold">99.98%</span>
                </div>
                <div className="nk-check-circle-icon">
                  <IconCircleCheck size={20} />
                </div>
              </div>
            </div>
          </div>

          {/* Sub Bento 2: Endpoint Management */}
          <div className="nk-bento-card nk-endpoint-card">
            <h4 className="nk-card-title-sm"><IconServer size={18} /> Kết nối Endpoint</h4>
            <div className="nk-endpoint-list">
              <div className="nk-ep-item">
                <div className="nk-ep-info">
                  <strong>Cổng Dịch vụ Công QG</strong>
                  <span>Sync: 5 mins ago</span>
                </div>
                <div className="nk-ep-status active">Connected</div>
              </div>
              <div className="nk-ep-item">
                <div className="nk-ep-info">
                  <strong>Hệ thống Email Vina</strong>
                  <span>Sync: 1 hour ago</span>
                </div>
                <div className="nk-ep-status active">Connected</div>
              </div>
              <div className="nk-ep-item nk-warning">
                <div className="nk-ep-info">
                  <strong>SMS Gateway (Zalo)</strong>
                  <span>Timeout Error</span>
                </div>
                <div className="nk-ep-status failed">Failed</div>
              </div>
            </div>
          </div>

          {/* Sub Bento 3: Data Export Config */}
          <div className="nk-bento-card nk-config-card">
            <h4 className="nk-card-title-sm"><IconDatabaseExport size={18} /> Cấu hình sao lưu</h4>
            <p className="nk-card-desc">Tự động sao lưu dữ liệu Audit Log sang hệ thống lưu trữ dự phòng.</p>

            <div className="nk-config-setting">
              <div className="nk-setting-row">
                <span><IconClock size={16} /> Chu kỳ Backup</span>
                <strong>Hàng ngày (02:00 SA)</strong>
              </div>
              <div className="nk-setting-row">
                <span><IconPlug size={16} /> API Target</span>
                <strong>AWS S3 Bucket</strong>
              </div>
            </div>

            <button className="nk-btn-save-config">Chỉnh sửa cầu hình</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrangNhatKyHeThong;
