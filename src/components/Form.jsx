import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useFormik } from "formik";
import { auth } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoEyeSharp } from "react-icons/io5";
import { HiMiniEyeSlash } from "react-icons/hi2";

const Form = ({ setModal }) => {
  const [isSingUp, setIsSignUp] = useState(false);
  const [passwordMode, setPasswordMode] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }, { resetForm }) => {
      console.log("Form submitted:", { email, password });
      if (isSingUp) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((res) => {
            sendEmailVerification(res.user);
            toast.info("Maili doğrulayın");

            setIsSignUp(false);

            resetForm();
          })
          .catch((err) => {
            toast.error("Hata" + err.message);
          });
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then(() => {
            toast.success("hesaba giriş yapıldı");
            navigate("/feed");
          })
          .catch((err) => {
            toast.error("Hata" + err.message);
          });
      }
    },
  });

  return (
    <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
      <div className="flex flex-col gap-1">
        <label className="font-bold">Email</label>
        <input
          type="text"
          name="email"
          className="rounded-md p-2 text-black"
          onChange={formik.handleChange}
          value={formik.values.email}
          autoFocus
          required
        />
      </div>
      <div className=" flex flex-col gap-3 relative ">
        <button
          type="button"
          className="absolute right-2 text-3xl text-black top-10 bg-white px-2"
          onClick={() => {
            setPasswordMode(!passwordMode);
          }}
        >
          {passwordMode ? <IoEyeSharp /> : <HiMiniEyeSlash />}
        </button>
        <label className="font-bold">Şifre</label>
        <input
          className="rounded-md p-2 text-black"
          type={passwordMode ? "text" : "password"}
          name="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
        {!isSingUp && (
          <button
            onClick={() => {
              setModal(true);
            }}
            type="button"
            className="ml-auto text-gray-500 font-semibold text-sm hover:brightness-150"
          >
            Şifreni mi unuttun ?
          </button>
        )}
      </div>
      <button className="flex gap-2 justify-center align-items-center bg-slate-100 px-5 py-2 text-black font-semibold rounded-full hover:brightness-110 mt-10">
        {isSingUp ? "Kaydolun" : "Giriş Yap"}
      </button>

      <p className="text-gray-500 font-semibold mt-10 text-center">
        Hesabınız {isSingUp ? "varsa" : "yoksa"}
        <button
          className="text-blue-800 font-bold ml-2 hover:brightness-150"
          onClick={() => {
            setIsSignUp(!isSingUp);
          }}
        >
          {isSingUp ? "Giriş Yapın" : "Kaydolun"}
        </button>
      </p>
    </form>
  );
};

export default Form;
