import { onAuthStateChanged } from "firebase/auth";
import Aside from "./Aside";
import Main from "./Main";
import Nav from "./Nav";
import { auth } from "../../firebase";
import { useEffect, useState } from "react";
const Feed = () => {
  const [user, setUser] = useState();

  // useEffect(() => {
  //   const unsub = onAuthStateChanged(auth, user)
  //     .then(() => {
  //       setUser(user);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });

  //   return () => unsub();
  // }, []);

  return (
    <div className="bg-black min-h-screen text-white flex">
      <Aside user={user} />
      <Main user={user} />
      <Nav />
    </div>
  );
};

export default Feed;
