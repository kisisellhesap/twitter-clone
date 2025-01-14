import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { FaImages } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { db } from "../firebase";
const Tweet = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const [img, setImg] = useState(null);
  const fileRef = useRef();
  const onImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
    }
  };
  const deleteImg = () => {
    setImg(null);
    fileRef.current.value = null;
    fileRef.current.files = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value.trim();
    const file = e.target.image.files[0];

    if (!text && !file) return toast.warning("Lütfen gönderinizi belirleyin");

    try {
      setLoading(true);

      const tweets = collection(db, "tweets");

      await addDoc(tweets, {
        text,
        img: null,
        isEdited: false,
        likes: [],
        user: {
          id: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
        },
        createdAt: serverTimestamp(),
      });
      setLoading(false);

      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex gap-3  px-5 mt-3">
      <img
        src={user.photoURL}
        className="rounded-full w-[40px] object-cover self-start"
      />
      <form className="flex flex-col  gap-3 w-full" onSubmit={handleSubmit}>
        <textarea
          name="text"
          className="resize-y max-h-[250px] text-white p-2 rounded-md min-h-[40px] bg-transparent"
          placeholder="Neler oluyor ?"
        ></textarea>

        {img && (
          <div className="flex flex-col gap-2 relative max-h-[500px]">
            <button
              type="button"
              className="text-2xl absolute right-2 top-2"
              onClick={deleteImg}
            >
              <FaXmark />
            </button>
            <img src={img} className="w-full object-cover rounded" alt="" />
          </div>
        )}
        <div className="flex items-center justify-between mt-3">
          <label htmlFor="img" className="text-blue-600 text-xl cursor-pointer">
            <FaImages />
          </label>

          <input
            className="hidden"
            onChange={onImageChange}
            type="file"
            id="img"
            ref={fileRef}
            name="image"
          />

          <button
            type="submit"
            className="flex gap-2 justify-center align-items-center bg-slate-100 px-5 py-2 text-black font-semibold rounded-full hover:brightness-110"
          >
            {loading ? "Loading..." : "Gönder"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default React.memo(Tweet);
