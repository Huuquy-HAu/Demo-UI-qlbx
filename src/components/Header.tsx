import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { HeaderLogo } from '../assets/img';
import { IconMenu2, IconX } from '@tabler/icons-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`home-header ${isMenuOpen ? 'menu-open' : ''}`}>
      {/* Logo Section */}
      <div className="header-logo">
        <img src={HeaderLogo} alt="Header Logo" />
        <div className="logo-text">
          QUẢN LÝ BỨC XẠ <br />
          TỈNH QUẢNG NINH
        </div>
      </div>

      {/* Nav Section - Desktop & Mobile overlay */}
      <nav className={`header-nav ${isMenuOpen ? 'mobile-open' : ''}`}>
        <Link to="/trang-chu" className="nav-link active" onClick={() => setIsMenuOpen(false)}>Trang Chủ</Link>
        <Link to="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Dịch vụ Công</Link>
        <Link to="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Văn Bản Pháp Quy</Link>
        <Link to="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Hướng Dẫn</Link>
        <Link to="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Tin Tức</Link>
        {isMenuOpen && (
          <Link to="/dang-nhap" className="header-btn mobile-only" onClick={() => setIsMenuOpen(false)}>Đăng Nhập</Link>
        )}
      </nav>

      {/* Desktop Login Button */}
      <Link to="/dang-nhap" className="header-btn desktop-only">Đăng Nhập</Link>

      {/* Mobile Menu Toggle */}
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <IconX size={28} /> : <IconMenu2 size={28} />}
      </button>
    </header>
  );
}
