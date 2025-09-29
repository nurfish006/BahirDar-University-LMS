import io from "socket.io-client";
import { useState ,useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";
import "./LiveChat.css";
import Chat from "./Chat";
import Navbar from "./StudentNavbar";

const socket = io.connect("http://localhost:8001");

function StudentLiveChat() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState("");
  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        {!showChat ? (
          <div className="w-full max-w-xs p-6 bg-white rounded-md shadow-md">
            <h3 className="text-lg font-medium mb-4">Join a Chat</h3>
            <input
              type="text"
              placeholder="Username..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button
              className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600"
              onClick={joinRoom}
            >
              Join a Room
            </button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
    </>
  );
}

export default StudentLiveChat;