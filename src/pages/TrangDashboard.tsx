import React from 'react';
import './TrangDashboard.css';
import {
  IconShieldCheck,
  IconAlertTriangle,
  IconMapPin,
  IconChecklist,
  IconFileCertificate
} from '@tabler/icons-react';
import { CircleCheckHomeIcon, DeviceManagementHomeIcon, ReportHomeIcon } from '../assets/icon';
import { Flex, Text } from '@mantine/core';

const TrangDashboard: React.FC = () => {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {/* Page Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Tổng quan hệ thống</h1>
          <p className="dashboard-subtitle">Theo dõi trạng thái an toàn bức xạ thời gian thực</p>
        </div>

        {/* Grid Layout */}
        <div className="dashboard-grid">
          {/* Stats Row */}
          <div className="stat-card">
            <Flex align='center' justify='space-between' gap={8} style={{ width: '100%' }}>
              <div className="stat-label">TỔNG SỐ CƠ SỞ</div>
              <ReportHomeIcon />
            </Flex>
            <div className="stat-value" style={{ width: '100%' }}>142</div>
          </div>
          <div className="stat-card">
            <Flex align='center' justify='space-between' gap={8} style={{ width: '100%' }}>
              <div className="stat-label">Thiết bị X-Quang</div>
              <DeviceManagementHomeIcon />
            </Flex>
            <div className="stat-value" style={{ width: '100%' }}>352</div>
          </div>
          <div className="stat-card linear-bg">
            <Flex align='center' justify='space-between' gap={8} style={{ width: '100%' }}>
              <div className="stat-label" style={{ color: 'white' }}>Tỉ lệ nộp báo cáo</div>
              <CircleCheckHomeIcon />
            </Flex>
            <Flex align='end' justify='start' gap={8} style={{ width: '100%' }}>
              <Text fw={700} size='48px' style={{ color: 'white' }}>
                95%
              </Text>
              <Text size='14px' fw={400} style={{ color: 'white' }}>
                Đúng hạn
              </Text>
            </Flex>
          </div>

          {/* Featured Card (Risk Scoring) & Alerts */}
          <div className="dashboard-card row-span-2 col-span-2 flex flex-col">
            <div className="card-header-flex">
              <h3 className="card-title">Phân tích rủi ro toàn tỉnh</h3>
              <a href="#" className="view-all" style={{ color: '#da251d' }}>Xem chi tiết</a>
            </div>

            <div className="risk-analysis-container">
              {/* Left Half: Pie Chart */}
              <div className="risk-left">
                <div className="pie-chart-wrapper">
                  <div className="pie-inner">
                    <span className="pie-score">42</span>
                    <span className="pie-label">Trung bình</span>
                  </div>
                </div>
                <div className="risk-summary-text">
                  Chỉ số rủi ro trung bình đang ở mức <strong>Cảnh báo nhẹ</strong>. Cần lưu ý các cơ sở công nghiệp.
                </div>
              </div>

              {/* Divider */}
              <div className="risk-divider"></div>

              {/* Right Half: High Risk Config */}
              <div className="risk-right">
                <h4 className="high-risk-title">TOP CƠ SỞ Rủi ro cao</h4>

                <div className="high-risk-list">
                  <div className="high-risk-item critical">
                    <div className="risk-item-score">89</div>
                    <div className="risk-item-info">
                      <span className="company-name">Trung tâm Kiểm soát Bệnh tật</span>
                      <span className="company-address">Huyện Tiên Yên</span>
                    </div>
                  </div>

                  <div className="high-risk-item warning">
                    <div className="risk-item-score">75</div>
                    <div className="risk-item-info">
                      <span className="company-name">Bệnh viện Đa khoa Tỉnh</span>
                      <span className="company-address">TP Hạ Long</span>
                    </div>
                  </div>

                  <div className="high-risk-item warning">
                    <div className="risk-item-score">68</div>
                    <div className="risk-item-info">
                      <span className="company-name">Nhà máy Nhiệt điện Cẩm
                        Phả</span>
                      <span className="company-address">TP Cẩm Phả</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card alerts-card col-span-1">
            <div className="card-header-flex">
              <h3 className="card-title">Cảnh báo & Việc cần
                làm</h3>
              <div style={{ color: '#da251d', fontWeight: 700, fontSize: '14px', backgroundColor: '#FEF2F2', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                8
              </div>
            </div>
            <div className="alert-list">
              <div className="alert-item">
                <div className="alert-icon bg-red-light"><IconAlertTriangle size={18} color="#B40006" /></div>
                <div className="alert-content">
                  <h4>5 Giấy phép sắp
                    hết hạn</h4>
                  <span>Cần phê duyệt gia hạn trong
                    vòng 7 ngày tới.</span>
                </div>
              </div>
              <div className="alert-item">
                <div className="alert-icon bg-yellow-light"><IconChecklist size={18} color="#D97706" /></div>
                <div className="alert-content">
                  <h4>3 Thiết bị quá hạn kiểm
                    định</h4>
                  <span>Đã tự động gửi email nhắc nhở
                    đến cơ sở.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map Placeholder & Workflow Status */}
          <div className="dashboard-card map-card col-span-1">
            <div className="card-header-flex z-10 px-8 pt-8">
              <h3 className="card-title">Bản đồ Phân bổ</h3>
            </div>
            <div className="map-bg"></div>
            <div className="map-overlay"></div>

            <div className="map-markers z-10">
              <div className="marker marker-active"><IconMapPin size={24} /></div>
              <div className="marker marker-warning" style={{ left: '60%', top: '40%' }}><IconMapPin size={24} /></div>
              <div className="marker" style={{ left: '30%', top: '70%' }}><IconMapPin size={24} /></div>
            </div>
          </div>

          <div className="dashboard-card process-tracker-card col-span-3">
            <h3 className="card-title mb-6">Quy trình duyệt báo cáo định kỳ</h3>
            
            <div className="process-stepper">
              {/* Step 1 */}
              <div className="step completed">
                <div className="step-indicator">
                  <div className="step-icon">
                    <IconChecklist size={20} />
                  </div>
                  <div className="step-line"></div>
                </div>
                <div className="step-info">
                  <h4 className="step-title">Bản nháp</h4>
                  <p className="step-desc">Cơ sở</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="step completed">
                <div className="step-indicator">
                  <div className="step-icon">
                    <IconShieldCheck size={20} />
                  </div>
                  <div className="step-line"></div>
                </div>
                <div className="step-info">
                  <h4 className="step-title">Đã nộp</h4>
                  <p className="step-desc">Chờ tiếp nhận</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="step active">
                <div className="step-indicator">
                  <div className="step-icon">
                    <div className="pulse-dot"></div>
                  </div>
                  <div className="step-line"></div>
                </div>
                <div className="step-info">
                  <h4 className="step-title">Đang xét duyệt</h4>
                  <p className="step-desc">Chuyên viên</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="step pending">
                <div className="step-indicator">
                  <div className="step-icon">
                    <IconFileCertificate size={20} />
                  </div>
                </div>
                <div className="step-info">
                  <h4 className="step-title">Phê duyệt</h4>
                  <p className="step-desc">Lãnh đạo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrangDashboard;
