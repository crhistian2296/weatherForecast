import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoutes = ({ user }) => {
  return user?.logged ? <Outlet /> : <Navigate to='/login' />;
};

PrivateRoutes.propTypes = {
  user: PropTypes.object,
};
