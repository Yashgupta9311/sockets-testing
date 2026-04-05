import { useEffect } from "react";
import { useState } from "react";
import { connectws } from "./ws";
import { useRef } from "react";


export default function App() {
  const socket = useRef(null)
  const [userName, setUserName] = useState("");
  const [inputName, setInputName] = useState("");
  const [showNamePopup, setShowNamePopup] = useState(true);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.current = connectws()
    socket.current.on("connect", () => {
      socket.current.on('noticeall', (userName) => {
        console.log(`${userName} joined group`)
      })
    })
    socket.current.on('sendmsg', (msg) => {
      if (msg.sender === userName) return;
      setMessages((prev) => [...prev, msg]);
    });

  }, [])

  // 🕒 format time
  function formatTime(ts) {
    const d = new Date(ts);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }

  // 👤 submit name
  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!inputName.trim()) return;
    socket.current.emit('joinroom', inputName)
    setUserName(inputName);
    setShowNamePopup(false);
  };

  // 💬 send message
  const sendMessage = () => {
    if (!text.trim()) return;

    const newMsg = {
      id: crypto.randomUUID(),
      text,
      sender: userName,
      time: Date.now(),
    };

    setMessages((prev) => [...prev, newMsg]);
    socket.current.emit('sendmsg', newMsg)
    setText("");
  };

  // ⌨️ enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-100 p-4">

      {/* NAME POPUP */}
      {showNamePopup && (
        <div className="fixed inset-0 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h1 className="text-xl font-semibold text-black">
              Enter your name
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              This will be used to identify you
            </p>

            <form onSubmit={handleNameSubmit} className="mt-4">
              <input
                autoFocus
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="Your name (e.g. Yash)"
                className="w-full border border-gray-200 rounded-md px-3 py-2 outline-green-500"
              />
              <button
                type="submit"
                className="block ml-auto mt-3 px-4 py-2 bg-green-500 text-white rounded-full"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CHAT BOX */}
      {!showNamePopup && (
        <div className="w-full max-w-2xl h-[90vh] bg-white rounded-xl shadow-md flex flex-col overflow-hidden">

          {/* HEADER */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
            <div className="h-10 w-10 rounded-full bg-[#075E54] text-white flex items-center justify-center">
              {userName[0]?.toUpperCase()}
            </div>

            <div className="flex-1">
              <div className="text-sm font-medium text-[#303030]">
                Realtime group chat
              </div>
              <div className="text-xs text-gray-500">
                Someone is typing...
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Signed in as{" "}
              <span className="font-medium text-[#303030] capitalize">
                {userName}
              </span>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-100">
            {messages.map((m) => {
              const mine = m.sender === userName;

              return (
                <div
                  key={m.id}
                  className={`flex ${mine ? "justify-end" : "justify-start"
                    }`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-[18px] text-sm shadow-sm ${mine
                      ? "bg-[#DCF8C6] text-[#303030] rounded-br-none"
                      : "bg-white text-[#303030] rounded-bl-none"
                      }`}
                  >
                    <div className="break-words whitespace-pre-wrap">
                      {m.text}
                    </div>


                    <div className="text-[11px] text-gray-500 text-right mt-1 flex justify-end gap-2">
                      <span className="capitalize">{m.sender}</span>
                      <span>{formatTime(m.time)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* INPUT */}
          <div className="px-4 py-3 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-3 border rounded-full px-3 py-2">
              <textarea
                rows={1}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a message..."
                className="flex-1 resize-none outline-none text-sm"
              />

              <button
                onClick={sendMessage}
                className="bg-green-500 text-white px-4 py-2 rounded-full text-sm"
              >
                Send
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}