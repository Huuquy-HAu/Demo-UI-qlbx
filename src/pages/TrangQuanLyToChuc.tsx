import React, { useState, useMemo } from 'react';
import './TrangQuanLyToChuc.css'; // Management Page Styling
import {
  IconPlus,
  IconSearch,
  IconChevronRight,
  IconBuilding,
  IconBuildingSkyscraper,
  IconEye,
  IconEdit,
  IconTrash,
  IconFilter,
  IconX,
  IconCheck,
  IconAlertCircle
} from '@tabler/icons-react';

interface Organization {
  id: string;
  mst: string;
  name: string;
  shortName: string;
  type: string;
  representative: string;
  position: string;
  phone: string;
  email: string;
  address: string;
  status: 'Hoạt động' | 'Ngừng hoạt động';
  parentId: string | null;
}

interface Toast {
  id: number;
  title: string;
  message: string;
  type: 'success' | 'error';
}

const initialOrganizations: Organization[] = [
  {
    id: 'ORG-001',
    mst: '0101234567',
    name: 'Bộ Khoa học và Công nghệ',
    shortName: 'BKHCN',
    type: 'Cơ quan nhà nước',
    representative: 'Nguyễn Văn A',
    position: 'Phố Cục trưởng',
    phone: '024.1234567',
    email: 'vanphong@most.gov.vn',
    address: '113 Trần Duy Hưng, Hà Nội',
    status: 'Hoạt động',
    parentId: null
  },
  {
    id: 'ORG-002',
    mst: '0107654321',
    name: 'Cục An toàn bức xạ và hạt nhân',
    shortName: 'ATBXHN',
    type: 'Cơ quan nhà nước',
    representative: 'Trần Văn B',
    position: 'Cục trưởng',
    phone: '024.3942103',
    email: 'atbxhn@most.gov.vn',
    address: '113 Trần Duy Hưng, Cầu Giấy, Hà Nội',
    status: 'Hoạt động',
    parentId: 'ORG-001'
  },
  {
    id: 'ORG-003',
    mst: '0309876543',
    name: 'Trung tâm Hỗ trợ kỹ thuật an toàn bức xạ',
    shortName: 'TTHTKT',
    type: 'Đơn vị sự nghiệp',
    representative: 'Lê Văn C',
    position: 'Giám đốc',
    phone: '024.3822161',
    email: 'tt.hotro@varans.vn',
    address: '70 Nguyễn Du, Hai Bà Trưng, Hà Nội',
    status: 'Hoạt động',
    parentId: 'ORG-002'
  },
  {
    id: 'ORG-004',
    mst: '0405678901',
    name: 'Sở Khoa học và Công nghệ TP. Hồ Chí Minh',
    shortName: 'SKHCN HCM',
    type: 'Cơ quan nhà nước',
    representative: 'Phạm Thị D',
    position: 'Sở trưởng',
    phone: '028.39327826',
    email: 'skhcn.hcm@tphcm.gov.vn',
    address: '244 Điện Biên Phủ, Quận 3, TP.HCM',
    status: 'Hoạt động',
    parentId: 'ORG-001'
  },
  {
    id: 'ORG-005',
    mst: '0501122334',
    name: 'Công ty Cổ phần Năng lượng Atom',
    shortName: 'ATOM ENERGY',
    type: 'Doanh nghiệp',
    representative: 'Hoàng Văn E',
    position: 'Giám đốc',
    phone: '024.3211556',
    email: 'info@atomenergy.vn',
    address: 'Tầng 12, Tòa nhà Lotte, Liễu Giai, Hà Nội',
    status: 'Ngừng hoạt động',
    parentId: null
  }
];

