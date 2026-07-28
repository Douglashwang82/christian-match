"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, Church, Lightbulb, Send } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { Icebreakers } from "@/components/messages/Icebreakers";
import type { ChatMessage, Conversation } from "@/lib/types";

/**
 * ChatThread — 對話串（客戶端）。
 * 管理訊息狀態與輸入；空對話時醒目呈現破冰提示，有對話時可隨時展開。
 * Demo 僅在前端追加訊息（不接後端、不模擬對方回覆）。
 */
export function ChatThread({ conversation }: { conversation: Conversation }) {
  const [messages, setMessages] = useState<ChatMessage[]>(conversation.messages);
  const [draft, setDraft] = useState("");
  const [showTips, setShowTips] = useState(conversation.messages.length === 0);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isEmpty = messages.length === 0;

  // 新訊息時捲到底
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  function send(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setMessages((prev) => [
      ...prev,
      { id: `local-${prev.length}`, fromMe: true, text, time: "剛剛" },
    ]);
    setDraft("");
    setShowTips(false);
  }

  function pickIcebreaker(question: string) {
    setDraft(question);
    inputRef.current?.focus();
  }

  return (
    <div className="mx-auto flex h-dvh max-w-2xl flex-col">
      {/* 對話標頭 */}
      <header className="sticky top-0 z-20 px-4 pt-4">
        <div className="glass glass-ring flex items-center gap-3 rounded-full px-3 py-2.5">
          <Link
            href="/messages"
            aria-label="返回訊息列表"
            className="grid h-9 w-9 place-items-center rounded-full text-silver-500 transition-colors hover:bg-white/50"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="relative h-9 w-9 overflow-hidden rounded-full">
            <Image
              src={conversation.profile.photos[0]}
              alt={conversation.profile.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-serif text-base font-semibold text-silver-700">
              {conversation.profile.name}
            </p>
            <p className="flex items-center gap-1 truncate text-xs text-silver-400">
              <Church className="h-3 w-3 text-gold-400" />
              {conversation.profile.church.name}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowTips((s) => !s)}
            aria-label="破冰提示"
            className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
              showTips ? "bg-white/70 text-gold-600" : "text-silver-400 hover:bg-white/50"
            }`}
          >
            <Lightbulb className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* 訊息區 */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-5">
        <p className="mx-auto rounded-full bg-white/50 px-3 py-1 text-xs text-silver-400">
          {conversation.matchedOn}
        </p>

        <AnimatePresence initial={false}>
          {showTips && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Icebreakers
                items={conversation.icebreakers}
                onPick={pickIcebreaker}
                prominent={isEmpty}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={endRef} />
      </div>

      {/* 輸入列 */}
      <form onSubmit={send} className="px-4 pb-5">
        <div className="glass glass-ring flex items-center gap-2 rounded-full py-2 pl-4 pr-2">
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="寫下真誠的一句話…"
            className="w-full bg-transparent text-sm text-silver-700 placeholder:text-silver-400 focus:outline-none"
          />
          <button
            type="submit"
            aria-label="送出"
            disabled={!draft.trim()}
            className="btn-gold !h-10 !w-10 !rounded-full !p-0 disabled:opacity-40"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`flex flex-col ${message.fromMe ? "items-end" : "items-start"}`}
    >
      <div
        className={
          message.fromMe
            ? "max-w-[78%] rounded-3xl rounded-br-lg bg-gradient-to-br from-gold-300 to-gold-500 px-4 py-2.5 text-sm text-white shadow-glass"
            : "glass glass-ring max-w-[78%] rounded-3xl rounded-bl-lg px-4 py-2.5 text-sm text-silver-700"
        }
      >
        {message.text}
      </div>
      <span className="mt-1 px-1 text-[11px] text-silver-300">{message.time}</span>
    </motion.div>
  );
}
