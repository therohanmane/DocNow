require("dotenv").config();
const app = require("./app");
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

require("./jobs/reminderJob");

app.listen(5001, () => {
  console.log("Server running on port 5001");
});
