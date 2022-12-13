import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const toastOptions = {
    position: "top-center",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  const { username, email, password, confirmPassword } = values;
  const handleValidation = () => {
    if (username.length < 3) {
      toast.error(
        `Username should be greater than 3 characters.`,
        toastOptions
      );
      return false;
    } else if (email === "") {
      toast.error(`Email is required.`, toastOptions);
      return false;
    } else if (password.length < 5) {
      toast.error(`Password should be atleast 5 characters.`, toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error(
        `Password and confirm password should be same.`,
        toastOptions
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      const { email, username, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });

      if (data.success === false) {
        toast.error(data.msg, toastOptions);
      }
      if (data.success === true) {
        localStorage.setItem("chat-app-user", JSON.stringify(data.user));
        navigate("/setAvatar");
      }
    }
  };

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);
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
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleChanges(e)}
          />
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => handleChanges(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChanges(e)}
          />
          <input
            type="password"
            placeholder="confirmPassword"
            name="confirmPassword"
            onChange={(e) => handleChanges(e)}
          />
          <button
            type="submit"
            className=" submit bg-purple-600 border-r-purple-50 "
          >
            Create User
          </button>
          <span className="">
            Already have an account,{" "}
            <Link className="" to="/login">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </>
  );
};

export default Register;
