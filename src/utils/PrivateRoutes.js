import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const { userInfo } = useSelector((state) => state.user);

  return userInfo.isAdmin ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
