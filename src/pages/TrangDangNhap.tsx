import React, { useState } from 'react';
import { TextInput, PasswordInput, Select, Button, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import './TrangDangNhap.css';
import { CardRoleIcon, LockOutlineIcon, ShieldCircleIcon, UserOutlineIcon } from '../assets/icon';

const TrangDangNhap: React.FC = () => {
  const [role, setRole] = useState<string | null>('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    setError('');
    if (username === 'admin' && password === '123') {
      const userInfo = { id: 1, name: 'Admin', role: role || 'Ban quản lý' };
      localStorage.setItem('user_info', JSON.stringify(userInfo));
      navigate('/dashboard');
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không chính xác');
    }
  };

  return (
    <div className="login-screen-container">
      {/* Decorative Background */}
      <div className="decorative-background">
        <div className="bg-image-wrapper">
          <div className="bg-image"></div>
        </div>
        <div className="bg-overlay"></div>
      </div>

      {/* Main Content Area */}
      <main className="main-content-area">
        <div className="login-card">
          <div className="login-header">
            <ShieldCircleIcon />
            <h1 className="login-title">Đăng nhập hệ thống</h1>
            <p className="login-subtitle">Quản lý An toàn Bức xạ - Quảng Ninh</p>
          </div>

          <div className="login-form-container">
            <div className="login-form">
              {error && <Text c="red" size="sm" mb="sm" ta="center">{error}</Text>}

              <div className="form-group">
                <label className="form-label">Vai trò <span className="required">*</span></label>
                <Select
                  placeholder="Chọn vai trò đăng nhập"
                  data={['Cán bộ', 'Doanh nghiệp', 'Ban quản lý']}
                  value={role}
                  onChange={(val) => setRole(val)}
                  rightSection={<IconChevronDown size={14} />}
                  classNames={{ input: 'login-input', root: 'login-select' }}
                  leftSection={<CardRoleIcon />}
                />
              </div>

              <div className="form-group mt-20">
                <label className="form-label">Tên đăng nhập <span className="required">*</span></label>
                <TextInput
                  placeholder="Nhập tên đăng nhập"
                  value={username}
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  classNames={{ input: 'login-input' }}
                  leftSection={<UserOutlineIcon />}
                />
              </div>

              <div className="form-group mt-20">
                <label className="form-label">Mật khẩu <span className="required">*</span></label>
                <PasswordInput
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  classNames={{ input: 'login-input', innerInput: 'login-inner-input' }}
                  leftSection={<LockOutlineIcon />}
                />
              </div>

              <div className="form-actions mt-32">
                <Button fullWidth className="login-action-btn" size="md" onClick={handleLogin}>
                  Đăng nhập
                </Button>
              </div>

              {/* Demo Accounts Section */}
              <div className="demo-accounts-section mt-32">
                <div className="demo-accounts-header">
                  <div className="demo-divider"></div>
                  <span className="demo-divider-text">Tài khoản Demo</span>
                  <div className="demo-divider"></div>
                </div>
                <div className="demo-account-box">
                  <div className="demo-info">
                    <span className="demo-label">Tài khoản:</span>
                    <span className="demo-value">admin</span>
                  </div>
                  <div className="demo-info">
                    <span className="demo-label">Mật khẩu:</span>
                    <span className="demo-value">123</span>
                  </div>
                </div>
                <p className="demo-note">Sử dụng thông tin trên để truy cập nhanh tất cả tính năng.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simplified Footer for Linear Flow */}
      <footer className="linear-footer">
        <Text>© 2026 Sở Khoa học và Công nghệ tỉnh Quảng Ninh.</Text>
      </footer>
    </div>
  );
};

export default TrangDangNhap;
