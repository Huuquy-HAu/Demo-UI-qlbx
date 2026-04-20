import React, { useState } from 'react';
import './TrangQuanLyCoSoBucXa.css';
import {
  IconSearch,
  IconPlus,
  IconChevronDown,
  IconMapPin,
  IconBuildingFactory,
  IconAlertTriangle,
  IconCheck
} from '@tabler/icons-react';
import { Flex, Text } from '@mantine/core';

interface Facility {
  id: number;
  tenCoSo: string;
  maSo: string;
  diaChi: string;
  riskScore: number;
  trangThai: 'Hoạt động' | 'Tạm dừng' | 'Bảo trì';
  dienThoai?: string;
  email?: string;
  nguoiDaiDien?: string;
  ngayDangKy?: string;
  lichSu?: Array<{
    ngay: string;
    action: string;
    details: string;
    type: 'success' | 'warning' | 'info';
  }>;
}

const facilitiesData: Facility[] = [
  {
    id: 1,
    tenCoSo: 'Bệnh viện Đa khoa Tâm Anh',
    maSo: 'BX-2023-0891',
    diaChi: '108 Hoàng Như Tiếp, Long Biên, Hà Nội',
    riskScore: 85,
    trangThai: 'Hoạt động',
    dienThoai: '024 3872 3872',
    email: 'info@tamanhhospital.vn',
    nguoiDaiDien: 'TS.BS Nguyễn Quang Phục',
    ngayDangKy: '15/05/2023',
    lichSu: [
      { ngay: '20/03/2024', action: 'Kiểm định định kỳ', details: 'Hệ thống chụp CT đạt chuẩn', type: 'success' },
      { ngay: '12/01/2024', action: 'Bảo trì hệ thống', details: 'Thay thế bộ lọc tia X', type: 'info' },
      { ngay: '05/11/2023', action: 'Cảnh báo rò rỉ', details: 'Phát hiện rò rỉ nhẹ tại phòng xạ trị', type: 'warning' }
    ]
  },
  {
    id: 2,
    tenCoSo: 'Viện Năng lượng Nguyên tử Việt Nam',
    maSo: 'BX-2023-0452',
    diaChi: '59 Lý Thường Kiệt, Hoàn Kiếm, Hà Nội',
    riskScore: 42,
    trangThai: 'Hoạt động',
    dienThoai: '024 3942 0468',
    email: 'vinatom@hn.vnn.vn',
    nguoiDaiDien: 'TS. Trần Chí Thành',
    ngayDangKy: '10/02/2023',
    lichSu: [
      { ngay: '15/02/2024', action: 'Nâng cấp thiết bị', details: 'Cài đặt hệ thống quan trắc mới', type: 'success' },
      { ngay: '20/12/2023', action: 'Đào tạo an toàn', details: 'Cấp chứng chỉ cho 15 cán bộ', type: 'info' }
    ]
  },
  {
    id: 3,
    tenCoSo: 'Trung tâm Chi chiếu xạ Hà Nội',
    maSo: 'BX-2023-1102',
    diaChi: 'Km 12, Đường 32, Minh Khai, Bắc Từ Liêm, Hà Nội',
    riskScore: 68,
    trangThai: 'Tạm dừng',
    dienThoai: '024 3765 5281',
    email: 'hic@hn.vnn.vn',
    nguoiDaiDien: 'ThS. Đặng Quang Thiệu',
    ngayDangKy: '25/08/2023',
    lichSu: [
      { ngay: '10/03/2024', action: 'Tạm dừng hoạt động', details: 'Sửa chữa hạ tầng khu vực kho nguồn', type: 'warning' },
      { ngay: '15/12/2023', action: 'Thanh tra định kỳ', details: 'Đạt yêu cầu an toàn bức xạ', type: 'success' }
    ]
  },
  {
    id: 4,
    tenCoSo: 'Bệnh viện K (Cơ sở Tân Triều)',
    maSo: 'BX-2024-0015',
    diaChi: '30 Cầu Bươu, Thanh Trì, Hà Nội',
    riskScore: 92,
    trangThai: 'Hoạt động',
    dienThoai: '090 469 0886',
    email: 'benhvienk@gmail.com',
    nguoiDaiDien: 'GS.TS Lê Văn Quảng',
    ngayDangKy: '05/01/2024',
    lichSu: [
      { ngay: '01/04/2024', action: 'Lắp đặt máy xạ trị mới', details: 'Máy gia tốc thế hệ mới nhất', type: 'success' },
      { ngay: '12/03/2024', action: 'Báo cáo rủi ro', details: 'Tăng cường che chắn phòng xạ trị', type: 'info' }
    ]
  },
  {
    id: 5,
    tenCoSo: 'Công ty Cổ phần Huấn luyện An toàn',
    maSo: 'BX-2023-0722',
    diaChi: 'Ngõ 2, Đại lộ Thăng Long, Nam Từ Liêm, Hà Nội',
    riskScore: 15,
    trangThai: 'Bảo trì',
    dienThoai: '024 6265 2419',
    email: 'safety@training.com.vn',
    nguoiDaiDien: 'Ông Nguyễn Văn A',
    ngayDangKy: '12/07/2023',
    lichSu: [
      { ngay: '05/04/2024', action: 'Bảo trì tổng thể', details: 'Vệ sinh và kiểm tra hệ thống che chắn', type: 'info' }
    ]
  }
];

