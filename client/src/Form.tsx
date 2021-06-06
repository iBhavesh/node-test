import React, { useRef } from "react";
import "./Form.css";

type Props = {
  onMessageSend: (content: string, to: string) => void;
};

const Form = (props: Props) => {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageInputRef = useRef<HTMLTextAreaElement>(null);

  const formSubmitHandler: React.FormEventHandler = (event) => {
    event.preventDefault();
    const email = emailInputRef.current!.value;
    const message = messageInputRef.current!.value;
    props.onMessageSend(message, email);
  };

  return (
    <form onSubmit={formSubmitHandler} method="post" className="form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          ref={emailInputRef}
          autoComplete="off"
          type="email"
          id="email"
          name="email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">Message:</label>
        <textarea ref={messageInputRef} id="message" name="message" rows={5} />
      </div>
      <div className="form-group">
        <button type="submit">Send</button>
      </div>
    </form>
  );
};

export default Form;
