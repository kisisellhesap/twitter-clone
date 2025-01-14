import React, { useState } from "react";
import Tweet from "../../components/Tweet";
import Post from "../../components/Post";
import { useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";

const Main = ({ user }) => {
  const [tweetsData, setTweetsData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const tweets = collection(db, "tweets");
    const q = query(tweets, orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const temp = [];

      snapshot.docs.forEach((doc) => temp.push({ ...doc.data(), id: doc.id }));

      setTweetsData(temp);
    });

    return () => unsub();
  }, []);
  return (
    <div className="w-full  max-w-[550px] min-w-[400px]">
      <header className=" text-xl border-b-[1px] border-white/20 px-7 min-h-[100px] flex items-center">
        Anasayfa
      </header>
      <Tweet user={user} />

      <div className="flex flex-col gap-5 w-[100%] px-3 my-2">
        {tweetsData?.map((tweet, key) => {
          return (
            <Post
              key={key}
              tweet={tweet}
              setIsOpen={() => {
                setIsOpen(true);
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Main;