const TrangQuanLyCoSoBucXa: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeRow, setActiveRow] = useState<number | null>(1);
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(facilitiesData[0]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [formData, setFormData] = useState<Partial<Facility>>({
    tenCoSo: '',
    maSo: '',
    diaChi: '',
    riskScore: 0,
    trangThai: 'Hoạt động',
    dienThoai: '',
    email: '',
    nguoiDaiDien: ''
  });

  const handleRowClick = (facility: Facility) => {
    setActiveRow(facility.id);
    setSelectedFacility(facility);
    setShowDrawer(true);
  };

  const handleOpenAdd = () => {
    setModalType('add');
    setFormData({
      tenCoSo: '',
      maSo: `BX-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      diaChi: '',
      riskScore: 0,
      trangThai: 'Hoạt động',
      dienThoai: '',
      email: '',
      nguoiDaiDien: '',
      ngayDangKy: new Date().toLocaleDateString('vi-VN')
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = () => {
    if (selectedFacility) {
      setModalType('edit');
      setFormData({ ...selectedFacility });
      setIsModalOpen(true);
    }
  };

  const handleInputChange = (field: keyof Facility, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would be an API call
    console.log('Saving facility:', formData);
    setIsModalOpen(false);
    // Ideally update local state here if it were managed by useState
    alert(`${modalType === 'add' ? 'Thêm mới' : 'Cập nhật'} thành công!`);
  };

  return (
    <div className="csbx-management-page">
      <div className="csbx-management-container">
        {/* Page Header */}
        <div className="page-header">
          <Flex justify='start' direction='column' gap={10}>
            <Text fw={600} size='11px' style={{ fontFamily: 'Inter', color: '#64748B' }}> HỆ THỐNG QUẢN LÝ</Text>
            <Text fw={700} size='36px' style={{ fontFamily: 'Inter', color: '#1A1C1D' }}> QUẢN LÝ CƠ SỞ BỨC XẠ</Text>
            <Text fw={400} size='14px' style={{ fontFamily: 'Inter', color: '#64748B' }}> 1,245 cơ sở đang hoạt động trên toàn quốc</Text>
          </Flex>
          <button className="btn-add" onClick={handleOpenAdd}>
            <IconPlus size={20} />
            <span>Thêm mới cơ sở</span>
          </button>
        </div>

        {/* Refined Filters */}
        <div className="csbx-filters-section">
          <div className="csbx-search-box">
            <IconSearch className="csbx-search-icon" size={18} />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã số, địa chỉ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="csbx-dropdown-filters">
            <div className="csbx-filter-item">
              <span>Loại hình</span>
              <IconChevronDown size={16} />
            </div>
            <div className="csbx-filter-item">
              <span>Khu vực</span>
              <IconChevronDown size={16} />
            </div>
            <div className="csbx-filter-item">
              <span>Trạng thái</span>
              <IconChevronDown size={16} />
            </div>
          </div>
        </div>

        {/* Elegant Data Table */}
        <div className="table-container">
          <table className="elegant-table">
            <thead>
              <tr>
                <th>TÊN CƠ SỞ</th>
                <th>MÃ SỐ</th>
                <th>ĐỊA CHỈ</th>
                <th className="text-center">RISK SCORE</th>
                <th>TRẠNG THÁI</th>
              </tr>
            </thead>
            <tbody>
              {facilitiesData.map((facility) => (
                <tr
                  key={facility.id}
                  className={activeRow === facility.id ? 'active-row' : ''}
                  onClick={() => handleRowClick(facility)}
                >
                  <td>
                    <div className="facility-name-cell">
                      <div className="facility-icon">
                        <IconBuildingFactory size={18} />
                      </div>
                      <span>{facility.tenCoSo}</span>
                    </div>
                  </td>
                  <td><code className="code-badge">{facility.maSo}</code></td>
                  <td className="address-cell">
                    <div className="address-content">
                      <IconMapPin size={14} className="pin-icon" />
                      <span>{facility.diaChi}</span>
                    </div>
                  </td>
                  <td className="text-center">
                    <div className={`risk-indicator ${facility.riskScore > 80 ? 'risk-high' : facility.riskScore > 50 ? 'risk-medium' : 'risk-low'}`}>
                      {facility.riskScore}/100
                    </div>
                  </td>
                  <td>
                    <div className={`status-badge status-${facility.trangThai === 'Hoạt động' ? 'active' : facility.trangThai === 'Tạm dừng' ? 'pause' : 'maintenance'}`}>
                      {facility.trangThai === 'Hoạt động' ? <IconCheck size={12} /> : facility.trangThai === 'Tạm dừng' ? <IconAlertTriangle size={12} /> : <IconChevronDown size={12} />}
                      <span>{facility.trangThai}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {showDrawer && selectedFacility && (
        <>
          <div className="drawer-overlay" onClick={() => setShowDrawer(false)}></div>
          <div className="detail-drawer">
            <div className="drawer-header">
              <div className="header-top">
                <div className="facility-id">{selectedFacility.maSo}</div>
                <button className="close-btn" onClick={() => setShowDrawer(false)}>
                  <IconPlus size={24} style={{ transform: 'rotate(45deg)' }} />
                </button>
              </div>
              <h2 className="drawer-title">{selectedFacility.tenCoSo}</h2>
              <div className="drawer-subtitle">
                <IconMapPin size={14} />
                <span>{selectedFacility.diaChi}</span>
              </div>
            </div>

            <div className="drawer-content">
              <section className="drawer-section">
                <h3 className="section-title">Thông tin chung</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <label>Người đại diện</label>
                    <span>{selectedFacility.nguoiDaiDien}</span>
                  </div>
                  <div className="info-item">
                    <label>Ngày đăng ký</label>
                    <span>{selectedFacility.ngayDangKy}</span>
                  </div>
                  <div className="info-item">
                    <label>Số điện thoại</label>
                    <span>{selectedFacility.dienThoai}</span>
                  </div>
                  <div className="info-item">
                    <label>Email</label>
                    <span>{selectedFacility.email}</span>
                  </div>
                  <div className="info-item full-width">
                    <label>Risk Score</label>
                    <div className="risk-score-detail">
                      <div className="score-value">{selectedFacility.riskScore}/100</div>
                      <div className="score-bar">
                        <div
                          className={`score-fill ${selectedFacility.riskScore > 80 ? 'high' : selectedFacility.riskScore > 50 ? 'medium' : 'low'}`}
                          style={{ width: `${selectedFacility.riskScore}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="drawer-section">
                <h3 className="section-title">Lịch sử hoạt động</h3>
                <div className="timeline">
                  {selectedFacility.lichSu?.map((item, index) => (
                    <div key={index} className="timeline-item">
                      <div className={`timeline-indicator ${item.type}`}></div>
                      <div className="timeline-content">
                        <div className="timeline-date">{item.ngay}</div>
                        <div className="timeline-action">{item.action}</div>
                        <div className="timeline-details">{item.details}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="drawer-footer">
              <button className="btn-secondary" onClick={() => setShowDrawer(false)}>Đóng</button>
              <button className="btn-primary" onClick={handleOpenEdit}>Chỉnh sửa thông tin</button>
            </div>
          </div>
        </>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <div className="modal-header-icon">
                {modalType === 'add' ? <IconPlus size={20} /> : <IconBuildingFactory size={20} />}
              </div>
              <div className="modal-header-content">
                <h2 className="modal-title">{modalType === 'add' ? 'Thêm cơ sở bức xạ mới' : 'Chỉnh sửa thông tin cơ sở'}</h2>
                <p className="modal-subtitle">Vui lòng điền đầy đủ các thông tin bắt buộc dưới đây</p>
              </div>
              <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                <IconPlus size={24} style={{ transform: 'rotate(45deg)' }} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label>Tên cơ sở bức xạ <span>*</span></label>
                  <input
                    type="text"
                    placeholder="VD: Bệnh viện Đa khoa Tâm Anh"
                    value={formData.tenCoSo}
                    onChange={(e) => handleInputChange('tenCoSo', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Mã số quản lý</label>
                  <input
                    type="text"
                    disabled
                    value={formData.maSo}
                    className="disabled-input"
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái <span>*</span></label>
                  <select
                    value={formData.trangThai}
                    onChange={(e) => handleInputChange('trangThai', e.target.value)}
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Tạm dừng">Tạm dừng</option>
                    <option value="Bảo trì">Bảo trì</option>
                  </select>
                </div>
                <div className="form-group full-width">
                  <label>Địa chỉ <span>*</span></label>
                  <input
                    type="text"
                    placeholder="Nhập địa chỉ chi tiết..."
                    value={formData.diaChi}
                    onChange={(e) => handleInputChange('diaChi', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Người đại diện</label>
                  <input
                    type="text"
                    placeholder="VD: Nguyễn Văn A"
                    value={formData.nguoiDaiDien}
                    onChange={(e) => handleInputChange('nguoiDaiDien', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="VD: 024 3xxx xxxx"
                    value={formData.dienThoai}
                    onChange={(e) => handleInputChange('dienThoai', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Email liên hệ</label>
                  <input
                    type="email"
                    placeholder="VD: contact@hospital.vn"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Risk Score (0-100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.riskScore}
                    onChange={(e) => handleInputChange('riskScore', parseInt(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setIsModalOpen(false)}>Hủy bỏ</button>
              <button className="btn-primary" onClick={handleSave}>
                {modalType === 'add' ? 'Lưu thông tin' : 'Cập nhật thay đổi'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrangQuanLyCoSoBucXa;
