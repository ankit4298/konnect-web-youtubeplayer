import io from "socket.io-client";
// var socket = io("https://konnect-app-server.herokuapp.com/");
var socket = io("http://localhost:9999/");
export const externalSocket = {
  socket: socket,
};
