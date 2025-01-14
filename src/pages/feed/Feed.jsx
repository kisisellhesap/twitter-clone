import Aside from "./Aside";
import Main from "./Main";
import Nav from "./Nav";
import { useOutletContext } from "react-router-dom";
const Feed = () => {
  const user = useOutletContext();

  return (
    <div className="bg-black min-h-screen text-white flex justify-center ">
      <Aside user={user} />
      <Main user={user} />
      <Nav />
    </div>
  );
};

export default Feed;
