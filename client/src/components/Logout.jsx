import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return (
    <button
      className=" flex justify-center items-center p-2 bg-[#9a86f3] border-none rounded-[0.5rem] cursor-pointer "
      onClick={handleLogout}
    >
      <BiPowerOff />
    </button>
  );
};

export default Logout;
