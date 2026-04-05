import { useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([...messages, { text: message, sender: "me" }]);
    setMessage("");
  };

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md h-[600px] bg-white shadow-lg rounded-xl flex flex-col">

        {/* Header */}
        <div className="p-4 border-b font-semibold text-lg">
          Chat App 💬
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-2 rounded-lg max-w-[70%] ${
                msg.sender === "me"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg px-3 py-2 outline-none"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}