import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegComment } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { CiShare2 } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { MdEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import moment from "moment";
import Modal from "../components/Modal";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/index";
import { toast } from "react-toastify";

const Post = ({ tweet }) => {
  const isOwn = tweet.user.id === auth.currentUser.uid;
  const isLiked = tweet.likes.includes(auth.currentUser.uid);
  const like = () => {
    const tweetRef = doc(db, "tweets", tweet.id);

    updateDoc(tweetRef, {
      likes: isLiked ? arrayRemove(tweet.user.id) : arrayUnion(tweet.user.id),
    });
  };

  const deleteTweet = () => {
    const tweetRef = doc(db, "tweets", tweet.id);
    deleteDoc(tweetRef)
      .then(() => {
        toast.info(" Tweet Silindi");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="flex px-1  relative gap-3">
      <img
        src={tweet.user.photoURL}
        className="w-[40px] h-[40px] rounded-full"
        referrerPolicy="no-refferer"
      />
      <div className="flex flex-col gap-2 justify-center w-full">
        <header className="flex gap-2 items-center">
          <h3>{tweet.user.name}</h3>
          <span className="text-gray-500 max-sm:hidden">
            @{tweet.user.name.replaceAll(" ", "_")}
          </span>
          <span className="text-gray-500 max-sm:hidden">
            {moment(tweet.createdAt?.toDate()).fromNow(true)}
          </span>

          {isOwn && (
            <div className="ml-auto modal ">
              <div
                className="absolute rounded-lg  flex flex-col overflow-hidden right-5 hidden modal-set
"
              >
                <button
                  className="flex gap-2  items-center bg-slate-100 px-5 text-black font-semibold  hover:brightness-110 w-full"
                  onClick={deleteTweet}
                >
                  <AiFillDelete />
                  <span>Delete</span>
                </button>
              </div>
              <button className="ml-auto">
                <RxHamburgerMenu />
              </button>
            </div>
          )}
        </header>
        <div className="">
          <p className=" break-words max-w-[466px]"> {tweet.text}</p>
        </div>

        <footer className="flex gap-3 items-center justify-between text-xl mt-4">
          <button>
            <FaRegComment />
          </button>
          <button>
            <FaRetweet />
          </button>
          <div
            onClick={like}
            className="flex items-center gap-2 cursor-pointer"
          >
            <button>{isLiked ? <FaHeart /> : <CiHeart />}</button>
            <span className="text-sm">{tweet.likes.length}</span>
          </div>

          <button>
            <CiShare2 />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Post;
