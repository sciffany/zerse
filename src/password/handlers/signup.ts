import Room from "common/features/room";
import Lounge from "common/features/lounge";

type SignupDetails = {
  userName: string;
  roomName: string;
};

export default function handleSignup(socket, gameIo, lounge: Lounge) {
  socket.on("signUp", handler(socket, gameIo, lounge));
}

const handler =
  (socket, gameIo, lounge: Lounge) =>
  ({ userName, roomName }: SignupDetails) => {
    console.log("sign up received from", userName);
    try {
      const room: Room =
        lounge.findRoomByName(roomName) || lounge.createRoom(roomName);

      const user = room.createUser(userName, socket.id);

      socket.join(room.roomname);
      socket.emit("signUpSuccess");

      socket.room = room;
      socket.user = user;

      gameIo.to(room.roomname).emit("roomUsers", room.getUserNames());
      socket.emit("roomPositions", room.getUsernamesByPosition());
    } catch (err) {
      socket.emit("errorMessage", err.message);
    }
  };
