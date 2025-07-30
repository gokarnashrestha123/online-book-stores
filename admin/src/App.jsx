import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Login from "./components/Login";

export const backend_url = import.meta.env.VITE_BACKEND_URL;
export const currency = "$";

const App = () => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <main>
      <ToastContainer />
      {token === "" ? (
        <Login setToken={setToken} />
      ) : (
        <div style={{ display: "flex" }} className="appWrapper">
          <Sidebar token={token} setToken={setToken} />
          <div style={{ flex: 1, padding: "20px" }}>
            <Routes>
              <Route path="/" element={<Add token={token} />} />
              <Route path="/list" element={<List token={token} />} />
              <Route path="/orders" element={<Orders token={token} />} />
            </Routes>
          </div>
        </div>
      )}
    </main>
  );
};

export default App;
