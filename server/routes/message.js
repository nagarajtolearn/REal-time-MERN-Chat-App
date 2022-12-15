const express = require("express");
const { addMsg, getAllMsg } = require("../controllers/messageController.js");
const router = express.Router();

router.post("/addmsg", addMsg);
router.post("/getmsg", getAllMsg);

module.exports = router;
