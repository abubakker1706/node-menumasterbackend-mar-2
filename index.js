import express from "express";
import Routes from "./Routes/Routes.js";
import bodyParser from "body-parser";

import cors from 'cors';

const app = express();

const port = 8000;
app.use(cors())
app.use(express.json());
app.use(bodyParser.json());
app.use("/routes", Routes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Listening on port", port);
});
