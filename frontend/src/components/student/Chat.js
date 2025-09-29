import React, { useEffect, useState, useCallback,useContext } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const navigate = useNavigate();

  //Session
  // const {
  //   state: { student },
  // } = useContext(Context);
  // useEffect(() => {
  //   if (student === null) 
  //   navigate("/studentLogin");
  //  }, [student]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      let messageData;

      if (currentMessage.startsWith("data:image/")) {
        // Handle image message
        messageData = {
          room: room,
          author: username,
          message: currentMessage,
          type: "image",
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
      } else if (isValidUrl(currentMessage)) {
        // Handle link message
        messageData = {
          room: room,
          author: username,
          message: currentMessage,
          type: "link",
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
      } else {
        // Handle text message
        messageData = {
          room: room,
          author: username,
          message: currentMessage,
          type: "text",
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        };
      }

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleReceiveMessage = useCallback((data) => {
    setMessageList((list) => [...list, data]);
  }, []);

  useEffect(() => {
    socket.on("receive_message", handleReceiveMessage);
    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [socket, handleReceiveMessage]);

  const isValidUrl = (url) => {
    try {
      const { protocol } = new URL(url);
      return protocol === "http:" || protocol === "https:";
    } catch (error) {
      return false;
    }
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const dataUrl = reader.result;
        setCurrentMessage(dataUrl);
      };
    } else {
      alert("Please select an image file.");
    }
  };


return (
  <div className="chat-window">
      <div className="chat-header">
        <p>Live Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
                key={messageContent.time}
              >
                <div>
                  {messageContent.type === "image" ? (
                    <div className="message-content">
                      <img height={"150%"}width={"150%"} src={messageContent.message} alt="message" />
                    </div>
                  ) : (
                    <div className="message-content">
                      <p>{messageContent.message}</p>
                    </div>
                  )}
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Type here..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>►</button>
        <input type="file" accept="image/*" onChange={handleFileInputChange} />
      </div>
    </div>
  );
}


export default Chat;