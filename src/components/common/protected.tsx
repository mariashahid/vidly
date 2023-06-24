import React from "react";
import { Component } from "react";
import { Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

interface ProtectedProps {
  isSignedIn: boolean;
}

const Protected = ({ isSignedIn }: ProtectedProps) => {
  const location = useLocation();
  const { user, loading } = useAuth();

  console.log("user: ", user);
  console.log("loading:", loading);
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("user: ", user);
  console.log("loading:", loading);

  if (user === null) {
    return <Navigate to="/login" state={{ from: location }}></Navigate>;
  }

  return <Outlet></Outlet>;
};

export default Protected;
