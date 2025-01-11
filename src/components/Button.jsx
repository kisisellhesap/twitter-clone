import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Button = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success("Başarıyla giriş yapıldı");
        navigate("/feed");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Giriş başarısız" + err.message);
      });
  };
  return (
    <button
      onClick={handleLogin}
      className="flex gap-2 justify-center align-items-center bg-slate-100 px-5 py-2 text-black font-semibold rounded-full hover:brightness-110"
    >
      <img src="g-logo.png" alt="google" className="w-[25px]" />
      Google ile Giriş Yap
    </button>
  );
};

export default Button;
