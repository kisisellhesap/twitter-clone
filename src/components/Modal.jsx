import React from "react";
import { FaXmark } from "react-icons/fa6";

const Modal = ({ children, close }) => {
  return (
    <div
      className="bg-white/10 backdrop-blur-sm absolute inset-0 flex items-center justify-center modal"
      onClick={close}
    >
      <div className="bg-black p-7 rounded-lg flex flex-col gap-3 w-[60%] min-w-[350px] max-w-[450px]">
        <button
          onClick={close}
          className="text-2xl cursor-pointer ml-auto x-mark"
        >
          <FaXmark className="pointer-events-none" />
        </button>

        <div className="flex flex-col gap-3">{children}</div>
        <button
          className="close flex gap-2 justify-center align-items-center bg-slate-100 px-5 py-2 text-black font-semibold rounded-full hover:brightness-110"
          onClick={close}
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

export default Modal;
