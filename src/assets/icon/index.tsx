import CircleCheckHomeIcon from './circle-check-home-icon.svg?react';
import DeviceManagementHomeIcon from './device-managent-home-icon.svg?react';
import MapCircleHomeIcon from './map-circle-home-icon.svg?react';
import ReportHomeIcon from './report-home-icon.svg?react';
import HouseExpensiveIcon from './house-expensive-icon.svg?react';
import ShieldCircleIcon from './shield-circle-icon.svg?react';
import UserOutlineIcon from './user-outline-icon.svg?react';
import LockOutlineIcon from './lock-outline-icon.svg?react';
import CardRoleIcon from './card-role-icon.svg?react';

const ArrowRightIcon = ({ fillColor = '#B40006' }) => {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.10208 5.25H0V4.08333H7.10208L3.83542 0.816667L4.66667 0L9.33333 4.66667L4.66667 9.33333L3.83542 8.51667L7.10208 5.25Z" fill={fillColor} />
    </svg>
  );
};

export {
  CircleCheckHomeIcon,
  DeviceManagementHomeIcon,
  MapCircleHomeIcon,
  ReportHomeIcon,
  ArrowRightIcon,
  HouseExpensiveIcon,
  ShieldCircleIcon,
  UserOutlineIcon,
  LockOutlineIcon,
  CardRoleIcon
}
