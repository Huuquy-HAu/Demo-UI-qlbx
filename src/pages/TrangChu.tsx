import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, CircleCheckHomeIcon, DeviceManagementHomeIcon, MapCircleHomeIcon, ReportHomeIcon } from '../assets/icon';
import './TrangChu.css';
import { Button, Flex } from '@mantine/core';

// Slider images
import halong1 from '../assets/img/halong_1.png';
import halong2 from '../assets/img/halong_2.png';
import halong3 from '../assets/img/halong_3.png';

const sliderImages = [
  halong1,
  halong2,
  halong3
];

export default function TrangChu() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* ===== HERO SECTION (1:4) - 1280x600 ===== */}
      <section className="hero-section">
        {/* Background Slider */}
        <div className="hero-slider">
          {sliderImages.map((img, index) => (
            <div 
              key={index}
              className={`hero-bg ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${img})` }}
            ></div>
          ))}
        </div>

        {/* Overlay (1:6) - multiply blend, #B40006 40% */}
        <div className="hero-overlay"></div>
        {/* Gradient (1:7) - bottom-to-top fade from #F9F9FB */}
        <div className="hero-gradient"></div>

        {/* Container (1:8) - centered content, max-width 896px */}
        <div className="hero-container">
          {/* Heading 1 (1:9) - with drop shadows */}
          <div className="hero-heading">
            <h1>Hệ thống quản lý an toàn bức xạ<br />và nguồn phóng xạ</h1>
          </div>
          {/* Shadow subtitle (1:11) */}
          <div className="hero-subtitle">
            <p>Sở Khoa học và Công nghệ tỉnh Quảng Ninh</p>
          </div>
          {/* Search bar (1:13) - Overlay+OverlayBlur */}
          <div className="hero-search-bar">
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z" stroke="#6B7280" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <input type="text" className="search-input" placeholder="Tìm kiếm thủ tục, dịch vụ..." />
            <button className="search-btn">Tìm kiếm</button>
          </div>

          {/* Slider Indicators */}
          <div className="hero-indicators">
            {sliderImages.map((_, index) => (
              <div 
                key={index} 
                className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BENTO GRID SECTION (1:24) - bg #F9F9FB ===== */}
      <section className="bento-section">
        {/* Heading container (1:25) */}
        <div className="bento-header">
          <h2>Chức năng quản lý</h2>
          <p className="bento-desc">Truy cập nhanh các nghiệp vụ quản lý nhà nước về an toàn bức xạ.</p>
        </div>

        {/* Grid container (1:30) - CSS Grid 3 col, 2 row, 240px each, gap 24px */}
        <div className="bento-grid">
          {/* Card 1 (1:31) - span 2 cols, white bg, shadow, radius 12 */}
          <div className="bento-card bento-card--wide bento-card--white">
            <div className="bento-card__content">
              <div className="bento-card__icon"><ReportHomeIcon /></div>
              <h3>Báo cáo định kỳ</h3>
              <p>Quản lý và nộp báo cáo thực trạng an toàn bức xạ hàng năm của các cơ sở sử dụng thiết bị X-
                quang, nguồn phóng xạ.</p>
              <Flex align='center' justify='start' gap={8}>
                <Link to="/dang-nhap" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: '#B40006', cursor: 'pointer', lineHeight: '20px' }}>TRUY CẬP </Link>
                <ArrowRightIcon />
              </Flex>
            </div>
            <div className="bento-card__visual">
              <div className="mini-chart">
                <div className="bar" style={{ height: '60%' }}></div>
                <div className="bar" style={{ height: '80%' }}></div>
                <div className="bar" style={{ height: '45%' }}></div>
                <div className="bar" style={{ height: '90%' }}></div>
                <div className="bar" style={{ height: '70%' }}></div>
              </div>
            </div>
          </div>

          {/* Card 2 (1:44) - 1 col, gray bg #F3F3F5, radius 12 */}
          <div className="bento-card bento-card--gray">
            <div className="bento-card__content">
              <div className="bento-card__icon"><DeviceManagementHomeIcon /></div>
              <h3>Quản lý thiết bị</h3>
              <p>Cơ sở dữ liệu thiết bị X-quang y tế và công nghiệp.</p>
              <Flex align='center' justify='start' gap={8}>
                <Link to="/dang-nhap" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: '#1A1C1D', cursor: 'pointer', lineHeight: '20px' }}>CHI TIẾT </Link>
                <ArrowRightIcon fillColor='#1A1C1D' />
              </Flex>
            </div>
          </div>

          {/* Card 3 (1:57) - 1 col, gray bg, radius 12 */}
          <div className="bento-card bento-card--gray">
            <div className="bento-card__content">
              <div className="bento-card__icon"><CircleCheckHomeIcon /></div>
              <h3>Cấp phép</h3>
              <p>Thủ tục cấp mới, gia hạn, sửa đổi giấy phép
                tiến hành công việc bức xạ.</p>
              <Flex align='center' justify='start' gap={8}>
                <Link to="/dang-nhap" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, color: '#1A1C1D', cursor: 'pointer', lineHeight: '20px' }}>CHI TIẾT </Link>
                <ArrowRightIcon fillColor='#1A1C1D' />
              </Flex>
            </div>
          </div>

          {/* Card 4 (1:70) - span 2 cols, white bg, shadow, map visual, radius 12 */}
          <div className="bento-card bento-card--wide bento-card--map">
            <div className="bento-card__map-bg"></div>
            <div className="bento-card__map-gradient"></div>
            <div className="bento-card__content bento-card__content--overlay">
              <div className="bento-card__icon"><MapCircleHomeIcon /></div>
              <h3>Bản đồ an toàn bức xạ</h3>
              <p>Trực quan hóa phân bố các cơ sở có thiết bị bức xạ và
                nguồn phóng xạ trên địa bàn tỉnh Quảng Ninh.</p>
              <Button style={{ backgroundColor: '#E2E2E4', color: '#1A1C1D', borderRadius: '6px', padding: '8px 16px', fontWeight: 600, fontSize: '14px', lineHeight: '20px', cursor: 'pointer', width: '150px' }}>
                XEM BẢN ĐỒ
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION (1:87) - bg #F3F3F5 ===== */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-item">
            <div className="stat-number">124</div>
            <div className="stat-label">CƠ SỞ ĐANG HOẠT ĐỘNG</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">1,847</div>
            <div className="stat-label">THIẾT BỊ X-QUANG</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">42</div>
            <div className="stat-label">NGUỒN PHÓNG XẠ</div>
          </div>
        </div>
      </section>
    </div>
  );
}
