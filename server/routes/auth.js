const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  setAvatar,
  logOut,
} = require("../controllers/userController.js");
// Create express Object
const router = express.Router();

// Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/allusers/:id", getAllUsers);
router.post("/setavatar/:id", setAvatar);
// router.post("/logout/:id", logOut);

module.exports = router;
