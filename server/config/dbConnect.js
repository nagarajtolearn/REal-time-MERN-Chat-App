const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(`Database connection Successfull!`);
    } else {
      throw new Error("Error connecting to database");
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = dbConnect;
