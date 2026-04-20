"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type GuidanceResponse = {
  disease: string;
  prescription: string;
  llmGuidance: {
    summary: string;
    domesticRemedies: string[];
    precautions: string[];
    whenToSeekDoctor: string;
  };
  disclaimer: string;
};

type ChatMessage = {
  id: string;
  role: "bot" | "user";
  text: string;
};

export default function PatientChatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(420);
  const [height, setHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef({ startX: 0, startY: 0, startWidth: 0, startHeight: 0 });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "bot",
      text: "Hello! 👋 I'm your Health Assistant. Tell me about any health concern or disease, and I'll provide helpful domestic remedies and guidance based on your medical history.",
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0 && !loading, [input, loading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const pushBotMessage = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-bot`,
        role: "bot",
        text,
      },
    ]);
    setTimeout(scrollToBottom, 100);
  };

  const handleSend = async () => {
    const disease = input.trim();
    if (!disease || loading) return;

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (!user?.patientId) {
      pushBotMessage("I could not find your patient profile. Please login again.");
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-user`,
        role: "user",
        text: disease,
      },
    ]);

    setInput("");
    setLoading(true);
    setTimeout(scrollToBottom, 50);

    try {
      const response = await fetch(
        `http://localhost:5000/api/patient/${user.patientId}/chatbot/guidance`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ disease }),
        }
      );

      const data = (await response.json()) as GuidanceResponse | { message?: string };

      if (!response.ok) {
        throw new Error(
          (data as { message?: string })?.message ||
            "Failed to get guidance from assistant"
        );
      }

      const payload = data as GuidanceResponse;

      const reply = [
        `🏥 **Disease:** ${payload.disease}`,
        "",
        `💊 **Your Latest Prescription:**`,
        payload.prescription,
        "",
        `📝 **AI Summary:**`,
        payload.llmGuidance.summary,
        "",
        `🏡 **Domestic Remedies:**`,
        ...payload.llmGuidance.domesticRemedies.map((item, i) => `${i + 1}. ${item}`),
        "",
        `⚠️ **Precautions:**`,
        ...payload.llmGuidance.precautions.map((item, i) => `${i + 1}. ${item}`),
        "",
        `🚑 **When to seek doctor:**`,
        payload.llmGuidance.whenToSeekDoctor,
        "",
        `📋 ${payload.disclaimer}`,
      ].join("\n");

      pushBotMessage(reply);
    } catch (error: any) {
      pushBotMessage(
        `❌ Error: ${
          error?.message ||
          "Something went wrong while contacting the AI assistant."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleMouseDownResize = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    resizeRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: width,
      startHeight: height,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const deltaX = e.clientX - resizeRef.current.startX;
    const deltaY = e.clientY - resizeRef.current.startY;

    const newWidth = Math.max(320, resizeRef.current.startWidth + deltaX);
    const newHeight = Math.max(400, resizeRef.current.startHeight + deltaY);

    setWidth(newWidth);
    setHeight(newHeight);
  };

  const handleMouseUpResize = () => {
    setIsResizing(false);
  };

  // Attach mouse move listener when resizing
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeRef.current.startX;
      const deltaY = e.clientY - resizeRef.current.startY;

      const newWidth = Math.max(320, resizeRef.current.startWidth + deltaX);
      const newHeight = Math.max(400, resizeRef.current.startHeight + deltaY);

      setWidth(newWidth);
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

 // Replace only the JSX return section + add helper styles/classes
// ChatGPT-style floating button + panel UI
// Replace only the JSX return section + add helper styles/classes
// ChatGPT-style floating button + panel UI
return (
  <>
    {/* Floating Button */}
    <button
      type="button"
      onClick={() => setOpen((prev) => !prev)}
      className={`fixed bottom-10 right-15 z-50 h-18 w-18 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800 ${
        open ? 'rotate-90 scale-95' : ''
      }`}
      aria-label="Open chat assistant"
    >
      {open ? <X className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
    </button>

    {/* Chat Window */}
    {open && (
      <div
        className="fixed bottom-24 right-5 z-50 flex flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#212121] shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition-all duration-300"
        style={{
          width: 'min(420px, calc(100vw - 24px))',
          height: 'min(700px, 78vh)',
        }}
      >
        {/* Header */}
        <div className="border-b border-slate-200 dark:border-slate-700 px-4 py-3 bg-white dark:bg-[#212121] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md">
              <MessageCircle className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">
                Health Assistant
              </h3>
              <p className="text-xs text-slate-500">online</p>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <X className="h-4 w-4 text-slate-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6 bg-white dark:bg-[#212121]">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`group flex gap-3 items-end ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'bot' && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-semibold shadow-sm">
                  AI
                </div>
              )}

              <div className="flex flex-col max-w-[82%]">
                <div
                  className={`px-4 py-3 text-sm leading-7 whitespace-pre-wrap shadow-sm transition-all duration-200 ${
                    message.role === 'user'
                      ? 'bg-[#2f2f2f] text-white rounded-3xl rounded-br-md'
                      : 'bg-[#f7f7f8] dark:bg-[#2a2a2a] text-slate-900 dark:text-slate-100 rounded-3xl rounded-bl-md border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {message.text}
                </div>
                <span className="mt-1 px-2 text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  just now
                </span>
              </div>

              {message.role === 'user' && (
                <div className="h-8 w-8 shrink-0 rounded-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white flex items-center justify-center text-[11px] font-semibold shadow-sm border border-slate-200 dark:border-slate-700">
                  U
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 items-end">
              <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[11px] font-semibold shadow-sm">
                AI
              </div>
              <div className="rounded-3xl rounded-bl-md px-4 py-3 bg-[#f7f7f8] dark:bg-[#2a2a2a] border border-slate-200 dark:border-slate-700 shadow-sm">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((dot) => (
                    <span
                      key={dot}
                      className="h-2 w-2 rounded-full bg-slate-500 animate-bounce"
                      style={{ animationDelay: `${dot * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-3 bg-white dark:bg-[#212121]">
          <div className="flex items-end gap-2 rounded-3xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#2f2f2f] px-3 py-2 shadow-sm">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Message Health Assistant"
              className="flex-1 bg-transparent px-2 py-2 text-sm text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
            />

            <button
              type="button"
              onClick={handleSend}
              disabled={!canSend}
              className="h-9 w-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black flex items-center justify-center transition hover:scale-105 disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    )}
  </>
);


}
