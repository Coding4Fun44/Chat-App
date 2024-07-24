require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const chatRoutes = require("./routes/chatRoutes");
const userRoutes = require("./routes/userRoutes");
const dmRoutes = require("./routes/dmRoutes");

const app = express();
app.use(express.json());

app.use("/chat-api", chatRoutes);
app.use("/user-api", userRoutes);
app.use("/dm-api", dmRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("App listening on port 5000 and connected to db");
    });
  })
  .catch((error) => {
    console.log(error);
  });

/*app.get('/', (req, res) => {
    res.json({mssg: 'Welcome'})
})*/
