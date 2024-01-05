const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDatabase } = require("./config/mongo.config");
const routes = require("./routes/route");

const app = express();

const PORT = process.env.PORT | 8080;

connectDatabase();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/api/v1", routes);

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
