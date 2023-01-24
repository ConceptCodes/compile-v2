import { useState } from "react";
import { IChatLog } from "../types";

interface IChatProps {
  messages: IChatLog[];
  loading: boolean;
  disabled: boolean;
  onSubmit: (message: string) => void;
}

const Chat = (props: IChatProps) => {
  const { onSubmit, messages, loading, disabled } = props;
  const [currentMessage, setCurrentMessage] = useState("");

  const LoadingSpinner = () => {
    return (
      <div className="flex justify-center">
        <div className="relative h-10 w-10">
          <div className="dot-container absolute top-0 left-0">
            <div className="dot absolute top-0 left-0 animate-ping bg-blue-500"></div>
          </div>
          <div className="dot-container absolute top-0 left-0">
            <div className="dot absolute top-0 left-0 animate-ping bg-blue-500"></div>
          </div>
          <div className="dot-container absolute top-0 left-0">
            <div className="dot absolute top-0 left-0 animate-ping bg-blue-500"></div>
          </div>
        </div>
      </div>
    );
  };

  const Message = ({ message }) => {
    return (
      <div className="mb-2 flex flex-col  justify-start space-x-2">
        <div className="flex-grow">
          <div
            className={`max-w-36 flex w-fit flex-1  justify-start space-x-2 overflow-x-hidden rounded-lg p-3 ${
              message.type === "question"
                ? "float-right bg-blue-600"
                : "float-left bg-gray-100"
            }`}
          >
            <div className="justify-start space-x-2">
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
    <div className="flex h-[400px] flex-col overflow-x-hidden">
      <div className="flex-1 space-y-5 overflow-y-scroll rounded-t-lg bg-white p-4">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="sticky bottom-0 flex rounded-b-lg bg-white p-4">
        <input
          className="w-full rounded border p-2"
          type="text"
          placeholder="Type a message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button
          className={`float-right rounded ${
            disabled ? "bg-slate-400" : "bg-blue-500"
          } p-2 text-white`}
          onClick={() => {
            onSubmit(currentMessage);
            setCurrentMessage("");
          }}
          disabled={disabled}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
