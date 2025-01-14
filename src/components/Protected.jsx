import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { auth } from "../firebase";
import { toast } from "react-toastify";

const Protected = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => setUser(user));

    return () => unSub();
  }, []);

  if (user === undefined) {
    return <p>Bekleniyor</p>;
  }
  if (user === null || user?.emailVerified === false) {
    if (user?.emailVerified === false)
      toast.info("Lütfen mail adresinizi doğrulayınız");

    return <Navigate to="/" replace />;
  }

  return <Outlet context={user} />;
};

export default Protected;
