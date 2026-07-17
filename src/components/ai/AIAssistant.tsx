import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, X, Send, MessageCircle, Bot, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { aiSuggestions } from "@/lib/constants";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your SokoDigital AI assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "I found some great options for you! Check out our premium electronics section.",
        "Great choice! We have several options under your budget.",
        "Here are the best deals available right now.",
        "Sure! Let me search for the best matching products for you.",
      ];
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Kichi-style floating chat button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-primary text-primary-foreground h-14 w-14 rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 z-50 w-[360px] max-w-[calc(100vw-32px)]"
          >
            <div className="bg-card border border-border/50 rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <div className="bg-primary p-4">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-white/20 flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">AI Assistant</p>
                    <p className="text-[11px] text-white/70">Online • Ask me anything</p>
                  </div>
                  <Badge className="bg-emerald-500/20 text-emerald-200 border-0 text-[10px]">
                    Online
                  </Badge>
                </div>
              </div>

              {/* Messages */}
              <div className="h-72 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn("flex gap-2", msg.role === "user" ? "justify-end" : "justify-start")}
                  >
                    {msg.role === "assistant" && (
                      <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                        <Bot className="h-3.5 w-3.5 text-primary" />
                      </div>
                    )}
                    <div
                      className={cn(
                        "max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-muted text-foreground rounded-tl-sm"
                      )}
                    >
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex gap-2">
                    <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Bot className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <div className="bg-muted rounded-xl px-4 py-3">
                      <div className="flex gap-1">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-2 w-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              {messages.length <= 1 && (
                <div className="px-4 pb-3">
                  <p className="text-[11px] text-muted-foreground mb-2 font-medium">Try asking:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {aiSuggestions.slice(0, 3).map((suggestion) => (
                      <button
                        key={suggestion.id}
                        onClick={() => {
                          setInput(suggestion.text);
                          setTimeout(() => handleSend(), 100);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground hover:text-foreground hover:bg-primary/5 transition-all border border-border/30"
                      >
                        {suggestion.text.length > 22
                          ? suggestion.text.slice(0, 22) + "..."
                          : suggestion.text}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="border-t border-border/50 p-3">
                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask anything..."
                    className="h-10 rounded-xl bg-muted/50 border-border/50 text-sm"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 rounded-xl shrink-0"
                    disabled={!input.trim() || isTyping}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
