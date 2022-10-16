import React, {useEffect, useState} from 'react';

const SocketInegration = (props) => {
  useEffect(() => {
    console.log(props)
    if (props == null) {
      return;
    }

    if (props.joinRoom == true) {
        handleJoinRoom();
    }
  }, [props.joinRoom]);

  return <div>SocketInegration</div>;
};

const handleJoinRoom = () =>{
    console.log("joining room");
}

export default SocketInegration;
