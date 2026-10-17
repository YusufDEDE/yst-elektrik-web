"use client";

import { buildYstAiSystemPrompt } from "@/lib/ai/build-system-prompt";
import { getYstAiCopy } from "@/lib/ai/yst-ai-copy";
import { useLang } from "@/providers/lang-provider";
import { useTheme } from "@/providers/theme-provider";
import { Bot, ChevronDown, Send, X, Zap } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ChatMessage = { role: "user" | "assistant"; content: string };

function formatMessageHtml(content: string): string {
  return content
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br/>");
}

export function YstAiAssistant() {
  const { lang } = useLang();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const copy = getYstAiCopy(lang);
  const systemPrompt = buildYstAiSystemPrompt(lang);

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showHint, setShowHint] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (mounted && showHint) {
      const timer = setTimeout(() => setShowHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [mounted, showHint]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setShowHint(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;

      const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
      setMessages(nextMessages);
      setInput("");
      setLoading(true);

      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
        if (!apiKey) throw new Error("NO_KEY");

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              ...nextMessages.map((m) => ({ role: m.role, content: m.content })),
            ],
            max_tokens: 500,
            temperature: 0.5,
          }),
        });

        if (!res.ok) throw new Error(`API error: ${res.status}`);

        const data = (await res.json()) as {
          choices?: { message?: { content?: string } }[];
        };
        const reply = data.choices?.[0]?.message?.content ?? copy.errorGeneric;
        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      } catch (err) {
        const content =
          err instanceof Error && err.message === "NO_KEY" ? copy.errorNoKey : copy.errorGeneric;
        setMessages((prev) => [...prev, { role: "assistant", content }]);
      } finally {
        setLoading(false);
      }
    },
    [copy.errorGeneric, copy.errorNoKey, loading, messages, systemPrompt],
  );

  const bubbleBg = isDark ? "#1e293b" : "#fff";
  const border = isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0";
  const textPrimary = isDark ? "#f8fafc" : "#0f172a";
  const textMuted = isDark ? "rgba(248,250,252,0.55)" : "#64748b";
  const panelBg = isDark ? "#0f172a" : "#ffffff";
  const msgBg = isDark ? "#1e293b" : "#f8fafc";

  if (!mounted) return null;

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          right: 0,
          zIndex: 9000,
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {showHint && !open && !isMobile ? (
          <div
            className="ai-hint-bubble"
            style={{
              position: "absolute",
              bottom: "100%",
              right: 0,
              marginBottom: "0.75rem",
              background: bubbleBg,
              border: `1px solid ${border}`,
              borderRadius: "1rem",
              padding: "0.625rem 1rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: textPrimary,
              boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
              width: "max-content",
              maxWidth: 220,
              marginRight: "1rem",
              lineHeight: 1.45,
              animation: "ystHintIn 0.3s ease",
              fontFamily: "var(--font-sans)",
            }}
          >
            💬 {copy.hintNeedHelp}
            <br />
            <span style={{ color: "#2563eb", fontWeight: 600 }}>{copy.hintAskAi}</span>
          </div>
        ) : null}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="YST AI Asistan"
          style={{
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            border: "none",
            borderRadius: "1.5rem 0 0 1.5rem",
            padding: "1rem 0.8rem 1rem 1rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 24px rgba(37,99,235,0.45), 0 0 0 0 rgba(37,99,235,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
            animation: "ystPulse 2.5s infinite",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateX(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          {open ? <ChevronDown size={26} color="#fff" /> : <Bot size={26} color="#fff" />}
        </button>
      </div>

      {open ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            right: "4.5rem",
            zIndex: 9000,
            transform: "translateY(-50%)",
            width: "min(380px, calc(100vw - 2rem))",
            background: panelBg,
            border: `1px solid ${border}`,
            borderRadius: "1.25rem",
            boxShadow: isDark
              ? "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)"
              : "0 24px 80px rgba(0,0,0,0.15)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            animation: "ystWidgetIn 0.2s ease",
            fontFamily: "var(--font-sans)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "0.875rem 1rem",
              background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
              flexShrink: 0,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <Zap size={16} color="#fff" />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "0.875rem", fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>
                  {copy.aiName}
                </p>
                <p style={{ margin: 0, fontSize: "0.7rem", color: "rgba(255,255,255,0.65)", lineHeight: 1 }}>
                  {copy.aiSub}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "0.5rem",
                padding: "0.3rem",
                cursor: "pointer",
                display: "flex",
                color: "#fff",
              }}
              aria-label="Kapat"
            >
              <X size={14} />
            </button>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "0.875rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.625rem",
              maxHeight: 340,
              minHeight: 180,
            }}
          >
            {messages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "1.5rem 0.5rem" }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    background: "rgba(37,99,235,0.1)",
                    border: "1px solid rgba(37,99,235,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 0.75rem",
                  }}
                >
                  <Bot size={22} color="#2563eb" />
                </div>
                <p style={{ margin: "0 0 0.25rem", fontSize: "0.875rem", fontWeight: 700, color: textPrimary }}>
                  {copy.hello}
                </p>
                <p style={{ margin: 0, fontSize: "0.8rem", color: textMuted, lineHeight: 1.5 }}>
                  {copy.askAboutYst}
                </p>
              </div>
            ) : null}

            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}
              >
                <div
                  style={{
                    maxWidth: "85%",
                    padding: "0.5rem 0.75rem",
                    borderRadius:
                      msg.role === "user" ? "1rem 1rem 0.25rem 1rem" : "1rem 1rem 1rem 0.25rem",
                    background:
                      msg.role === "user" ? "linear-gradient(135deg, #2563eb, #1d4ed8)" : msgBg,
                    border: msg.role === "user" ? "none" : `1px solid ${border}`,
                    fontSize: "0.8125rem",
                    color: msg.role === "user" ? "#fff" : textPrimary,
                    lineHeight: 1.55,
                    wordBreak: "break-word",
                  }}
                  dangerouslySetInnerHTML={{ __html: formatMessageHtml(msg.content) }}
                />
              </div>
            ))}

            {loading ? (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div
                  style={{
                    padding: "0.5rem 0.875rem",
                    borderRadius: "1rem 1rem 1rem 0.25rem",
                    background: msgBg,
                    border: `1px solid ${border}`,
                    display: "flex",
                    gap: 4,
                    alignItems: "center",
                  }}
                >
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        background: "#2563eb",
                        animation: `ystDot 1.2s ${0.2 * i}s infinite ease-in-out`,
                        display: "inline-block",
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : null}
            <div ref={scrollRef} />
          </div>

          {messages.length === 0 ? (
            <div
              style={{
                padding: "0 0.875rem 0.75rem",
                display: "flex",
                flexWrap: "wrap",
                gap: "0.375rem",
                flexShrink: 0,
              }}
            >
              {copy.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => sendMessage(suggestion)}
                  style={{
                    padding: "0.3rem 0.7rem",
                    background: isDark ? "rgba(37,99,235,0.12)" : "#eff6ff",
                    border: `1px solid ${isDark ? "rgba(59,130,246,0.25)" : "#bfdbfe"}`,
                    borderRadius: "9999px",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    color: isDark ? "#93c5fd" : "#2563eb",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    textAlign: "left",
                    lineHeight: 1.4,
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}

          <div
            style={{
              padding: "0.625rem 0.875rem",
              borderTop: `1px solid ${border}`,
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-end",
              flexShrink: 0,
            }}
          >
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage(input);
                }
              }}
              placeholder={copy.placeholder}
              rows={1}
              style={{
                flex: 1,
                padding: "0.5rem 0.75rem",
                background: msgBg,
                border: `1px solid ${border}`,
                borderRadius: "0.75rem",
                fontSize: "0.8125rem",
                color: textPrimary,
                resize: "none",
                fontFamily: "var(--font-sans)",
                outline: "none",
                maxHeight: 96,
              }}
            />
            <button
              type="button"
              onClick={() => sendMessage(input)}
              disabled={loading || !input.trim()}
              aria-label="Gönder"
              style={{
                background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                border: "none",
                borderRadius: "0.75rem",
                padding: "0.55rem",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                opacity: loading || !input.trim() ? 0.5 : 1,
                display: "flex",
                flexShrink: 0,
              }}
            >
              <Send size={16} color="#fff" />
            </button>
          </div>

          <p
            style={{
              margin: 0,
              padding: "0.5rem 0.875rem 0.75rem",
              fontSize: "0.65rem",
              color: textMuted,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {copy.disclaimer}
          </p>
        </div>
      ) : null}
    </>
  );
}
