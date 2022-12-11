require('dotenv').config();

const mongoose = require("mongoose");
const DB =
  `mongodb+srv://${process.env.MONGODB}`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => console.log(err));
