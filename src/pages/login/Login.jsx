import { useState } from "react";
import Button from "../../components/Button";
import Form from "../../components/Form";
import Modal from "../../components/Modal";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
const Login = () => {
  const [modal, setModal] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target[0].value);
    const email = e.target[0].value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.info("Şifrenizi sıfırlama e-postası gönderildi");
        setModal(false);
      })
      .catch((err) => {
        toast.error("Bir şeyler ters gitti  " + err.message);
      });
  };

  return (
    <div className="bg-black min-h-screen text-white grid place-items-center">
      <div className=" w-[50%] flex flex-col gap-10 px-[3rem] py-[1.5rem] max-w-[480px] min-w-[350px]">
        <div className="flex justify-center">
          <img src="x-logo.webp" className="w-[60px]" alt="x logo" />
        </div>

        <h1 className="text-lg font-bold text-center">Twitter'a Giriş Yap</h1>
        <Button />
        <Form setModal={setModal} />
        {modal && (
          <Modal
            close={(e) => {
              const filtered =
                e.target.className.includes("modal") ||
                e.target.className.includes("close") ||
                e.target.className.includes("x-mark");
              // console.log(filtered);
              if (filtered) {
                setModal(false);
              }
            }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <h2 className="text-2xl font-semibold">Şifreni mi unuttun ?</h2>
              <p className="text-gray-400 text-sm">
                Şifrenizi yenilemek için lütfen email adresinizi girin.
              </p>
              <input
                type="email"
                placeholder="email adress.."
                className="rounded-md p-2 text-black"
              />
              <button className="flex gap-2 justify-center align-items-center bg-slate-100 px-5 py-2 text-black font-semibold rounded-full hover:brightness-110 mt-10">
                Mail Gönder
              </button>
            </form>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Login;
