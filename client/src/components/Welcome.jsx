import React from "react";
import robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <div className=" flex justify-center items-center flex-col">
      <img src={robot} alt="robot" className="h-[20rem]" />
      <h1 className="text-white font-bold">
        Welcome <span className="text-[#4e00ff]">{currentUser.username} !</span>
      </h1>
      <h3 className="text-white font-bold">
        Please Select a Chat to Start Messaging.
      </h3>
    </div>
  );
};

export default Welcome;
