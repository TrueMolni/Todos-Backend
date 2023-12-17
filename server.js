const mongoose = require("mongoose");
require("dotenv").config();

const app = require("./app");

mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 3030;
const DB_HOST = process.env.DB_HOST;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(`Server started: http://localhost:${PORT}/api/`);
    })
  )
  .catch((error) => error.message);
