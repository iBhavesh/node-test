import express from "express";
import http from "http";
import { getIO, IO } from "./io";
import cors from "cors";
import { Socket } from "socket.io";
import { stringify } from "querystring";

interface ISocket extends Socket {
  username?: string;
}

type User = {
  userId: string;
  username: string;
};

let usernames: User[] = [];
const port = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
IO(server);
const io = getIO();

io.on("connection", (socket: ISocket) => {
  usernames.push({
    userId: socket.id,
    username: socket.username!,
  });
  console.log(usernames);
  socket.emit("user-connected", {
    userId: socket.id,
    username: socket.username,
  });

  socket.on("disconnect", (reason) => {
    usernames = usernames.filter((element) => element.userId !== socket.id);
    console.log(usernames);
    socket.emit("user-disconnected", {
      userId: socket.id,
      username: socket.username,
    });
  });

  socket.on("send-message", ({ content, to }) => {
    const user = usernames.find((element) => element.username === to);
    console.log(user);
    socket.to(user!.userId).emit("message-received", {
      content,
      from: socket.username!,
    });
  });
});

io.use((socket: ISocket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) return next(new Error("Invalid Username!"));

  const exists = usernames.find((element) => element === username);
  if (exists) return next(new Error("Username Exists"));

  socket.username = username;
  next();
});

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/send-message", (req, res) => {
  res.send("Posted succewssfully!");
  console.log(req.body);
});

server.listen(port, () => {
  console.log("listening at port " + port);
});
