import React, { useState, useEffect, useRef } from 'react';
import {
  IconPlus,
  IconSearch,
  IconFilter,
  IconCalendar,
  IconBuildingSkyscraper,
  IconEye,
  IconEdit,
  IconChevronRight,
  IconX,
  IconCheck
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import './TrangQuanLyBaoCao.css';
import ToastNotification from '../components/Common/ToastNotification';
interface ReportCycle {
  id: string;
  facilityName: string;
  period: string;
  submissionDate: string;
  flowStatus: 'Hoàn thành' | 'Đang xử lý' | 'Từ chối' | 'Mới tạo';
  signatureStatus: 'Đã ký' | 'Chưa ký';
}

const mockReports: ReportCycle[] = [
  { id: '1', facilityName: 'Bệnh viện Đa khoa Tâm Anh', period: 'Quý 4/2023', submissionDate: '15/01/2024', flowStatus: 'Hoàn thành', signatureStatus: 'Đã ký' },
  { id: '2', facilityName: 'Viện Năng lượng Nguyên tử Việt Nam', period: 'Quý 4/2023', submissionDate: '12/01/2024', flowStatus: 'Đang xử lý', signatureStatus: 'Đã ký' },
  { id: '3', facilityName: 'Công ty Cổ phần Sữa Việt Nam (Vinamilk)', period: 'Quý 4/2023', submissionDate: '10/01/2024', flowStatus: 'Hoàn thành', signatureStatus: 'Đã ký' },
  { id: '4', facilityName: 'Trung tâm Chiếu xạ Hà Nội', period: 'Quý 4/2023', submissionDate: '08/01/2024', flowStatus: 'Từ chối', signatureStatus: 'Chưa ký' },
  { id: '5', facilityName: 'Bệnh viện K (Cơ sở Tân Triều)', period: 'Quý 3/2023', submissionDate: '15/10/2023', flowStatus: 'Hoàn thành', signatureStatus: 'Đã ký' },
];

const TrangQuanLyBaoCao: React.FC = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState<ReportCycle[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const toastRef = useRef<{ show: (msg: string, type: 'success' | 'error' | 'info' | 'warning') => void } | null>(null);

  const [newReport, setNewReport] = useState({
    facilityName: '',
    period: 'Quý 1/2024',
    type: 'Định kỳ',
    description: ''
  });
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  // Initialize data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('reports_demo_data');
    if (saved) {
      setReports(JSON.parse(saved));
    } else {
      setReports(mockReports);
      localStorage.setItem('reports_demo_data', JSON.stringify(mockReports));
    }
  }, []);

  const handleCreateReport = () => {
    const report: ReportCycle = {
      id: Date.now().toString(),
      facilityName: newReport.facilityName,
      period: newReport.period,
      submissionDate: new Date().toLocaleDateString('vi-VN'),
      flowStatus: 'Mới tạo',
      signatureStatus: 'Chưa ký'
    };

    const updatedReports = [report, ...reports];
    setReports(updatedReports);
    localStorage.setItem('reports_demo_data', JSON.stringify(updatedReports));

    setShowModal(false);
    setNewReport({ facilityName: '', period: 'Quý 1/2024', type: 'Định kỳ', description: '' });
    setUploadedFile(null);

    toastRef.current?.show('Tạo kỳ báo cáo mới thành công!', 'success');
  };

  const handleFileUpload = () => {
    setUploadedFile('huong_dan_bao_cao_v1.pdf');
    toastRef.current?.show('Đã tải lên tài liệu hướng dẫn', 'info');
  };

  const filteredReports = reports.filter(r =>
    r.facilityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.period.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bao-cao-container">
      {/* Header */}
      <header className="bao-cao-header">
        <div className="header-left">
          <div className="breadcrumbs">
            <span>Quản lý báo cáo</span>
            <IconChevronRight size={14} />
            <span className="breadcrumb-item active">Danh sách kỳ báo cáo</span>
          </div>
          <h1 className="bao-cao-title">Quản lý kỳ báo cáo</h1>
        </div>
        <button className="btn-create-report" onClick={() => setShowModal(true)}>
          <IconPlus size={20} />
          <span>Tạo kỳ báo cáo mới</span>
        </button>
      </header>

      {/* Bento Grid Content */}
      <div className="bento-grid-reports">

        {/* Progress Card */}
        <div className="report-stats-card">
          <div className="stats-header">
            <span className="stats-title">Tiến độ nộp báo cáo toàn hệ thống</span>
            <span className="status-badge completed">Đang diễn ra</span>
          </div>

          <div className="stats-main">
            <div className="progress-percentage">94%</div>
            <div className="progress-info">
              <strong>133 / 142</strong> cơ sở đã nộp báo cáo
            </div>
          </div>

          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: '94%' }}></div>
          </div>
        </div>

        {/* Filters Area */}
        <div className="filters-area">
          <div className="filter-item">
            <IconBuildingSkyscraper size={18} className="filter-icon" />
            <select className="filter-select">
              <option>Tất cả Đơn vị hành chính</option>
              <option>TP. Hà Nội</option>
              <option>TP. Hồ Chí Minh</option>
              <option>Đà Nẵng</option>
            </select>
          </div>

          <div className="filter-item">
            <IconFilter size={18} className="filter-icon" />
            <select className="filter-select">
              <option>Trạng thái: Tất cả</option>
              <option>Hoàn thành</option>
              <option>Đang xử lý</option>
              <option>Từ chối</option>
            </select>
          </div>

          <div className="filter-item">
            <IconCalendar size={18} className="filter-icon" />
            <select className="filter-select">
              <option>Kỳ báo cáo: Quý 4/2023</option>
              <option>Quý 3/2023</option>
              <option>Quý 2/2023</option>
              <option>Quý 1/2023</option>
            </select>
          </div>

          <div className="filter-item">
            <IconSearch size={18} className="filter-icon" />
            <input
              type="text"
              className="filter-input"
              placeholder="Tìm kiếm cơ sở..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Main Table Board */}
        <div className="report-table-card">
          <div className="table-wrapper">
            <table className="report-table">
              <thead>
                <tr>
                  <th>TÊN CƠ SỞ</th>
                  <th>KỲ BÁO CÁO</th>
                  <th>NGÀY GỬI</th>
                  <th>TRẠNG THÁI LUỒNG</th>
                  <th>TRẠNG THÁI KÝ SỐ</th>
                  <th style={{ textAlign: 'center' }}>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {filteredReports.map((report) => (
                  <tr key={report.id}>
                    <td style={{ fontWeight: 600, color: '#111827' }}>{report.facilityName}</td>
                    <td>{report.period}</td>
                    <td>{report.submissionDate}</td>
                    <td>
                      <span className={`status-badge ${report.flowStatus === 'Hoàn thành' ? 'completed' :
                        report.flowStatus === 'Đang xử lý' ? 'pending' :
                          report.flowStatus === 'Từ chối' ? 'not-signed' : 'pending'
                        }`}>
                        {report.flowStatus}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${report.signatureStatus === 'Đã ký' ? 'signed' : 'not-signed'}`}>
                        {report.signatureStatus === 'Đã ký' ? <IconCheck size={14} /> : <IconX size={14} />}
                        {report.signatureStatus}
                      </span>
                    </td>
                    <td>
                      <div className="qlbc-table-actions" style={{ justifyContent: 'center' }}>
                        <button
                          className="qlbc-btn-action"
                          title="Xem chi tiết"
                          onClick={() => navigate(`/dashboard/bao-cao/${report.id}`)}
                        >
                          <IconEye size={18} />
                        </button>
                        <button
                          className="qlbc-btn-action"
                          title="Chỉnh sửa / Ký số"
                          onClick={() => navigate(`/dashboard/bao-cao/${report.id}/review`)}
                        >
                          <IconEdit size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="pagination-container">
            <div className="pagination-info">
              Hiển thị 1 - {filteredReports.length} trên tổng số {reports.length}
            </div>
            <div className="pagination-controls">
              <button className="btn-page">1</button>
              <button className="btn-page active">2</button>
              <button className="btn-page">3</button>
              <button className="btn-page">...</button>
              <button className="btn-page">10</button>
            </div>
          </div>
        </div>

      </div>

      {/* Create New Report Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Tạo kỳ báo cáo mới</h2>
              <button className="btn-close" onClick={() => setShowModal(false)}>
                <IconX size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">Tên kỳ báo cáo</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Nhập tên kỳ báo cáo..."
                  value={newReport.facilityName}
                  onChange={(e) => setNewReport({ ...newReport, facilityName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Loại kỳ báo cáo</label>
                <div className="segmented-control">
                  <div
                    className={`segment-item ${newReport.type === 'Định kỳ' ? 'active' : ''}`}
                    onClick={() => setNewReport({ ...newReport, type: 'Định kỳ' })}
                  >
                    Định kỳ
                  </div>
                  <div
                    className={`segment-item ${newReport.type === 'Đột xuất' ? 'active' : ''}`}
                    onClick={() => setNewReport({ ...newReport, type: 'Đột xuất' })}
                  >
                    Đột xuất
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mô tả kỳ báo cáo</label>
                <textarea
                  className="form-input"
                  style={{ height: '80px', paddingTop: '12px', resize: 'none' }}
                  placeholder="Nhập mô tả chi tiết..."
                  value={newReport.description}
                  onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Tài liệu hướng dẫn</label>
                <div className="upload-area" onClick={handleFileUpload}>
                  <div className="upload-icon">
                    <IconPlus size={24} />
                  </div>
                  <div className="upload-text">
                    <span className="upload-title">
                      {uploadedFile ? uploadedFile : 'Kéo thả file vào đây hoặc click để chọn'}
                    </span>
                    <span className="upload-subtitle">Hỗ trợ định dạng: PDF, DOCX, ZIP (Tối đa 10MB)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Hủy</button>
              <button
                className="btn-submit"
                onClick={handleCreateReport}
                disabled={!newReport.facilityName}
              >
                Tạo kỳ báo cáo mới
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Success Notifications */}
      <ToastNotification onRef={(ref) => (toastRef.current = ref)} />
    </div>
  );
};

export default TrangQuanLyBaoCao;
