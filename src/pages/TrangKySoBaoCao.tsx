import React, { useState, useEffect, useRef } from 'react';
import { 
  IconChevronLeft, 
  IconCheck, 
  IconEdit, 
  IconX,
  IconDownload,
  IconDeviceAnalytics,
  IconCertificate,
  IconFingerprint,
  IconShieldCheck,
  IconLock,
  IconMapPin,
  IconHash,
  IconUser,
  IconPhone
} from '@tabler/icons-react';
import { useNavigate, useParams } from 'react-router-dom';
import ToastNotification from '../components/Common/ToastNotification';
import './TrangKySoBaoCao.css';

const TrangKySoBaoCao: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  // Use only id for logic if report is not needed in UI
  useEffect(() => {
    const saved = localStorage.getItem('reports_demo_data');
    if (saved) {
      const data = JSON.parse(saved);
      const found = data.find((r: any) => r.id === id);
      if (found && found.signatureStatus === 'Đã ký') {
        setIsSigned(true);
      }
    }
  }, [id]);

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`pin-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      const prevInput = document.getElementById(`pin-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSign = () => {
    setIsSigning(true);
    // Simulate signing process
    setTimeout(() => {
      setIsSigning(false);
      setIsSigned(true);
      
      // Update localStorage
      const saved = localStorage.getItem('reports_demo_data');
      if (saved) {
        const data = JSON.parse(saved);
        const updatedData = data.map((r: any) => {
          if (r.id === id) {
            return { ...r, flowStatus: 'Hoàn thành', signatureStatus: 'Đã ký' };
          }
          return r;
        });
        localStorage.setItem('reports_demo_data', JSON.stringify(updatedData));
      }
      
      toastRef.current?.show('Ký số văn bản thành công!', 'success');
    }, 2000);
  };

  const handleAction = (action: string) => {
    const saved = localStorage.getItem('reports_demo_data');
    if (saved) {
      const data = JSON.parse(saved);
      const updatedData = data.map((r: any) => {
        if (r.id === id) {
          let status = r.flowStatus;
          if (action === 'Từ chối') status = 'Từ chối';
          if (action === 'Yêu cầu sửa') status = 'Đang xử lý';
          return { ...r, flowStatus: status };
        }
        return r;
      });
      localStorage.setItem('reports_demo_data', JSON.stringify(updatedData));
      toastRef.current?.show(`Đã thực hiện: ${action}`, 'info');
      setTimeout(() => navigate('/dashboard/bao-cao'), 1500);
    }
  };

  return (
    <div className="ky-so-container">
      <div className="ky-so-content">
        {/* Header Section */}
        <header className="ky-so-header">
          <div className="header-main-info" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <button className="btn-back-global" onClick={() => navigate('/dashboard/bao-cao')}>
              <IconChevronLeft size={18} />
              <span>Quay lại danh sách</span>
            </button>
            <div style={{ marginTop: '10px' }}>
              <h1 className="ky-so-title">Lãnh đạo xem và ký số văn bản</h1>
              <p className="ky-so-subtitle">Vui lòng kiểm tra kỹ nội dung báo cáo trước khi thực hiện ký số phê duyệt.</p>
            </div>
          </div>
          <div className="report-status-tag" style={{ alignSelf: 'flex-start', marginTop: '54px' }}>
            <div className="status-dot-pulse"></div>
            <span>Chờ lãnh đạo phê duyệt</span>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="ky-so-bento-grid">
          
          {/* Left: Document Viewer & Info (8 columns) */}
          <div className="doc-viewer-section">
            
            {/* Facility Information Card */}
            <div className="sidebar-card info-card-compact">
              <h3 className="sidebar-card-title">
                <IconDeviceAnalytics size={20} />
                Thông tin chung cơ sở
              </h3>
              <div className="info-grid-compact">
                <div className="info-item-mini">
                  <span className="info-label-mini"><IconMapPin size={14} /> Địa điểm:</span>
                  <span className="info-value-mini">108 Hoàng Như Tiếp, Bồ Đề, Long Biên, Hà Nội</span>
                </div>
                <div className="info-item-mini">
                  <span className="info-label-mini"><IconHash size={14} /> Mã số thuế:</span>
                  <span className="info-value-mini">0104711316</span>
                </div>
                <div className="info-item-mini">
                  <span className="info-label-mini"><IconUser size={14} /> Người đại diện:</span>
                  <span className="info-value-mini">GS.TS.BS Trần Huy Thịnh</span>
                </div>
                <div className="info-item-mini">
                  <span className="info-label-mini"><IconPhone size={14} /> Điện thoại:</span>
                  <span className="info-value-mini">024 3872 3872</span>
                </div>
              </div>
            </div>

            {/* Document Viewer Card */}
            <div className="doc-card" style={{ marginTop: '32px' }}>
              <div className="doc-card-header">
                <div className="doc-type">
                  <IconShieldCheck size={20} color="#ea1e22" />
                  <span>Dữ liệu báo cáo kỹ thuật Quý 4/2023</span>
                </div>
                <button className="btn-download-all">
                  <IconDownload size={18} />
                  <span>Toàn bộ hồ sơ</span>
                </button>
              </div>

              <div className="doc-preview-placeholder">
                <div className="preview-overlay">
                  <IconLock size={48} />
                  <h3>Chi tiết nội dung báo cáo</h3>
                  <p>Bản nội dung đầy đủ đã được mã hóa an toàn.</p>
                  <button className="btn-view-fullscreen">Xem toàn màn hình</button>
                </div>
                <div className="preview-content-mock">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="mock-line" style={{ width: `${Math.random() * 50 + 50}%` }}></div>
                  ))}
                  <div className="mock-table-rect" style={{ height: '100px' }}></div>
                  {[...Array(4)].map((_, i) => (
                    <div key={i+10} className="mock-line" style={{ width: `${Math.random() * 30 + 70}%` }}></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Equipment List Module */}
            <div className="sidebar-card info-card-compact" style={{ marginTop: '32px' }}>
              <h3 className="sidebar-card-title">Danh mục thiết bị kỹ thuật</h3>
              <div className="equipment-table-compact-wrapper">
                <table className="equipment-table-compact">
                  <thead>
                    <tr>
                      <th>Tên thiết bị</th>
                      <th>Số lượng</th>
                      <th>Tình trạng</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Máy chụp X-quang kỹ thuật số</td>
                      <td>02</td>
                      <td><span className="badge-success-mini">Tốt</span></td>
                    </tr>
                    <tr>
                      <td>Máy CT Scanner 128 lát cắt</td>
                      <td>01</td>
                      <td><span className="badge-success-mini">Tốt</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>

          {/* Right: Approval Sidebar (40%) */}
          <div className="approval-sidebar-section">
            
            {/* Workflow Stepper Module */}
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">
                <IconShieldCheck size={20} />
                Tiến trình xử lý
              </h3>
              <div className="workflow-steps">
                <div className="step-item done">
                  <div className="step-marker"><IconCheck size={14} /></div>
                  <div className="step-content">
                    <span className="step-label">Chuyên viên tiếp nhận</span>
                    <span className="step-time">15/01/2024 - 15:20</span>
                  </div>
                </div>
                <div className="step-item done">
                  <div className="step-marker"><IconCheck size={14} /></div>
                  <div className="step-content">
                    <span className="step-label">Trưởng phòng thẩm định</span>
                    <span className="step-time">16/01/2024 - 09:30</span>
                  </div>
                </div>
                <div className="step-item active">
                  <div className="step-marker">3</div>
                  <div className="step-content">
                    <span className="step-label">Lãnh đạo ký duyệt</span>
                    <span className="step-status">Đang chờ xử lý</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Digital Signature Module */}
            <div className="sidebar-card signature-module">
              <h3 className="sidebar-card-title">
                <IconFingerprint size={20} />
                Xác thực ký số (CA)
              </h3>
              
              {!isSigned ? (
                <>
                  <div className="ca-token-info">
                    <div className="token-icon">
                      <IconCertificate size={24} />
                    </div>
                    <div className="token-details">
                      <span className="token-name">Token: Viettel-CA v2.0</span>
                      <span className="token-status">Sẵn sàng kết nối</span>
                    </div>
                  </div>

                  <div className="pin-input-group">
                    <label>Nhập mã PIN Token</label>
                    <div className="pin-boxes">
                      {pin.map((digit, i) => (
                        <input
                          key={i}
                          id={`pin-${i}`}
                          type="password"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handlePinChange(i, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(i, e)}
                          className="pin-box"
                        />
                      ))}
                    </div>
                    <p className="pin-help">Mã PIN bao gồm 6 chữ số được cấp bởi nhà cung cấp CA</p>
                  </div>

                  <button 
                    className={`btn-sign-primary ${isSigning ? 'loading' : ''}`}
                    onClick={handleSign}
                    disabled={pin.some(d => !d) || isSigning}
                  >
                    {isSigning ? 'Đang thực hiện ký...' : 'Xác nhận ký số'}
                  </button>
                </>
              ) : (
                <div className="signature-success">
                  <div className="success-icon-wrapper">
                    <div className="success-lottie-mock">
                      <IconCheck size={40} />
                    </div>
                  </div>
                  <h4>Ký số thành công!</h4>
                  <p>Văn bản đã được gắn chữ ký số hợp lệ và chuyển tiếp nộp lưu trữ.</p>
                  <button className="btn-secondary-full" onClick={() => navigate('/dashboard/bao-cao')}>
                    Quay về danh sách
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      {!isSigned && (
        <div className="bottom-action-bar">
          <div className="bar-container">
            <div className="bar-left">
              <span className="bar-selection-info">Đang xem báo cáo: <strong>Bệnh viện Đa khoa Tâm Anh</strong></span>
            </div>
            <div className="bar-right">
              <button className="btn-bar-action secondary" onClick={() => handleAction('Từ chối')}>
                <IconX size={18} />
                <span>Từ chối</span>
              </button>
              <button className="btn-bar-action secondary" onClick={() => handleAction('Yêu cầu sửa')}>
                <IconEdit size={18} />
                <span>Yêu cầu sửa</span>
              </button>
              <button className="btn-bar-action primary" onClick={() => {
                const firstInput = document.getElementById('pin-0');
                firstInput?.focus();
              }}>
                <IconCheck size={18} />
                <span>Phê duyệt & Ký số</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastNotification onRef={(ref) => (toastRef.current = ref)} />
    </div>
  );
};

export default TrangKySoBaoCao;
