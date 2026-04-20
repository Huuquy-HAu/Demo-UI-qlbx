import React, { useState } from 'react';
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconMail,
  IconPlus,
  IconBellRinging,
  IconSettingsAutomation,
  IconX,
  IconUsersGroup,
  IconPaperclip,
  IconPhoto,
  IconMessageExclamation,
  IconArchive,
  IconListCheck
} from '@tabler/icons-react';
import './TrangCanhBaoNhacViec.css';

const TrangCanhBaoNhacViec: React.FC = () => {
  const [autoEnabled, setAutoEnabled] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [assignee, setAssignee] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  // Notification Modal State
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [notifSubject, setNotifSubject] = useState('');
  const [notifContent, setNotifContent] = useState('');
  const [notifAudience, setNotifAudience] = useState('');
  const [channels, setChannels] = useState({
    email: true,
    sms: false,
    system: true
  });

  const urgentRecords = [
    { id: '1', name: 'Công ty Cổ phần Sữa Việt Nam (Vinamilk)', code: 'GP-2023-8910', type: 'PCCC cơ sở', expireDate: '25/04/2026', daysLeft: 2 },
    { id: '2', name: 'Bệnh viện Đa khoa Tâm Anh', code: 'GP-2023-1122', type: 'An toàn Bức xạ', expireDate: '28/04/2026', daysLeft: 5 },
    { id: '3', name: 'Trung tâm Chiếu xạ Hà Nội', code: 'GP-2024-0012', type: 'Giấy phép Vận hành', expireDate: '24/04/2026', daysLeft: 1 },
    { id: '4', name: 'Nhà máy điện mặt trời BIM 2', code: 'GP-2023-5566', type: 'PCCC cơ sở', expireDate: '30/04/2026', daysLeft: 7 },
  ];

  const handleCreateTask = () => {
    // Logic to save the task
    console.log({ taskName, taskDesc, assignee, deadline, priority });
    setIsModalOpen(false);
    // Reset form
    setTaskName('');
    setTaskDesc('');
    setAssignee('');
    setDeadline('');
    setPriority('medium');
  };

  const handleSendNotification = () => {
    console.log({ notifSubject, notifContent, notifAudience, channels });
    setIsNotifModalOpen(false);
    // Reset form
    setNotifSubject('');
    setNotifContent('');
    setNotifAudience('');
  };

  return (
    <div className="canh-bao-container">
      {/* --- Page Header --- */}
      <div className="page-header-canh-bao">
        <div className="header-left">
          <h1 className="main-title" style={{ fontFamily: 'inter' }}>Trung tâm cảnh báo & nhắc việc</h1>
        </div>

        <div className="header-right">
          <div className="status-pill-system">
            <div className="status-dot pulse green"></div>
            <span className="status-text">Hệ thống ổn định</span>
          </div>
          <div className="header-actions">
            <button className="btn-action primary-gradient" onClick={() => setIsModalOpen(true)}>
              <IconPlus size={18} />
              <span>Tạo nhiệm vụ kiểm định</span>
            </button>
            <button className="btn-action secondary-outline" onClick={() => setIsNotifModalOpen(true)}>
              <IconBellRinging size={18} />
              <span>Gửi thông báo khẩn</span>
            </button>
          </div>
        </div>
      </div>

      {/* --- Bento Grid Layout --- */}
      <div className="bento-grid-canh-bao">

        {/* Card 1: Task Automation (Spans 8) */}
        <div className="bento-card-large span-8 cba-card">
          <div className="cba-row-1">
            <div className="cba-header-left">
              <div className="cba-icon-box">
                <IconSettingsAutomation size={20} />
              </div>
              <h3 className="cba-title">TỰ ĐỘNG TẠO TASK GIA HẠN</h3>
            </div>
            <div className={`cba-toggle ${autoEnabled ? 'active' : ''}`} onClick={() => setAutoEnabled(!autoEnabled)}>
              <div className="cba-toggle-thumb"></div>
            </div>
          </div>

          <div className="cba-row-2">
            <div className="cba-number">24</div>
          </div>

          <div className="cba-row-3">
            <div className="cba-desc">
              Hồ sơ đã được phân bổ tự động hôm nay
            </div>
            <div className="cba-tags">
              <span className="cba-tag">PCCC</span>
              <span className="cba-tag">An toàn TP</span>
            </div>
          </div>
        </div>

        {/* Card 2: Email Status (Spans 4) */}
        <div className="bento-card-small span-4 cbe-card">
          <div className="cbe-row-1">
            <div className="cbe-icon-box">
              <IconMail size={24} />
            </div>
            <h3 className="cbe-title">TIẾN ĐỘ GỬI EMAIL NHẮC NHỞ</h3>
          </div>

          <div className="cbe-row-2">
            <span className="cbe-number">480/500</span>
          </div>

          <div className="cbe-row-3">
            <div className="cbe-progress-bar-bg">
              <div className="cbe-progress-bar-fill" style={{ width: '96%' }}></div>
            </div>
          </div>

          <div className="cbe-row-4">
            <span className="cbe-desc">Đã hoàn thành 96% tiến độ trong ngày</span>
          </div>
        </div>

        {/* Card 3: Urgent Alerts (Spans 12) */}
        <div className="bento-card-full span-12 cbt-card">
          <div className="cbt-header">
            <div className="cbt-header-left">
              <div className="cbt-subtitle-group">
                <div className="cbt-red-dot"></div>
                <span className="cbt-subtitle">KHẨN CẤP (7 NGÀY TỚI)</span>
              </div>
              <h2 className="cbt-title">Hồ sơ sắp hết hạn</h2>
            </div>
            <div className="cbt-header-right">
              <button className="cbt-btn-batch">
                <IconMail size={18} />
                <span>Gửi thông báo hàng loạt (12)</span>
              </button>
            </div>
          </div>

          <div className="cbt-table-wrapper">
            <table className="cbt-table">
              <thead>
                <tr>
                  <th>Tên cơ sở / cá nhân</th>
                  <th>Loại hồ sơ</th>
                  <th>Ngày hết hạn</th>
                  <th style={{ textAlign: 'right' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {urgentRecords.map((record) => (
                  <tr key={record.id}>
                    <td>
                      <div className="cbt-col-name">
                        <span className="cbt-name">{record.name}</span>
                        <span className="cbt-code">Mã số: {record.code}</span>
                      </div>
                    </td>
                    <td>
                      <span className="cbt-tag">{record.type}</span>
                    </td>
                    <td>
                      <div className="cbt-col-date">
                        <span className="cbt-date">{record.expireDate}</span>
                        <span className={`cbt-days-left ${record.daysLeft <= 2 ? 'critical' : ''}`}>
                          Còn {record.daysLeft} ngày
                        </span>
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button className="cbt-btn-notify" onClick={() => setIsNotifModalOpen(true)}>
                        Gửi thông báo
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* --- Create Task Modal --- */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h2>Tạo nhiệm vụ kiểm định</h2>
              <button className="btn-close-modal" onClick={() => setIsModalOpen(false)}>
                <IconX size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div className="form-section-top">
                <input
                  type="text"
                  className="input-task-name"
                  placeholder="Tên nhiệm vụ..."
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <textarea
                  className="textarea-task-desc"
                  placeholder="Thêm mô tả chi tiết cho nhiệm vụ này..."
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Cán bộ thực hiện</label>
                  <select
                    className="modal-input-refined"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                  >
                    <option value="">Chọn cán bộ</option>
                    <option value="1">Nguyễn Văn A</option>
                    <option value="2">Trần Thị B</option>
                    <option value="3">Lê Văn C</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Hạn hoàn thành</label>
                  <input
                    type="date"
                    className="modal-input-refined"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mức độ ưu tiên</label>
                <div className="priority-control">
                  <button
                    className={`priority-btn ${priority === 'low' ? 'active low' : ''}`}
                    onClick={() => setPriority('low')}
                  >
                    Thấp
                  </button>
                  <button
                    className={`priority-btn ${priority === 'medium' ? 'active medium' : ''}`}
                    onClick={() => setPriority('medium')}
                  >
                    Trung bình
                  </button>
                  <button
                    className={`priority-btn ${priority === 'high' ? 'active high' : ''}`}
                    onClick={() => setPriority('high')}
                  >
                    Cao
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal secondary" onClick={() => setIsModalOpen(false)}>
                Hủy
              </button>
              <button className="btn-modal primary" onClick={handleCreateTask}>
                Tạo nhiệm vụ
              </button>
            </div>
          </div>
        </div>
      )}
      {/* --- Emergency Notification Modal --- */}
      {isNotifModalOpen && (
        <div className="modal-overlay">
          <div className="modal-card nk-notif-modal">
            <div className="modal-header">
              <div className="nk-header-with-icon">
                <div className="nk-icon-circle red-pulse">
                  <IconMessageExclamation size={24} />
                </div>
                <h2>Gửi thông báo khẩn</h2>
              </div>
              <button className="btn-close-modal" onClick={() => setIsNotifModalOpen(false)}>
                <IconX size={20} />
              </button>
            </div>

            <div className="modal-body nk-body-split">
              {/* Left Side: Content */}
              <div className="nk-modal-left">
                <div className="nk-form-group">
                  <label className="nk-label">Đối tượng nhận thông báo</label>
                  <div className="nk-input-search-wrapper">
                    <IconUsersGroup size={18} className="nk-input-icon" />
                    <select 
                      className="nk-input-refined"
                      value={notifAudience}
                      onChange={(e) => setNotifAudience(e.target.value)}
                    >
                      <option value="">Tất cả cán bộ & doanh nghiệp</option>
                      <option value="1">Toàn bộ doanh nghiệp PCCC</option>
                      <option value="2">Cán bộ quản lý khu vực 1</option>
                      <option value="3">Danh sách tùy chỉnh...</option>
                    </select>
                  </div>
                </div>

                <div className="nk-form-group">
                  <label className="nk-label">Tiêu đề thông báo</label>
                  <input 
                    type="text" 
                    className="nk-input-refined" 
                    placeholder="Nhập tiêu đề thông báo..." 
                    value={notifSubject}
                    onChange={(e) => setNotifSubject(e.target.value)}
                  />
                </div>

                <div className="nk-form-group">
                  <label className="nk-label">Nội dung chi tiết</label>
                  <div className="nk-rich-textarea-wrapper">
                    <div className="nk-textarea-toolbar">
                      <button className="nk-tool-btn"><IconPaperclip size={16} /></button>
                      <button className="nk-tool-btn"><IconPhoto size={16} /></button>
                      <button className="nk-tool-btn"><IconArchive size={16} /></button>
                      <button className="nk-tool-btn"><IconListCheck size={16} /></button>
                      <div className="nk-tool-divider"></div>
                      <button className="nk-tool-btn active">B</button>
                      <button className="nk-tool-btn italic">I</button>
                    </div>
                    <textarea 
                      className="nk-textarea-refined" 
                      placeholder="Viết nội dung thông báo tại đây..."
                      value={notifContent}
                      onChange={(e) => setNotifContent(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Right Side: Channels */}
              <div className="nk-modal-right">
                <h3 className="nk-side-title">Kênh gửi thông báo</h3>
                <div className="nk-channel-list">
                  <div 
                    className={`nk-channel-card ${channels.system ? 'active' : ''}`}
                    onClick={() => setChannels({...channels, system: !channels.system})}
                  >
                    <div className="nk-channel-info">
                      <div className="nk-channel-icon sys">
                        <IconBellRinging size={20} />
                      </div>
                      <div className="nk-channel-text">
                        <span className="nk-chan-name">Hệ thống</span>
                        <span className="nk-chan-desc">Push notification</span>
                      </div>
                    </div>
                    <div className="nk-chan-checkbox">
                      {channels.system && <IconCircleCheck size={20} />}
                    </div>
                  </div>

                  <div 
                    className={`nk-channel-card ${channels.email ? 'active' : ''}`}
                    onClick={() => setChannels({...channels, email: !channels.email})}
                  >
                    <div className="nk-channel-info">
                      <div className="nk-channel-icon email">
                        <IconMail size={20} />
                      </div>
                      <div className="nk-channel-text">
                        <span className="nk-chan-name">Email</span>
                        <span className="nk-chan-desc">Gửi tới hòm thư</span>
                      </div>
                    </div>
                    <div className="nk-chan-checkbox">
                      {channels.email && <IconCircleCheck size={20} />}
                    </div>
                  </div>

                  <div 
                    className={`nk-channel-card ${channels.sms ? 'active' : ''}`}
                    onClick={() => setChannels({...channels, sms: !channels.sms})}
                  >
                    <div className="nk-channel-info">
                      <div className="nk-channel-icon sms">
                        <IconBellRinging size={20} />
                      </div>
                      <div className="nk-channel-text">
                        <span className="nk-chan-name">SMS</span>
                        <span className="nk-chan-desc">Tin nhắn điện thoại</span>
                      </div>
                    </div>
                    <div className="nk-chan-checkbox">
                      {channels.sms && <IconCircleCheck size={20} />}
                    </div>
                  </div>
                </div>

                <div className="nk-side-notice">
                  <IconAlertTriangle size={16} />
                  <span>Cảnh báo: Thông báo khẩn sẽ được ưu tiên gửi ngay lập tức.</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal secondary" onClick={() => setIsNotifModalOpen(false)}>
                Hủy bỏ
              </button>
              <button className="btn-modal primary danger-gradient" onClick={handleSendNotification}>
                Gửi thông báo ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrangCanhBaoNhacViec;
