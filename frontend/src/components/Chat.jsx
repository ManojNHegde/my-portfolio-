import React, { useState, useRef, useEffect } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("https://my-portfolio-fhyq.onrender.com/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });

      const data = await res.json();
      const botMsg = { role: "assistant", content: data.answer || "No answer" };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Error connecting to server." },
      ]);
    }

    setInput("");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto h-[90vh] p-4 bg-gray-100 rounded-2xl shadow-lg border border-gray-300">
      {/* Chat Header */}
      <div className="text-lg font-bold mb-4 text-center text-gray-800 border-b pb-2">
        💬 Chat with Manoj
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto space-y-4 p-4 bg-white rounded-lg shadow-inner border border-gray-200">
        {messages.map((msg, idx) => (
          <div key={idx} className="flex flex-col items-start">
            <span
              className={`text-xs font-semibold mb-1 ${
                msg.role === "user" ? "text-blue-500" : "text-green-500"
              }`}
            >
              {msg.role === "user" ? "You:" : "Manoj:"}
            </span>
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-md ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-bl-none"
                  : "bg-gray-200 text-gray-900 rounded-tl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col items-start">
            <span className="text-xs font-semibold text-green-500">Manoj:</span>
            <div className="bg-gray-200 text-gray-500 px-4 py-2 rounded-2xl text-sm shadow-md animate-pulse rounded-tl-none">
              Thinking...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="mt-4 flex items-center bg-white border border-gray-300 rounded-full shadow-md px-3 py-2">
        <textarea
          rows="1"
          className="flex-1 resize-none p-2 bg-transparent focus:outline-none text-gray-800 text-sm"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full transition-all duration-200"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
