import React, { useState, useEffect } from "react";
import Contacts from "../components/Contacts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    })();
  }, [currentUser]);

  return (
    <div className="container flex justify-center items-center">
      <div className="grid grid-cols-[25%,75%] bg-[#00000076] w-[85vw] h-[85vh]">
        <Contacts contacts={contacts} currentUser={currentUser} />
      </div>
    </div>
  );
};

export default Chat;
