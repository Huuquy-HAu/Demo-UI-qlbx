// App Routing Configuration
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
import TrangDanhSachCoSo from './pages/TrangDanhSachCoSo';
import TrangNguonThietBi from './pages/TrangNguonThietBi';
import TrangThuTucHanhChinh from './pages/TrangThuTucHanhChinh';
import TrangBaoCaoTongHop from './pages/TrangBaoCaoTongHop';
import TrangDaoTaoTapHuan from './pages/TrangDaoTaoTapHuan';
import TrangThanhTraKiemTra from './pages/TrangThanhTraKiemTra';
import TrangSuCoBucXa from './pages/TrangSuCoBucXa';
import TrangBaoCaoThongKe from './pages/TrangBaoCaoThongKe';
import TrangDanhMucDungChung from './pages/TrangDanhMucDungChung';
import TrangCauHinhHeThong from './pages/TrangCauHinhHeThong';
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
            <Route path="danh-muc-co-so" element={<TrangDanhSachCoSo />} />
            <Route path="nguon-thiet-bi" element={<TrangNguonThietBi />} />
            <Route path="quan-ly-to-chuc" element={<TrangQuanLyToChuc />} />
            <Route path="quan-ly-tai-khoan" element={<TrangQuanLyTaiKhoan />} />
            <Route path="bao-cao" element={<TrangQuanLyBaoCao />} />
            <Route path="bao-cao/:id" element={<TrangChiTietBaoCao />} />
            <Route path="bao-cao/:id/review" element={<TrangKySoBaoCao />} />
            <Route path="giay-phep" element={<TrangQuanLyGiayPhep />} />
            <Route path="thu-tuc" element={<TrangThuTucHanhChinh />} />
            <Route path="bao-cao-tong-hop" element={<TrangBaoCaoTongHop />} />
            <Route path="dao-tao-tap-huan" element={<TrangDaoTaoTapHuan />} />
            <Route path="thanh-tra" element={<TrangThanhTraKiemTra />} />
            <Route path="su-co" element={<TrangSuCoBucXa />} />
            <Route path="thong-ke-phan-tich" element={<TrangBaoCaoThongKe />} />
            <Route path="danh-muc-dung-chung" element={<TrangDanhMucDungChung />} />
            <Route path="cau-hinh-he-thong" element={<TrangCauHinhHeThong />} />
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
