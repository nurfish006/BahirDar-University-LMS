import io from "socket.io-client";
import { useState,useContext,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../../context";
import Chat from "../../student/Ee/Chat";
import Navbar from "./EeTeacherNav";
import Contact from "../../home/Contact";
import Footer from "../../home/Footer";


const socket = io.connect("http://localhost:8001");

function LiveChatEE() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState("");
  const navigate = useNavigate();
  //SESSION
  // const {
  //   state: { teacher },
  // } = useContext(Context);


  // useEffect(() => {
  //   if (teacher === null) navigate("/teacherslogin");
  // }, [teacher]);
  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };
  
  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {!showChat ? (
          <div className="bg-white shadow-lg rounded-lg px-8 py-6">
            <h3 className="text-3xl font-bold mb-4">Join a Chat</h3>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Username..."
                className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Room ID..."
                className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:border-green-500"
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-400 text-white py-2 px-4 rounded-lg cursor-pointer"
              onClick={joinRoom}
            >
              Join a Room
            </button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
      <div className="bg-gray-800 text-white py-8"><Contact/></div>
      <div className="bg-gray-800 text-white py-8"><Footer/></div>
    </div>
  );
}

export default LiveChatEE;