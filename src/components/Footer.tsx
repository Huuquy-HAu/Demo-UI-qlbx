import { HouseExpensiveIcon } from '../assets/icon';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="home-footer">
      {/* Main footer content (1:107) - centered */}
      <div className="footer-main">
        {/* Icon placeholder */}
        <div className="footer-icon"><HouseExpensiveIcon /></div>

        {/* Heading */}
        <p className="footer-heading">CƠ QUAN CHỦ QUẢN</p>

        {/* Address block (1:110) */}
        <div className="footer-address">
          <p>Sở Khoa học và Công nghệ tỉnh Quảng Ninh</p>
          <p>Địa chỉ: Tầng 4, Trụ sở Liên cơ quan số 3, phường Hồng Hà, TP Hạ Long, tỉnh Quảng Ninh.</p>
        </div>
      </div>

      {/* Links row (1:112 - Margin) */}
      <div className="footer-links">
        <a href="#">Điều khoản sử dụng</a>
        <span className="footer-link-sep">·</span>
        <a href="#">Chính sách bảo mật</a>
        <span className="footer-link-sep">·</span>
        <a href="#">Hỗ trợ</a>
      </div>

      {/* Divider line (1:122) */}
      <div className="footer-divider"></div>

      {/* Copyright (1:124) */}
      <div className="footer-copyright">
        <p>© 2026 Sở Khoa học và Công nghệ tỉnh Quảng Ninh. Hệ thống Quản lý An toàn Bức xạ.</p>
      </div>
    </footer>
  );
}
