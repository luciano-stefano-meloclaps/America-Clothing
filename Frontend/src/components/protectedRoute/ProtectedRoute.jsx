import { useAuth } from "../../context/AuthContext";
import Unauthorized from '../unauthorized/Unauthorize';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children, requiredRole }) => {
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
    requiredRole: PropTypes.string.isRequired
};
  const { userRole } = useAuth();

  if (userRole !== requiredRole) {
    return <Unauthorized />;
  }

  return children;
};

export default ProtectedRoute;