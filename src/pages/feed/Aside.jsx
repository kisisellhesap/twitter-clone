import React from "react";
import { navSections } from "../../utils/constants";
import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

const Aside = ({ user }) => {
  const navigate = useNavigate();
  const handleClick = () =>
    signOut(auth)
      .then(() => {
        toast.info("Başarıyla çıkış yapıldı");
        navigate("/");
      })
      .catch((err) => {
        toast.info("Bir problem oldu" + err.message);
      });

  return (
    <div className="border-r-[1px] border-white/20 p-6 min-w-[70px] max-w-[400px] flex flex-col">
      <img src="x-logo.webp" className="w-[60px] mx-auto mb-10" alt="" />
      <nav className="flex flex-col gap-2">
        {navSections.map((item, i) => (
          <Link
            className=" lg:w-full p-2 rounded-full  flex gap-4 items-center justify-center lg:justify-start text-2xl lg:text-xl hover:bg-white/20"
            key={i}
          >
            {item.icon}

            <span className="max-lg:hidden">{item.title}</span>
          </Link>
        ))}
      </nav>

      <button
        onClick={handleClick}
        className="lg:w-full p-2 rounded-full  flex gap-4 items-center justify-center lg:justify-start text-2xl lg:text-xl hover:bg-white/20 mx-auto mt-auto"
      >
        <ImExit />
        <span className="max-lg:hidden">Çıkış Yap </span>
      </button>
    </div>
  );
};

export default Aside;
