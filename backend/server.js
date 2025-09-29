import express, { Router } from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";
const morgan = require("morgan");
require("dotenv").config();
const { Server } = require("socket.io");
const http = require("http");

/////fileupload
const path = require('path');
const fileRoute = require('./ruutesf/file');
const eefileRoute = require('./ruutesf/eefile');
const ceAssignment = require("./ruutesf/ceAssignment")
const eeAssignment = require("./ruutesf/eeAssignment")
const submitAssce= require('./ruutesf/submitassce')
const submitAssee= require('./ruutesf/submitassee')
const assresultce= require('./ruutesf/assignmentresultce')
const assresultee= require('./ruutesf/assignmentresultee')
/////////


const csrfProtection = csrf({ cookie: true });
// create express app
const app = express();
/////
app.use(cors());
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(fileRoute);
app.use(eefileRoute);
app.use(ceAssignment);
app.use(eeAssignment);
app.use(submitAssce);
app.use(submitAssee);
app.use(assresultce);
app.use(assresultee);
//////
// db
mongoose
  .connect(process.env.DATABASE, {
  
  })
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

// apply middlewares

app.use(express.json());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});


// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));


///////////******* */ chat
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


server.listen(8001, () => {
  console.log("SERVER RUNNING");
});
// ////////*************** */
