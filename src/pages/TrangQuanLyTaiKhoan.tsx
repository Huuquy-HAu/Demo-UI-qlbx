import React, { useState, useMemo } from 'react';
import './TrangQuanLyTaiKhoan.css';
import {
  IconPlus,
  IconSearch,
  IconUser,
  IconUsers,
  IconEdit,
  IconTrash,
  IconFilter,
  IconX,
  IconPhone,
  IconMail,
  IconBuilding,
  IconUserCheck,
  IconLock,
  IconLockOpen,
  IconKey,
  IconCheck,
  IconAlertCircle
} from '@tabler/icons-react';

interface Account {
  id: string;
  fullName: string;
  username: string;
  department: string;
  position: string;
  phone: string;
  email: string;
  status: 'Đang hoạt động' | 'Bị khóa' | 'Chờ kích hoạt';
  lastActive: string;
}

const accountsData: Account[] = [
  {
    id: 'CB-001',
    fullName: 'Nguyễn Văn An',
    username: 'annv.bkhcn',
    department: 'Cục An toàn bức xạ và hạt nhân',
    position: 'Phó Cục trưởng',
    phone: '0912.345.678',
    email: 'annv@most.gov.vn',
    status: 'Đang hoạt động',
    lastActive: '10 phút trước'
  },
  {
    id: 'CB-002',
    fullName: 'Lê Thị Bình',
    username: 'binhlt.atbx',
    department: 'Trung tâm Hỗ trợ kỹ thuật',
    position: 'Trưởng phòng Kỹ thuật',
    phone: '0988.777.666',
    email: 'binhlt@varans.vn',
    status: 'Đang hoạt động',
    lastActive: '2 giờ trước'
  },
  {
    id: 'CB-003',
    fullName: 'Trần Văn Cường',
    username: 'cuongtv.it',
    department: 'Văn phòng Cục',
    position: 'Chuyên viên CNTT',
    phone: '0904.111.222',
    email: 'cuongtv@most.gov.vn',
    status: 'Bị khóa',
    lastActive: '3 ngày trước'
  },
  {
    id: 'CB-004',
    fullName: 'Phạm Minh Đức',
    username: 'ducm.atbx',
    department: 'Phòng Cấp phép',
    position: 'Chuyên viên chính',
    phone: '0977.333.444',
    email: 'ducm@most.gov.vn',
    status: 'Đang hoạt động',
    lastActive: 'Vừa xong'
  },
  {
    id: 'CB-005',
    fullName: 'Hoàng Thu Hà',
    username: 'haht.most',
    department: 'Vụ Hợp tác quốc tế',
    position: 'Chuyên viên',
    phone: '0912.888.999',
    email: 'haht@most.gov.vn',
    status: 'Chờ kích hoạt',
    lastActive: 'Chưa đăng nhập'
  },
  {
    id: 'CB-006',
    fullName: 'Đặng Quốc Khánh',
    username: 'khanhdq.atbx',
    department: 'Phòng Thanh tra',
    position: 'Thanh tra viên',
    phone: '0906.555.444',
    email: 'khanhdq@most.gov.vn',
    status: 'Đang hoạt động',
    lastActive: '1 ngày trước'
  }
];

