import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  IconDownload,
  IconEdit,
  IconChevronRight,
  IconCertificate,
  IconHistory,
  IconShieldCheck,
  IconFileText,
  IconDotsVertical,
  IconCircleCheck,
  IconArrowRight
} from '@tabler/icons-react';
import './TrangChiTietGiayPhep.css';
import ToastNotification from '../components/Common/ToastNotification';

interface License {
  id: string;
  licenseNumber: string;
  type: string;
  owner: string;
  issueDate: string;
  expiryDate: string;
  status: 'Hiệu lực' | 'Sắp hết hạn' | 'Hết hạn';
  authority?: string;
  address?: string;
  representative?: string;
  version?: string;
  description?: string;
}

const TrangChiTietGiayPhep: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [license, setLicense] = useState<License | null>(null);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('licenses_demo_data');
    if (saved) {
      const data: License[] = JSON.parse(saved);
      const found = data.find(l => l.id === id);
      if (found) {
        setLicense({
          ...found,
          authority: 'Cục An toàn bức xạ và hạt nhân',
          address: 'Tầng 11, Tòa nhà 113 Trần Duy Hưng, Cầu Giấy, Hà Nội',
          representative: 'Ông Nguyễn Văn A - Giám đốc',
          version: 'V2.0 (Bản điện tử)',
          description: 'Giấy phép cho phép cơ sở vận hành thiết bị bức xạ theo quy chuẩn quốc gia về an toàn hạt nhân.'
        });
      }
    }
  }, [id]);

  const handleAction = (msg: string) => {
    toastRef.current?.show(msg, 'success');
  };

  if (!license) return <div className="loading">Cảnh báo: Không tìm thấy hồ sơ giấy phép...</div>;

  return (
    <div className="chi-tiet-giay-phep-container">
      <ToastNotification onRef={(ref) => (toastRef.current = ref)} />

      {/* Header Section - Refined for Figma Accuracy */}
      <header className="page-header-refined">
        <div className="header-left">
          <div className="breadcrumbs-refined">
            <span onClick={() => navigate('/dashboard/giay-phep')} className="crumb-link">Giấy phép & Chứng chỉ</span>
            <IconChevronRight size={14} className="separator" />
            <span className="current-crumb">{license.licenseNumber}</span>
          </div>
          <h1 className="main-title">Hồ sơ giấy phép</h1>
          <p className="sub-description">Xem chi tiết và quản lý thông tin đăng nhập giấy phép đang hoạt động.</p>
        </div>
        
        <div className="header-right">
          <div className="status-pill-container">
             <div className="status-pill-dot"></div>
             <span className="status-pill-text">Trạng thái : Hoạt độnG</span>
          </div>
        </div>
      </header>

      {/* Bento Grid Layout */}
      <div className="bento-detail-grid">
        {/* Left Column */}
        <div className="bento-column left">
          {/* Card 1: License Information */}
          <div className="bento-card glass info-card">
            <div className="decorative-top-edge"></div>
            <div className="card-header">
              <div className="title-with-icon">
                <div className="icon-wrapper">
                  <IconCertificate size={20} />
                </div>
                <h2>Thông tin giấy phép</h2>
              </div>
              <button className="btn-edit-inline" onClick={() => handleAction('Mở form chỉnh sửa...')}>
                <IconEdit size={16} />
              </button>
            </div>
            
            <div className="info-content-refined">
              <div className="info-item">
                <span className="label">Số hiệu giấy phép</span>
                <span className="value bold red">{license.licenseNumber}</span>
              </div>
              <div className="info-item">
                <span className="label">Loại giấy phép</span>
                <span className="value">{license.type}</span>
              </div>
              <div className="info-item">
                <span className="label">Cơ quan cấp phép</span>
                <span className="value">{license.authority}</span>
              </div>
              <div className="info-grid-2">
                <div className="info-item">
                  <span className="label">Ngày cấp phép</span>
                  <span className="value">{license.issueDate}</span>
                </div>
                <div className="info-item">
                  <span className="label">Ngày hết hạn</span>
                  <span className="value">{license.expiryDate}</span>
                </div>
              </div>
              <div className="info-item">
                <span className="label">Đơn vị chủ trì</span>
                <span className="value">{license.owner}</span>
              </div>
            </div>
          </div>

          {/* Card 2: History */}
          <div className="bento-card glass history-card">
            <div className="decorative-top-edge"></div>
            <div className="card-header">
              <div className="title-with-icon">
                <div className="icon-wrapper grey">
                  <IconHistory size={20} />
                </div>
                <h2>Lịch sử phiên bản</h2>
              </div>
            </div>
            <div className="timeline-refined">
              <div className="timeline-segment active">
                <div className="segment-point"></div>
                <div className="segment-content">
                  <div className="segment-top">
                    <span className="segment-version">Phiên bản {license.version}</span>
                    <span className="segment-date">15/01/2024</span>
                  </div>
                  <p className="segment-desc">Gia hạn giấy phép định kỳ thành công.</p>
                </div>
              </div>
              <div className="timeline-segment">
                <div className="segment-point"></div>
                <div className="segment-content">
                  <div className="segment-top">
                    <span className="segment-version">Phiên bản V1.0</span>
                    <span className="segment-date">10/01/2023</span>
                  </div>
                  <p className="segment-desc">Cấp mới hồ sơ giấy phép ban đầu.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="bento-column right">
           {/* Card 3: Linked Assets */}
           <div className="bento-card glass assets-card">
              <div className="decorative-top-edge"></div>
              <div className="card-header">
                <div className="title-with-icon">
                  <div className="icon-wrapper blue">
                    <IconShieldCheck size={20} />
                  </div>
                  <h2>Thiết bị & Nguồn phóng xạ</h2>
                </div>
                <button className="btn-manage-assets">
                   Quản lý tài sản
                </button>
              </div>
              
              <div className="assets-list-refined">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="asset-row">
                       <IconCircleCheck size={18} className="check-icon" />
                       <div className="asset-details">
                          <span className="name">Máy phát tia X công nghiệp {i === 1 ? 'X-Ray Gen 1' : i === 2 ? 'Gen 2' : 'Gen 3'}</span>
                          <span className="code">Mã quản lý: TB-2024-{100 + i}</span>
                       </div>
                       <IconDotsVertical size={16} className="more-icon" />
                    </div>
                 ))}
                 <button className="expand-assets-btn">
                    Xem toàn bộ 12 tài sản liên quan
                    <IconArrowRight size={14} />
                 </button>
              </div>
           </div>

           {/* Card 4: File Scan */}
           <div className="bento-card glass files-card">
              <div className="decorative-top-edge"></div>
              <div className="card-header">
                <div className="title-with-icon">
                  <div className="icon-wrapper red">
                    <IconFileText size={20} />
                  </div>
                  <h2>Tệp đính kèm & Bản quét</h2>
                </div>
              </div>
              
              <div className="file-box-refined">
                 <div className="main-file-display">
                    <div className="file-icon-large">
                       <IconFileText size={40} />
                    </div>
                    <div className="file-text-content">
                       <h3>GP_ATBX_{license.licenseNumber.replace('/', '-')}.pdf</h3>
                       <p>PDF Document • 3.2 MB • Cập nhật: 15/01/2024</p>
                    </div>
                    <div className="file-actions-refined">
                       <button className="preview-trigger" onClick={() => handleAction('Đang tải trình xem trực tuyến...')}>Xem nhanh</button>
                       <button className="download-trigger" onClick={() => handleAction('Bắt đầu tải xuống...')}>
                          <IconDownload size={16} />
                       </button>
                    </div>
                 </div>
                 
                 <div className="sub-files-grid">
                    <div className="sub-file">
                       <IconFileText size={14} />
                       <span>Phụ lục kỹ thuật.docx</span>
                    </div>
                    <div className="sub-file">
                       <IconFileText size={14} />
                       <span>Ảnh chụp cơ sở.zip</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default TrangChiTietGiayPhep;
