require("dotenv").config();
const express = require("express");
const http = require("http");
const helmet = require("helmet");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const MESSAGES = Object.freeze({
  INCREMENT: "increment",
  DECREMENT: "decrement",
});

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(helmet());

io.on("connection", (socket) => {
  console.log("user connection");
});

server.listen(process.env.PORT || 5050, () =>
  console.log(`SERVER STARTED AT PORT ${process.env.PORT}`)
);