const TrangQuanLyToChuc: React.FC = () => {
  // Main Data State
  const [organizations, setOrganizations] = useState<Organization[]>(initialOrganizations);

  // Filter & UI States
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);
  const [searchTree, setSearchTree] = useState('');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['ORG-001', 'ORG-002']));
  const [filterMST, setFilterMST] = useState('');
  const [filterName, setFilterName] = useState('');
  const [filterStatus, setFilterStatus] = useState('Tất cả');

  // Modal States
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [currentOrg, setCurrentOrg] = useState<Partial<Organization>>({});

  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orgToDelete, setOrgToDelete] = useState<Organization | null>(null);

  // Notification State
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (title: string, message: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  };

  // Tree functions
  const toggleNode = (id: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedNodes(newExpanded);
  };

  const buildsTree = (data: Organization[], parentId: string | null = null): any[] => {
    return data
      .filter(item => item.parentId === parentId)
      .map(item => ({
        ...item,
        children: buildsTree(data, item.id)
      }));
  };

  const organizationTree = useMemo(() => buildsTree(organizations, null), [organizations]);

  const filteredTableData = useMemo(() => {
    return organizations.filter(org => {
      const matchesTree = !selectedOrgId || org.id === selectedOrgId || org.parentId === selectedOrgId;
      const matchesMST = org.mst.toLowerCase().includes(filterMST.toLowerCase());
      const matchesName = org.name.toLowerCase().includes(filterName.toLowerCase());
      const matchesStatus = filterStatus === 'Tất cả' || org.status === filterStatus;
      return matchesTree && matchesMST && matchesName && matchesStatus;
    });
  }, [organizations, selectedOrgId, filterMST, filterName, filterStatus]);

  const renderTreeNode = (node: any) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children.length > 0;
    const isActive = selectedOrgId === node.id;

    if (searchTree && !node.name.toLowerCase().includes(searchTree.toLowerCase()) && !hasChildren) {
      return null;
    }

    return (
      <div key={node.id} className="tree-node">
        <div
          className={`tree-node-content ${isActive ? 'active' : ''}`}
          onClick={() => setSelectedOrgId(node.id === selectedOrgId ? null : node.id)}
        >
          {hasChildren && (
            <span
              className={`node-chevron ${isExpanded ? 'expanded' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleNode(node.id);
              }}
            >
              <IconChevronRight size={14} />
            </span>
          )}
          {!hasChildren && <span style={{ width: '20px' }}></span>}
          <span className="node-icon">
            {node.parentId === null ? <IconBuildingSkyscraper size={18} /> : <IconBuilding size={16} />}
          </span>
          <span className="node-text">{node.name}</span>
        </div>
        {hasChildren && isExpanded && (
          <div className="tree-children">
            {node.children.map((child: any) => renderTreeNode(child))}
          </div>
        )}
      </div>
    );
  };

  // CRUD Handlers
  const handleOpenForm = (mode: 'add' | 'edit', org?: Organization) => {
    setModalMode(mode);
    setCurrentOrg(org || {
      status: 'Hoạt động',
      type: 'Doanh nghiệp',
      shortName: '',
      representative: '',
      position: '',
      phone: '',
      email: '',
      address: '',
      parentId: null
    });
    setIsFormModalOpen(true);
  };

  const handleOpenDetail = (org: Organization) => {
    setCurrentOrg(org);
    setIsDetailModalOpen(true);
  };

  const handleOpenDelete = (org: Organization) => {
    setOrgToDelete(org);
    setIsDeleteModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newOrg: Organization = {
        ...currentOrg as Organization,
        id: `ORG-00${organizations.length + 1}`,
      };
      setOrganizations(prev => [...prev, newOrg]);
      addToast('Thành công', 'Đã thêm tổ chức mới vào hệ thống');
    } else {
      setOrganizations(prev => prev.map(o => o.id === currentOrg.id ? { ...o, ...currentOrg } as Organization : o));
      addToast('Thành công', 'Đã cập nhật thông tin tổ chức');
    }
    setIsFormModalOpen(false);
  };

  const confirmDelete = () => {
    if (orgToDelete) {
      setOrganizations(prev => prev.filter(o => o.id !== orgToDelete.id));
      addToast('Đã xóa', `Tổ chức ${orgToDelete.shortName || orgToDelete.name} đã được gỡ khỏi hệ thống`, 'success');
      setIsDeleteModalOpen(false);
      setOrgToDelete(null);
    }
  };

  return (
    <div className="org-management-container">
      {/* Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <div className="toast-icon">
              {toast.type === 'success' ? <IconCheck size={18} /> : <IconAlertCircle size={18} />}
            </div>
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Page Header */}
      <header className="org-page-header">
        <div className="org-header-left">
          {/* <div className="org-breadcrumbs">
            <IconHome2 size={16} />
            <IconChevronRight size={12} />
            <span className="org-breadcrumb-item">Trang chủ</span>
            <IconChevronRight size={12} />
            <span className="org-breadcrumb-item active">Quản lý tổ chức</span>
          </div> */}
          <h1 style={{ color: '#1A1C1D', fontSize: '36px', fontWeight: '700' }}>Quản lý tổ chức</h1>
          <p style={{ color: '#5D5F5F', fontSize: '16px' }}>Cấu trúc và danh sách các cơ quan quản lý an toàn bức xạ.</p>
        </div>
        <div className="org-header-right">
          <button className="btn-add-org" onClick={() => handleOpenForm('add')}>
            <IconPlus size={20} />
            Thêm mới tổ chức
          </button>
        </div>
      </header>

      {/* Bento Grid */}
      <div className="org-bento-grid">
        {/* Left Column: Organization Tree */}
        <aside className="org-tree-card">
          <h3>Cấu trúc tổ chức</h3>
          <div className="tree-search-wrapper">
            <IconSearch size={16} className="tree-search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm tổ chức..."
              value={searchTree}
              onChange={(e) => setSearchTree(e.target.value)}
            />
          </div>
          <div className="tree-container">
            {organizationTree.map(node => renderTreeNode(node))}
          </div>
        </aside>

        {/* Right Column: Content Area */}
        <main className="org-content-area">
          <div className="org-filter-card">
            <div className="filter-group">
              <label>Mã số thuế</label>
              <input
                type="text"
                placeholder="Nhập MST..."
                value={filterMST}
                onChange={(e) => setFilterMST(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Tên tổ chức</label>
              <input
                type="text"
                placeholder="Tìm theo tên..."
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <label>Trạng thái</label>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="Tất cả">Tất cả</option>
                <option value="Hoạt động">Hoạt động</option>
                <option value="Ngừng hoạt động">Ngừng hoạt động</option>
              </select>
            </div>
            <button className="btn-filter-search">
              <IconFilter size={18} />
              Lọc kết quả
            </button>
          </div>

          <div className="org-table-card">
            <div className="org-table-wrapper">
              <table className="org-modern-table">
                <thead>
                  <tr>
                    <th>Mã Tổ chức</th>
                    <th>Mã số thuế</th>
                    <th>Tên Tổ chức</th>
                    <th>Đại diện</th>
                    <th>Địa chỉ</th>
                    <th>Trạng thái</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableData.map((org) => (
                    <tr key={org.id}>
                      <td className="org-id-cell">{org.id}</td>
                      <td>{org.mst}</td>
                      <td className="org-name-cell">
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span>{org.name}</span>
                          <small style={{ color: '#94a3b8', fontSize: '11px' }}>{org.shortName}</small>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: '500' }}>{org.representative}</span>
                          <small style={{ color: '#64748b' }}>{org.position}</small>
                        </div>
                      </td>
                      <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {org.address}
                      </td>
                      <td>
                        <span className={`org-status-badge ${org.status === 'Hoạt động' ? 'hoat-dong' : 'ngung-hoat-dong'}`}>
                          {org.status}
                        </span>
                      </td>
                      <td className="org-actions-cell">
                        <button className="action-btn btn-view" onClick={() => handleOpenDetail(org)} title="Xem chi tiết">
                          <IconEye size={16} />
                        </button>
                        <button className="action-btn btn-edit" onClick={() => handleOpenForm('edit', org)} title="Chỉnh sửa">
                          <IconEdit size={16} />
                        </button>
                        <button className="action-btn btn-delete" onClick={() => handleOpenDelete(org)} title="Xóa">
                          <IconTrash size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {isFormModalOpen && (
        <div className="org-modal-overlay" onClick={() => setIsFormModalOpen(false)}>
          <div className="org-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="org-modal-header">
              <h2>{modalMode === 'add' ? 'Thêm mới Tổ chức' : 'Chỉnh sửa Tổ chức'}</h2>
              <button className="btn-close-modal" onClick={() => setIsFormModalOpen(false)}>
                <IconX size={20} />
              </button>
            </div>

            <form className="org-form" onSubmit={handleSave}>
              <div className="org-form-grid">
                <div className="form-field">
                  <label>Mã tổ chức</label>
                  <input type="text" placeholder="Hệ thống tự sinh..." disabled value={currentOrg.id || ''} />
                </div>
                <div className="form-field">
                  <label>Mã số thuế (MST) <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập mã số thuế..."
                    value={currentOrg.mst || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, mst: e.target.value })}
                  />
                </div>
                <div className="form-field full-width">
                  <label>Tên tổ chức <span style={{ color: 'red' }}>*</span></label>
                  <input
                    type="text"
                    required
                    placeholder="Nhập đầy đủ tên tổ chức..."
                    value={currentOrg.name || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, name: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Tên rút gọn</label>
                  <input
                    type="text"
                    placeholder="VD: BKHCN..."
                    value={currentOrg.shortName || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, shortName: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Loại hình tổ chức</label>
                  <select
                    value={currentOrg.type}
                    onChange={e => setCurrentOrg({ ...currentOrg, type: e.target.value })}
                  >
                    <option value="Cơ quan nhà nước">Cơ quan nhà nước</option>
                    <option value="Đơn vị sự nghiệp">Đơn vị sự nghiệp</option>
                    <option value="Doanh nghiệp">Doanh nghiệp</option>
                    <option value="Đơn vị nghiên cứu">Đơn vị nghiên cứu</option>
                  </select>
                </div>
                <div className="form-field">
                  <label>Người đại diện</label>
                  <input
                    type="text"
                    placeholder="Họ và tên..."
                    value={currentOrg.representative || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, representative: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Chức vụ</label>
                  <input
                    type="text"
                    placeholder="Chức vụ..."
                    value={currentOrg.position || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, position: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Số điện thoại</label>
                  <input
                    type="text"
                    placeholder="Số điện thoại liên lạc..."
                    value={currentOrg.phone || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, phone: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Email</label>
                  <input
                    type="email"
                    placeholder="Địa chỉ email..."
                    value={currentOrg.email || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, email: e.target.value })}
                  />
                </div>
                <div className="form-field full-width">
                  <label>Địa chỉ trụ sở</label>
                  <input
                    type="text"
                    placeholder="Số nhà, đường, phường, quận..."
                    value={currentOrg.address || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, address: e.target.value })}
                  />
                </div>
                <div className="form-field">
                  <label>Tổ chức cấp trên</label>
                  <select
                    value={currentOrg.parentId || ''}
                    onChange={e => setCurrentOrg({ ...currentOrg, parentId: e.target.value || null })}
                  >
                    <option value="">-- Không có --</option>
                    {organizations.filter(o => o.id !== currentOrg.id).map(o => (
                      <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-field">
                  <label>Trạng thái</label>
                  <select
                    value={currentOrg.status}
                    onChange={e => setCurrentOrg({ ...currentOrg, status: e.target.value as any })}
                  >
                    <option value="Hoạt động">Hoạt động</option>
                    <option value="Ngừng hoạt động">Ngừng hoạt động</option>
                  </select>
                </div>
              </div>

              <div className="org-modal-footer">
                <button type="button" className="btn-cancel" onClick={() => setIsFormModalOpen(false)}>Hủy bỏ</button>
                <button type="submit" className="btn-submit">
                  {modalMode === 'add' ? 'Tạo tổ chức' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && (
        <div className="org-modal-overlay" onClick={() => setIsDetailModalOpen(false)}>
          <div className="org-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="org-modal-header">
              <h2>Chi tiết Tổ chức</h2>
              <button className="btn-close-modal" onClick={() => setIsDetailModalOpen(false)}>
                <IconX size={20} />
              </button>
            </div>
            <div className="detail-view-grid">
              <div className="detail-item">
                <label>Mã tổ chức</label>
                <span>{currentOrg.id}</span>
              </div>
              <div className="detail-item">
                <label>Mã số thuế</label>
                <span>{currentOrg.mst}</span>
              </div>
              <div className="detail-item">
                <label>Trạng thái</label>
                <span className={`org-status-badge ${currentOrg.status === 'Hoạt động' ? 'hoat-dong' : 'ngung-hoat-dong'}`}>
                  {currentOrg.status}
                </span>
              </div>
              <div className="detail-item full-width">
                <label>Tên đầy đủ</label>
                <span style={{ fontSize: '18px', fontWeight: '700' }}>{currentOrg.name}</span>
              </div>
              <div className="detail-item">
                <label>Tên rút gọn</label>
                <span>{currentOrg.shortName || '---'}</span>
              </div>
              <div className="detail-item">
                <label>Loại hình</label>
                <span>{currentOrg.type}</span>
              </div>
              <div className="detail-item">
                <label>Tổ chức cấp trên</label>
                <span>{organizations.find(o => o.id === currentOrg.parentId)?.name || 'Không có'}</span>
              </div>
              <div className="detail-item">
                <label>Người đại diện</label>
                <span>{currentOrg.representative}</span>
              </div>
              <div className="detail-item">
                <label>Chức vụ</label>
                <span>{currentOrg.position}</span>
              </div>
              <div className="detail-item">
                <label>Số điện thoại</label>
                <span>{currentOrg.phone}</span>
              </div>
              <div className="detail-item">
                <label>Email</label>
                <span>{currentOrg.email}</span>
              </div>
              <div className="detail-item full-width">
                <label>Địa chỉ trụ sở</label>
                <span>{currentOrg.address}</span>
              </div>
            </div>
            <div className="org-modal-footer">
              <button className="btn-submit" onClick={() => setIsDetailModalOpen(false)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="org-modal-overlay" onClick={() => setIsDeleteModalOpen(false)}>
          <div className="org-modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="delete-icon-wrapper">
              <IconTrash size={32} />
            </div>
            <h2>Xác nhận xóa tổ chức?</h2>
            <p>
              Bạn có chắc chắn muốn xóa <strong>{orgToDelete?.name}</strong>?
              Hành động này không thể hoàn tác và có thể ảnh hưởng đến các dữ liệu liên quan.
            </p>
            <div className="org-modal-footer" style={{ justifyContent: 'center', marginTop: '24px' }}>
              <button className="btn-cancel" onClick={() => setIsDeleteModalOpen(false)}>Hủy bỏ</button>
              <button className="btn-danger" onClick={confirmDelete}>Xác nhận xóa</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrangQuanLyToChuc;
