const mongoose = require("mongoose");

const connString = `mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_PW}@cluster.icwey.mongodb.net/shop?retryWrites=true&w=majority`

const connectDB = () => {
  mongoose
    .connect(connString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log("MongoDB connection SUCCESS!!"))
    .catch((err) => {
      console.log("MongoDB connection FAILURE!!");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectDB;
