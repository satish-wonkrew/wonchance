"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/authSlice";
import { checkAuthStatus } from "@/utils/auth";

const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthStatus = async () => {
      const token = localStorage.getItem("token") || document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, "$1");
      await checkAuthStatus(dispatch, token);
    };

    fetchAuthStatus();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthWrapper;