const TrangQuanLyTaiKhoan: React.FC = () => {
  const [accounts, setAccounts] = useState(accountsData);
  const [selectedAccId, setSelectedAccId] = useState<string | null>(accountsData[0].id);
  const [filterCode, setFilterCode] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterDept, setFilterDept] = useState('Tất cả');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLockModalOpen, setIsLockModalOpen] = useState(false);

  // Toast State
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const [formPersonnel, setFormPersonnel] = useState({
    id: '',
    fullName: '',
    organization: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    roles: [] as string[]
  });


  const selectedAccount = useMemo(() =>
    accounts.find(acc => acc.id === selectedAccId) || null
    , [selectedAccId, accounts]);

  const filteredAccounts = useMemo(() => {
    return accounts.filter(acc => {
      const matchesCode = acc.id.toLowerCase().includes(filterCode.toLowerCase()) || acc.username.toLowerCase().includes(filterCode.toLowerCase());
      const matchesName = acc.fullName.toLowerCase().includes(filterName.toLowerCase());
      const matchesDept = filterDept === 'Tất cả' || acc.department === filterDept;
      const matchesStatus = filterStatus === 'Tất cả' || acc.status === filterStatus;
      return matchesCode && matchesName && matchesDept && matchesStatus;
    });
  }, [filterCode, filterName, filterDept, filterStatus, accounts]);

  const departments = Array.from(new Set(accounts.map(acc => acc.department)));

  const openAddModal = () => {
    setFormPersonnel({ id: '', fullName: '', organization: '', username: '', password: '', email: '', phone: '', roles: [] });
    setIsAddModalOpen(true);
  };

  const openEditModal = (acc: any) => {
    setFormPersonnel({
      id: acc.id,
      fullName: acc.fullName,
      organization: acc.department,
      username: acc.username,
      password: '••••••••',
      email: acc.email,
      phone: acc.phone,
      roles: ['Quản trị hệ thống'] // Mocked roles
    });
    setIsEditModalOpen(true);
  };

  const handleSavePersonnel = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditModalOpen) {
      setAccounts(prev => prev.map(acc => acc.id === formPersonnel.id ? {
        ...acc,
        fullName: formPersonnel.fullName,
        department: formPersonnel.organization,
        username: formPersonnel.username,
        email: formPersonnel.email,
        phone: formPersonnel.phone
      } : acc));
      showToast('Cập nhật thông tin cán bộ thành công!');
    } else {
      const newId = `CB${Math.floor(Math.random() * 9000) + 1000}`;
      const newAcc = {
        id: newId,
        fullName: formPersonnel.fullName,
        username: formPersonnel.username,
        department: formPersonnel.organization,
        position: 'Cán bộ mới',
        status: 'Đang hoạt động',
        email: formPersonnel.email,
        phone: formPersonnel.phone,
        lastActive: 'Vừa xong'
      };
      setAccounts([newAcc as any, ...accounts]);
      showToast('Thêm mới cán bộ thành công!');
    }
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
  };

  const handleDeletePersonnel = () => {
    if (selectedAccount) {
      setAccounts(prev => prev.filter(acc => acc.id !== selectedAccount.id));
      setSelectedAccId(null);
      setIsDeleteModalOpen(false);
      showToast('Đã xóa cán bộ khỏi hệ thống', 'info');
    }
  };

  const handleToggleLock = () => {
    if (selectedAccount) {
      const newStatus = selectedAccount.status === 'Đang hoạt động' ? 'Bị khóa' : 'Đang hoạt động';
      setAccounts(prev => prev.map(acc => acc.id === selectedAccount.id ? { ...acc, status: newStatus } : acc));
      setIsLockModalOpen(false);
      showToast(newStatus === 'Bị khóa' ? 'Đã khóa tài khoản cán bộ' : 'Đã mở khóa tài khoản', newStatus === 'Bị khóa' ? 'error' : 'success');
    }
  };

  return (
    <div className="acc-management-container">
      {toast && (
        <div className="toast-container">
          <div className={`toast-item ${toast.type}`}>
            <div className="toast-icon">
              {toast.type === 'success' ? <IconCheck size={16} /> : <IconAlertCircle size={16} />}
            </div>
            <div className="toast-content">{toast.message}</div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="acc-page-header">
        <div className="acc-header-left">

          <h1>Quản lý Tài khoản & Cán bộ</h1>
          <p style={{ fontSize: '14px', color: '#5D403B' }}>Quản lý danh sách người dùng, phân quyền và theo dõi hoạt động.</p>
        </div>
        <div className="acc-header-right">
          <button className="btn-add-acc" onClick={openAddModal}>
            <IconPlus size={20} />
            Thêm mới cán bộ
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="acc-bento-grid">
        {/* Left Column: Data Table */}
        <main className="acc-main-card">
          <div className="acc-filter-section">
            <div className="filter-item">
              <label>Mã cán bộ / Tài khoản</label>
              <div className="filter-input-wrapper">
                <IconSearch size={16} className="filter-icon" />
                <input type="text" placeholder="Nhập mã hoặc..." value={filterCode} onChange={(e) => setFilterCode(e.target.value)} />
              </div>
            </div>
            <div className="filter-item">
              <label>Họ và tên</label>
              <div className="filter-input-wrapper">
                <IconUser size={16} className="filter-icon" />
                <input type="text" placeholder="Tìm theo..." value={filterName} onChange={(e) => setFilterName(e.target.value)} />
              </div>
            </div>
            <div className="filter-item">
              <label>Đơn vị công tác</label>
              <div className="filter-input-wrapper">
                <IconBuilding size={16} className="filter-icon" />
                <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}>
                  <option value="Tất cả">Tất cả đơn vị</option>
                  {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                </select>
              </div>
            </div>
            <div className="filter-item">
              <label>Trạng thái</label>
              <div className="filter-input-wrapper">
                <IconFilter size={16} className="filter-icon" />
                <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="Tất cả">Tất cả trạng thái</option>
                  <option value="Đang hoạt động">Đang hoạt động</option>
                  <option value="Bị khóa">Bị khóa</option>
                  <option value="Chờ kích hoạt">Chờ kích hoạt</option>
                </select>
              </div>
            </div>
          </div>

          <div className="acc-table-wrapper">
            <table className="acc-modern-table">
              <thead>
                <tr>
                  <th>Mã CB</th>
                  <th>Cán bộ / Tài khoản</th>
                  <th>Đơn vị</th>
                  <th>Chức vụ</th>
                  <th>Trạng thái</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredAccounts.map((acc) => (
                  <tr key={acc.id} className={selectedAccId === acc.id ? 'selected' : ''} onClick={() => setSelectedAccId(acc.id)}>
                    <td style={{ fontWeight: '600', color: '#64748b' }}>{acc.id}</td>
                    <td>
                      <div className="user-info-cell">
                        <div className="user-avatar">{acc.fullName.charAt(0)}</div>
                        <div className="user-detail">
                          <span className="name">{acc.fullName}</span>
                          <span className="username">@{acc.username}</span>
                        </div>
                      </div>
                    </td>
                    <td style={{ maxWidth: '180px' }}>{acc.department}</td>
                    <td>{acc.position}</td>
                    <td>
                      <span className={`status-badge ${acc.status === 'Đang hoạt động' ? 'active' : acc.status === 'Bị khóa' ? 'locked' : 'pending'}`}>
                        {acc.status}
                      </span>
                    </td>
                    <td className="actions-cell" onClick={e => e.stopPropagation()}>
                      <button className="action-btn" title="Đổi mật khẩu" onClick={() => showToast('Đã gửi yêu cầu đổi mật khẩu vào email cán bộ')}>
                        <IconKey size={16} />
                      </button>
                      <button className="action-btn" title="Chỉnh sửa" onClick={() => openEditModal(acc)}>
                        <IconEdit size={16} />
                      </button>
                      <button className="action-btn" title="Xóa" onClick={() => { setSelectedAccId(acc.id); setIsDeleteModalOpen(true); }}>
                        <IconTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

        {/* Right Column: Profile Panel */}
        <aside className="acc-side-panel">
          <div className="profile-card">
            {selectedAccount ? (
              <>
                <div className="profile-card-header">
                  <div className="profile-avatar-large"><IconUser size={48} /></div>
                </div>
                <h3>{selectedAccount.fullName}</h3>
                <p className="role">{selectedAccount.position}</p>

                <div style={{ marginBottom: '24px' }}>
                  <span className={`status-badge ${selectedAccount.status === 'Đang hoạt động' ? 'active' : selectedAccount.status === 'Bị khóa' ? 'locked' : 'pending'}`}>
                    {selectedAccount.status}
                  </span>
                </div>

                <div className="acc-profile-info-list">
                  <div className="acc-profile-info-item">
                    <div className="info-label-group">
                      <IconUserCheck size={18} />
                      <label>Tài khoản</label>
                    </div>
                    <span>{selectedAccount.username}</span>
                  </div>
                  <div className="acc-profile-info-item">
                    <div className="info-label-group">
                      <IconBuilding size={18} />
                      <label>Đơn vị</label>
                    </div>
                    <span>{selectedAccount.department}</span>
                  </div>
                  <div className="acc-profile-info-item">
                    <div className="info-label-group">
                      <IconPhone size={18} />
                      <label>Điện thoại</label>
                    </div>
                    <span>{selectedAccount.phone}</span>
                  </div>
                  <div className="acc-profile-info-item">
                    <div className="info-label-group">
                      <IconMail size={18} />
                      <label>Email</label>
                    </div>
                    <span>{selectedAccount.email}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '12px', width: '100%', padding: '0 24px' }}>
                  <button className="btn-edit-profile" onClick={() => openEditModal(selectedAccount)}>
                    <IconEdit size={16} /> Chỉnh sửa
                  </button>
                  <button className="btn-edit-profile" style={{ width: '48px', flexShrink: 0 }} onClick={() => setIsLockModalOpen(true)}>
                    {selectedAccount.status === 'Đang hoạt động' ? <IconLock size={16} /> : <IconLockOpen size={16} />}
                  </button>
                </div>
              </>
            ) : (
              <div className="empty-profile-state">
                <IconUsers size={64} stroke={1} />
                <p>Chọn một cán bộ để xem chi tiết</p>
              </div>
            )}
          </div>

          <div className="side-widget">
            <div className="widget-header">
              <h4>PHÂN QUYỀN VAI TRÒ</h4>
              <span className="widget-action" onClick={() => showToast('Chức năng thiết lập vai trò đang được cập nhật', 'info')}>Thiết lập</span>
            </div>
            <div className="role-tags">
              <span className="role-tag admin">Quản trị hệ thống</span>
              <span className="role-tag">Cấp phép</span>
            </div>
          </div>

          <div className="side-widget">
            <div className="widget-header">
              <h4>LỊCH SỬ HOẠT ĐỘNG</h4>
              <span className="widget-action" onClick={() => showToast('Xem lịch sử hoạt động chi tiết', 'info')}>Xem tất cả</span>
            </div>
            <div className="activity-list">
              <div className="activity-item success">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <span className="activity-text">Đăng nhập thành công</span>
                  <span className="activity-time">Hôm nay, 08:30 AM</span>
                </div>
              </div>
              <div className="activity-item primary">
                <div className="activity-dot"></div>
                <div className="activity-content">
                  <span className="activity-text">Cập nhật hồ sơ Cơ sở Bức xạ</span>
                  <span className="activity-time">Hôm qua, 02:15 PM</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Add/Edit Modal */}
      {(isAddModalOpen || isEditModalOpen) && (
        <div className="acc-modal-overlay" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}>
          <div className="acc-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="acc-modal-header">
              <h2>{isEditModalOpen ? 'Chỉnh sửa Cán bộ' : 'Thêm mới Cán bộ'}</h2>
              <button className="btn-close-modal" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}><IconX size={20} /></button>
            </div>
            <form onSubmit={handleSavePersonnel}>
              <div className="acc-modal-body">
                <div className="add-form-grid">
                  <div className="form-group">
                    <label>Họ và tên <span>*</span></label>
                    <input type="text" required value={formPersonnel.fullName} onChange={e => setFormPersonnel({ ...formPersonnel, fullName: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Đơn vị <span>*</span></label>
                    <select required value={formPersonnel.organization} onChange={e => setFormPersonnel({ ...formPersonnel, organization: e.target.value })}>
                      <option value="">Chọn...</option>
                      {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
                      <option value="Phòng An toàn bức xạ">Phòng An toàn bức xạ</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tên đăng nhập <span>*</span></label>
                    <input type="text" required value={formPersonnel.username} onChange={e => setFormPersonnel({ ...formPersonnel, username: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Mật khẩu</label>
                    <input type="password" placeholder="Để trống nếu không đổi" value={formPersonnel.password} onChange={e => setFormPersonnel({ ...formPersonnel, password: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={formPersonnel.email} onChange={e => setFormPersonnel({ ...formPersonnel, email: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input type="text" value={formPersonnel.phone} onChange={e => setFormPersonnel({ ...formPersonnel, phone: e.target.value })} />
                  </div>
                </div>
              </div>
              <div className="acc-modal-footer">
                <button type="button" className="btn-modal-cancel" onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}>Hủy bỏ</button>
                <button type="submit" className="btn-modal-submit">Lưu thông tin</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="acc-modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="acc-modal-container" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-body">
              <div className="confirm-icon-wrapper danger"><IconTrash size={40} /></div>
              <h3>Xác nhận xóa cán bộ?</h3>
              <p>Bạn có chắc chắn muốn xóa cán bộ <strong>{selectedAccount?.fullName}</strong> khỏi hệ thống? Hành động này không thể hoàn tác.</p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button className="btn-confirm-cancel" onClick={() => setIsDeleteModalOpen(false)}>Hủy bỏ</button>
                <button className="btn-confirm-delete" onClick={handleDeletePersonnel}>Xác nhận xóa</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lock Confirmation Modal */}
      {isLockModalOpen && (
        <div className="acc-modal-overlay" onClick={() => setIsLockModalOpen(false)}>
          <div className="acc-modal-container" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <div className="confirm-modal-body">
              <div className="confirm-icon-wrapper warning">
                {selectedAccount?.status === 'Đang hoạt động' ? <IconLock size={40} /> : <IconLockOpen size={40} />}
              </div>
              <h3>{selectedAccount?.status === 'Đang hoạt động' ? 'Khóa tài khoản?' : 'Mở khóa tài khoản?'}</h3>
              <p>
                {selectedAccount?.status === 'Đang hoạt động'
                  ? 'Cán bộ sẽ không thể đăng nhập vào hệ thống cho đến khi được mở khóa lại.'
                  : 'Cho phép cán bộ tiếp tục sử dụng các chức năng của hệ thống.'}
              </p>
              <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                <button className="btn-confirm-cancel" onClick={() => setIsLockModalOpen(false)}>Hủy bỏ</button>
                <button className="btn-modal-submit" onClick={handleToggleLock} style={{ background: selectedAccount?.status === 'Đang hoạt động' ? '#f59e0b' : '#10b981' }}>
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrangQuanLyTaiKhoan;
