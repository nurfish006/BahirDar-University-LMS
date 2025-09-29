import io from "socket.io-client";
import { useState,useContext,useEffect } from "react";
import { Context } from "../../context";
import { useNavigate } from "react-router-dom";
import Chat from "../student/Chat";
import Navbar from "./DeptNav";
import Contact from "../home/Contact";
import Footer from "../home/Footer";

const socket = io.connect("http://localhost:8001");

function LiveChathdce() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState("");
  const navigate=useNavigate();
//SESSION
// const {
//   state: { head },
// } = useContext(Context);
// useEffect(() => {
//   if (head === null) navigate("/headlogin");
//  }, [head]);
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
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-lg font-medium mb-4">Join A Chat</h3>
            <input
              type="text"
              placeholder="username..."
              className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            <input
              type="text"
              placeholder="Room ID..."
              className="border border-gray-300 rounded-lg py-2 px-4 mb-4 w-full"
              onChange={(event) => {
                setRoom(event.target.value);
              }}
            />
            <button
              onClick={joinRoom}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Join A Room
            </button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
      <div>
        <Contact/>
        <Footer/>
      </div>
    </>
  );
}

export default LiveChathdce;