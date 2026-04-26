import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useT } from "@/i18n/LangProvider";
import { MASCOT_AVATAR_URL } from "./MascotImage";
import { getLocalReply, QUICK_SUGGESTIONS } from "@/data/chatbotData";

type Msg = { role: "user" | "assistant"; content: string };

export const Chatbot: React.FC = () => {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "assistant", content: t("chat_greeting") }]);
      setShowSuggestions(true);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, busy]);

  const send = async (text?: string) => {
    const userText = (text ?? input).trim();
    if (!userText || busy) return;
    setShowSuggestions(false);
    const next: Msg[] = [...messages, { role: "user", content: userText }];
    setMessages(next);
    setInput("");
    setBusy(true);
    await new Promise((res) => setTimeout(res, 400 + Math.random() * 400));
    setMessages((curr) => [
      ...curr,
      { role: "assistant", content: getLocalReply(userText) },
    ]);
    setBusy(false);
  };

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("chat_open")}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 220, damping: 18 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-6 right-6 z-[60] w-16 h-16 rounded-full bg-joj-orange text-white shadow-2xl shadow-joj-orange/40 flex items-center justify-center ring-4 ring-joj-orange/20 hover:ring-joj-orange/30 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7"
        >
          {open ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <>
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="11" r="0.8" fill="currentColor" />
              <circle cx="13" cy="11" r="0.8" fill="currentColor" />
              <circle cx="17" cy="11" r="0.8" fill="currentColor" />
            </>
          )}
        </svg>
      </motion.button>

      {/* Panel chat */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-28 right-6 z-[60] w-[min(380px,calc(100vw-3rem))] max-h-[70vh] flex flex-col rounded-2xl overflow-hidden bg-[#101410] border border-white/10 shadow-2xl shadow-black/60"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-joj-orange to-[#FF8A3D] text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/95 ring-2 ring-white/40 overflow-hidden shrink-0 shadow-lg">
                  <img
                    src={MASCOT_AVATAR_URL}
                    alt="Mascotte JOJ Dakar 2026"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <div className="font-display uppercase tracking-wider text-sm leading-tight truncate">
                    {t("chat_title")}
                  </div>
                  <div className="text-[11px] opacity-90 leading-tight truncate">
                    {t("chat_status")}
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#0c0f0c]"
            >
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                      m.role === "user"
                        ? "bg-joj-orange text-white rounded-br-md"
                        : "bg-white/8 text-white/95 rounded-bl-md"
                    }`}
                  >
                    {m.content}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {busy && (
                <div className="flex justify-start">
                  <div className="bg-white/8 rounded-2xl rounded-bl-md px-4 py-3 flex gap-1">
                    <span
                      className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "120ms" }}
                    />
                    <span
                      className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
                      style={{ animationDelay: "240ms" }}
                    />
                  </div>
                </div>
              )}

              {/* Suggestions rapides */}
              {showSuggestions && messages.length === 1 && !busy && (
                <div className="space-y-1.5 pt-1">
                  <p className="text-white/40 text-xs px-1">Suggestions rapides :</p>
                  {QUICK_SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s.replace(/^\p{Emoji}\s*/u, ""))}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm text-white/80 bg-white/5 hover:bg-joj-orange/20 hover:text-white border border-white/8 hover:border-joj-orange/40 transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void send();
              }}
              className="px-3 py-3 bg-[#0a0d0a] border-t border-white/10 flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t("chat_placeholder")}
                className="flex-1 bg-white/5 text-white placeholder:text-white/40 rounded-full px-4 py-2.5 text-sm outline-none focus:bg-white/10 transition"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="w-10 h-10 rounded-full bg-joj-orange text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#FF8A3D] transition"
                aria-label={t("chat_send")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-4 h-4"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
