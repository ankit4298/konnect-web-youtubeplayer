import React, { useEffect, useState } from "react";
import { externalSocket } from "../services/SocketService.js";

const SocketIntegration = (props) => {
  const [socket, setSocket] = useState(null);

  
  useEffect(() => {
    console.log('joined ',props.isJoined)
    if (props.isJoined != null && props.isJoined == true) {
      console.log("user joining");


      if (socket != null) {
        // this socket is fired on joining new room / existing room
        socket.emit('new user','DEBUG_User'+Date.now().toString(),function(data){
          console.log('in callback...');
      })

      // this socket is fired on joining new room / existing room
      socket.emit('new room', '1234', function(data) {
          console.log("How many Times emitted?");
          // This should only call back if the client is the host
          if (data) {
              console.log("Host is syncing the new socket!");
          }
      });
    }  


      // set socket object which will add new user
      // setSocket(externalSocket.socket);
    }
    else if(socket != null && props.isJoined != null && props.isJoined == false){
        console.log('Disconnected!!');
        socket.emit('forceDisconnect');
    }
  }, [props.isJoined]);

  useEffect(() => {
    if (socket != null && props.checkDebug != null) {
      console.log(socket.id);
      socket.emit("connectedStatus", "123", (e) => console.log(e));
    }
  }, [props.checkDebug]);

  useEffect(() => {

    console.log("INIT Socket connection");
    setSocket(externalSocket.socket);


    if (socket != null) {
      socket.off("disconnect");
      socket.on("disconnect", () => {
        console.log("disconnect");
        socket.open();
        socket.emit("new user", "DEBUG_USERNAME", function (data) {
          console.log("in callback...");
        });

        // this socket is fired on joining new room / existing room
        socket.emit("new room", "1234", function (data) {
          // This should only call back if the client is the host
          if (data) {
            console.log("Host is syncing the new socket!");
          }
        });
      });

      // Update Peoples List when new user joins
      // socket.off('updatePeoplesList')
      socket.off("updatePeoplesList");
      socket.on("updatePeoplesList", function (data) {
        console.log("new one joined...");
        // this.getRoomDetails();
      });
    }
  }, []);











  return null;
};
export default SocketIntegration;
