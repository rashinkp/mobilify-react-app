import React from "react";
import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectUser = () => {
  const { userInfo } = useSelector((state) => state.userAuth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectUser;
