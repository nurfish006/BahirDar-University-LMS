import io from "socket.io-client";
import {useNavigate} from "react-router-dom";
import { Context } from "../../context";
import { useState ,useEffect,useContext} from "react";
import Chat from "../student/Chat";
import Navbar from "./AdminNavbar";
import Contact from "../home/Contact";
import Footer from "../home/Footer";
import { toast } from "react-hot-toast";

const socket = io.connect("http://localhost:8001");

function LiveChatA() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState("");
 const navigate=useNavigate();
  //Session
const {
  state: { admin },
} = useContext(Context);
useEffect(() => {
  if (admin === null) 
  navigate("/adminlogin");
 }, [admin]);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
    else if(!username && !room){
      toast.error("please enter Username and Room id")
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h3 className="text-lg font-semibold mb-4">JOIN A CHAT</h3>
        {!showChat ? (
          <div className="bg-white rounded-lg shadow-lg p-8">
         
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter your username..."
                className="border rounded-md py-2 px-3 bg-gray-100"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </div>
            <div className="flex flex-col mb-4">
              <label className="text-gray-700 font-bold mb-2">Room ID</label>
              <input
                type="text"
                placeholder="Enter the room ID..."
                className="border rounded-md py-2 px-3 bg-gray-100"
                value={room}
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
            </div>
            <button
              onClick={joinRoom}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Join a Room
            </button>
          </div>
        ) : (
          <Chat socket={socket} username={username} room={room} />
        )}
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default LiveChatA;