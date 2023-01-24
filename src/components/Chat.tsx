import { useState } from "react";
import { IChatLog } from "../types";

interface IChatProps {
  messages: IChatLog[];
  onSubmit: (message: string) => void;
}

const Chat = (props: IChatProps) => {
  const { onSubmit, messages } = props;
  const [currentMessage, setCurrentMessage] = useState("");

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const Message = ({ message }) => {
    return (
      <div className="mb-2 flex flex-row items-center justify-start space-x-2">
        <div className="flex-grow">
          <div
            className={`max-w-36 flex w-fit flex-1 flex-row items-center justify-start space-x-2 overflow-y-scroll rounded-full p-3 ${
              message.type === "question"
                ? "float-right bg-blue-600"
                : "float-left bg-gray-100"
            }`}
          >
            <div className="flex flex-row items-center justify-start space-x-2">
              <div className="flex-shrink-0">
                <span className="text-sm font-medium text-gray-900">
                  {message.type != "question" && "Bot:"}
                </span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span
                className={`text-sm ${
                  message.type === "question" ? "text-white" : "text-gray-500"
                }`}
              >
                {message.text}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-fit flex-col overflow-x-hidden">
      <div
        className="flex-1 overflow-y-scroll rounded-lg bg-white p-4"
        style={{ maxHeight: "50vh" }}
      >
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        <div className="flex rounded bg-white p-4">
          <input
            className="w-full rounded border p-2"
            type="text"
            placeholder="Type a message..."
            value={currentMessage}
            onChange={handleMessageChange}
          />
          <button
            className="float-right rounded bg-blue-500 p-2 text-white"
            onClick={() => {
              onSubmit(currentMessage);
              setCurrentMessage("");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
