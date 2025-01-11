import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Feed from "./pages/feed/Feed";
import Protected from "./components/Protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Protected />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/settings" element={<h1>Ayarlar</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
