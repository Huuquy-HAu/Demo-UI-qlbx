import React, { useState, useEffect, useRef } from 'react';
import { 
  IconChevronLeft, 
  IconCheck, 
  IconEdit, 
  IconX,
  IconDownload,
  IconMapPin,
  IconHash,
  IconUser,
  IconPhone,
  IconMail,
  IconCalendar,
  IconDeviceAnalytics
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import ToastNotification from '../components/Common/ToastNotification';
import './TrangChiTietBaoCao.css';

const TrangChiTietBaoCao: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<any>(null);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  // Load report data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('reports_demo_data');
    if (saved) {
      const data = JSON.parse(saved);
      const found = data.find((r: any) => r.id === id);
      if (found) {
        setReport(found);
      }
    }
  }, [id]);

  const handleAction = (action: string) => {
    const saved = localStorage.getItem('reports_demo_data');
    if (saved) {
      const data = JSON.parse(saved);
      const updatedData = data.map((r: any) => {
        if (r.id === id) {
          let status = r.flowStatus;
          if (action === 'Phê duyệt') status = 'Hoàn thành';
          if (action === 'Từ chối') status = 'Từ chối';
          if (action === 'Yêu cầu chỉnh sửa') status = 'Đang xử lý';
          return { ...r, flowStatus: status };
        }
        return r;
      });
      localStorage.setItem('reports_demo_data', JSON.stringify(updatedData));
      toastRef.current?.show(`Đã thực hiện: ${action}`, 'success');
      
      // Update local state to reflect change
      setReport({ ...report, flowStatus: action === 'Phê duyệt' ? 'Hoàn thành' : (action === 'Từ chối' ? 'Từ chối' : 'Đang xử lý') });
      
      setTimeout(() => navigate('/dashboard/bao-cao'), 1500);
    }
  };

  if (!report) {
    return (
      <div className="chi-tiet-bao-cao-container" style={{ padding: '40px', textAlign: 'center' }}>
        <p>Đang tải dữ liệu hồ sơ...</p>
      </div>
    );
  }

  return (
    <div className="chi-tiet-bao-cao-container">
      {/* Back Button */}
      <button className="btn-back-list" onClick={() => navigate('/dashboard/bao-cao')}>
        <IconChevronLeft size={18} />
        <span>Quay lại danh sách</span>
      </button>

      {/* Header */}
      <header className="detail-header">
        <div className="header-left">
          <span className="detail-category">Chi tiết báo cáo #{report.id}</span>
          <h1 className="detail-title">{report.facilityName}</h1>
          <span className="detail-subtitle">
            Kỳ báo cáo: {report.period} • Năm: 2023 • Đợt báo cáo: Định kỳ
          </span>
        </div>

        <div className="action-buttons">
          <button className="btn-detail-action danger" onClick={() => handleAction('Từ chối')}>
            <IconX size={18} />
            <span>Từ chối</span>
          </button>
          <button className="btn-detail-action" onClick={() => handleAction('Yêu cầu chỉnh sửa')}>
            <IconEdit size={18} />
            <span>Yêu cầu chỉnh sửa</span>
          </button>
          <button className="btn-detail-action primary" onClick={() => handleAction('Phê duyệt')}>
            <IconCheck size={18} />
            <span>Phê duyệt</span>
          </button>
        </div>
      </header>

      {/* Bento Grid Content */}
      <div className="bento-grid-detail">
        
        {/* Left Column - Main Info */}
        <div className="detail-left-column">
          
          {/* Facility Information Card */}
          <div className="content-card">
            <h2 className="section-title">
              <IconDeviceAnalytics size={20} />
              Thông tin chung cơ sở
            </h2>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">
                  <IconMapPin size={14} />
                  Địa điểm hoạt động
                </span>
                <span className="info-value">108 Hoàng Như Tiếp, Phường Bồ Đề, Quận Long Biên, Hà Nội</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">
                  <IconHash size={14} />
                  Mã số thuế
                </span>
                <span className="info-value">0104711316</span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  <IconUser size={14} />
                  Người đại diện
                </span>
                <span className="info-value">GS.TS.BS Trần Huy Thịnh</span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  <IconPhone size={14} />
                  Số điện thoại
                </span>
                <span className="info-value">024 3872 3872</span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  <IconMail size={14} />
                  Email liên hệ
                </span>
                <span className="info-value">cskh@tamanhhospital.vn</span>
              </div>

              <div className="info-item">
                <span className="info-label">
                  <IconCalendar size={14} />
                  Ngày cấp phép
                </span>
                <span className="info-value">15/06/2010</span>
              </div>
            </div>
          </div>

          {/* Equipment List Card */}
          <div className="content-card">
            <h2 className="section-title">Danh mục thiết bị kỹ thuật</h2>
            <div className="equipment-table-wrapper">
              <table className="equipment-table">
                <thead>
                  <tr>
                    <th>Tên thiết bị</th>
                    <th>Mã hiệu</th>
                    <th>Số lượng</th>
                    <th>Năm sản xuất</th>
                    <th>Tình trạng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Máy chụp X-quang kỹ thuật số</td>
                    <td>DR-800EX</td>
                    <td>02</td>
                    <td>2021</td>
                    <td>Hoạt động tốt</td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 600 }}>Máy CT Scanner 128 lát cắt</td>
                    <td>SOMATOM Drive</td>
                    <td>01</td>
                    <td>2022</td>
                    <td>Hoạt động tốt</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Documents Card */}
          <div className="content-card">
            <h2 className="section-title">Hồ sơ đính kèm</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                padding: '16px 20px',
                background: '#f8fafc',
                borderRadius: '16px',
                border: '1px solid #f1f5f9'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <IconDownload size={20} color="#ea1e22" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>bao_cao_quy_4_tam_anh.pdf</div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>2.4 MB • 15/01/2024</div>
                  </div>
                </div>
                <button className="btn-detail-action" style={{ height: '36px', padding: '0 16px' }}>Tải xuống</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Status & Timeline */}
        <div className="detail-right-column">
          
          {/* Submission Info & Status Card */}
          <div className="content-card">
            <h2 className="section-title">Thông tin nộp báo cáo</h2>
            
            {/* Status Banner */}
            <div className="status-banner">
              <div className="status-banner-icon"></div>
              <div className="status-banner-content">
                <span className="status-banner-label">Trạng thái hồ sơ</span>
                <span className="status-banner-value">
                  {report.flowStatus === 'Hoàn thành' ? 'Đã phê duyệt' : 
                   report.flowStatus === 'Từ chối' ? 'Đã từ chối' : 'Đang xem xét'}
                </span>
              </div>
            </div>

            <div className="meta-list">
              <div className="meta-item">
                <span className="meta-label">Người nộp hồ sơ:</span>
                <span className="meta-value">Nguyễn Văn A</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Thời gian nộp:</span>
                <span className="meta-value">{report.submissionDate}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Mã số hồ sơ:</span>
                <span className="meta-value">BC-2023-TA-000{report.id}</span>
              </div>
            </div>
          </div>

          {/* Premium Timeline Card */}
          <div className="content-card">
            <h2 className="section-title">Lịch sử phê duyệt</h2>
            <div className="timeline-list">
              <div className="timeline-track"></div>
              
              <div className={`timeline-item ${report.flowStatus === 'Mới tạo' ? 'active' : 'completed'}`}>
                <div className="timeline-dot">
                  <div className="dot-outer">
                    {report.flowStatus !== 'Mới tạo' ? <IconCheck size={12} /> : <div className="dot-inner"></div>}
                  </div>
                </div>
                <span className="timeline-status">Cơ sở đã gửi báo cáo</span>
                <span className="timeline-time">{report.submissionDate} - 15:20</span>
                <div className="timeline-desc">Cơ sở hoàn tất việc nhập liệu và nộp báo cáo định kỳ.</div>
              </div>

              {report.flowStatus !== 'Mới tạo' && (
                <div className={`timeline-item ${report.flowStatus === 'Hoàn thành' || report.flowStatus === 'Từ chối' ? 'completed' : 'active'}`}>
                  <div className="timeline-dot">
                    <div className="dot-outer">
                      {report.flowStatus === 'Hoàn thành' || report.flowStatus === 'Từ chối' ? <IconCheck size={12} /> : <div className="dot-inner"></div>}
                    </div>
                  </div>
                  <span className="timeline-status">
                    {report.flowStatus === 'Hoàn thành' ? 'Đã phê duyệt' : 
                     report.flowStatus === 'Từ chối' ? 'Đã từ chối' : 'Đang thẩm định'}
                  </span>
                  <span className="timeline-time">{new Date().toLocaleDateString('vi-VN')} - 10:00</span>
                  <div className="timeline-desc">Hệ thống ghi nhận kết quả xử lý từ phòng chuyên môn.</div>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
      <ToastNotification onRef={(ref) => (toastRef.current = ref)} />
    </div>
  );
};

export default TrangChiTietBaoCao;
