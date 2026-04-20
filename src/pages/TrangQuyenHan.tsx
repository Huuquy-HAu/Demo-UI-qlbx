import React, { useState } from 'react';
import { 
  IconShieldLock, 
  IconPlus, 
  IconDeviceFloppy, 
  IconSearch,
  IconUsers,
  IconCheck
} from '@tabler/icons-react';
import './TrangQuyenHan.css';

const roles = [
  { id: 1, name: 'Quản trị viên (Super Admin)', desc: 'Toàn quyền truy cập quản trị hệ thống', users: 2, active: true },
  { id: 2, name: 'Quản lý Cơ sở', desc: 'Quyền quản lý phạm vi cơ sở bức xạ', users: 15, active: true },
  { id: 3, name: 'Cán bộ Chuyên trách', desc: 'Theo dõi, cảnh báo và xử lý báo cáo', users: 48, active: true },
  { id: 4, name: 'Người dùng Doanh nghiệp', desc: 'Thực hiện khai báo, nộp hồ sơ', users: 120, active: true },
  { id: 5, name: 'Người dùng nội bộ (Viewer)', desc: 'Quyền xem báo cáo, không chỉnh sửa', users: 5, active: false }
];

const modules = [
  { id: 'dashboard', name: 'Dashboard Tổng quan' },
  { id: 'coso', name: 'Quản lý Cơ sở Bức xạ' },
  { id: 'tochuc', name: 'Quản lý Tổ chức' },
  { id: 'giayphep', name: 'Quản lý Giấy phép' },
  { id: 'baocao', name: 'Báo cáo & Thống kê' },
  { id: 'hethong', name: 'Cấu hình Hệ thống' }
];

const permissionKeys = [
  { key: 'view', label: 'Xem (Read)' },
  { key: 'create', label: 'Tạo (Create)' },
  { key: 'edit', label: 'Sửa (Update)' },
  { key: 'delete', label: 'Xóa (Delete)' },
  { key: 'approve', label: 'Xét duyệt' }
];

const getInitialCheck = (rId: number, modId: string, permKey: string) => {
  if (rId === 1) return true;
  if (rId === 2 && ['view', 'create', 'edit'].includes(permKey) && modId !== 'hethong') return true;
  if (rId === 3 && ['view'].includes(permKey)) return true;
  return false;
};

// Generate default matrix state
const generateInitialPermissions = () => {
  const defaultPerms: Record<number, Record<string, Record<string, boolean>>> = {};
  roles.forEach(r => {
    defaultPerms[r.id] = {};
    modules.forEach(m => {
      defaultPerms[r.id][m.id] = {};
      permissionKeys.forEach(pk => {
        defaultPerms[r.id][m.id][pk.key] = getInitialCheck(r.id, m.id, pk.key);
      });
    });
  });
  return defaultPerms;
};

