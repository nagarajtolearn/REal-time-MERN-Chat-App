const MessageModel = require("../models/messageModel.js");

// Add message || POST
const addMsg = async (req, res) => {
  try {
    const { from, to, message } = req.body;
    const data = await MessageModel.create({
      message: { text: message },
      users: [from, to],
      sender: from,
    });

    if (data) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (error) {
    console.log(error);
  }
};

// Get all message || POST
const getAllMsg = async (req, res) => {
  try {
    const { from, to } = req.body;

    const messages = await MessageModel.find({
      users: {
        $all: [from, to],
      },
    }).sort({ updatedAt: 1 });

    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { addMsg, getAllMsg };
