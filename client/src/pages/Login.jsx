import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import logo from "../assets/logo.svg";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { username, password } = values;

  const handleValidation = () => {
    if (username === "") {
      toast.error(`Username is required.`, toastOptions);
      return false;
    } else if (password === "") {
      toast.error(`Password is required.`, toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      if (data.success === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.success === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/");
      }
    }
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer />
      <div className="container flex justify-center items-center">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="form flex justify-center items-center flex-col gap-5 "
        >
          <div className="brand">
            <img src={logo} alt="logo" className="h-20" />
            <h1 className="text-center font-extrabold  uppercase text-white">
              Chit-Chat
            </h1>
          </div>

          <input
            type="username"
            placeholder="username"
            name="username"
            onChange={(e) => handleChanges(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChanges(e)}
          />

          <button
            type="submit"
            className=" submit bg-purple-600 border-r-purple-50 "
          >
            Login
          </button>
          <span className="">
            Don't have an account ?{" "}
            <Link className="" to="/register">
              Create One.
            </Link>{" "}
          </span>
        </form>
      </div>
    </>
  );
};

export default Login;
