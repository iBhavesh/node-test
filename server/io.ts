import { Server } from "socket.io";

let io: Server;

export const IO = (server: any) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
};

export const getIO = () => {
  if (!io) throw new Error("No IO instance is available");

  return io;
};
