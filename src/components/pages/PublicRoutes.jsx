import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

export const PublicRoutes = ({ user }) => {
  return !user.logged ? <Outlet /> : <Navigate to='protected' />;
};

PublicRoutes.propTypes = {
  user: PropTypes.object,
};
