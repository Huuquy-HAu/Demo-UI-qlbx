import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconHome, IconArrowLeft, IconRouteOff } from '@tabler/icons-react';
import './Trang404.css';

const Trang404: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-header">
          <div className="not-found-icon-wrapper">
            <IconRouteOff size={64} stroke={1.5} />
          </div>
          <h1 className="not-found-number">404</h1>
        </div>
        
        <h2 className="not-found-title">Trang không tồn tại</h2>
        <p className="not-found-text">
          Rất tiếc, đường dẫn bạn đang truy cập không tồn tại trong hệ thống hoặc đã bị thay đổi. 
          Vui lòng kiểm tra lại URL hoặc quay về trang chủ.
        </p>

        <div className="not-found-actions">
          <button className="btn-back-prev" onClick={() => navigate(-1)}>
            <IconArrowLeft size={18} />
            <span>Quay lại</span>
          </button>
          
          <button className="btn-back-home" onClick={() => navigate('/trang-chu')}>
            <IconHome size={18} />
            <span>Về trang chủ</span>
          </button>
        </div>
      </div>

      <div className="not-found-bg-decoration">
        <div className="decor-circle circle-1"></div>
        <div className="decor-circle circle-2"></div>
        <div className="decor-circle circle-3"></div>
      </div>
    </div>
  );
};

export default Trang404;
