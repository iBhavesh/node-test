import { FormEventHandler, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatBox from "./ChatBox";
import Form from "./Form";
import "./App.css";

export type Message = {
  receiver: string;
  sender: string;
  message: string;
  isSender: boolean;
};

let username: string | null;
const socket = io("http://localhost:3001", { autoConnect: false });

socket.on("user-connected", (user) => {
  console.log(user);
});

function App() {
  const [isUsernameSelected, setIsUsernameSelected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const usernameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    socket.on("message-received", ({ content, from }) => {
      const message = {
        receiver: username!,
        sender: from,
        message: content,
        isSender: false,
      };
      console.log(message);
      setMessages((prev) => [...prev, message]);
    });
  }, []);

  const sendMessageHandler = (content: string, to: string) => {
    const message = {
      message: content,
      sender: username!,
      receiver: to,
      isSender: true,
    };
    setMessages((prev) => [...prev, message]);
    socket.emit("send-message", {
      content,
      to,
    });
  };

  const usernameSubmitHandler: FormEventHandler = (event) => {
    event.preventDefault();
    setIsUsernameSelected(true);
    username = usernameInputRef.current!.value;
    socket.auth = { username };
    socket.connect();
  };

  if (!isUsernameSelected)
    return (
      <form onSubmit={usernameSubmitHandler}>
        <div>
          <label htmlFor="email">Email</label>
          <input ref={usernameInputRef} type="email" name="email" id="email" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    );

  return (
    <div className="container">
      <ChatBox messages={messages} />
      <div className="form-container">
        <Form onMessageSend={sendMessageHandler} />
      </div>
    </div>
  );
}

export default App;
