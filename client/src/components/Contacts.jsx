import axios from "axios";
import React, { useState, useEffect } from "react";
import { logo } from "../assets/logo.svg";
import { allUsersRoute } from "../utils/APIRoutes";

const Contacts = ({ contacts, currentUser }) => {
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
  return (
    <>
      <div></div>
    </>
  );
};

export default Contacts;