const TrangQuyenHan: React.FC = () => {
  const [selectedRoleId, setSelectedRoleId] = useState<number>(1);
  const [rolePermissions, setRolePermissions] = useState(generateInitialPermissions);
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleTogglePermission = (modId: string, permKey: string) => {
    setRolePermissions(prev => ({
      ...prev,
      [selectedRoleId]: {
        ...prev[selectedRoleId],
        [modId]: {
          ...prev[selectedRoleId]?.[modId],
          [permKey]: !prev[selectedRoleId]?.[modId]?.[permKey]
        }
      }
    }));
  };

  const handleToggleAllModule = (modId: string, currentStatus: boolean) => {
    setRolePermissions(prev => {
      const newModPerms = { ...prev[selectedRoleId]?.[modId] };
      permissionKeys.forEach(pk => {
        newModPerms[pk.key] = !currentStatus;
      });
      return {
        ...prev,
        [selectedRoleId]: {
          ...prev[selectedRoleId],
          [modId]: newModPerms
        }
      };
    });
  };

  const isAllModuleChecked = (modId: string) => {
    return permissionKeys.every(pk => rolePermissions[selectedRoleId]?.[modId]?.[pk.key]);
  };

  const handleSave = () => {
    setIsSaving(true);
    setSaveSuccess(false);
    
    // Simulate API Call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 800);
  };

  return (
    <div className="quyen-han-container">
      {/* Page Header */}
      <div className="page-header-quyen-han">
        <div className="header-left">
          <h1 className="main-title">Phân quyền Hệ thống</h1>
          <p className="sub-description">
            Quản lý và cấp quyền truy cập, thao tác cho các nhóm vai trò trong hệ thống.
          </p>
        </div>
        <div className="header-right">
          <button className="btn-action primary-gradient">
            <IconPlus size={18} />
            <span>Thêm vai trò mới</span>
          </button>
        </div>
      </div>

      {/* Bento Grid Layout (12 cols) */}
      <div className="bento-grid-quyen-han">
        
        {/* Left Sidebar - Roles List (Span 3) */}
        <div className="roles-sidebar bento-card span-3">
          <div className="sidebar-header">
            <h3>Danh sách Vai trò</h3>
            <div className="qh-search-box">
              <IconSearch size={16} className="qh-search-icon" />
              <input type="text" placeholder="Tìm kiếm vai trò..." />
            </div>
          </div>
          
          <div className="roles-list">
            {roles.map(role => (
              <div 
                key={role.id} 
                className={`role-item ${selectedRoleId === role.id ? 'active' : ''} ${!role.active ? 'inactive' : ''}`}
                onClick={() => setSelectedRoleId(role.id)}
              >
                <div className="role-main">
                  <div className={`role-icon-box ${selectedRoleId === role.id ? 'active-icon' : ''}`}>
                    <IconShieldLock size={20} />
                  </div>
                  <div className="role-info">
                    <h4>{role.name}</h4>
                    <span>{role.desc}</span>
                  </div>
                </div>
                <div className="role-users">
                  <IconUsers size={14} />
                  <span>{role.users}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content - Matrix Table (Span 9) */}
        <div className="matrix-content bento-card span-9">
          <div className="matrix-header">
            <div className="matrix-title">
              <h3>Cấp quyền cho: <span className="highlight-role">{roles.find(r => r.id === selectedRoleId)?.name}</span></h3>
              <p>Thiết lập chi tiết các quyền thao tác cho vai trò này.</p>
            </div>
            <button 
              className={`btn-save ${saveSuccess ? 'success' : ''} ${isSaving ? 'loading' : ''}`}
              onClick={handleSave}
              disabled={isSaving}
            >
              {saveSuccess ? (
                <>
                  <IconCheck size={18} />
                  <span>Đã lưu thành công</span>
                </>
              ) : (
                <>
                  <IconDeviceFloppy size={18} />
                  <span>{isSaving ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                </>
              )}
            </button>
          </div>

          <div className="matrix-table-container">
            <table className="permissions-matrix">
              <thead>
                <tr>
                  <th className="th-module">Chức năng (Module)</th>
                  {permissionKeys.map(pk => (
                    <th key={pk.key} className="th-perm">{pk.label}</th>
                  ))}
                  <th className="th-all">Tất cả</th>
                </tr>
              </thead>
              <tbody>
                {modules.map(mod => {
                  const allChecked = isAllModuleChecked(mod.id);
                  return (
                    <tr key={mod.id}>
                      <td className="td-module">{mod.name}</td>
                      {permissionKeys.map(pk => (
                        <td key={pk.key} className="td-perm">
                          <label className="qh-custom-checkbox">
                            <input 
                              type="checkbox" 
                              checked={rolePermissions[selectedRoleId]?.[mod.id]?.[pk.key] || false}
                              onChange={() => handleTogglePermission(mod.id, pk.key)} 
                            />
                            <span className="qh-checkmark"></span>
                          </label>
                        </td>
                      ))}
                      <td className="td-all">
                        <label className="qh-custom-toggle">
                          <input 
                            type="checkbox" 
                            checked={allChecked} 
                            onChange={() => handleToggleAllModule(mod.id, allChecked)}
                          />
                          <span className="qh-toggle-slider"></span>
                        </label>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default TrangQuyenHan;

