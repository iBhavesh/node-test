import { Message } from "./App";
import "./MessageItem.css";

type Props = {
  message: Message;
};

const MessageItem = ({ message }: Props) => {
  const itemClass = message.isSender ? "right" : "left";
  return (
    <div className={"messageItem-" + itemClass}>
      <p className={itemClass}>{message.message}</p>
    </div>
  );
};

export default MessageItem;
