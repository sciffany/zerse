import Lounge from "common/features/lounge";
import { PasswordSocket } from "password/passwordTypes";

export default function handleSignout(
  socket: PasswordSocket,
  gameIo,
  lounge: Lounge
) {
  const signOut = () => {
    const { room, user } = socket;
    console.log("User disconnected");
    if (!room || !user) {
      return;
    }
    room.deleteUser(socket.id);

    gameIo
      .to(room.roomname)
      .emit("roomPositions", room.getUsernamesByPosition());

    if (room.isEmpty()) {
      lounge.deleteRoom(room.roomname);
    } else {
      gameIo.to(room.roomname).emit("disconnect", {
        listOfNames: room.getUserNames(),
      });
    }
  };

  socket.on("signOut", signOut);
  socket.on("disconnect", signOut);
}
