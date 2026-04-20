import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';

import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import TrangChu from './pages/TrangChu';
import TrangDangNhap from './pages/TrangDangNhap';
import TrangDashboard from './pages/TrangDashboard';
import TrangQuanLyCoSoBucXa from './pages/TrangQuanLyCoSoBucXa';
import TrangKySoBaoCao from './pages/TrangKySoBaoCao';
import TrangQuanLyToChuc from './pages/TrangQuanLyToChuc';
import TrangQuanLyTaiKhoan from './pages/TrangQuanLyTaiKhoan';
import TrangQuanLyBaoCao from './pages/TrangQuanLyBaoCao';
import TrangChiTietBaoCao from './pages/TrangChiTietBaoCao';
import TrangQuanLyGiayPhep from './pages/TrangQuanLyGiayPhep';
import TrangChiTietGiayPhep from './pages/TrangChiTietGiayPhep';
import TrangCanhBaoNhacViec from './pages/TrangCanhBaoNhacViec';
import TrangQuyenHan from './pages/TrangQuyenHan';
import TrangNhatKyHeThong from './pages/TrangNhatKyHeThong';
import Trang404 from './pages/Trang404';

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/trang-chu" replace />} />
            <Route path="trang-chu" element={<TrangChu />} />
          </Route>
          <Route path="/dang-nhap" element={<TrangDangNhap />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<TrangDashboard />} />
            <Route path="quan-ly-co-so" element={<TrangQuanLyCoSoBucXa />} />
            <Route path="quan-ly-to-chuc" element={<TrangQuanLyToChuc />} />
            <Route path="quan-ly-tai-khoan" element={<TrangQuanLyTaiKhoan />} />
            <Route path="bao-cao" element={<TrangQuanLyBaoCao />} />
            <Route path="bao-cao/:id" element={<TrangChiTietBaoCao />} />
            <Route path="bao-cao/:id/review" element={<TrangKySoBaoCao />} />
            <Route path="giay-phep" element={<TrangQuanLyGiayPhep />} />
            <Route path="giay-phep/:id" element={<TrangChiTietGiayPhep />} />
            <Route path="thong-bao-va-nhac-viec" element={<TrangCanhBaoNhacViec />} />
            <Route path="to-chuc" element={<TrangQuanLyToChuc />} />
            <Route path="quyen-han" element={<TrangQuyenHan />} />
            <Route path="nhat-ky-he-thong" element={<TrangNhatKyHeThong />} />
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<Trang404 />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
