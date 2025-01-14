import React from "react";
import { navSections } from "../../utils/constants";
import { Link } from "react-router-dom";

import { signOut } from "firebase/auth";

import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ImExit } from "react-icons/im";

const Aside = ({ user }) => {
  console.log(user);
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
    <div className="border-r-[1px] border-white/20 p-6 min-w-[250px] max-md:min-w-[70px] max-w-[400px] flex flex-col sticky left-0 top-0 h-[100vh]">
      <img src="x-logo.webp" className="w-[60px] mx-auto mb-5" alt="" />
      <nav className="flex flex-col gap-2">
        {navSections.map((item, i) => (
          <Link
            className=" lg:w-full p-2 rounded-full  flex gap-4 items-center justify-center md:justify-start text-2xl md:text-xl hover:bg-white/20"
            key={i}
          >
            {item.icon}

            <span className="max-md:hidden">{item.title}</span>
          </Link>
        ))}
      </nav>

      <img
        src={user?.photoURL}
        className="rounded-full w-[50px] mt-auto mx-auto"
        alt=""
        referrerPolicy="no-referrer"
      />
      <button
        onClick={handleClick}
        className="lg:w-full p-2 rounded-full  flex gap-4 items-center justify-center lg:justify-start text-2xl lg:text-xl hover:bg-white/20 mx-auto  mt-2"
      >
        <ImExit />
        <span className="max-lg:hidden">Çıkış Yap </span>
      </button>
    </div>
  );
};

export default Aside;
