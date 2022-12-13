const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

// Register User
const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.json({
        message: "User already exists, Please login",
        success: false,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      req.body.password = hashedPassword;
      const user = await User.create(req.body);
      res
        .status(201)
        .json({ user, message: "User register successful", success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!user) {
      res.status(500).json({ message: "Invalid Credentials", success: false });
    } else if (!verifyPassword) {
      res.status(500).json({ message: "Invalid Credentials", success: false });
    } else {
      return res.status(200).json({ user, success: true });
    }
  } catch (error) {
    console.log(error);
  }
};

// Set Avatar
const setAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get All Users
const getAllUsers = async (req, res) => {
  try {
    const id = req.params.id;
    const users = await User.find({ _id: { $ne: id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, loginUser, setAvatar, getAllUsers };
