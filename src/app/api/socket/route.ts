import { Server as NetServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import type { Server as SocketServerType, Socket } from "socket.io";

let io: SocketServerType | undefined;

export default function SocketHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!res.socket.server.io) {
    // Initialize Socket.io server
    const httpServer: NetServer = res.socket.server as any;
    io = new SocketIOServer(httpServer, {
      path: "/api/socket",
    });

    io.on("connection", (socket: Socket) => {
      console.log("User connected", socket.id);

      // Listen for incoming messages and broadcast them
      socket.on("sendMessage", (message: string) => {
        io?.emit("receiveMessage", message);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
}
