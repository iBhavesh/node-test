import { ReactNode } from "react";
import { Message } from "./App";
import "./ChatBox.css";
import MessageItem from "./MessageItem";

type Props = {
  messages: Message[];
};

const ChatBox = (props: Props) => {
  let messages: ReactNode = <p>No Message Found</p>;
  if (props.messages.length > 0)
    messages = props.messages.map((message, index) => (
      <MessageItem key={index} message={message} />
    ));
  return <div className="chat-box">{messages}</div>;
};

export default ChatBox;
