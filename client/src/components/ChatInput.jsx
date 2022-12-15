import React, { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { IoMdSend } from "react-icons/io";

const ChatInput = ({ hanldeSendMsg }) => {
  const [msg, setMsg] = useState("");

  const sendChat = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      hanldeSendMsg(msg);
      setMsg("");
    }
  };

  return (
    <div className=" flex justify-between gap-6 bg-[#080420] items-center ">
      <div className="button-container flex items-center gap-4 pl-2 text-white">
        <div className="emoji relative">
          <BsEmojiSmileFill className="text-[#ffff00c8] text-2xl cursor-pointer" />
        </div>
      </div>
      <form
        className="input-container flex items-center w-[100%] justify-end rounded-3xl gap-8 bg-[#ffffff34] "
        onSubmit={(e) => sendChat(e)}
      >
        <input
          type="text"
          placeholder="type your message here"
          className="w-[90%] h-[60%] pl-4 text-[1.2rem]  bg-transparent   text-white border-none outline-none "
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button
          type="submit"
          className=" flex justify-center items-center rounded-3xl bg-[#9a86f3] border-none "
        >
          <IoMdSend className="text-white text-2xl " />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
