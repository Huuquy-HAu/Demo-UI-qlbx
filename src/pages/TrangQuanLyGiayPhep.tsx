import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconCalendar,
  IconDotsVertical,
  IconDownload,
  IconExternalLink
} from '@tabler/icons-react';
import './TrangQuanLyGiayPhep.css';
import ToastNotification from '../components/Common/ToastNotification';
import { CircleCheckHomeIcon, DeviceManagementHomeIcon, MapCircleHomeIcon } from '../assets/icon';

interface License {
  id: string;
  licenseNumber: string;
  type: string;
  owner: string;
  issueDate: string;
  expiryDate: string;
  status: 'Hiệu lực' | 'Sắp hết hạn' | 'Hết hạn';
}

const mockLicenses: License[] = [
  { id: '1', licenseNumber: '124/GP-ATBX', type: 'Sử dụng thiết bị X-quang', owner: 'Bệnh viện Đa khoa Tâm Anh', issueDate: '10/01/2023', expiryDate: '10/01/2026', status: 'Hiệu lực' },
  { id: '2', licenseNumber: '89/GP-ATBX', type: 'Vận chuyển nguồn phóng xạ', owner: 'Trung tâm Chiếu xạ Hà Nội', issueDate: '15/03/2021', expiryDate: '15/03/2024', status: 'Sắp hết hạn' },
  { id: '3', licenseNumber: '210/GP-ATBX', type: 'Lưu giữ nguồn phóng xạ', owner: 'Viện Năng lượng Nguyên tử Việt Nam', issueDate: '20/05/2020', expiryDate: '20/05/2023', status: 'Hết hạn' },
  { id: '4', licenseNumber: '45/GP-ATBX', type: 'Sử dụng nguồn phóng xạ', owner: 'Công ty Cổ phần Sữa Việt Nam', issueDate: '12/12/2022', expiryDate: '12/12/2025', status: 'Hiệu lực' },
  { id: '5', licenseNumber: '167/GP-ATBX', type: 'Xây dựng cơ sở bức xạ', owner: 'Bệnh viện K (Tân Triều)', issueDate: '05/02/2024', expiryDate: '05/02/2027', status: 'Hiệu lực' },
];

const TrangQuanLyGiayPhep: React.FC = () => {
  const navigate = useNavigate();
  const [licenses, setLicenses] = useState<License[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Tất cả');
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('licenses_demo_data');
    if (saved) {
      setLicenses(JSON.parse(saved));
    } else {
      setLicenses(mockLicenses);
      localStorage.setItem('licenses_demo_data', JSON.stringify(mockLicenses));
    }
  }, []);

  const stats = {
    expiring: licenses.filter(l => l.status === 'Sắp hết hạn').length,
    expired: licenses.filter(l => l.status === 'Hết hạn').length,
    active: licenses.filter(l => l.status === 'Hiệu lực').length,
  };

  const filteredLicenses = licenses.filter(l => {
    const matchesSearch = l.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'Tất cả' || l.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Hiệu lực': return 'status-active';
      case 'Sắp hết hạn': return 'status-warning';
      case 'Hết hạn': return 'status-danger';
      default: return '';
    }
  };

  const handleAction = (msg: string) => {
    toastRef.current?.show(msg, 'success');
  };

  return (
    <div className="giay-phep-container">
      <ToastNotification onRef={(ref) => (toastRef.current = ref)} />

      {/* Header Section */}
      <header className="giay-phep-header">
        <div className="header-left">

          <h1>Quản lý Giấy phép & Chứng chỉ</h1>
        </div>
        <button className="btn-create" onClick={() => handleAction('Chức năng cấp mới giấy phép đang được khởi tạo')}>
          <IconPlus size={18} />
          <span>Cấp mới Giấy phép</span>
        </button>
      </header>

      {/* Bento Stats Grid */}
      <div className="stats-grid">
        <div className="qlgp-stat-card">
          <div className="qlgp-stat-info">
            <span className="qlgp-stat-title">SẮP HẾT HẠN (30 NGÀY)</span>
            <span className="qlgp-stat-value warning">{stats.expiring}</span>
            <span className="qlgp-stat-desc">Giấy phép cần gia hạn gấp</span>
          </div>
          <div className="qlgp-stat-icon warning">
            <CircleCheckHomeIcon />
          </div>
        </div>

        <div className="qlgp-stat-card">
          <div className="qlgp-stat-info">
            <span className="qlgp-stat-title">ĐÃ HẾT HẠN</span>
            <span className="qlgp-stat-value danger">{stats.expired}</span>
            <span className="qlgp-stat-desc">Vi phạm an toàn bức xạ</span>
          </div>
          <div className="qlgp-stat-icon ">
            <MapCircleHomeIcon />
          </div>
        </div>

        <div className="qlgp-stat-card">
          <div className="qlgp-stat-info">
            <span className="qlgp-stat-title">ĐANG HIỆU LỰC</span>
            <span className="qlgp-stat-value success">{stats.active}</span>
            <span className="qlgp-stat-desc">Hoạt động đúng quy định</span>
          </div>
          <div className="qlgp-stat-">
            <DeviceManagementHomeIcon />
          </div>
        </div>
      </div>

      {/* Table Module */}
      <div className="table-container glass-card">
        <div className="filters-bar">
          <div className="qlgp-search-box">
            <IconSearch size={18} className="qlgp-search-icon" />
            <input
              className="qlgp-search-input"
              type="text"
              placeholder="Tìm kiếm số giấy phép, đơn vị..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="filter-actions">
            <div className="status-pills">
              {['Tất cả', 'Hiệu lực', 'Sắp hết hạn', 'Hết hạn'].map(status => (
                <button
                  key={status}
                  className={`status-pill ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>
            <button className="btn-filter">
              <IconFilter size={18} />
              <span>Bộ lọc</span>
            </button>
          </div>
        </div>

        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>SỐ GIẤY PHÉP</th>
                <th>LOẠI</th>
                <th>CƠ SỞ SỞ HỮU / CÁ NHÂN</th>
                <th>NGÀY CẤP</th>
                <th>NGÀY HẾT HẠN</th>
                <th>TRẠNG THÁI</th>
                <th>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {filteredLicenses.map((license, index) => (
                <tr
                  key={license.id}
                  onClick={() => navigate(`/dashboard/giay-phep/${license.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <td>{index + 1}</td>
                  <td>
                    <div className="license-number">
                      {license.licenseNumber}
                      <IconExternalLink size={14} className="link-icon" />
                    </div>
                  </td>
                  <td>{license.type}</td>
                  <td>
                    <div className="owner-info">
                      <span className="owner-name">{license.owner}</span>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <IconCalendar size={14} />
                      {license.issueDate}
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <IconCalendar size={14} />
                      {license.expiryDate}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${getStatusClass(license.status)}`}>
                      {license.status}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="action-btn" title="Xem chi tiết">
                        <IconDownload size={18} />
                      </button>
                      <button className="action-btn" title="Khác">
                        <IconDotsVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination-footer">
          <span className="page-info">Hiển thị {filteredLicenses.length} trên tổng số {licenses.length} giấy phép</span>
          <div className="pagination-btns">
            <button disabled>Trước</button>
            <button className="active">1</button>
            <button>2</button>
            <button>Sau</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrangQuanLyGiayPhep;
