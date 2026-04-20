import { Link } from 'react-router-dom';
import './Header.css';
import { HeaderLogo } from '../assets/img';

export default function Header() {
  return (
    <header className="home-header">
      {/* Logo placeholder - image 1 in Figma */}
      <div className="header-logo">
        <img src={HeaderLogo} alt="Header Logo" />
        <div className="logo-text">
          QUẢN LÝ BỨC XẠ <br />
          TỈNH QUẢNG NINH
        </div>
      </div>

      {/* Nav - 5 links with 32px gap */}
      <nav className="header-nav">
        <Link to="/trang-chu" className="nav-link active">Trang Chủ</Link>
        <Link to="#" className="nav-link">Dịch vụ Công</Link>
        <Link to="#" className="nav-link">Văn Bản Pháp Quy</Link>
        <Link to="#" className="nav-link">Hướng Dẫn</Link>
        <Link to="#" className="nav-link">Tin Tức</Link>
      </nav>

      {/* Button - gradient red, pill shape */}
      <Link to="/dang-nhap" className="header-btn" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>Đăng Nhập</Link>
    </header>
  );
}
