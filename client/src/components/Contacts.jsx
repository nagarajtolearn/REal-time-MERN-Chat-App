import React, { useState, useEffect } from "react";
import logo from "../assets/logo.svg";

const Contacts = ({ contacts, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    (async () => {
      const user = await JSON.parse(localStorage.getItem("chat-app-user"));
      setCurrentUserName(user.username);
      setCurrentUserImage(user.avatarImage);
    })();
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserName && currentUserImage && (
        <div className="grid grid-rows-[10%_75%_15%] overflow-hidden bg-[#080420] ">
          <div className="brand flex justify-center items-center gap-4 mt-2 mb-2">
            <img src={logo} alt="logo" className="h-[2rem]" />
            <h3 className="text-white uppercase">Chit-Chat</h3>
          </div>
          <div className="contacts flex flex-col items-center overflow-auto gap-3 ">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }  bg-[#ffffff34] min-h-[5rem] cursor-pointer w-[90%] rounded-[0.2rem] flex items-center transition:0.5s ease-in-out`}
                key={index}
                onClick={() => changeCurrentChat(index, contact)}
              >
                <div className="avatar">
                  <img
                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                    alt="avatar"
                    className="h-12"
                  />
                </div>
                <div className="username text-white">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}
          </div>
          <div className="current-user bg-[#0d0d30] flex justify-center items-center gap-8 h-20 rounded-t-[1rem] mt-4 ">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="user"
                className="h-16"
              />
            </div>
            <div className="username">
              <h2 className="text-white">{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
